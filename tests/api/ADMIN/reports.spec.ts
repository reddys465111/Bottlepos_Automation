import { test, expect } from '@playwright/test';
import { ApiTestContext } from '../../../src/API/apiTestContext';
import { EndPoint } from '../../../src/API/utils/endPoints';

/** Minimal payload for report endpoints; backend may accept empty or require date range. */
const reportPayload = {};

test.describe('API – Reports (stats)', { tag: ['@api', '@admin', '@reports'] }, () => {
  test.beforeAll(async () => {
    await ApiTestContext.init();
  });

  test('[API] POST /api/stats/general – SummaryReport get returns 200', { tag: ['@get'] }, async ({
    request,
  }) => {
    const response = await ApiTestContext.POST(
      request,
      EndPoint.Reports.Summary.Get,
      reportPayload
    );
    expect(response.status(), 'SummaryReport get should return 200').toBe(200);
  });

  test('[API] POST /api/stats/dayselling – DayReport daySelling returns 200', {
    tag: ['@dayReport'],
  }, async ({ request }) => {
    const response = await ApiTestContext.POST(
      request,
      EndPoint.Reports.DayReport.daySelling,
      reportPayload
    );
    expect(response.status(), 'DayReport daySelling should return 200').toBe(200);
  });

  test('[API] POST /api/stats/dayReportOverview – DayReport reportOverview returns 200', {
    tag: ['@dayReport'],
  }, async ({ request }) => {
    const response = await ApiTestContext.POST(
      request,
      EndPoint.Reports.DayReport.reportOverview,
      reportPayload
    );
    expect(response.status(), 'DayReport reportOverview should return 200').toBe(200);
  });

  test('[API] POST /api/stats/dayReportCountTakings – DayReport countTakings returns 200', {
    tag: ['@dayReport'],
  }, async ({ request }) => {
    const response = await ApiTestContext.POST(
      request,
      EndPoint.Reports.DayReport.countTakings,
      reportPayload
    );
    expect(response.status(), 'DayReport countTakings should return 200').toBe(200);
  });

  test('[API] POST /api/stats/dayReportHourly – DayReport hourly returns 200', {
    tag: ['@dayReport'],
  }, async ({ request }) => {
    const response = await ApiTestContext.POST(
      request,
      EndPoint.Reports.DayReport.hourly,
      reportPayload
    );
    expect(response.status(), 'DayReport hourly should return 200').toBe(200);
  });

  test('[API] POST /api/stats/dayReportDeviceBreakDown – DayReport deviceBreakDown returns 200', {
    tag: ['@dayReport'],
  }, async ({ request }) => {
    const response = await ApiTestContext.POST(
      request,
      EndPoint.Reports.DayReport.deviceBreakDown,
      reportPayload
    );
    expect(response.status(), 'DayReport deviceBreakDown should return 200').toBe(200);
  });

  test('[API] POST /api/stats/dayreporttax – DayReport tax returns 200', {
    tag: ['@dayReport'],
  }, async ({ request }) => {
    const response = await ApiTestContext.POST(
      request,
      EndPoint.Reports.DayReport.tax,
      reportPayload
    );
    expect(response.status(), 'DayReport tax should return 200').toBe(200);
  });
});
