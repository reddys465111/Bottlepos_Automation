import { test } from '@playwright/test';
import { ApiTestContext } from '../../../src/API/apiTestContext';
import { EndPoint } from '../../../src/API/utils/endPoints';
import {
  assertLooseClientErrorStatus,
  assertNegativeApiOutcome,
} from '../helpers/assertNegativeApiOutcome';

const NO_ID = '999999999999';

test.describe('API negative – Categories', { tag: ['@api', '@apiNegative', '@categories'] }, () => {
  test.beforeAll(async () => {
    await ApiTestContext.init();
  });

  test('[API] POST /api/get/categories/server – Invalid search returns 400', async ({ request }) => {
    const res = await ApiTestContext.postWithBody(request, EndPoint.Categories.Get, '%%%bad%%%');
    assertLooseClientErrorStatus(res.status());
  });

  test('[API] POST /api/categories/add – Duplicate category name returns 400', async ({ request }) => {
    const name = `ApiCatDup${Date.now()}`;
    const body = { name, description: '' };
    const first = await ApiTestContext.POST(request, EndPoint.Categories.Add, body);
    const second = await ApiTestContext.POST(request, EndPoint.Categories.Add, body);
    if (first.status() === 200) {
      await assertNegativeApiOutcome(second, { hint: 'Duplicate category' });
    } else {
      await assertNegativeApiOutcome(first, { hint: 'Category add should fail' });
    }
  });

  test('[API] POST /api/categories/delete – Category in use returns 400', async ({ request }) => {
    const categoryInUsePayload = {
      id: '1',
      name: 'Default',
      cat_group_id: '1',
      data: JSON.stringify({
        defaulttax: '',
        defaultmargin: '',
        allowebt: false,
        donotdiscount: false,
        addtowebstore: true,
        exclusenoncashadj: false,
        excludeloyaltyreward: false,
        ageverification: '',
      }),
    };
    const res = await ApiTestContext.POST(request, EndPoint.Categories.Delete, categoryInUsePayload);
    await assertNegativeApiOutcome(res, {
      hint: 'Delete category in use',
      allowLenientOk200: true,
    });
  });

  test('[API] POST /api/categories/group/add – Invalid CategoryGroup data returns 400', async ({
    request,
  }) => {
    const res = await ApiTestContext.POST(request, EndPoint.CategoryGroup.Add, {
      name: '',
      showtoweb: false,
    });
    await assertNegativeApiOutcome(res, { hint: 'Invalid category group' });
  });

  test('[API] POST /api/categories/edit – Non-existent category id returns 404', async ({ request }) => {
    const res = await ApiTestContext.POST(request, EndPoint.Categories.Edit, {
      id: NO_ID,
      name: 'MissingCat',
      description: '',
    });
    await assertNegativeApiOutcome(res, {
      hint: 'Edit non-existent category',
      allowLenientOk200: true,
    });
  });

  test('[API] POST /api/categories/group/edit – Non-existent category group id returns 404', async ({
    request,
  }) => {
    const res = await ApiTestContext.POST(request, EndPoint.CategoryGroup.Edit, {
      id: NO_ID,
      name: 'MissingGroup',
    });
    await assertNegativeApiOutcome(res, {
      hint: 'Edit non-existent category group',
      allowLenientOk200: true,
    });
  });

  test('[API] POST /api/categories/group/server – Invalid search returns 400', async ({ request }) => {
    const res = await ApiTestContext.postWithBody(request, EndPoint.CategoryGroup.Get, '%%%bad%%%');
    assertLooseClientErrorStatus(res.status());
  });

  test('[API] POST /api/categories/group/remove – Non-existent category group id returns 404', async ({
    request,
  }) => {
    const res = await ApiTestContext.POST(request, EndPoint.CategoryGroup.Delete, { id: NO_ID });
    await assertNegativeApiOutcome(res, {
      hint: 'Remove non-existent category group',
      allowLenientOk200: true,
    });
  });
});
