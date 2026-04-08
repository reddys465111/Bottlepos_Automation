import { test, expect } from '@playwright/test';
import { ApiTestContext } from '../../../src/API/apiTestContext';
import { EndPoint } from '../../../src/API/utils/endPoints';

/** EntityInventory in code is empty; backend may accept {} or require fields per env. */
const inventoryAddPayload = {};

test.describe('API – Inventory (stock)', { tag: ['@api', '@admin', '@inventory'] }, () => {
  test.beforeAll(async () => {
    await ApiTestContext.init();
  });

  test('[API] POST /api/stock/add – Inventory add returns 200', { tag: ['@add'] }, async ({
    request,
  }) => {
    const response = await ApiTestContext.POST(
      request,
      EndPoint.Inventory.Add,
      inventoryAddPayload
    );
    expect(response.status(), 'Inventory add should return 200').toBe(200);
  });
});
