import { useState } from 'react'
import {
  AuthService,
  UserService,
  type EmailPasswordAuthentication,
  type UserSignUp,
} from '@/services'
import { getErrorMessage } from '@/lib/utils'

export function useAuth() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const login = async (credentials: EmailPasswordAuthentication) => {
    setIsLoading(true)
    setError(null)

    try {
      const result = await AuthService.login(credentials)
      return result
    } catch (err) {
      const errorMessage = getErrorMessage(err)
      setError(errorMessage)
      throw new Error(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  const signUp = async (userData: UserSignUp) => {
    setIsLoading(true)
    setError(null)

    try {
      const result = await UserService.signUp(userData)
      return result
    } catch (err) {
      const errorMessage = getErrorMessage(err)
      setError(errorMessage)
      throw new Error(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    setIsLoading(true)
    setError(null)

    try {
      await AuthService.logout()
    } catch (err) {
      const errorMessage = getErrorMessage(err)
      setError(errorMessage)
      throw new Error(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  const recoverPassword = async (email: string) => {
    setIsLoading(true)
    setError(null)

    try {
      const result = await AuthService.recoverAccount({ email })
      return result
    } catch (err) {
      const errorMessage = getErrorMessage(err)
      setError(errorMessage)
      throw new Error(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  return {
    login,
    signUp,
    logout,
    recoverPassword,
    isLoading,
    error,
    clearError: () => setError(null),
  }
}
