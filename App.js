import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthProvider, useAuth } from './app/context/AuthContext';

import Login from './screens/Login';
import Register from './screens/Register';
import Home from './screens/Home';

const Stack = createStackNavigator();

const theme = {
  ...DefaultTheme,
  roundness: 4,
  colors: {
    ...DefaultTheme.colors,
    primary: '#049DFF',
    accent: '#fff',
  },
};

const Layout = () => {
  const { authState } = useAuth();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {authState?.authenticated ? (
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ title: 'Home' }}
          />
        ) : (
          <>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <AuthProvider>
        <Layout />
        <StatusBar style="auto" />
      </AuthProvider>
    </PaperProvider>
  );
}
