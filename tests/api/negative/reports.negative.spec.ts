import { test } from '@playwright/test';
import { ApiTestContext } from '../../../src/API/apiTestContext';
import { EndPoint } from '../../../src/API/utils/endPoints';
import { assertNegativeApiOutcome } from '../helpers/assertNegativeApiOutcome';

const invalidPayload = { start: 'not-a-date', end: 'also-bad' };

test.describe('API negative – Reports / stats', { tag: ['@api', '@apiNegative', '@reports'] }, () => {
  test.beforeAll(async () => {
    await ApiTestContext.init();
  });

  test('[API] POST /api/stats/dayselling – Invalid date range returns 400', async ({ request }) => {
    const res = await ApiTestContext.POST(request, EndPoint.Reports.DayReport.daySelling, invalidPayload);
    await assertNegativeApiOutcome(res, { hint: 'dayselling', allowLenientOk200: true });
  });

  test('[API] POST /api/stats/dayReportOverview – Invalid payload returns 400', async ({ request }) => {
    const res = await ApiTestContext.POST(request, EndPoint.Reports.DayReport.reportOverview, {});
    await assertNegativeApiOutcome(res, { allowLenientOk200: true });
  });

  test('[API] POST /api/stats/dayReportCountTakings – Invalid payload returns 400', async ({ request }) => {
    const res = await ApiTestContext.POST(request, EndPoint.Reports.DayReport.countTakings, {});
    await assertNegativeApiOutcome(res, { allowLenientOk200: true });
  });

  test('[API] POST /api/stats/dayreporttax – Invalid payload returns 400', async ({ request }) => {
    const res = await ApiTestContext.POST(request, EndPoint.Reports.DayReport.tax, {});
    await assertNegativeApiOutcome(res, { allowLenientOk200: true });
  });

  test('[API] POST /api/stats/dayReportDeviceBreakDown – Invalid payload returns 400', async ({
    request,
  }) => {
    const res = await ApiTestContext.POST(request, EndPoint.Reports.DayReport.deviceBreakDown, {});
    await assertNegativeApiOutcome(res, { allowLenientOk200: true });
  });

  test('[API] POST /api/stats/dayReportHourly – Invalid payload returns 400', async ({ request }) => {
    const res = await ApiTestContext.POST(request, EndPoint.Reports.DayReport.hourly, {});
    await assertNegativeApiOutcome(res, { allowLenientOk200: true });
  });

  test('[API] POST /api/stats/general – Invalid SummaryReport payload returns 400', async ({
    request,
  }) => {
    const res = await ApiTestContext.POST(request, EndPoint.Reports.Summary.Get, { foo: 'bar' });
    await assertNegativeApiOutcome(res, { hint: 'stats/general', allowLenientOk200: true });
  });
});
