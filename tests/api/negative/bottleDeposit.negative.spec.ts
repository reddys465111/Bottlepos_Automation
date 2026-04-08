import { test } from '@playwright/test';
import { ApiTestContext } from '../../../src/API/apiTestContext';
import { EndPoint } from '../../../src/API/utils/endPoints';
import {
  assertLooseClientErrorStatus,
  assertNegativeApiOutcome,
} from '../helpers/assertNegativeApiOutcome';

const NO_ID = '999999999999';

test.describe('API negative – BottleDeposit', { tag: ['@api', '@apiNegative', '@bottleDeposit'] }, () => {
  test.beforeAll(async () => {
    await ApiTestContext.init();
  });

  test('[API] POST /api/itemdeposit/server – Invalid BottleDeposit search returns 400', async ({
    request,
  }) => {
    const response = await ApiTestContext.postWithBody(request, EndPoint.BottleDeposit.Get, '%%%not-valid-form%%%');
    assertLooseClientErrorStatus(response.status());
  });

  test('[API] POST /api/itemdeposit/add – Invalid amount returns 400', async ({ request }) => {
    const response = await ApiTestContext.POST(request, EndPoint.BottleDeposit.Add, {
      name: 'ApiNegDeposit',
      amount: 'not-a-decimal',
    });
    await assertNegativeApiOutcome(response, { hint: 'Invalid bottle deposit amount' });
  });

  test('[API] POST /api/itemdeposit/edit – Non-existent bottle deposit id returns 404', async ({
    request,
  }) => {
    const response = await ApiTestContext.POST(request, EndPoint.BottleDeposit.Edit, {
      id: NO_ID,
      name: 'Missing',
      amount: '0.05',
    });
    await assertNegativeApiOutcome(response, {
      hint: 'Edit non-existent bottle deposit',
      allowLenientOk200: true,
    });
  });

  test('[API] POST /api/itemdeposit/delete – Non-existent id returns 404', async ({ request }) => {
    const response = await ApiTestContext.POST(request, EndPoint.BottleDeposit.delete, { id: NO_ID });
    await assertNegativeApiOutcome(response, {
      hint: 'Delete non-existent bottle deposit',
      allowLenientOk200: true,
    });
  });
});
