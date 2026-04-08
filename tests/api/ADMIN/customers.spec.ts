import { test, expect } from '@playwright/test';
import { ApiTestContext } from '../../../src/API/apiTestContext';
import { EndPoint } from '../../../src/API/utils/endPoints';

const customersGetFormBody = 'draw=50&search%5Bvalue%5D=';

const customerAddPayload = {
  txWholesale: '0',
  licenseNumber: '',
  taxPayerId: '',
  email: '',
  name: 'API Test Customer',
  phone: '5550001234',
  mobile: '5550001234',
  dob: '',
  address: '',
  suburb: '',
  postcode: '',
  points: '0',
  ishouseenable: false,
  promotion_subscribed: false,
  houseacclimit: '0',
  state: '',
  country: '',
};

test.describe('API – Customers', { tag: ['@api', '@admin', '@customers'] }, () => {
  test.beforeAll(async () => {
    await ApiTestContext.init();
  });

  test('[API] POST /api/get/customers/server – Customers get returns 200', {
    tag: ['@get'],
  }, async ({ request }) => {
    const response = await ApiTestContext.postWithBody(
      request,
      EndPoint.Customers.Get,
      customersGetFormBody
    );
    expect(response.status(), 'Customers get should return 200').toBe(200);
  });

  test('[API] POST /api/customers/add – Customers add returns 200', { tag: ['@add'] }, async ({
    request,
  }) => {
    const response = await ApiTestContext.POST(
      request,
      EndPoint.Customers.Add,
      {
        ...customerAddPayload,
        name: `API Test Customer ${Date.now()}`,
        phone: `555${Date.now().toString().slice(-7)}`,
        mobile: `555${Date.now().toString().slice(-7)}`,
      }
    );
    expect(response.status(), 'Customers add should return 200').toBe(200);
  });

  test('[API] POST /api/customers/edit – Customers edit returns 200', {
    tag: ['@edit'],
  }, async ({ request }) => {
    const listRes = await ApiTestContext.postWithBody(
      request,
      EndPoint.Customers.Get,
      customersGetFormBody
    );
    expect(listRes.status()).toBe(200);
    const listJson = await listRes.json();
    const rows = listJson?.data?.data;
    const first = Array.isArray(rows) ? rows[0] : undefined;
    if (!first?.id) {
      test.skip(true, 'No customers returned; cannot run edit test');
      return;
    }
    const editPayload = {
      id: String(first.id),
      txWholesale: first.houseacclimit ?? '0',
      licenseNumber: first.licenseNumber ?? '',
      taxPayerId: first.taxPayerId ?? '',
      email: first.email ?? '',
      name: first.name ?? 'API Customer',
      phone: String(first.phone ?? '').trim(),
      mobile: String(first.mobile ?? '').trim(),
      dob: first.dob ?? '',
      address: first.address ?? '',
      suburb: first.suburb ?? '',
      postcode: first.postcode ?? '',
      points: String(first.points ?? '0'),
      ishouseenable: first.ishousepay === '1',
      promotion_subscribed: first.promotion_subscribed === '1',
      houseacclimit: first.houseacclimit ?? '0',
      state: first.state ?? '',
      country: first.country ?? '',
    };
    const response = await ApiTestContext.POST(request, EndPoint.Customers.Edit, editPayload);
    expect(response.status(), 'Customers edit should return 200').toBe(200);
  });

  test('[API] POST /api/customers/delete – Customers delete returns 200', {
    tag: ['@delete'],
  }, async ({ request }) => {
    const addRes = await ApiTestContext.POST(request, EndPoint.Customers.Add, {
      ...customerAddPayload,
      name: `API Del Customer ${Date.now()}`,
      phone: `556${Date.now().toString().slice(-7)}`,
      mobile: `556${Date.now().toString().slice(-7)}`,
    });
    expect(addRes.status(), 'Customers add for delete should return 200').toBe(200);
    const addJson = await addRes.json();
    const id = addJson?.data?.id ?? addJson?.id;
    if (!id) {
      test.skip(true, 'Add did not return customer id; cannot run delete test');
      return;
    }
    const response = await ApiTestContext.POST(request, EndPoint.Customers.Delete, {
      id: String(id),
    });
    expect(response.status(), 'Customers delete should return 200').toBe(200);
  });
});
