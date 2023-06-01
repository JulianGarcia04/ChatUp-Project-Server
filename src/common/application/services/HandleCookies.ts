export interface HandleCookies {
  setCookie(key: string, value: unknown, expire: Date): void;
  getCookie(key: string): unknown;
  deleteCookie(key: string): void;
}
