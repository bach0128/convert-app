/* eslint-disable no-undef */
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

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

export class StorageManager {
  private static getStorage(type: StorageTypeString): Storage {
    return type === StorageType.LOCAL ? localStorage : sessionStorage;
  }

  static set(
    key: string,
    value: string,
    type: StorageTypeString = StorageType.SESSION
  ): void {
    this.getStorage(type).setItem(key, value);
  }

  static get(
    key: string,
    type: StorageTypeString = StorageType.SESSION
  ): string | null {
    return this.getStorage(type).getItem(key);
  }

  static remove(
    key: string,
    type: StorageTypeString = StorageType.SESSION
  ): void {
    this.getStorage(type).removeItem(key);
  }

  static clear(type: StorageTypeString = StorageType.SESSION): void {
    this.getStorage(type).clear();
  }

  static removeFromBoth(keys: string[]): void {
    keys.forEach((key) => {
      this.remove(key, StorageType.LOCAL);
      this.remove(key, StorageType.SESSION);
    });
  }
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
