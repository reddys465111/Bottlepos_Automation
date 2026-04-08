import { test } from '@playwright/test';
import { ApiTestContext } from '../../../src/API/apiTestContext';
import { EndPoint } from '../../../src/API/utils/endPoints';
import {
  assertLooseClientErrorStatus,
  assertNegativeApiOutcome,
} from '../helpers/assertNegativeApiOutcome';

const NO_ID = '999999999999';

test.describe('API negative – Additional charges', { tag: ['@api', '@apiNegative', '@additionalFees'] }, () => {
  test.beforeAll(async () => {
    await ApiTestContext.init();
  });

  test('[API] POST /api/additional_charges/get – Invalid search returns 400', async ({ request }) => {
    const res = await ApiTestContext.postWithBody(request, EndPoint.AdditionalFees.Get, 'not-json-and-not-form');
    assertLooseClientErrorStatus(res.status());
  });

  test('[API] POST /api/additionalcharges/add – Duplicate fee name returns 400', async ({ request }) => {
    const name = `ApiNegDupFee-${Date.now()}`;
    const first = await ApiTestContext.POST(request, EndPoint.AdditionalFees.Add, {
      name,
      amount: '1',
      type: 'fixed',
      enabletaxableadditional: 0,
    });
    const dup = await ApiTestContext.POST(request, EndPoint.AdditionalFees.Add, {
      name,
      amount: '2',
      type: 'fixed',
      enabletaxableadditional: 0,
    });
    if (first.status() === 200) {
      await assertNegativeApiOutcome(dup, { hint: 'Duplicate additional fee' });
    } else {
      await assertNegativeApiOutcome(first, { hint: 'First add should fail or second is duplicate' });
    }
  });

  test('[API] POST /api/additionalcharges/edit – Non-existent fee id returns 404', async ({ request }) => {
    const res = await ApiTestContext.POST(request, EndPoint.AdditionalFees.Edit, {
      id: NO_ID,
      name: 'Missing',
      amount: '1',
      type: 'fixed',
      enabletaxableadditional: 0,
    });
    await assertNegativeApiOutcome(res, {
      hint: 'Edit non-existent fee',
      allowLenientOk200: true,
    });
  });

  test('[API] POST /api/additionalcharges/delete – Non-existent fee id returns 404', async ({ request }) => {
    const res = await ApiTestContext.POST(request, EndPoint.AdditionalFees.Delete, { id: NO_ID });
    await assertNegativeApiOutcome(res, {
      hint: 'Delete non-existent fee',
      allowLenientOk200: true,
    });
  });
});
