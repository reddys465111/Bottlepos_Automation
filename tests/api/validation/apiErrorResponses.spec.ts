import { test, expect } from '@playwright/test';
import { Session } from '../../../src/utils';
import { ApiTestContext } from '../../../src/API/apiTestContext';
import { EndPoint } from '../../../src/API/utils/endPoints';
import { EncodeData } from '../../../src/API/utils/APIHelper';
import type { IStaffAdminData } from '../../../src/API/useCases/ADMIN/settings/staffAdmin/interface.StaffAdminData';
import {
  assertLooseClientErrorStatus,
  assertNegativeApiOutcome,
  assertUnauthenticatedDenied,
} from '../helpers/assertNegativeApiOutcome';

function minimalStaffPayloadForEdit(username: string, id: string): IStaffAdminData {
  return {
    id,
    username,
    address: '',
    admin: 0,
    api_client: '0',
    mobile: '',
    userdob: '',
    pass: '38076b9a1a153ff3bcfa0d4e6d89b6d9f1895578e0194911bce3a2d248bfe005',
    zipcode: '',
    permissions: {
      access: 'yes',
      adminreports: 0,
      otherstorereports: 0,
      graph: 0,
      sales: 0,
      invoices: 0,
      items: 0,
      itemmodule: { delete: 0 },
      stock: 0,
      categories: 0,
      suppliers: 0,
      customers: 0,
      receive: 0,
      transfer: 0,
      orders: 0,
      closing: 0,
      expense: 0,
      assistant: 0,
      clockinout: 0,
      tasklist: 0,
      sections_control: { promotionsms: 0 },
      pos: {
        reports: 0,
        dayreports: 0,
        regularregisterreports: 0,
        shortregisterreports: 0,
        allowrmitems: 0,
        allowoplayback: 0,
        alloworefundtran: 0,
        allowoapplydisc: 0,
        allowoexchangerefund: 0,
        allowedititem: 0,
        allowviewitem: 0,
        allowadditem: 0,
        allowcloseregister: 0,
        allowsuspendrecall: 0,
      },
    },
  };
}

test.describe('API – Error / validation responses', { tag: ['@api', '@negative', '@validation'] }, () => {
  test.beforeAll(async () => {
    await ApiTestContext.init();
  });

  test('[API] POST /api/auth – Invalid credentials return 401 or error', {
    tag: ['@auth'],
  }, async ({ request }) => {
    const res = await request.post(Session.URL + EndPoint.AUTH, {
      data: EncodeData({
        username: Session.User,
        password: 'definitely-not-the-real-password-12345',
      }),
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });
    const status = res.status();
    if (status === 200) {
      const j = await res.json();
      expect(
        j.error !== 'OK' || j.errorCode !== 'OK',
        'Invalid login should not return OK in body when status is 200'
      ).toBeTruthy();
    } else {
      expect([401, 403]).toContain(status);
    }
  });

  test('[API] POST /api/logout – No session or invalid token is denied', {
    tag: ['@auth'],
  }, async ({ request }) => {
    const res = await request.post(Session.URL + EndPoint.LogOut, {
      data: EncodeData({ end_date: Date.now() }),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Cookie: 'PHPSESSID=invalid_session_token_for_api_test',
      },
    });
    await assertUnauthenticatedDenied(res, {
      hint: 'logout with invalid session',
      allowLenientSuccess200: true,
    });
  });

  test('[API] GET /api/users/get – No auth is denied', { tag: ['@staffAdmin'] }, async ({
    request,
  }) => {
    const res = await request.get(Session.URL + EndPoint.StaffAdmin.List);
    await assertUnauthenticatedDenied(res, { hint: 'users/get without auth' });
  });

  test('[API] GET /api/settings/general/get – No auth is denied', { tag: ['@settings'] }, async ({
    request,
  }) => {
    const res = await request.get(Session.URL + EndPoint.GeneralSettings.Get);
    await assertUnauthenticatedDenied(res, { hint: 'settings/general/get without auth' });
  });

  test('[API] GET /api/settings/pos/get – No auth is denied', { tag: ['@settings'] }, async ({
    request,
  }) => {
    const res = await request.get(Session.URL + EndPoint.POSSettings.Get);
    await assertUnauthenticatedDenied(res, { hint: 'settings/pos/get without auth' });
  });

  test('[API] GET /api/adminconfig/get – AdminConfig get returns 200', {
    tag: ['@adminConfig', '@positive'],
  }, async ({ request }) => {
    const res = await ApiTestContext.GET(request, EndPoint.AdminConfig.Get);
    expect(res.status()).toBe(200);
  });

  test('[API] POST /api/users/edit – Non-existent user is rejected', { tag: ['@staffAdmin'] }, async ({
    request,
  }) => {
    const res = await ApiTestContext.POST(
      request,
      EndPoint.StaffAdmin.Edit,
      minimalStaffPayloadForEdit('nonexistent_user_xyz', '999999999')
    );
    await assertNegativeApiOutcome(res, {
      hint: 'edit non-existent user',
      allowLenientOk200: true,
    });
  });

  test('[API] POST /api/devices/disable – Non-existent device id is rejected', {
    tag: ['@devices'],
  }, async ({ request }) => {
    const res = await ApiTestContext.POST(request, EndPoint.Devices.Disable, {
      id: '999999999',
      name: 'Non-existent Device',
    });
    await assertNegativeApiOutcome(res, {
      hint: 'disable non-existent device',
      allowLenientOk200: true,
    });
  });

  test('[API] POST /api/devices/delete – Non-existent device id is rejected', {
    tag: ['@devices'],
  }, async ({ request }) => {
    const res = await ApiTestContext.POST(request, EndPoint.Devices.Delete, {
      id: '999999999',
      name: 'Non-existent Device',
    });
    await assertNegativeApiOutcome(res, {
      hint: 'delete non-existent device',
      allowLenientOk200: true,
    });
  });

  test('[API] POST /api/devices/edit – Non-existent device id is rejected', {
    tag: ['@devices'],
  }, async ({ request }) => {
    const res = await ApiTestContext.POST(request, EndPoint.Devices.Edit, {
      id: '999999999',
      name: 'Non-existent Device',
      type: 'general_register',
      ordertype: 'terminal',
      orderdisplay: true,
    });
    await assertNegativeApiOutcome(res, {
      hint: 'edit non-existent device',
      allowLenientOk200: true,
    });
  });

  test('[API] POST /api/devices/add – Duplicate name or invalid data is rejected', {
    tag: ['@devices'],
  }, async ({ request }) => {
    const name = `API Dup Device ${Date.now()}`;
    const payload = {
      name,
      type: 'general_register',
      ordertype: 'terminal',
      orderdisplay: true,
    };
    const first = await ApiTestContext.POST(request, EndPoint.Devices.Add, payload);
    expect(first.status()).toBe(200);
    const second = await ApiTestContext.POST(request, EndPoint.Devices.Add, payload);
    await assertNegativeApiOutcome(second, { hint: 'duplicate device add' });
  });

  test('[API] POST /api/devices/get/server – Invalid filter returns 200 empty or 400', {
    tag: ['@devices'],
  }, async ({ request }) => {
    const cookie = await ApiTestContext.getSessionCookie(request);
    const res = await request.post(Session.URL + EndPoint.Devices.Get, {
      data: '%%%not-valid-form-body%%%',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Cookie: cookie,
      },
    });
    const status = res.status();
    
    expect([200, 400], `Expected 200 (empty) or 400, got ${status}`).toContain(status);
    if (status === 200) {
      const json = await res.json();
      const rows = json?.data;
      const rowCount = Array.isArray(rows)
        ? rows.length
        : rows && typeof rows === 'object'
          ? Object.keys(rows as object).length
          : 0;
      const filtered = json?.recordsFiltered;
      const isEmptyRows = rowCount === 0;
      const isZeroFiltered =
        filtered === 0 || filtered === '0' || filtered === undefined;
      expect(
        isEmptyRows || isZeroFiltered,
        '200 response should be empty (no device rows) or recordsFiltered 0 for invalid filter'
      ).toBeTruthy();
    }
  });

  test('[API] POST /api/multi – Invalid DeviceAndLocation body is rejected', {
    tag: ['@devices'],
  }, async ({ request }) => {
    const cookie = await ApiTestContext.getSessionCookie(request);
    const res = await request.post(Session.URL + EndPoint.DeviceAndLocation.Get, {
      data: EncodeData({ notAValidMultiKey: true }),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Cookie: cookie,
      },
    });
    assertLooseClientErrorStatus(res.status());
    await assertNegativeApiOutcome(res, { hint: 'invalid /api/multi body' });
  });

  test('[API] POST /api/locations/add – Duplicate location name is rejected', {
    tag: ['@locations'],
  }, async ({ request }) => {
    const dt = new Date().toISOString().slice(0, 10);
    const name = `API Dup Location ${Date.now()}`;
    const payload = { name, disabled: '0', dt };
    const first = await ApiTestContext.POST(request, EndPoint.Locations.Add, payload);
    expect(first.status()).toBe(200);
    const second = await ApiTestContext.POST(request, EndPoint.Locations.Add, payload);
    await assertNegativeApiOutcome(second, { hint: 'duplicate location add' });
  });

  test('[API] POST /api/locations/edit – Non-existent location id is rejected', {
    tag: ['@locations'],
  }, async ({ request }) => {
    const res = await ApiTestContext.POST(request, EndPoint.Locations.Edit, {
      id: '999999999',
      name: 'Non-existent Location',
      dt: new Date().toISOString().slice(0, 10),
      disabled: '0',
    });
    await assertNegativeApiOutcome(res, {
      hint: 'edit non-existent location',
      allowLenientOk200: true,
    });
  });

  test('[API] POST /api/settings/pos/set – Invalid AccountingSettings payload is rejected or lenient OK', {
    tag: ['@settings'],
  }, async ({ request }) => {
    const res = await ApiTestContext.POST(request, EndPoint.AccountingSettings.Edit, {});
    await assertNegativeApiOutcome(res, {
      hint: 'empty accounting settings',
      allowLenientOk200: true,
    });
  });

  test('[API] POST /api/settings/pos/set – Invalid POSSettings payload is rejected or lenient OK', {
    tag: ['@settings'],
  }, async ({ request }) => {
    const res = await ApiTestContext.POST(request, EndPoint.POSSettings.Edit, { invalidField: true });
    await assertNegativeApiOutcome(res, {
      hint: 'invalid POS settings payload',
      allowLenientOk200: true,
    });
  });

  test('[API] POST /api/settings/general/set – Missing required fields rejected or echoes current (lenient)', {
    tag: ['@settings'],
  }, async ({ request }) => {
    const res = await ApiTestContext.POST(request, EndPoint.GeneralSettings.Edit, {});
    await assertNegativeApiOutcome(res, {
      hint: 'empty general settings',
      allowLenientOk200: true,
    });
  });

  test('[API] POST /api/lconfig/get – Invalid deviceid is rejected', {
    tag: ['@posSettings'],
  }, async ({ request }) => {
    const res = await ApiTestContext.POST(request, EndPoint.POS.Settings.Get, {
      deviceid: '999999999',
    });
    await assertNegativeApiOutcome(res, {
      hint: 'lconfig/get invalid deviceid',
      allowLenientOk200: true,
    });
  });

  test('[API] POST /api/lconfig/update – Empty payload or missing deviceid rejected or lenient OK', {
    tag: ['@posSettings'],
  }, async ({ request }) => {
    const res = await ApiTestContext.POST(request, EndPoint.POS.Settings.Update, {});
    await assertNegativeApiOutcome(res, {
      hint: 'lconfig/update empty payload',
      allowLenientOk200: true,
    });
  });
});
