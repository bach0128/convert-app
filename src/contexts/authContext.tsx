'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import {
  AuthService,
  type EmailPasswordAuthentication,
  type UserSignUp,
} from '@/services';
import {
  getErrorMessage,
  isRememberMe,
  saveToStorage,
  toastNotification,
} from '@/lib/utils';
import type { User } from '@/types/dto/auth';
import { KEY_LOCAL_STORAGE } from '@/interfaces/Storage';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
  signin: (credentials: EmailPasswordAuthentication) => Promise<any>;
  signup: (userData: UserSignUp) => Promise<void>;
  logout: () => Promise<void>;
  recoverPassword: (email: string) => Promise<any>;
  clearError: () => void;
  // updateProfile: (data: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const currentUser = await AuthService.getMe();
      if (currentUser) {
        setUser(currentUser);
      }
    } catch {
      window.location.href = '/signin';
    } finally {
      setIsLoading(false);
    }
  };

  const signin = async (credentials: EmailPasswordAuthentication) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await AuthService.signin(credentials);
      saveToStorage(
        KEY_LOCAL_STORAGE.ACCESS_TOKEN,
        result.access_token,
        isRememberMe()
      );

      saveToStorage(
        KEY_LOCAL_STORAGE.REFRESH_TOKEN,
        result.refresh_token,
        isRememberMe()
      );
      if (result.user) {
        setUser(result.user);
      }
      window.location.href = '/';
    } catch (err) {
      const errorMessage = getErrorMessage(err);
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (userData: UserSignUp) => {
    setIsLoading(true);
    setError(null);
    try {
      await AuthService.signup(userData);
      toastNotification('Đăng ký tài khoản thành công.', 'success');
      window.location.href = '/signin';
    } catch (err) {
      const errorMessage = getErrorMessage(err);
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await AuthService.signout();
      setUser(null);
      window.location.href = '/signin';
    } catch (err) {
      const errorMessage = getErrorMessage(err);
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const recoverPassword = async (email: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await AuthService.recoverAccount({ email });
      return result;
    } catch (err) {
      const errorMessage = getErrorMessage(err);
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // const updateProfile = async (data: Partial<User>) => {
  //   try {
  //     // Add this method to your UserService if it doesn't exist
  //     const updatedUser = await UserService.updateProfile?.(data);
  //     if (updatedUser) {
  //       setUser(updatedUser);
  //     }
  //   } catch (err) {
  //     const errorMessage = getErrorMessage(err);
  //     setError(errorMessage);
  //     throw new Error(errorMessage);
  //   }
  // };

  const clearError = () => setError(null);

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    error,
    signin,
    signup,
    logout,
    recoverPassword,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
