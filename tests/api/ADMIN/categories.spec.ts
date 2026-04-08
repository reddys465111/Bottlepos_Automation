import { test, expect } from '@playwright/test';
import { ApiTestContext } from '../../../src/API/apiTestContext';
import { EndPoint } from '../../../src/API/utils/endPoints';

const categoriesGetFormBody = 'draw=100&search%5Bvalue%5D=';

const categoryDataDefaults = {
  defaulttax: '',
  ageverification: '',
  defaultmargin: '',
  allowebt: false,
  donotdiscount: false,
  addtowebstore: true,
  exclusenoncashadj: false,
  excludeloyaltyreward: false,
};

test.describe('API – Categories', { tag: ['@api', '@admin', '@categories'] }, () => {
  test.beforeAll(async () => {
    await ApiTestContext.init();
  });

  test('[API] POST /api/get/categories/server – Categories get returns 200', {
    tag: ['@get'],
  }, async ({ request }) => {
    const response = await ApiTestContext.postWithBody(
      request,
      EndPoint.Categories.Get,
      categoriesGetFormBody
    );
    expect(response.status(), 'Categories get should return 200').toBe(200);
  });

  test('[API] POST /api/categories/add – Categories add returns 200', { tag: ['@add'] }, async ({
    request,
  }) => {
    const response = await ApiTestContext.POST(request, EndPoint.Categories.Add, {
      name: `API Test Category ${Date.now()}`,
      cat_group_id: '0',
      data: categoryDataDefaults,
    });
    expect(response.status(), 'Categories add should return 200').toBe(200);
  });

  test('[API] POST /api/categories/edit – Categories edit returns 200', {
    tag: ['@edit'],
  }, async ({ request }) => {
    const listRes = await ApiTestContext.postWithBody(
      request,
      EndPoint.Categories.Get,
      categoriesGetFormBody
    );
    expect(listRes.status()).toBe(200);
    const listJson = await listRes.json();
    const rows = listJson?.data?.data;
    const first = Array.isArray(rows) ? rows[0] : undefined;
    if (!first?.id) {
      test.skip(true, 'No categories returned; cannot run edit test');
      return;
    }
    let dataObj = first.data;
    if (typeof dataObj === 'string') {
      try {
        dataObj = JSON.parse(dataObj);
      } catch {
        dataObj = categoryDataDefaults;
      }
    }
    const response = await ApiTestContext.POST(request, EndPoint.Categories.Edit, {
      id: first.id,
      name: first.name ?? 'API Category',
      cat_group_id: first.cat_group_id ?? '0',
      data: { ...categoryDataDefaults, ...(dataObj as object) },
    });
    expect(response.status(), 'Categories edit should return 200').toBe(200);
  });

  test('[API] POST /api/categories/delete – Categories delete returns 200', {
    tag: ['@delete'],
  }, async ({ request }) => {
    const addRes = await ApiTestContext.POST(request, EndPoint.Categories.Add, {
      name: `API Del Category ${Date.now()}`,
      cat_group_id: '0',
      data: categoryDataDefaults,
    });
    expect(addRes.status(), 'Categories add for delete should return 200').toBe(200);
    const addJson = await addRes.json();
    const cat = addJson?.data;
    if (!cat?.id) {
      test.skip(true, 'Add did not return category; cannot run delete test');
      return;
    }
    const response = await ApiTestContext.POST(request, EndPoint.Categories.Delete, cat);
    expect(response.status(), 'Categories delete should return 200').toBe(200);
  });
});
