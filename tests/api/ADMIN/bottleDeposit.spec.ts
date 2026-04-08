import { test, expect } from '@playwright/test';
import { ApiTestContext } from '../../../src/API/apiTestContext';
import { EndPoint } from '../../../src/API/utils/endPoints';

test.describe('API – ADMIN BottleDeposit (itemdeposit)', { tag: ['@api', '@admin', '@bottleDeposit'] }, () => {
  test.beforeAll(async () => {
    await ApiTestContext.init();
  });

  test('[API] POST /api/itemdeposit/add – BottleDeposit add returns 200', async ({ request }) => {
    const response = await ApiTestContext.POST(request, EndPoint.BottleDeposit.Add, {
      name: 'API Test Deposit',
      amount: '0.05',
    });
    expect(response.status()).toBe(200);
  });

  test('[API] POST /api/itemdeposit/edit – BottleDeposit edit returns 200', async ({ request }) => {
    const response = await ApiTestContext.POST(request, EndPoint.BottleDeposit.Edit, {
      id: '1',
      name: 'API Test Deposit',
      amount: '0.10',
    });
    expect(response.status()).toBe(200);
  });

  test('[API] POST /api/itemdeposit/server – BottleDeposit get returns 200', async ({ request }) => {
    const response = await ApiTestContext.postWithBody(
      request,
      EndPoint.BottleDeposit.Get,
      'draw=1&search%5Bvalue%5D='
    );
    expect(response.status()).toBe(200);
  });

  test('[API] GET /api/itemdeposit/server – BottleDeposit get returns 200', async ({ request }) => {
    const response = await ApiTestContext.GET(request, EndPoint.BottleDeposit.Get + '?draw=1&search%5Bvalue%5D=');
    expect(response.status()).toBe(200);
  });

  test('[API] POST /api/itemdeposit/delete – BottleDeposit delete returns 200', {
    tag: ['@delete'],
  }, async ({ request }) => {
    const response = await ApiTestContext.POST(request, EndPoint.BottleDeposit.delete, {
      id: '1',
    });
    expect(response.status(), 'BottleDeposit delete should return 200').toBe(200);
  });
});
