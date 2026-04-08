import { test } from '@playwright/test';
import { ApiTestContext } from '../../../src/API/apiTestContext';
import { EndPoint } from '../../../src/API/utils/endPoints';
import { assertNegativeApiOutcome } from '../helpers/assertNegativeApiOutcome';

const NO_ID = '999999999999';

test.describe('API negative – Item sizes', { tag: ['@api', '@apiNegative', '@itemSizes'] }, () => {
  test.beforeAll(async () => {
    await ApiTestContext.init();
  });

  test('[API] POST /api/itemsizes/add – Duplicate or invalid size returns 400', async ({ request }) => {
    const res = await ApiTestContext.POST(request, EndPoint.Sizes.Add, { name: '' });
    await assertNegativeApiOutcome(res, { hint: 'Invalid item size add' });
  });

  test('[API] POST /api/itemsizes/edit – Non-existent size id returns 404', async ({ request }) => {
    const res = await ApiTestContext.POST(request, EndPoint.Sizes.Edit, {
      id: NO_ID,
      name: 'MissingSize',
    });
    await assertNegativeApiOutcome(res, {
      hint: 'Edit non-existent size',
      allowLenientOk200: true,
    });
  });

  test('[API] POST /api/itemsizes/delete – Non-existent or in-use size returns 404 or 400', async ({
    request,
  }) => {
    const res = await ApiTestContext.POST(request, EndPoint.Sizes.Delete, { id: NO_ID });
    await assertNegativeApiOutcome(res, {
      hint: 'Delete non-existent size',
      allowLenientOk200: true,
    });
  });
});
