import { test, expect } from '@playwright/test';
import { ApiTestContext } from '../../../src/API/apiTestContext';
import { EndPoint } from '../../../src/API/utils/endPoints';
import { AccountingSettingsDefaultPayload } from '../../../src/API/useCases/ADMIN/settings/accountSettings/data/data.AccountingSettingsDefaultPayload';

test.describe('API – Accounting Settings', { tag: ['@api', '@admin', '@accountSettings'] }, () => {
  test.beforeAll(async () => {
    await ApiTestContext.init();
  });

  test('[API] POST /api/settings/pos/set – AccountingSettings edit returns 200', {
    tag: ['@edit'],
  }, async ({ request }) => {
    const response = await ApiTestContext.POST(
      request,
      EndPoint.AccountingSettings.Edit,
      AccountingSettingsDefaultPayload
    );
    expect(response.status(), 'AccountingSettings edit should return 200').toBe(200);
  });
});
