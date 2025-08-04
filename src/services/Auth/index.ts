import type {
  EmailPasswordAuthentication,
  UserCredential,
  ResendOTPParams,
  AuthResponse,
  AccountRecoveryRequest,
} from '@/types/auth';
import { axiosAPIBaseConfig } from '@/api';
import { AUTH_ENDPOINTS } from '@/api/endPoints';

/**
 * Authentication service for Supabase operations
 */
export class AuthService {
  /**
   * Login user with email and password
   */
  static async login(
    credentials: EmailPasswordAuthentication
  ): Promise<UserCredential> {
    const response = await axiosAPIBaseConfig.post<UserCredential>(
      AUTH_ENDPOINTS.LOGIN,
      credentials
    );
    return response.data;
  }

  /**
   * Logout current user
   */
  static async logout(): Promise<AuthResponse> {
    const response = await axiosAPIBaseConfig.post<AuthResponse>(
      AUTH_ENDPOINTS.LOGOUT
    );
    return response.data;
  }

  /**
   * Refresh authentication token
   */
  static async refreshToken(refreshToken: string): Promise<UserCredential> {
    const response = await axiosAPIBaseConfig.post<UserCredential>(
      AUTH_ENDPOINTS.REFRESH_TOKEN,
      {
        refresh_token: refreshToken,
      }
    );
    return response.data;
  }

  /**
   * Send password recovery email
   */
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

  /**
   * Update user password with token
   */
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

  /**
   * Resend OTP for verification
   */
  static async resendOTP(params: ResendOTPParams): Promise<AuthResponse> {
    const response = await axiosAPIBaseConfig.post<AuthResponse>(
      AUTH_ENDPOINTS.OTP,
      params
    );
    return response.data;
  }

  /**
   * Get password reset URL based on current location
   */
  private static getPasswordResetUrl(): string {
    if (typeof window === 'undefined') {
      return '/reset-password'; // Fallback for SSR
    }
    return `${window.location.protocol}//${window.location.host}/reset-password`;
  }
}
