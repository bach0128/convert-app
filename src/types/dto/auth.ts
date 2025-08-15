// Centralized auth types
export interface EmailPasswordAuthentication {
  email: string;
  password: string;
}

export interface UserSignUp extends EmailPasswordAuthentication {
  tax_code: string;
  name?: string;
  confirmPassword?: string;
}

export interface UserCredential {
  access_token: string;
  refresh_token: string;
  user: User;
}

export interface User {
  id: string;
  email: string;
  name?: string;
}

export interface ResendOTPParams {
  email: string;
  type?: 'signup' | 'recovery';
}

export interface AuthResponse<T = unknown> {
  data: T;
  message?: string;
}

export interface PasswordChangeRequest {
  current_password: string;
  new_password: string;
}

export interface AccountRecoveryRequest {
  email: string;
}

export interface AvatarUploadResponse {
  url: string;
  message: string;
}
