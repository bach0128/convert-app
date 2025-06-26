// Centralized exports
export { AuthService } from './Auth'
export { UserService } from './User'
// export { AvatarService } from "./avatar.service";

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
} from '@/types/auth'
