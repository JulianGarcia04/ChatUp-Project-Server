import type { HandleCookies } from 'common/application/services';
import { type Request, request, response, type Response } from 'express';

class HandleCookiesImplementation implements HandleCookies {
  request: Request = request;
  response: Response = response;

  setCookie(key: string, value: unknown, expire: Date): void {
    this.response.cookie(key, value, { expires: expire });
  }

  getCookie(key: string): unknown {
    const cookie = this.request.cookies[key];
    return cookie;
  }

  deleteCookie(key: string): void {
    throw new Error();
  }
}

export default HandleCookiesImplementation;
