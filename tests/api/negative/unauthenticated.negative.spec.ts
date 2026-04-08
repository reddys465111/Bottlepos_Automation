import { test } from '@playwright/test';
import { ApiTestContext } from '../../../src/API/apiTestContext';
import { EndPoint } from '../../../src/API/utils/endPoints';
import { assertUnauthenticatedDenied } from '../helpers/assertNegativeApiOutcome';

test.describe('API negative – unauthenticated', { tag: ['@api', '@apiNegative', '@auth'] }, () => {
  test.beforeAll(async () => {
    await ApiTestContext.init();
  });

  test('[API] GET /api/adminconfig/get – No auth is denied', async ({ request }) => {
    const res = await ApiTestContext.getWithoutAuth(request, EndPoint.AdminConfig.Get);
    await assertUnauthenticatedDenied(res, { hint: 'adminconfig/get without auth' });
  });

  test('[API] GET /api/itemdeposit/server – No auth is denied', async ({ request }) => {
    const res = await ApiTestContext.getWithoutAuth(
      request,
      EndPoint.BottleDeposit.Get + '?draw=1&search%5Bvalue%5D='
    );
    await assertUnauthenticatedDenied(res, { hint: 'itemdeposit/server without auth' });
  });

  test('[API] POST /api/itemsizes/get – No auth is denied', async ({ request }) => {
    const res = await ApiTestContext.postWithoutAuth(request, EndPoint.Sizes.Get, {});
    await assertUnauthenticatedDenied(res, { hint: 'itemsizes/get without auth' });
  });
});
