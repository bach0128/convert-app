import type {
  UserSignUp,
  AuthResponse,
  PasswordChangeRequest,
} from '@/types/auth';
import { axiosAPIBaseConfig } from '@/api';
import { AUTH_ENDPOINTS } from '@/api/Endpoints';

/**
 * User management service for server operations
 */
export class UserService {
  /**
   * Register new user
   */
  static async signUp(userData: UserSignUp): Promise<AuthResponse> {
    const response = await axiosAPIBaseConfig.post<AuthResponse>(
      AUTH_ENDPOINTS.SIGNUP,
      userData
    );
    return response.data;
  }

  /**
   * Change user password
   */
  static async changePassword(
    currentPassword: string,
    newPassword: string
  ): Promise<AuthResponse> {
    const request: PasswordChangeRequest = {
      current_password: currentPassword,
      new_password: newPassword,
    };

    const response = await axiosAPIBaseConfig.put<AuthResponse>(
      AUTH_ENDPOINTS.CHANGE_PASSWORD,
      request
    );
    return response.data;
  }
}
