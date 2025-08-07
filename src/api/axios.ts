import type { AxiosError } from 'axios';
import axios, {
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from 'axios';
import { KEY_LOCAL_STORAGE } from '@/enum/Storage';
import {
  getRefreshToken,
  isRememberMe,
  removeFromStorages,
  saveToken,
  // saveToken,
} from '@/lib/utils';
import { ROUTE_PATH } from '@/enum/route-path';
import { AuthService } from '@/services/Auth';
// ----------------------------------------------------------------

const createAxiosInstance = (baseURL: string) => {
  return axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

// axios interceptors for API Base
const createAxiosInterceptorsApiBase = (
  axiosInstance: ReturnType<typeof axios.create>
) => {
  // request
  const requestInterceptor = (config: InternalAxiosRequestConfig) => {
    if (!config.headers.Authorization) {
      const token = isRememberMe()
        ? localStorage.getItem(KEY_LOCAL_STORAGE.ACCESS_TOKEN)
        : sessionStorage.getItem(KEY_LOCAL_STORAGE.ACCESS_TOKEN);
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  };

  const responseErrorInterceptor = async (
    error: AxiosError<{
      message: string | undefined;
      data: unknown;
    }>
  ) => {
    if (![401].includes(error.response?.status || 0)) {
      return Promise.reject(error);
    }

    const refreshToken = getRefreshToken();

    if (!refreshToken) {
      removeFromStorages([
        KEY_LOCAL_STORAGE.ACCESS_TOKEN,
        KEY_LOCAL_STORAGE.REFRESH_TOKEN,
      ]);
      if (!window.location.href.includes('signin'))
        window.location.href = `${ROUTE_PATH.SIGNIN}`;
      return Promise.reject(error);
    }

    try {
      const res: { access_token: string } =
        await AuthService.refreshToken(refreshToken);
      const initialRequest = error.config;
      if (!initialRequest) throw new Error('Initial request is undefined');
      saveToken(KEY_LOCAL_STORAGE.ACCESS_TOKEN, res.access_token);
      initialRequest.headers.Authorization = `Bearer ${res.access_token}`;
      return axiosInstance.request(initialRequest);
    } catch (refreshTokenError) {
      removeFromStorages([
        KEY_LOCAL_STORAGE.ACCESS_TOKEN,
        KEY_LOCAL_STORAGE.REFRESH_TOKEN,
      ]);
      window.location.href = `${ROUTE_PATH.SIGNIN}`;
      return Promise.reject(refreshTokenError);
    }
  };

  // no-error
  const responseInterceptor = (response: AxiosResponse) => {
    return response;
  };

  axiosInstance.interceptors.request.use(requestInterceptor);
  axiosInstance.interceptors.response.use(
    responseInterceptor,
    responseErrorInterceptor
  );
};

const axiosAPIBaseConfig = createAxiosInstance(
  import.meta.env.VITE_API_BASE_URL || ''
);

createAxiosInterceptorsApiBase(axiosAPIBaseConfig);

export { axiosAPIBaseConfig };

// ----------------------------------------------------------------
