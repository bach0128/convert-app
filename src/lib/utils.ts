import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { toast } from 'sonner';
import type { ZodSchema } from 'zod';

import { KEY_LOCAL_STORAGE } from '@/enum/Storage';

export function classNames(
  ...classes: (string | undefined | null | boolean)[]
): string {
  return classes.filter(Boolean).join(' ');
}

export type StorageTypeString = 'local' | 'session';
export const StorageType = {
  LOCAL: 'local' as StorageTypeString,
  SESSION: 'session' as StorageTypeString,
};

export const saveToStorage = (
  key: string,
  value: string,
  useLocalStorage = false
): void => {
  const storage = useLocalStorage ? localStorage : sessionStorage;
  storage.setItem(key, value);
};

export const saveToken = (key: string, value: string): void => {
  const useLocalStorage = isRememberMe();
  saveToStorage(key, value, useLocalStorage);
};

export const removeFromStorages = (keys: string[]): void => {
  keys.forEach((key) => {
    localStorage.removeItem(key);
    sessionStorage.removeItem(key);
  });
};

interface ApiError {
  response?: {
    data?: {
      message?: string;
      msg?: string;
    };
  };
  message?: string;
  msg?: string;
}

export const getErrorMessage = (error: ApiError | Error | unknown): string => {
  if (!error) return 'An unexpected error occurred';

  if (typeof error === 'object' && error !== null && 'response' in error) {
    const apiError = error as ApiError;
    return (
      apiError.response?.data?.message ||
      apiError.response?.data?.msg ||
      apiError.message ||
      apiError.msg ||
      'An unexpected error occurred'
    );
  }

  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === 'string') {
    return error;
  }

  return 'An unexpected error occurred';
};

export const isRememberMe = (): boolean => {
  return localStorage.getItem(KEY_LOCAL_STORAGE.REMEMBER_ME) === 'true';
};

const getTokenFromStorage = (tokenKey: string): string | null => {
  const storage = isRememberMe() ? localStorage : sessionStorage;
  return storage.getItem(tokenKey);
};

export const getRefreshToken = (): string | null => {
  return getTokenFromStorage(KEY_LOCAL_STORAGE.REFRESH_TOKEN);
};

export const getAccessToken = (): string | null => {
  return getTokenFromStorage(KEY_LOCAL_STORAGE.ACCESS_TOKEN);
};

export function toastNotification(
  message: string,
  type: 'success' | 'error' | 'info' | 'warning',
  description?: string
) {
  switch (type) {
    case 'success':
      toast.success(message, {
        description,
      });
      break;
    case 'error':
      toast.error(message, {
        description,
      });
      break;
    case 'info':
      toast(message, {
        description,
      });
      break;
    case 'warning':
      toast.warning(message, {
        description,
      });
      break;
    default:
      toast(message, {
        description,
      });
  }
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function zodToFormikValidate<T>(schema: ZodSchema<T>) {
  return (values: unknown) => {
    const result = schema.safeParse(values);
    if (result.success) return {};
    const errors: Record<string, string> = {};
    for (const issue of result.error.issues) {
      const path = issue.path[0];
      if (typeof path === 'string') {
        errors[path] = issue.message;
      }
    }
    return errors;
  };
}
