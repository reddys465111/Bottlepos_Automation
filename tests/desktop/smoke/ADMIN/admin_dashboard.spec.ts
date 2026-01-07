import { test, expect } from "@playwright/test";
import { ADMIN } from "../../../../src/section/ADMIN";
import { Initializer, ITEMS } from "../../../../src/utils";

//This block runs before each test
test.beforeEach(async ({ page }) => {
  await Initializer.Init(page, { Admin: true });
});

//This block runs after each test
test.afterEach(async ({ page }, testInfo) => {
  await Initializer.Finalize(page, testInfo);
});

test.describe("Admin Section - Dashboard", { tag: ['@smoke', '@admin', '@dashboard'] }, () => {

  test('[T10728] Admin: Realtime dashboard elements are fully functional', { tag: ['@stats', '@nonparallelizable'] }, async ({ }) => {
    //Login the Admin Console
    await ADMIN.Login.In();
    // Click on Refresh button
    await ADMIN.Refresh.Click();
    // Click on Sales inside Todays Takings
    await ADMIN.Dashboard.Todays_Takings.Sales.Click();
    // Verify that a modal appears
    expect(await ADMIN.Dialog.ReportTransaction.IsVisible(), 'Error: Item not found dialog should be visible').toBeTruthy();
    // Click on Close button in the modal
    await ADMIN.Dialog.ReportTransaction.Close.Click();
    // Click on Refunds inside Todays Takings
    await ADMIN.Dashboard.Todays_Takings.Refunds.Click();
    // Verify that a modal appears
    expect(await ADMIN.Dialog.ReportTransaction.IsVisible(), 'Error: Item not found dialog should be visible').toBeTruthy();
    // Click on Close button in the modal
    await ADMIN.Dialog.ReportTransaction.Close.Click();
    // Click on Voids inside Todays Takings
    await ADMIN.Dashboard.Todays_Takings.Voids.Click();

    // Check if the dialog is visible
    const isDialogVisible = await ADMIN.Dialog.ReportTransaction.IsVisible();

    if (isDialogVisible) {
      console.log("Void Dialog found. Proceeding to close.");
      await ADMIN.Dialog.ReportTransaction.Close.Click();
    } else {
      console.log("Void  Dialog  not found.No Void Sales present for today.");
    }

    // Click on Net Sales inside Todays Takings
    await ADMIN.Dashboard.Todays_Takings.NetSales.Click();
    // Verify that a modal appears
    expect(await ADMIN.Dialog.ReportTransaction.IsVisible(), 'Error: Item not found dialog should be visible').toBeTruthy();
    // Click on Close button in the modal
    await ADMIN.Dialog.ReportTransaction.Close.Click();
    // Click on Top Rank Items Card
    await ADMIN.Dashboard.TopRankItems.RankButton.Click();
    // Verify that the dropdown is visible
    expect(await ADMIN.Dashboard.TopRankItems.RankDropdown.IsVisible(), 'Error: Top Rank Items dropdown should be visible').toBeTruthy();
    // Click on Sales Graph Card
    await ADMIN.Dashboard.SalesGraph.RangeButton.Click();
    // Verify that the dropdown is visible
    expect(await ADMIN.Dashboard.SalesGraph.RangeDropdown.IsVisible(), 'Error: Sales Graph dropdown should be visible').toBeTruthy();
    // Click on Sales Stats Card
    // Click on Pie Rank
    await ADMIN.Dashboard.SalesStats.PieRank.Click();
    // Verify that the dropdown is visible
    expect(await ADMIN.Dashboard.SalesStats.PieRankDropdown.IsVisible(), 'Error: Sales Stats Pie Rank dropdown should be visible').toBeTruthy();
    // Click on Inventory Stats Card
    await ADMIN.Dashboard.InventroryStats.PieInRank.Click();
    // Verify that the dropdown is visible
    expect(await ADMIN.Dashboard.InventroryStats.PieInRankDropdown.IsVisible(), 'Error: Inventory Stats dropdown should be visible').toBeTruthy();
  });


  test("[C10736] filter top-selling items by Rank category.", { tag: [] }, async () => {
    // Step 1: Log in to the Admin portal
    await ADMIN.Login.In();

    // Step 2: Define expected top-selling items for each rank
    const rankToItemMap = {
      A: ITEMS.RankA.TITLE,
      B: ITEMS.RankB.TITLE,
      C: ITEMS.RankC.TITLE,
      D: ITEMS.RankD.TITLE,
    };

    // Step 3: Iterate through each rank and validate corresponding items
    for (const [rank, expectedItem] of Object.entries(rankToItemMap)) {
      await test.step(`Validate Rank ${rank} shows item "${expectedItem}"`, async () => {
        // Step 3.1: Open the dropdown and select the current rank
        await ADMIN.Dashboard.SelectRank(rank);

        // Step 3.2: Fetch item titles shown under the selected rank
        const itemTitles = await ADMIN.Dashboard.PopularItems.GetTitles();

        // Step 3.3: Check that the expected item is present in the filtered list
        expect(
          itemTitles,
          `Expected item "${expectedItem}" not found in Rank ${rank} items: ${JSON.stringify(
            itemTitles
          )}`
        ).toContain(expectedItem);
      });
    }
  });

  test("[C10737] Validate structure and data of Top Rank Items table", { tag: ['@rank'] }, async () => {
    await ADMIN.Login.In();

    // Step 1: Wait until popular items are loaded
    expect(await ADMIN.Dashboard.PopularItems.HasData()).toBeTruthy();

    // Step 2: Validate table headers
    const headers = await ADMIN.Dashboard.PopularItems.GetHeaders();
    expect(headers).toEqual(["Name", "Qty", "Value"]);

    // Step 3: Validate each row has correct structure and format
    const rows = await ADMIN.Dashboard.PopularItems.GetRows();
    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];

      await test.step(`Validate row ${i + 1}: ${JSON.stringify(
        row
      )}`, async () => {
        expect(row.name.trim()).not.toBe("");
        expect(row.quantity.trim()).not.toBe("");
        expect(row.value.trim()).toMatch(/^-?\$\d{1,3}(,\d{3})*(\.\d{2})?$/);
      });
    }
  });

  test("[T10746] Use the Days filter in the Sale Stats section view sales metrics for specific date ranges.", { tag: [] }, async () => {
    // Step 1: Log in to the Admin portal
    await ADMIN.Login.In();

    // Step 2: Define all expected date range options
    const ranges = [
      "Today",
      "Yesterday",
      "Last 7 Days",
      "Last 30 Days",
      "Last Month",
      "This Month",
      
    ];

    // Step 3: Loop through each range and validate selection behavior
    for (const label of ranges) {
      await test.step(`Select and verify date range: "${label}"`, async () => {
        // Step 3.1: Select the date range from the filter dropdown
        await ADMIN.Dashboard.SelectDateRange(label);

        // Step 3.2: Read the label displayed after selection
        const selected = await ADMIN.Dashboard.DateFilter.Display.innerText();

        // Step 3.3: Validate that the displayed label matches the selected one
        expect(
          selected.trim(),
          `Selected date range label mismatch. Expected: "${label}", Found: "${selected.trim()}"`
        ).toBe(label);
      });
    }
  });
});
