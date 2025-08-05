// Centralized exports
export { AuthService } from './Auth';

// Re-export types for convenience
export type {
  EmailPasswordAuthentication,
  UserSignUp,
  UserCredential,
  ResendOTPParams,
  AuthResponse,
  PasswordChangeRequest,
  AccountRecoveryRequest,
  AvatarUploadResponse,
} from '@/types/dto/auth';
