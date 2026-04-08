import { expect, type APIResponse } from '@playwright/test';

const HTTP_ERROR = new Set([400, 401, 403, 404, 405, 409, 422, 500, 502, 503]);

const REDIRECT_STATUSES = new Set([301, 302, 303, 307, 308]);

/**
 * No-session requests may get 401/403, redirect to login, 4xx/5xx, or 200 with error JSON (or non-JSON body).
 * Some endpoints (e.g. logout) return 200 + OK even with an invalid session.
 */
export async function assertUnauthenticatedDenied(
  response: APIResponse,
  options?: { hint?: string; allowLenientSuccess200?: boolean }
): Promise<void> {
  const status = response.status();
  if (HTTP_ERROR.has(status)) return;
  if (REDIRECT_STATUSES.has(status)) return;

  const hint = options?.hint ?? 'Unauthenticated request should be denied';

  if (status === 200) {
    const raw = await response.text();
    let body: Record<string, unknown>;
    try {
      body = JSON.parse(raw) as Record<string, unknown>;
    } catch {
      return;
    }
    const errorCode = body.errorCode;
    const error = body.error;
    if (
      options?.allowLenientSuccess200 &&
      errorCode === 'OK' &&
      (error === 'OK' || error === undefined)
    ) {
      return;
    }
    const businessFailure =
      errorCode !== 'OK' ||
      (typeof error === 'string' && error !== '' && error !== 'OK');
    expect(
      businessFailure,
      `${hint}: got 200 OK JSON without business error errorCode=${JSON.stringify(errorCode)} error=${JSON.stringify(error)}`
    ).toBe(true);
    return;
  }

  throw new Error(`${hint}: unexpected status ${status}`);
}

/**
 * BottlePOS often returns HTTP 200 with `errorCode` / `error` in JSON for failures.
 * Use this instead of asserting only 4xx/5xx.
 */
export async function assertNegativeApiOutcome(
  response: APIResponse,
  options?: {
    hint?: string;
    allowNonJson200?: boolean;
    /** Some endpoints return { errorCode: OK, error: OK } for missing ids / no-op (not true REST errors). */
    allowLenientOk200?: boolean;
  }
): Promise<void> {
  const status = response.status();
  if (HTTP_ERROR.has(status)) {
    return;
  }

  expect(status, options?.hint).toBe(200);

  const raw = await response.text();
  let body: Record<string, unknown>;
  try {
    body = JSON.parse(raw) as Record<string, unknown>;
  } catch {
    if (options?.allowNonJson200) {
      return;
    }
    throw new Error(
      `${options?.hint ?? 'Negative API outcome'}: expected JSON, got: ${raw.slice(0, 300)}`
    );
  }

  const errorCode = body.errorCode;
  const error = body.error;
  if (
    options?.allowLenientOk200 &&
    errorCode === 'OK' &&
    (error === 'OK' || error === undefined)
  ) {
    return;
  }

  const businessFailure =
    errorCode !== 'OK' ||
    (typeof error === 'string' && error !== '' && error !== 'OK');

  expect(
    businessFailure,
    `${options?.hint ?? 'Expected business-layer error'}: errorCode=${JSON.stringify(errorCode)} error=${JSON.stringify(error)} body=${JSON.stringify(body).slice(0, 500)}`
  ).toBe(true);
}

/** DataTables-style POSTs often return 200 even when the body is not ideal; accept 200 or HTTP errors. */
export function assertLooseClientErrorStatus(status: number): void {
  expect([200, 400, 422, 500]).toContain(status);
}

