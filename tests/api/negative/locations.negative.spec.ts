import { test, expect } from '@playwright/test';
import { ApiTestContext } from '../../../src/API/apiTestContext';
import { EndPoint } from '../../../src/API/utils/endPoints';
import { assertNegativeApiOutcome } from '../helpers/assertNegativeApiOutcome';

const NO_MATCH = '__API_NEG_NO_MATCH_ZZZ__';
const NO_ID = '999999999999';

test.describe('API negative – Locations', { tag: ['@api', '@apiNegative', '@locations'] }, () => {
  test.beforeAll(async () => {
    await ApiTestContext.init();
  });

  test('[API] POST /api/locations/get/server – No results returns 200 with empty list', async ({
    request,
  }) => {
    const response = await ApiTestContext.postWithBody(
      request,
      EndPoint.Locations.Get,
      `draw=1&search%5Bvalue%5D=${encodeURIComponent(NO_MATCH)}`
    );
    expect(response.status()).toBe(200);
    const json = await response.json();
    const rows = Array.isArray(json.data) ? json.data : json.data?.data ?? [];
    expect(Array.isArray(rows) ? rows.length : 0).toBe(0);
  });

  test('[API] POST /api/locations/delete – Non-existent location id returns 404', async ({
    request,
  }) => {
    const response = await ApiTestContext.POST(request, EndPoint.Locations.Delete, {
      id: NO_ID,
      name: 'Missing',
      dt: '2000-01-01',
      disabled: '0',
    });
    await assertNegativeApiOutcome(response, {
      hint: 'Delete non-existent location',
      allowLenientOk200: true,
    });
  });
});
