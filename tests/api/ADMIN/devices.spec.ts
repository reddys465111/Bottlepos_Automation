import { test, expect } from '@playwright/test';
import { ApiTestContext } from '../../../src/API/apiTestContext';
import { EndPoint } from '../../../src/API/utils/endPoints';
import type { IDevicesData } from '../../../src/API/useCases/ADMIN/settings/deviceAndLocations/devices/interface.Device';

/** Minimal payload for POST /api/devices/add – name and type are typically required. */
const deviceAddPayload = {
  name: 'API Test Device',
  type: 'general_register',
  ordertype: 'terminal',
  orderdisplay: true,
};

/** Payload for POST /api/multi – fetches devices, locations, and card devices in one call. */
const deviceAndLocationGetPayload = {
  'devices/get': '',
  'locations/get': '',
  'carddevices/get': '',
};

/** Form body for POST /api/devices/get/server – empty search returns all. */
const devicesGetFormBody = 'draw=100&search%5Bvalue%5D=';

test.describe('API – Devices', { tag: ['@api', '@admin', '@devices'] }, () => {
  test.beforeAll(async () => {
    await ApiTestContext.init();
  });

  test('[API] POST /api/devices/add – Devices add returns 200', { tag: ['@add'] }, async ({
    request,
  }) => {
    const response = await ApiTestContext.POST(
      request,
      EndPoint.Devices.Add,
      deviceAddPayload
    );
    expect(response.status(), 'Devices add should return 200').toBe(200);
  });

  test('[API] POST /api/devices/edit – Devices edit returns 200', { tag: ['@edit'] }, async ({
    request,
  }) => {
    const listRes = await ApiTestContext.postWithBody(
      request,
      EndPoint.Devices.Get,
      devicesGetFormBody
    );
    expect(listRes.status(), 'Devices get should return 200 to obtain a device for edit').toBe(200);
    const listJson = await listRes.json();
    const data = listJson?.data;
    const items = Array.isArray(data) ? data : data ? Object.values(data) : [];
    const firstRow = items[0] as { data?: string } | undefined;
    if (!firstRow?.data) {
      test.skip(true, 'No devices returned; cannot run edit test');
      return;
    }
    const device: IDevicesData = JSON.parse(firstRow.data);
    const response = await ApiTestContext.POST(request, EndPoint.Devices.Edit, device);
    expect(response.status(), 'Devices edit should return 200').toBe(200);
  });

  test('[API] POST /api/multi – DeviceAndLocation get returns 200', {
    tag: ['@get'],
  }, async ({ request }) => {
    const response = await ApiTestContext.POST(
      request,
      EndPoint.DeviceAndLocation.Get,
      deviceAndLocationGetPayload
    );
    expect(response.status(), 'DeviceAndLocation get should return 200').toBe(200);
  });

  test('[API] POST /api/devices/get/server – Devices get returns 200', {
    tag: ['@get'],
  }, async ({ request }) => {
    const response = await ApiTestContext.postWithBody(
      request,
      EndPoint.Devices.Get,
      devicesGetFormBody
    );
    expect(response.status(), 'Devices get should return 200').toBe(200);
  });

  test('[API] POST /api/devices/delete – Devices delete returns 200', {
    tag: ['@delete'],
  }, async ({ request }) => {
    const addRes = await ApiTestContext.POST(
      request,
      EndPoint.Devices.Add,
      { ...deviceAddPayload, name: 'API Test Device To Delete' }
    );
    expect(addRes.status(), 'Add device should return 200').toBe(200);
    const addJson = await addRes.json();
    const device: IDevicesData = addJson?.data;
    if (!device?.id) {
      test.skip(true, 'Add did not return device with id; cannot run delete test');
      return;
    }
    const response = await ApiTestContext.POST(request, EndPoint.Devices.Delete, device);
    expect(response.status(), 'Devices delete should return 200').toBe(200);
  });

  test('[API] POST /api/devices/disable – Devices disable returns 200', {
    tag: ['@disable'],
  }, async ({ request }) => {
    const listRes = await ApiTestContext.postWithBody(
      request,
      EndPoint.Devices.Get,
      devicesGetFormBody
    );
    expect(listRes.status(), 'Devices get should return 200').toBe(200);
    const listJson = await listRes.json();
    const data = listJson?.data;
    const items = Array.isArray(data) ? data : data ? Object.values(data) : [];
    const firstRow = items[0] as { data?: string } | undefined;
    if (!firstRow?.data) {
      test.skip(true, 'No devices returned; cannot run disable test');
      return;
    }
    const device: IDevicesData = JSON.parse(firstRow.data);
    const response = await ApiTestContext.POST(request, EndPoint.Devices.Disable, {
      data: device,
    });
    expect(response.status(), 'Devices disable should return 200').toBe(200);
  });
});
