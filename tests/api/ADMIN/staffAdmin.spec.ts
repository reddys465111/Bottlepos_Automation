import { test, expect } from '@playwright/test';
import { ApiTestContext } from '../../../src/API/apiTestContext';
import { EndPoint } from '../../../src/API/utils/endPoints';
import type { IStaffAdminResponseData } from '../../../src/API/useCases/ADMIN/settings/staffAdmin/interface.StaffAdminsResponse';
import type { IStaffAdminData } from '../../../src/API/useCases/ADMIN/settings/staffAdmin/interface.StaffAdminData';

/** Minimal payload for POST /api/users/add – unique username and minimal permissions. */
function minimalStaffAddPayload(username: string): IStaffAdminData {
  return {
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

test.describe('API – StaffAdmin', { tag: ['@api', '@admin', '@staffAdmin'] }, () => {
  test.beforeAll(async () => {
    await ApiTestContext.init();
  });

  test('[API] GET /api/users/get – StaffAdmin list returns 200', { tag: ['@get'] }, async ({
    request,
  }) => {
    const response = await ApiTestContext.GET(request, EndPoint.StaffAdmin.List);
    expect(response.status(), 'StaffAdmin list should return 200').toBe(200);
  });

  test('[API] POST /api/users/add – StaffAdmin add returns 200', { tag: ['@add'] }, async ({
    request,
  }) => {
    const username = `api_test_user_${Date.now()}`;
    const response = await ApiTestContext.POST(
      request,
      EndPoint.StaffAdmin.Add,
      minimalStaffAddPayload(username)
    );
    expect(response.status(), 'StaffAdmin add should return 200').toBe(200);
  });

  test('[API] POST /api/users/edit – StaffAdmin edit returns 200', { tag: ['@edit'] }, async ({
    request,
  }) => {
    const listRes = await ApiTestContext.GET(request, EndPoint.StaffAdmin.List);
    expect(listRes.status(), 'StaffAdmin list should return 200').toBe(200);
    const listJson = await listRes.json();
    const data = listJson?.data;
    const userList =
      data && typeof data === 'object' && !Array.isArray(data)
        ? Object.values(data)
        : [];
    const firstUser = userList[0] as IStaffAdminResponseData | undefined;
    if (!firstUser?.id || !firstUser?.username) {
      test.skip(true, 'No users returned; cannot run edit test');
      return;
    }
    const editPayload: IStaffAdminData = {
      ...minimalStaffAddPayload(firstUser.username),
      id: firstUser.id,
      username: firstUser.username,
      address: firstUser.address ?? '',
      admin: firstUser.admin ?? 0,
      api_client: firstUser.api_client ?? '0',
      mobile: firstUser.mobile ?? '',
      userdob: firstUser.dob ?? '',
      zipcode: firstUser.zipcode ?? '',
    };
    const response = await ApiTestContext.POST(
      request,
      EndPoint.StaffAdmin.Edit,
      editPayload
    );
    expect(response.status(), 'StaffAdmin edit should return 200').toBe(200);
  });
});
