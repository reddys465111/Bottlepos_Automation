import { test, expect } from '@playwright/test';
import { ApiTestContext } from '../../../src/API/apiTestContext';
import { EndPoint } from '../../../src/API/utils/endPoints';

test.describe('API – ADMIN TaxItem', { tag: ['@api', '@admin', '@taxItems'] }, () => {
  test.beforeAll(async () => {
    await ApiTestContext.init();
  });

  test('[API] POST /api/tax/items/add – TaxItem add returns 200', async ({ request }) => {
    const response = await ApiTestContext.POST(request, EndPoint.TaxItem.Add, {
      name: 'API Test Tax',
      value: '1',
      altname: '',
      type: 'vat',
    });
    expect(response.status()).toBe(200);
  });

  test('[API] POST /api/tax/items/edit – TaxItem edit returns 200', async ({ request }) => {
    const response = await ApiTestContext.POST(request, EndPoint.TaxItem.Edit, {
      id: '1',
      name: 'API Test Tax',
      value: '2',
      altname: '',
      type: 'vat',
    });
    expect(response.status()).toBe(200);
  });

  test('[API] POST /api/tax/items/delete – TaxItem delete returns 200', async ({ request }) => {
    const response = await ApiTestContext.POST(request, EndPoint.TaxItem.Delete, { id: '1' });
    expect(response.status()).toBe(200);
  });
});
