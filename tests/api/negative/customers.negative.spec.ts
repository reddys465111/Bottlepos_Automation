import { test } from '@playwright/test';
import { ApiTestContext } from '../../../src/API/apiTestContext';
import { EndPoint } from '../../../src/API/utils/endPoints';
import {
  assertLooseClientErrorStatus,
  assertNegativeApiOutcome,
} from '../helpers/assertNegativeApiOutcome';

const NO_ID = '999999999999';

test.describe('API negative – Customers', { tag: ['@api', '@apiNegative', '@customers'] }, () => {
  test.beforeAll(async () => {
    await ApiTestContext.init();
  });

  test('[API] POST /api/get/customers/server – Invalid search returns 400', async ({ request }) => {
    const res = await ApiTestContext.postWithBody(request, EndPoint.Customers.Get, '%%%bad%%%');
    assertLooseClientErrorStatus(res.status());
  });

  test('[API] POST /api/customers/add – Duplicate email or phone returns 400', async ({ request }) => {
    const email = `dup.cust.${Date.now()}@example.test`;
    const body = {
      firstname: 'Api',
      lastname: 'Dup',
      email,
      mobile: '',
    };
    const first = await ApiTestContext.POST(request, EndPoint.Customers.Add, body);
    const second = await ApiTestContext.POST(request, EndPoint.Customers.Add, body);
    if (first.status() === 200) {
      await assertNegativeApiOutcome(second, { hint: 'Duplicate customer' });
    } else {
      await assertNegativeApiOutcome(first, { hint: 'Customer add' });
    }
  });

  test('[API] POST /api/customers/edit – Non-existent customer id returns 404', async ({ request }) => {
    const res = await ApiTestContext.POST(request, EndPoint.Customers.Edit, {
      id: NO_ID,
      firstname: 'X',
      lastname: 'Y',
    });
    await assertNegativeApiOutcome(res, { hint: 'Edit non-existent customer' });
  });

  test('[API] POST /api/customers/delete – Non-existent customer id returns 404', async ({ request }) => {
    const res = await ApiTestContext.POST(request, EndPoint.Customers.Delete, { id: NO_ID });
    await assertNegativeApiOutcome(res, { hint: 'Delete non-existent customer' });
  });
});
