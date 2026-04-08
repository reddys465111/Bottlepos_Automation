import { test, expect } from '@playwright/test';
import { ApiTestContext } from '../../../src/API/apiTestContext';
import { EndPoint } from '../../../src/API/utils/endPoints';

const sizesGetPayload = {};
const sizesAddPayload = { name: 'API Test Size' };
const sizesEditPayload = { id: '1', name: 'API Test Size Updated' };
const sizesDeletePayload = { id: '1', name: 'API Test Size Updated' };

test.describe('API – ADMIN Sizes (itemsizes)', { tag: ['@api', '@admin', '@sizes'] }, () => {
  test.beforeAll(async () => {
    await ApiTestContext.init();
  });

  test('[API] POST /api/itemsizes/get – Sizes get returns 200', { tag: ['@get'] }, async ({
    request,
  }) => {
    const response = await ApiTestContext.POST(
      request,
      EndPoint.Sizes.Get,
      sizesGetPayload
    );
    expect(response.status(), 'Sizes get should return 200').toBe(200);
  });

  test('[API] POST /api/itemsizes/add – Sizes add returns 200', { tag: ['@add'] }, async ({
    request,
  }) => {
    const response = await ApiTestContext.POST(
      request,
      EndPoint.Sizes.Add,
      sizesAddPayload
    );
    expect(response.status(), 'Sizes add should return 200').toBe(200);
  });

  test('[API] POST /api/itemsizes/edit – Sizes edit returns 200', { tag: ['@edit'] }, async ({
    request,
  }) => {
    const response = await ApiTestContext.POST(
      request,
      EndPoint.Sizes.Edit,
      sizesEditPayload
    );
    expect(response.status(), 'Sizes edit should return 200').toBe(200);
  });

  test('[API] POST /api/itemsizes/delete – Sizes delete returns 200', { tag: ['@delete'] }, async ({
    request,
  }) => {
    const response = await ApiTestContext.POST(
      request,
      EndPoint.Sizes.Delete,
      sizesDeletePayload
    );
    expect(response.status(), 'Sizes delete should return 200').toBe(200);
  });
});
