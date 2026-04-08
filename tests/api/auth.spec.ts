import { test, expect } from '@playwright/test';
import { ApiTestContext } from '../../src/API/apiTestContext';

/**
 * API tests: no browser, only HTTP requests.
 * init() sets Session (base URL + credentials) so getLoginResponse / getSessionCookie / logout work.
 * Use login() in beforeAll only if tests call use cases that need the shared session cookie (e.g. Device_Get).
 *
 */

test.describe('API – Auth', { tag: ['@api', '@auth'] }, () => {
  test.beforeAll(async () => {
    await ApiTestContext.init();
  });

  test('[API] POST /api/auth – Valid login returns 200 and token', { tag: ['@login'] }, async ({
    request,
  }) => {
    const response = await ApiTestContext.getLoginResponse(request);

    expect(response.status()).toBe(200);

    const json = await response.json();
    expect(json.error).toBe('OK');
    expect(json.errorCode).toBe('OK');
    expect(json.data).toBeDefined();

    const hasTokenInBody =
      json.data.token != null || json.data.auth_hash != null;
    const hasSessionCookie = response.headers()['set-cookie'] != null;
    expect(
      hasTokenInBody || hasSessionCookie,
      'Response should include session via data.token/auth_hash or Set-Cookie'
    ).toBeTruthy();
  });

  test('[API] POST /api/logout – Valid logout returns 200', { tag: ['@logout'] }, async ({
    request,
  }) => {
    const sessionCookie = await ApiTestContext.getSessionCookie(request);
    const logoutRes = await ApiTestContext.logout(request, sessionCookie);
    expect(logoutRes.status()).toBe(200);
  });


});
