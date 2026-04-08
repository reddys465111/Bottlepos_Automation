import { test, expect } from '@playwright/test';
import { ApiTestContext } from '../../../src/API/apiTestContext';
import { EndPoint } from '../../../src/API/utils/endPoints';
import { paxPayload } from '../../../src/utils/data/data.paxPayload';

/**
 * POST /api/sales/add – uses a captured sale-shaped payload (PAX demo).
 * May need env-specific ids (tax, device, location); adjust if backend returns non-200.
 */
test.describe('API – Sales', { tag: ['@api', '@sales'] }, () => {
  test.beforeAll(async () => {
    await ApiTestContext.init();
  });

  test('[API] POST /api/sales/add – Sales add returns 200', { tag: ['@add'] }, async ({
    request,
  }) => {
    const response = await ApiTestContext.POST(
      request,
      EndPoint.Sales.Add,
      paxPayload as unknown as Record<string, unknown>
    );
    expect(response.status(), 'Sales add should return 200').toBe(200);
  });
});
