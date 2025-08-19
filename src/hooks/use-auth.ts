import { useEffect, useState } from 'react';
import {
  AuthService,
  type EmailPasswordAuthentication,
  type UserSignUp,
} from '@/services';
import {
  getAccessToken,
  getErrorMessage,
  getRefreshToken,
  removeFromStorages,
} from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
import { ROUTE_PATH } from '@/enum/route-path';
import { KEY_LOCAL_STORAGE } from '@/enum/Storage';
import type { User } from '@/types/dto/auth';
import { useQuery } from '@tanstack/react-query';

export function useAuth() {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const isTokenExisted = !!getAccessToken() || !!getRefreshToken();
  const navigate = useNavigate();

  const { data } = useQuery({
    queryKey: ['get me'],
    queryFn: AuthService.getMe,
  });

  useEffect(() => {
    if (data) setUser(data);
  }, [data]);

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
      removeFromStorages([
        KEY_LOCAL_STORAGE.ACCESS_TOKEN,
        KEY_LOCAL_STORAGE.REFRESH_TOKEN,
        KEY_LOCAL_STORAGE.USER_PREFERENCES,
      ]);
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

  return {
    user,
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
