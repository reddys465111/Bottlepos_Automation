import { test, expect } from '@playwright/test';
import { ApiTestContext } from '../../../src/API/apiTestContext';
import { EndPoint } from '../../../src/API/utils/endPoints';

/** Form body for POST /api/items/get/server – empty search (DataTables-style). */
const itemsGetFormBody = 'draw=100&search%5Bvalue%5D=';

function firstItemFromSearch(listJson: unknown): Record<string, unknown> | undefined {
  const j = listJson as { data?: { data?: Record<string, unknown> } };
  const inner = j?.data?.data;
  if (!inner || typeof inner !== 'object') return undefined;
  const vals = Object.values(inner);
  return (vals[0] as Record<string, unknown>) ?? undefined;
}

/** Minimal payload aligned with ItemPayloadData for POST /api/items/add. */
function buildItemsAddPayload() {
  return {
    code: '',
    codes: [] as unknown[],
    qty: '1',
    name: `API Test Item ${Date.now()}`,
    alt_name: '',
    description: '',
    taxid: '1',
    unitspercase: '1',
    casecosttotal: '0.00',
    cost: '0.00',
    lastcost: '0.00',
    price: '1.00',
    webprice: '0.00',
    margin: '0.00',
    markup: '0.00',
    supplierid: '0',
    categoryid: '1',
    minprice: '',
    reorder_value: '1',
    reorder_point: '1',
    itemrank: '',
    vendoritemno: '',
    autoupdate: false,
    promptforqty: false,
    donottrackinventory: false,
    notes: '',
    itemtype: 'inventoryitem',
    reminddate: '',
    closeout: false,
    donotdiscountitem: false,
    excludefrompromotion: false,
    showtoweb: 1,
    showhideinventory: 0,
    allowebt: 0,
    vendorname: '',
    itemtags: [] as string[],
    shortcutkeys: false,
    shortcutname: '',
    itemsortno: '',
    color_code: '#ac725e',
    itemviewonprompt: false,
    type: 'general',
    percenttype: 'negative',
    additionalcharges: [] as string[],
    pointsmultiplier: '',
    pointsvalue: '0',
    modifiers: [] as unknown[],
    additionalPrice: [] as string[],
    custom_image: [] as unknown[],
    merge_ids: '',
  };
}

test.describe('API – Items', { tag: ['@api', '@admin', '@items'] }, () => {
  test.beforeAll(async () => {
    await ApiTestContext.init();
  });

  test('[API] POST /api/items/get/server – Items get returns 200', { tag: ['@get'] }, async ({
    request,
  }) => {
    const response = await ApiTestContext.postWithBody(
      request,
      EndPoint.Items.Get,
      itemsGetFormBody
    );
    expect(response.status(), 'Items get should return 200').toBe(200);
  });

  test('[API] POST /api/items/add – Items add returns 200', { tag: ['@add'] }, async ({
    request,
  }) => {
    const response = await ApiTestContext.POST(
      request,
      EndPoint.Items.Add,
      buildItemsAddPayload()
    );
    expect(response.status(), 'Items add should return 200').toBe(200);
  });

  test('[API] POST /api/items/edit – Items edit returns 200', { tag: ['@edit'] }, async ({
    request,
  }) => {
    const listRes = await ApiTestContext.postWithBody(
      request,
      EndPoint.Items.Get,
      itemsGetFormBody
    );
    expect(listRes.status()).toBe(200);
    const first = firstItemFromSearch(await listRes.json());
    if (!first?.id) {
      test.skip(true, 'No items returned; cannot run edit test');
      return;
    }
    const response = await ApiTestContext.POST(request, EndPoint.Items.Edit, first);
    expect(response.status(), 'Items edit should return 200').toBe(200);
  });

  test('[API] POST /api/items/delete – Items delete returns 200', { tag: ['@delete'] }, async ({
    request,
  }) => {
    const addRes = await ApiTestContext.POST(
      request,
      EndPoint.Items.Add,
      buildItemsAddPayload()
    );
    expect(addRes.status(), 'Items add for delete should return 200').toBe(200);
    const addJson = await addRes.json();
    const item = addJson?.data;
    if (!item?.id) {
      test.skip(true, 'Add did not return item with id; cannot run delete test');
      return;
    }
    const response = await ApiTestContext.POST(request, EndPoint.Items.Delete, item);
    expect(response.status(), 'Items delete should return 200').toBe(200);
  });
});
