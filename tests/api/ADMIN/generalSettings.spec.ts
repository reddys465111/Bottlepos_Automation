import { test, expect } from '@playwright/test';
import { ApiTestContext } from '../../../src/API/apiTestContext';
import { EndPoint } from '../../../src/API/utils/endPoints';
import { GeneralSettingsPayload_default } from '../../../src/API/useCases/ADMIN/settings/generalSettings/data/data.GeneralSettingsDefaultPayload';

test.describe('API – General Settings', { tag: ['@api', '@admin', '@generalSettings'] }, () => {
  test.beforeAll(async () => {
    await ApiTestContext.init();
  });

  test('[API] POST /api/settings/general/set – GeneralSettings edit returns 200', {
    tag: ['@edit'],
  }, async ({ request }) => {
    const response = await ApiTestContext.POST(
      request,
      EndPoint.GeneralSettings.Edit,
      GeneralSettingsPayload_default
    );
    expect(response.status(), 'GeneralSettings edit should return 200').toBe(200);
  });
});
