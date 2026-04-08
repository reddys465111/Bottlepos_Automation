import { test, expect } from '@playwright/test';
import { ApiTestContext } from '../../../src/API/apiTestContext';
import { EndPoint } from '../../../src/API/utils/endPoints';

const categoryGroupGetFormBody = 'draw=100&search%5Bvalue%5D=';

test.describe('API – Category groups', { tag: ['@api', '@admin', '@categoryGroups'] }, () => {
  test.beforeAll(async () => {
    await ApiTestContext.init();
  });

  test('[API] POST /api/categories/group/server – CategoryGroup get returns 200', {
    tag: ['@get'],
  }, async ({ request }) => {
    const response = await ApiTestContext.postWithBody(
      request,
      EndPoint.CategoryGroup.Get,
      categoryGroupGetFormBody
    );
    expect(response.status(), 'CategoryGroup get should return 200').toBe(200);
  });

  test('[API] POST /api/categories/group/add – CategoryGroup add returns 200', {
    tag: ['@add'],
  }, async ({ request }) => {
    const response = await ApiTestContext.POST(request, EndPoint.CategoryGroup.Add, {
      name: `API Test CatGroup ${Date.now()}`,
      showtoweb: false,
    });
    expect(response.status(), 'CategoryGroup add should return 200').toBe(200);
  });

  test('[API] POST /api/categories/group/edit – CategoryGroup edit returns 200', {
    tag: ['@edit'],
  }, async ({ request }) => {
    const listRes = await ApiTestContext.postWithBody(
      request,
      EndPoint.CategoryGroup.Get,
      categoryGroupGetFormBody
    );
    expect(listRes.status()).toBe(200);
    const listJson = await listRes.json();
    const data = listJson?.data?.data;
    const items = Array.isArray(data) ? data : data ? Object.values(data) : [];
    const firstRow = items[0] as { data?: string } | undefined;
    if (!firstRow?.data) {
      test.skip(true, 'No category groups returned; cannot run edit test');
      return;
    }
    const group = JSON.parse(firstRow.data) as Record<string, unknown>;
    const response = await ApiTestContext.POST(request, EndPoint.CategoryGroup.Edit, group);
    expect(response.status(), 'CategoryGroup edit should return 200').toBe(200);
  });

  test('[API] POST /api/categories/group/remove – CategoryGroup delete returns 200', {
    tag: ['@delete'],
  }, async ({ request }) => {
    const addRes = await ApiTestContext.POST(request, EndPoint.CategoryGroup.Add, {
      name: `API Del CatGroup ${Date.now()}`,
      showtoweb: false,
    });
    expect(addRes.status(), 'CategoryGroup add for delete should return 200').toBe(200);
    const addJson = await addRes.json();
    const rows = addJson?.data?.data;
    const arr = Array.isArray(rows) ? rows : rows ? Object.values(rows) : [];
    const first = arr[0] as { data?: string } | undefined;
    if (!first?.data) {
      test.skip(true, 'Add did not return group row; cannot run delete test');
      return;
    }
    const group = JSON.parse(first.data) as Record<string, unknown>;
    const response = await ApiTestContext.POST(request, EndPoint.CategoryGroup.Delete, group);
    expect(response.status(), 'CategoryGroup delete should return 200').toBe(200);
  });
});
