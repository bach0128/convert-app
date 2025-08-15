import type {
  EmailPasswordAuthentication,
  UserCredential,
  ResendOTPParams,
  AuthResponse,
  AccountRecoveryRequest,
  UserSignUp,
  User,
} from '@/types/dto/auth';
import { axiosAPIBaseConfig } from '@/api/axios';
import { AUTH_ENDPOINTS } from '@/enum/auth-end-points';

export class AuthService {
  static async signin(
    credentials: EmailPasswordAuthentication
  ): Promise<UserCredential> {
    const response = await axiosAPIBaseConfig.post<UserCredential>(
      AUTH_ENDPOINTS.SIGNIN,
      credentials
    );
    return response.data;
  }

  static async signup(credentials: UserSignUp): Promise<{ message: string }> {
    const response = await axiosAPIBaseConfig.post<{ message: string }>(
      AUTH_ENDPOINTS.SIGNUP,
      credentials
    );
    return response.data;
  }

  static async signout(): Promise<AuthResponse> {
    const response = await axiosAPIBaseConfig.post<AuthResponse>(
      AUTH_ENDPOINTS.SIGNOUT
    );
    return response.data;
  }

  static async refreshToken(
    refreshToken: string
  ): Promise<{ access_token: string }> {
    const response = await axiosAPIBaseConfig.post<UserCredential>(
      AUTH_ENDPOINTS.REFRESH_TOKEN,
      {
        refresh_token: refreshToken,
      }
    );
    return response.data;
  }

  static async getMe(): Promise<User> {
    const response = await axiosAPIBaseConfig.get<User>(AUTH_ENDPOINTS.GETME);
    return response.data;
  }

  static async recoverAccount(
    request: AccountRecoveryRequest
  ): Promise<AuthResponse> {
    const redirectUrl = AuthService.getPasswordResetUrl();

    const response = await axiosAPIBaseConfig.post<AuthResponse>(
      AUTH_ENDPOINTS.RECOVER,
      request,
      {
        params: { redirect_to: redirectUrl },
      }
    );
    return response.data;
  }

  static async updatePassword(
    credentials: EmailPasswordAuthentication,
    token: string
  ): Promise<AuthResponse> {
    const response = await axiosAPIBaseConfig.put<AuthResponse>(
      AUTH_ENDPOINTS.CREDENTIALS,
      credentials,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  }

  static async resendOTP(params: ResendOTPParams): Promise<AuthResponse> {
    const response = await axiosAPIBaseConfig.post<AuthResponse>(
      AUTH_ENDPOINTS.OTP,
      params
    );
    return response.data;
  }

  private static getPasswordResetUrl(): string {
    if (typeof window === 'undefined') {
      return '/reset-password'; // Fallback for SSR
    }
    return `${window.location.protocol}//${window.location.host}/reset-password`;
  }
}
