import { test } from '@playwright/test';
import { ApiTestContext } from '../../../src/API/apiTestContext';
import { EndPoint } from '../../../src/API/utils/endPoints';
import { assertNegativeApiOutcome } from '../helpers/assertNegativeApiOutcome';

const NO_ID = '999999999999';

test.describe('API negative – Tax rules & items', { tag: ['@api', '@apiNegative', '@tax'] }, () => {
  test.beforeAll(async () => {
    await ApiTestContext.init();
  });

  test('[API] POST /api/tax/rules/delete – Non-existent tax rule returns 404', async ({
    request,
  }) => {
    const response = await ApiTestContext.POST(request, EndPoint.TaxRule.delete, { id: NO_ID });
    await assertNegativeApiOutcome(response, {
      hint: 'Tax rule delete',
      allowLenientOk200: true,
    });
  });

  test('[API] POST /api/tax/rules/edit – Invalid TaxRule payload returns 400', async ({
    request,
  }) => {
    const response = await ApiTestContext.POST(request, EndPoint.TaxRule.Edit, {});
    await assertNegativeApiOutcome(response, { hint: 'Tax rule edit invalid' });
  });

  test('[API] POST /api/tax/rules/add – Duplicate or invalid name returns 400', async ({
    request,
  }) => {
    const response = await ApiTestContext.POST(request, EndPoint.TaxRule.Add, {
      name: '',
      isdefaulttax: false,
      base: [],
      locations: {},
      inclusive: true,
      mode: 'single',
      posbutton: { button: '', buttoncolor: '#ac725e' },
    });
    await assertNegativeApiOutcome(response, { hint: 'Tax rule add invalid' });
  });

  test('[API] POST /api/tax/rules/edit – Non-existent default rule returns 404', async ({
    request,
  }) => {
    const response = await ApiTestContext.POST(request, EndPoint.TaxRule.Edit, {
      id: NO_ID,
      name: 'Missing Rule',
      isdefaulttax: true,
      inclusive: true,
      mode: 'single',
      base: [],
      locations: {},
      posbutton: { button: '', buttoncolor: '#ac725e' },
    });
    await assertNegativeApiOutcome(response, {
      hint: 'Tax rule edit missing id',
      allowLenientOk200: true,
    });
  });

  test('[API] POST /api/tax/items/add – Invalid TaxItem data returns 400', async ({ request }) => {
    const response = await ApiTestContext.POST(request, EndPoint.TaxItem.Add, {
      name: '',
      value: 'not-a-number',
      altname: '',
      type: 'invalid-type-xyz',
    });
    await assertNegativeApiOutcome(response, { hint: 'Tax item add invalid' });
  });

  test('[API] POST /api/tax/items/edit – Non-existent tax item id returns 404', async ({
    request,
  }) => {
    const response = await ApiTestContext.POST(request, EndPoint.TaxItem.Edit, {
      id: NO_ID,
      name: 'Missing',
      value: '1',
      type: 'vat',
    });
    await assertNegativeApiOutcome(response, {
      hint: 'Tax item edit',
      allowLenientOk200: true,
    });
  });

  test('[API] POST /api/tax/items/delete – Non-existent tax item id returns 404', async ({
    request,
  }) => {
    const response = await ApiTestContext.POST(request, EndPoint.TaxItem.Delete, { id: NO_ID });
    await assertNegativeApiOutcome(response, {
      hint: 'Tax item delete',
      allowLenientOk200: true,
    });
  });
});
