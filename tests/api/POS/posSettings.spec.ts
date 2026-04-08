import { test, expect } from '@playwright/test';
import { ApiTestContext } from '../../../src/API/apiTestContext';
import { EndPoint } from '../../../src/API/utils/endPoints';
import { generalSettingsDefaultPayload } from '../../../src/API/useCases/POS/Settings/data/data.GeneralSettingsDefaultPayload';

test.describe('API – POS Settings (lconfig)', { tag: ['@api', '@posSettings'] }, () => {
  test.beforeAll(async () => {
    await ApiTestContext.init();
  });

  test('[API] POST /api/lconfig/update – POS Settings update returns 200', {tag: ['@update']}, async ({
    request,
  }) => {
    const response = await ApiTestContext.POST(
      request,
      EndPoint.POS.Settings.Update,
      generalSettingsDefaultPayload
    );
    expect(response.status()).toBe(200);
  });

  test('[API] POST /api/lconfig/get – POS Settings get returns 200', { tag: ['@get'] }, async ({
    request,
  }) => {
    const response = await ApiTestContext.POST(
      request,
      EndPoint.POS.Settings.Get,
      { deviceid: generalSettingsDefaultPayload.device_id }
    );
    expect(response.status(), 'POS Settings get should return 200').toBe(200);
  });
});
