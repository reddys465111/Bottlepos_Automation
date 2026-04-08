import { test, expect } from '@playwright/test';
import { ApiTestContext } from '../../../src/API/apiTestContext';
import { EndPoint } from '../../../src/API/utils/endPoints';

/** Payload for POST /api/additional_charges/get – backend may accept empty or JSON key. */
const additionalFeesGetPayload = {};

const additionalFeesAddPayload = {
  name: 'API Test Additional Fee',
  amount: '1.00',
  enabletaxableadditional: 0,
  type: 'fixed',
};

const additionalFeesEditPayload = {
  id: '1',
  name: 'API Test Additional Fee',
  amount: '2.00',
  enabletaxableadditional: 0,
  type: 'fixed',
};

test.describe('API – ADMIN AdditionalFees', { tag: ['@api', '@admin', '@additionalFees'] }, () => {
  test.beforeAll(async () => {
    await ApiTestContext.init();
  });

  test('[API] POST /api/additional_charges/get – AdditionalFees get returns 200', {
    tag: ['@get'],
  }, async ({ request }) => {
    const response = await ApiTestContext.POST(
      request,
      EndPoint.AdditionalFees.Get,
      additionalFeesGetPayload
    );
    expect(response.status(), 'AdditionalFees get should return 200').toBe(200);
  });

  test('[API] POST /api/additionalcharges/add – AdditionalFees add returns 200', {
    tag: ['@add'],
  }, async ({ request }) => {
    const response = await ApiTestContext.POST(
      request,
      EndPoint.AdditionalFees.Add,
      additionalFeesAddPayload
    );
    expect(response.status(), 'AdditionalFees add should return 200').toBe(200);
  });

  test('[API] POST /api/additionalcharges/edit – AdditionalFees edit returns 200', {
    tag: ['@edit'],
  }, async ({ request }) => {
    const response = await ApiTestContext.POST(
      request,
      EndPoint.AdditionalFees.Edit,
      additionalFeesEditPayload
    );
    expect(response.status(), 'AdditionalFees edit should return 200').toBe(200);
  });

  test('[API] POST /api/additionalcharges/delete – AdditionalFees delete returns 200', {
    tag: ['@delete'],
  }, async ({ request }) => {
    const response = await ApiTestContext.POST(request, EndPoint.AdditionalFees.Delete, {
      id: '1',
    });
    expect(response.status(), 'AdditionalFees delete should return 200').toBe(200);
  });
});
