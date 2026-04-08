import type { APIRequestContext } from '@playwright/test';
import { Initializer, Session } from '../utils';
import { Authenticate } from './useCases/auth/useCase.Auth';
import type { IAuthResponse } from './useCases/auth/interface.auth';
import { EncodeData } from './utils/APIHelper';
import { EndPoint } from './utils/endPoints';

export interface ApiTestContextInitOptions {
  baseUrl?: string;
  credentials?: { user?: string; password?: string };
  environment?: string;
}

export interface ApiTestContextLoginOptions {
  user?: string;
  password?: string;
}

/** Trim .env values and strip trailing slashes so Session.URL + '/api/auth' is valid. */
function normalizeBaseUrl(url: string): string {
  const t = url.trim();
  return t.replace(/\/+$/, '') || t;
}

export class ApiTestContext {
  static async init(options?: ApiTestContextInitOptions): Promise<void> {
    const raw =
      options?.baseUrl ??
      process.env.API_URL ??
      process.env.POS_URL ??
      'http://localhost:8000';
    const baseUrl = normalizeBaseUrl(raw);
    await Initializer.InitData({
      Environment: options?.environment ?? 'AUTO',
      URL: baseUrl,
      API: { URL: baseUrl },
      credentials: options?.credentials
        ? { User: options.credentials.user, Password: options.credentials.password }
        : undefined,
    });
  }

  static async login(credentials?: ApiTestContextLoginOptions): Promise<IAuthResponse> {
    return Authenticate(credentials);
  }

  static async getLoginResponse(request: APIRequestContext): Promise<Awaited<ReturnType<APIRequestContext['post']>>> {
    const url = Session.URL + EndPoint.AUTH;
    return request.post(url, {
      data: EncodeData({ username: Session.User, password: Session.API.PSW }),
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });
  }

  static async getSessionCookie(request: APIRequestContext): Promise<string> {
    const res = await ApiTestContext.getLoginResponse(request);
    if (res.status() !== 200) {
      const loginUrl = Session.URL + EndPoint.AUTH;
      throw new Error(
        `Login failed with status ${res.status()} for POST ${loginUrl}. ` +
          `404 usually means API_URL/POS_URL points at the wrong host/port or the app is not running — ` +
          `the BottlePOS backend must serve ${EndPoint.AUTH} at that base URL.`
      );
    }
    const setCookie = res.headers()['set-cookie'];
    const sessionCookie = Array.isArray(setCookie) ? setCookie[0] : setCookie;
    return sessionCookie?.split(';')[0] ?? '';
  }

  static async logout(
    request: APIRequestContext,
    sessionCookie: string
  ): Promise<Awaited<ReturnType<APIRequestContext['post']>>> {
    return request.post(Session.URL + EndPoint.LogOut, {
      data: EncodeData({ end_date: Date.now() }),
      headers: { 'Content-Type': 'application/x-www-form-urlencoded', Cookie: sessionCookie },
    });
  }

  static async POST(
    request: APIRequestContext,
    pathOrUrl: string,
    payload: object
  ): Promise<Awaited<ReturnType<APIRequestContext['post']>>> {
    const sessionCookie = await ApiTestContext.getSessionCookie(request);
    const url = pathOrUrl.startsWith('http') ? pathOrUrl : Session.URL + pathOrUrl;
    return request.post(url, {
      data: EncodeData(payload),
      headers: { 'Content-Type': 'application/x-www-form-urlencoded', Cookie: sessionCookie },
    });
  }

  /** Authenticated GET (e.g. AdminConfig). pathOrUrl: path or full URL. */
  static async GET(
    request: APIRequestContext,
    pathOrUrl: string
  ): Promise<Awaited<ReturnType<APIRequestContext['get']>>> {
    const sessionCookie = await ApiTestContext.getSessionCookie(request);
    const url = pathOrUrl.startsWith('http') ? pathOrUrl : Session.URL + pathOrUrl;
    return request.get(url, { headers: { Cookie: sessionCookie } });
  }

  /** Authenticated POST with raw body string (e.g. draw=1&search%5Bvalue%5D= for get/server). */
  static async postWithBody(
    request: APIRequestContext,
    pathOrUrl: string,
    body: string
  ): Promise<Awaited<ReturnType<APIRequestContext['post']>>> {
    const sessionCookie = await ApiTestContext.getSessionCookie(request);
    const url = pathOrUrl.startsWith('http') ? pathOrUrl : Session.URL + pathOrUrl;
    return request.post(url, {
      data: body,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded', Cookie: sessionCookie },
    });
  }

  static url(pathOrUrl: string): string {
    return pathOrUrl.startsWith('http') ? pathOrUrl : Session.URL + pathOrUrl;
  }

  /** GET without session cookie (negative / auth tests). */
  static async getWithoutAuth(
    request: APIRequestContext,
    pathOrUrl: string
  ): Promise<Awaited<ReturnType<APIRequestContext['get']>>> {
    return request.get(ApiTestContext.url(pathOrUrl));
  }

  /** POST without session cookie (negative / auth tests). */
  static async postWithoutAuth(
    request: APIRequestContext,
    pathOrUrl: string,
    payload: object
  ): Promise<Awaited<ReturnType<APIRequestContext['post']>>> {
    return request.post(ApiTestContext.url(pathOrUrl), {
      data: EncodeData(payload),
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });
  }

  /** POST raw body without session cookie. */
  static async postWithBodyWithoutAuth(
    request: APIRequestContext,
    pathOrUrl: string,
    body: string
  ): Promise<Awaited<ReturnType<APIRequestContext['post']>>> {
    return request.post(ApiTestContext.url(pathOrUrl), {
      data: body,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });
  }
}
