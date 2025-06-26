export const KEY_LOCAL_STORAGE = {
  REMEMBER_ME: 'remember_me',
  REFRESH_TOKEN: 'refresh_token',
  ACCESS_TOKEN: 'access_token',
  USER_PREFERENCES: 'user_preferences',
} as const

export type KEY_LOCAL_STORAGE =
  (typeof KEY_LOCAL_STORAGE)[keyof typeof KEY_LOCAL_STORAGE]
