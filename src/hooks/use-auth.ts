import { useState } from 'react';
import {
  AuthService,
  type EmailPasswordAuthentication,
  type UserSignUp,
} from '@/services';
import { getAccessToken, getErrorMessage, getRefreshToken } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
import { ROUTE_PATH } from '@/enum/route-path';

export function useAuth() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isTokenExisted = !!getAccessToken() || !!getRefreshToken();
  const navigate = useNavigate();

  const signin = async (credentials: EmailPasswordAuthentication) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await AuthService.signin(credentials);
      return result;
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
      navigate(ROUTE_PATH.SIGNIN);
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

  return {
    signin,
    signup,
    logout,
    recoverPassword,
    isLoading,
    error,
    clearError: () => setError(null),
    isTokenExisted,
  };
}
