import { test, expect } from '@playwright/test';
import { ApiTestContext } from '../../../src/API/apiTestContext';
import { EndPoint } from '../../../src/API/utils/endPoints';

test.describe('API – ADMIN Locations', { tag: ['@api', '@admin', '@locations'] }, () => {
  test.beforeAll(async () => {
    await ApiTestContext.init();
  });

  test('[API] POST /api/locations/get/server – Locations get returns 200', async ({ request }) => {
    const response = await ApiTestContext.postWithBody(
      request,
      EndPoint.Locations.Get,
      'draw=1&search%5Bvalue%5D='
    );
    expect(response.status()).toBe(200);
  });

  test('[API] POST /api/locations/edit – Locations edit returns 200', async ({ request }) => {
    const response = await ApiTestContext.POST(request, EndPoint.Locations.Edit, {
      id: '1',
      name: 'Test Location',
      dt: new Date().toISOString().slice(0, 10),
      disabled: '0',
    });
    expect(response.status()).toBe(200);
  });

  test('[API] POST /api/locations/delete – Locations delete returns 200', async ({ request }) => {
    const response = await ApiTestContext.POST(request, EndPoint.Locations.Delete, {
      id: '1',
      name: 'Test Location',
      dt: new Date().toISOString().slice(0, 10),
      disabled: '0',
    });
    expect(response.status()).toBe(200);
  });
});
