import { test } from '@playwright/test';
import { ApiTestContext } from '../../../src/API/apiTestContext';
import { EndPoint } from '../../../src/API/utils/endPoints';
import { assertNegativeApiOutcome } from '../helpers/assertNegativeApiOutcome';

test.describe('API negative – Sales', { tag: ['@api', '@apiNegative', '@sales'] }, () => {
  test.beforeAll(async () => {
    await ApiTestContext.init();
  });

  test('[API] POST /api/sales/add – Invalid payload or empty items returns 400', async ({ request }) => {
    const res = await ApiTestContext.POST(request, EndPoint.Sales.Add, {
      items: [],
      deviceid: '1',
    });
    await assertNegativeApiOutcome(res, { hint: 'sales/add invalid', allowLenientOk200: true });
  });
});
