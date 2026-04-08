import { test, expect } from '@playwright/test';
import { ApiTestContext } from '../../../src/API/apiTestContext';
import { EndPoint } from '../../../src/API/utils/endPoints';

const promotionsGetPayload = {};

const promotionAddPayload = {
  name: `API Test Promotion ${Date.now()}`,
  type: 'Item',
  sdate: '',
  edate: '',
  promotax: '',
  promotionType: 'simple',
  promotionStatus: 1,
  scandatapromotion: 0,
  webstoreenablepromotion: 0,
  promotionforall: 0,
  promotionforallitems: 0,
  allowallcustomers: 0,
  promoappytype: 'default',
  couponstatus: false,
  couponcode: '0',
  selweekdays: {
    repeat_sun: false,
    repeat_mon: false,
    repeat_tue: false,
    repeat_wed: false,
    repeat_thu: false,
    repeat_fri: false,
    repeat_sat: false,
  },
  sizeModifiersIds: [] as unknown[],
  tagsModifiers: [] as string[],
  modifiers: [] as unknown[],
  catModifiersIds: [] as string[],
  modifiersIds: [] as string[],
  custModifiersIds: [] as unknown[],
  custGroupsModifiersIds: [] as unknown[],
};

test.describe('API – ADMIN Promotions', { tag: ['@api', '@admin', '@promotions'] }, () => {
  test.beforeAll(async () => {
    await ApiTestContext.init();
  });

  test('[API] POST /api/stock/promotions/get – Promotions get returns 200', {
    tag: ['@get'],
  }, async ({ request }) => {
    const response = await ApiTestContext.POST(
      request,
      EndPoint.Promotions.Get,
      promotionsGetPayload
    );
    expect(response.status(), 'Promotions get should return 200').toBe(200);
  });

  test('[API] POST /api/stock/promotions/set – Promotions add returns 200', {
    tag: ['@add'],
  }, async ({ request }) => {
    const response = await ApiTestContext.POST(
      request,
      EndPoint.Promotions.Add,
      promotionAddPayload
    );
    expect(response.status(), 'Promotions add should return 200').toBe(200);
  });

  test('[API] POST /api/stock/promotions/edit – Promotions edit returns 200', {
    tag: ['@edit'],
  }, async ({ request }) => {
    const getRes = await ApiTestContext.POST(
      request,
      EndPoint.Promotions.Get,
      promotionsGetPayload
    );
    expect(getRes.status()).toBe(200);
    const body = await getRes.json();
    const promos = body?.data;
    const first =
      promos && typeof promos === 'object'
        ? (Object.values(promos as Record<string, unknown>)[0] as Record<string, unknown> | undefined)
        : undefined;
    if (!first || typeof first !== 'object') {
      test.skip(true, 'No promotions returned; cannot run edit test');
      return;
    }
    const response = await ApiTestContext.POST(request, EndPoint.Promotions.Edit, first);
    expect(response.status(), 'Promotions edit should return 200').toBe(200);
  });
});
