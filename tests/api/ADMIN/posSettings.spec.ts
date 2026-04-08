import { test, expect } from '@playwright/test';
import { ApiTestContext } from '../../../src/API/apiTestContext';
import { EndPoint } from '../../../src/API/utils/endPoints';
import { POSSettingsDefaultPayload } from '../../../src/API/useCases/ADMIN/settings/posSettings/data/data.POSSettingsDefaultPayload';

test.describe('API – POS (settings/pos)', { tag: ['@api', '@pos', '@posSettings'] }, () => {
  test.beforeAll(async () => {
    await ApiTestContext.init();
  });

  test('[API] GET /api/settings/pos/get – POSSettings get returns 200', { tag: ['@get'] }, async ({
    request,
  }) => {
    const response = await ApiTestContext.GET(request, EndPoint.POSSettings.Get);
    expect(response.status(), 'POSSettings get should return 200').toBe(200);
  });

  test('[API] POST /api/settings/pos/set – POSSettings edit returns 200', { tag: ['@edit'] }, async ({
    request,
  }) => {
    const response = await ApiTestContext.POST(
      request,
      EndPoint.POSSettings.Edit,
      POSSettingsDefaultPayload
    );
    expect(response.status(), 'POSSettings edit should return 200').toBe(200);
  });
});
