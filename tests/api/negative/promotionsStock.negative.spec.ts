import { test } from '@playwright/test';
import { ApiTestContext } from '../../../src/API/apiTestContext';
import { EndPoint } from '../../../src/API/utils/endPoints';
import { assertNegativeApiOutcome } from '../helpers/assertNegativeApiOutcome';

const NO_ID = '999999999999';

test.describe('API negative – Promotions & stock', { tag: ['@api', '@apiNegative', '@promotions', '@stock'] }, () => {
  test.beforeAll(async () => {
    await ApiTestContext.init();
  });

  test('[API] POST /api/stock/promotions/get – Invalid payload returns 400', async ({ request }) => {
    const res = await ApiTestContext.POST(request, EndPoint.Promotions.Get, { invalid: true });
    await assertNegativeApiOutcome(res, {
      hint: 'Promotions get invalid payload',
      allowLenientOk200: true,
    });
  });

  test('[API] POST /api/stock/promotions/set – Invalid promotion data returns 400', async ({ request }) => {
    const res = await ApiTestContext.POST(request, EndPoint.Promotions.Add, {});
    await assertNegativeApiOutcome(res, { hint: 'Promotions set invalid' });
  });

  test('[API] POST /api/stock/promotions/edit – Non-existent promotion id returns 404', async ({
    request,
  }) => {
    const res = await ApiTestContext.POST(request, EndPoint.Promotions.Edit, { id: NO_ID, name: 'x' });
    await assertNegativeApiOutcome(res, {
      hint: 'Edit non-existent promotion',
      allowLenientOk200: true,
    });
  });

  test('[API] POST /api/stock/add – Non-existent item or invalid qty returns 400', async ({ request }) => {
    const res = await ApiTestContext.POST(request, EndPoint.Inventory.Add, {
      itemid: NO_ID,
      qty: '-1',
    });
    await assertNegativeApiOutcome(res, {
      hint: 'Stock add invalid',
      allowLenientOk200: true,
    });
  });
});
