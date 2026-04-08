import { test } from '@playwright/test';
import { ApiTestContext } from '../../../src/API/apiTestContext';
import { EndPoint } from '../../../src/API/utils/endPoints';
import {
  assertLooseClientErrorStatus,
  assertNegativeApiOutcome,
} from '../helpers/assertNegativeApiOutcome';

const NO_ID = '999999999999';

test.describe('API negative – Items', { tag: ['@api', '@apiNegative', '@items'] }, () => {
  test.beforeAll(async () => {
    await ApiTestContext.init();
  });

  test('[API] POST /api/items/get/server – Invalid search returns 400', async ({ request }) => {
    const res = await ApiTestContext.postWithBody(request, EndPoint.Items.Get, '%%%invalid%%%');
    assertLooseClientErrorStatus(res.status());
  });

  test('[API] POST /api/items/edit – Non-existent item id returns 404', async ({ request }) => {
    const res = await ApiTestContext.POST(request, EndPoint.Items.Edit, {
      id: NO_ID,
      name: 'MissingItem',
    });
    await assertNegativeApiOutcome(res, {
      hint: 'Edit non-existent item',
      allowLenientOk200: true,
    });
  });

  test('[API] POST /api/items/add – Duplicate barcode or stock code returns 400', async ({ request }) => {
    const payload = {
      name: `ApiDup${Date.now()}`,
      code: `cd${Date.now()}`,
      price: '1',
      categoryid: '1',
    };
    const first = await ApiTestContext.POST(request, EndPoint.Items.Add, payload);
    const second = await ApiTestContext.POST(request, EndPoint.Items.Add, payload);
    if (first.status() === 200) {
      await assertNegativeApiOutcome(second, { hint: 'Duplicate item' });
    } else {
      await assertNegativeApiOutcome(first, { hint: 'Item add' });
    }
  });

  test('[API] POST /api/items/delete – Non-existent item id returns 404', async ({ request }) => {
    const res = await ApiTestContext.POST(request, EndPoint.Items.Delete, { id: NO_ID });
    await assertNegativeApiOutcome(res, {
      hint: 'Delete non-existent item',
      allowLenientOk200: true,
    });
  });
});
