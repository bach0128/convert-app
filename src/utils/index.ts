/* eslint-disable @typescript-eslint/no-unused-expressions */
// import { MESSAGE_CONTENT } from "@/enum/Notification.ts";
// import { sha256 } from "js-sha256";
// import { md5 } from "js-md5";
// import { KEY_STORAGE } from "@/enum/KeyStorage";

export function classNames(...classes: unknown[]): string {
  return classes.filter(Boolean).join(" ");
}

// export const saveToStorages = (
//   key_storage: string,
//   value: string,
//   saveToLocal?: boolean
// ) => {
//   if (saveToLocal) localStorage.setItem(key_storage, value);
//   else sessionStorage.setItem(key_storage, value);
// };

// export const saveToken = (key_storage: string, value: string) => {
//   if (isRememberMe()) localStorage.setItem(key_storage, value);
//   else sessionStorage.setItem(key_storage, value);
// };

// export const removeFromStorages = (key_storages: string[]) => {
//   key_storages.forEach((key_storage) => {
//     localStorage.removeItem(key_storage);
//     sessionStorage.removeItem(key_storage);
//   });
// };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
// export const getErrorMessage = (error: any): string => {
//   return (
//     error?.response?.data?.error_description ??
//     error?.response?.data?.message ??
//     error?.response?.data?.msg ??
//     error?.msg ??
//     MESSAGE_CONTENT.DEFAULT_ERROR
//   );
// };

// export const isRememberMe = () =>
//   localStorage.getItem(KEY_STORAGE.REMEMBER_ME) === "true";

// export const getRefreshToken = () =>
//   isRememberMe()
//     ? localStorage.getItem(KEY_STORAGE.REFRESH_TOKEN)
//     : sessionStorage.getItem(KEY_STORAGE.REFRESH_TOKEN);

// export const getAccessToken = () =>
//   isRememberMe()
//     ? localStorage.getItem(KEY_STORAGE.ACCESS_TOKEN)
//     : sessionStorage.getItem(KEY_STORAGE.ACCESS_TOKEN);
