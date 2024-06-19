import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import Constants from 'expo-constants';
import { AuthState, AuthProps } from '/Users/heavyshark/demoApp/types/auth';
const { API_URL, TOKEN_KEY } = Constants.expoConfig.extra;

const AuthContext = createContext<AuthProps | undefined>(undefined);

export const useAuth = (): AuthProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('not in AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps): JSX.Element => {
  const [authState, setAuthState] = useState<AuthState>({
    token: null,
    authenticated: null,
  });

  useEffect(() => {
    const loadToken = async () => {
      try {
        const tokenString = await SecureStore.getItemAsync(TOKEN_KEY);
        console.log('Loaded token from SecureStore:', tokenString);
        if (tokenString) {
          const token = JSON.parse(tokenString);
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          setAuthState({
            token: token,
            authenticated: true,
          });
        }
      } catch (error) {
        console.error('Failed to load token:', error);
      }
    };
    loadToken();
  }, []);

  const register = async (username: string, password: string) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ username, password });
      }, 1000);
    });
  };

  const login = async (username: string, password: string) => {
    try {
      console.log('Attempting login with:', { username, password });
      const response = await axios.post(`${API_URL}/auth/login`, {
        username,
        password,
        expiresInMins: 60,
      }, {
        headers: { 'Content-Type': 'application/json' }
      });
      console.log('Login response:', response.data);
      const token = response.data.token;
      if (token) {
        await SecureStore.setItemAsync(TOKEN_KEY, JSON.stringify(token));
        setAuthState({
          token: token,
          authenticated: true,
        });
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        console.log('Login successful:', response.data);
        return { user: response.data, token };
      } else {
        throw new Error('Token is missing in the response');
      }
    } catch (error: any) {
      console.error('Login error:', error.response?.data || error.message);
      return { error: true, msg: error.response?.data?.message || 'Login failed' };
    }
  };

  const logout = async () => {
    try {
      await SecureStore.deleteItemAsync(TOKEN_KEY);
      setAuthState({
        token: null,
        authenticated: false,
      });
      delete axios.defaults.headers.common['Authorization'];
      console.log('Logout successful');
    } catch (error: any) {
      console.error('Logout error:', error);
    }
  };

  const value = {
    authState,
    onRegister: register,
    onLogin: login,
    onLogout: logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
