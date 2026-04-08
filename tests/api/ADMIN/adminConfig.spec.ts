import { test, expect } from '@playwright/test';
import { ApiTestContext } from '../../../src/API/apiTestContext';
import { EndPoint } from '../../../src/API/utils/endPoints';

test.describe('API – ADMIN AdminConfig', { tag: ['@api', '@admin', '@adminConfig'] }, () => {
  test.beforeAll(async () => {
    await ApiTestContext.init();
  });

  test('[API] GET /api/adminconfig/get – AdminConfig get returns 200', async ({ request }) => {
    const response = await ApiTestContext.GET(request, EndPoint.AdminConfig.Get);
    expect(response.status()).toBe(200);
  });
});
