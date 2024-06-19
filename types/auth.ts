export interface AuthState {
    token: string | null;
    authenticated: boolean | null;
  }
  
  export interface AuthProps {
    authState: AuthState;
    onRegister: (username: string, password: string) => Promise<any>;
    onLogin: (username: string, password: string) => Promise<any>;
    onLogout: () => Promise<void>;
  }
  