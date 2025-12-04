import { test, expect } from '@playwright/test';
import { ADMIN } from '../../../../src/section/ADMIN';
import { POS } from '../../../../src/section/POS';
import { Initializer, ITEMS, payfac} from '../../../../src/utils';
import { Reports } from '../../../../src/section/POS/pages/reports/reports';
import { NonCashAdj_DualPrincingType } from '../../../../src/API/useCases/ADMIN';
import { API } from '../../../../src/API/API';

//This block runs before each test
test.beforeEach(async ({ page }) => {
    // --- Step 0: Precondition - Enable Dual Pricing via API ---
    await Initializer.Init(page, {
        Scenario: {
            Admin: {
                Settings: {
                AccountingSettings: {
                    NonCashAdj_DualPricing: {
                    Type: NonCashAdj_DualPrincingType.NonCashAdj,
                    Percentage: "5",
                    },
                },
                },
            },
        }
    });
    await payfac.Init(page);
});

//This block runs after each test
test.afterEach(async ({ page }, testInfo) => {
    await Initializer.LoadScenario({
        Admin: {
            Settings: {
                AccountingSettings: {
                NonCashAdj_DualPricing: {
                    Type: NonCashAdj_DualPrincingType.Select,
                }
                },
            },
        },
    });

  await Initializer.Finalize(page, testInfo);
});

test.describe("TestRail POS Test Cases Dual Pricing and nca", { tag: ['@DualPricing', '@nca','@regression','@nonparallelizable'] }, () => {
    test('[C4189] Verify Gross Sales excludes NCA amount when sale is made with card using NCA', { tag: ['@NCA', '@Reports', '@SummaryReport'] }, async ({ page }) => {
        await Initializer.LoadScenario({
            
        });
        // --- Step 1: Login ---
        await POS.Login.In();
 
        // --- Step 2: Complete a sale with NCA ---
        await POS.Register.Click();
        await POS.Register.AddItemByStockcode({ stockCode: ITEMS.JACK.BARCODE });
        await POS.Register.NCApay.Click();
 
        const ncaSaleTotalStr = await POS.Dialog.Checkout.NCATotal.getText();
        const ncaSaleTotal = Reports.parseCurrency(ncaSaleTotalStr);
 
        await POS.Dialog.Checkout.ClickCashPaymentButton({ index: 1 });
        await POS.Dialog.CheckoutComplete.No.Click();
 
        // --- Step 5: Capture Gross Sales after transaction ---
        await POS.Admin.Click();
        await ADMIN.Menu.Reports.GoTo();
        await POS.Admin.Click();
        await ADMIN.Menu.Accounting_Settings.GoTo();
        await ADMIN.Settings.AccountingSettings.DuelPricing.Type.SelectOption({ byText: 'Non Cash Adj' });
        await ADMIN.Settings.AccountingSettings.DuelPricing.NcaPercentage.setText({ value: '4' });
 
        await ADMIN.Settings.AccountingSettings.DuelPricing.Save.Click();
        await ADMIN.Dialog.Success.Ok.Click();
 
        // --- Step 3: Capture Gross Sales before transaction ---
        await ADMIN.Menu.Reports.GoTo();
 
 
        await ADMIN.Reports.SummaryReportTable.ClickCell(
            { clickOn: "# Sales" },
            { rowQuery: [{ rowColumn: "label", rowValue: "Gross Sales" }] }
        );
 
        await ADMIN.Dialog.ReportTransaction.TransactionTable.SortByColumn({
            columnTitle: "Time",
            sortOrder: "descending"
        });
 
        // --- Step 4: Open Details for latest transaction ---
        const AdminGrossTotalStr = await ADMIN.Dialog.ReportTransaction.TransactionTable.GetCellValue({ getValueFrom: "Total" },{ rowIndex: 1 } );
 
        const AdminGrossTotal = Reports.parseCurrency(AdminGrossTotalStr);
 
        expect(AdminGrossTotal, `Gross Sales delta (${AdminGrossTotal}) should not equal full NCA sale total (${ncaSaleTotal})`).not.toEqual(ncaSaleTotal);
    });

    test('[C4190] Verify Card Sales exclude NCA amount when sale is made with card using NCA', { tag: ['@NCA', '@Reports', '@SummaryReport'] }, async ({ page }) => {
        
        await API.Init();
        const summaryReport = await API.Reports.SummaryReport();
        const cardSalesBefore = Number(summaryReport.Card?.Total ?? 0);
        await API.Finish();
        
        // --- Step 0: Precondition - Login as Admin ---
        await POS.Login.In();

        // --- Step 3: Complete a Sale with NCA + Card ---
        await POS.Register.AddItemByStockcode({ stockCode: ITEMS.JACK.BARCODE });
        await POS.Register.NCApay.Click();

        const ncaSaleTotalStr = await POS.Dialog.Checkout.NCATotal.getText();
        const ncaSaleTotal = Reports.parseCurrency(ncaSaleTotalStr);

        await payfac.Read({ amount: ncaSaleTotal });
        await POS.Dialog.Checkout.Card.Click();
        await POS.Dialog.Success.Close.Click();

        // --- Step 4: Capture Card Sales After Transaction ---
        await POS.Admin.Click();
        await ADMIN.Menu.Reports.GoTo();
        const cardSalesAfterStr = await ADMIN.Reports.SummaryReportTable.GetCellValue(
                                            { getValueFrom: "Total" },
                                            { rowQuery: [{ rowColumn: 1, rowValue: "Card" }] });

      
        const cardSalesAfter = Reports.parseCurrency(cardSalesAfterStr);

        // --- Step 5: Validate NCA not included in Card Sales total ---
        const delta = cardSalesAfter - cardSalesBefore;
        expect(delta, `Card Sales delta (${delta}) should be less than full NCA sale total (${ncaSaleTotal})`).toEqual(ncaSaleTotal);
    });

    test('[C4204] Verify NCA Total Tendered matches in Day Report', { tag: ['@NCA', '@TotalTendered', '@DayReport'] }, async ({ page }) => {

        await API.Init();
        const  dayReport = await API.Reports.DayReport();
        const  InitalTendervalue = Number(dayReport.TOTAL_TENDERED ?? 0);
        const  InitalRegistervalue = Number(dayReport.TOTAL_REGISTER ?? 0);
        await API.Finish();


        // --- Step 1: Login to POS ---
        await POS.Login.In();


        for (let i = 0; i < 5; i++) {   // TODO: increase to 30 for full regression run
            await POS.Register.AddItemByStockcode({ stockCode: ITEMS.JACK.BARCODE });
            await POS.Register.NCApay.Click();
            await POS.Dialog.Checkout.ClickCashPaymentButton({ index: 1 });
            await POS.Dialog.CheckoutComplete.No.Click();
            await page.waitForTimeout(1000);
        }

        // --- Step 4: Navigate to Day Report ---
        await POS.Admin.Click();
        await ADMIN.Menu.Reports.GoTo();
        await ADMIN.Reports.ReportType.SelectOption({ byText: 'Day Report' });

        if (await ADMIN.Dialog.DayReportConfirmation.IsVisible()) {
            await ADMIN.Dialog.DayReportConfirmation.Close.Click();
        }

        // --- Step 5: Fetch Totals ---
        const totalTenderedStr = await ADMIN.Reports.DayReport.Table.GetCellValueByRowLabel('TOTAL TENDERED', 3);
        const totalRegisterStr = await ADMIN.Reports.DayReport.Table.GetCellValueByRowLabel('TOTAL REGISTER', 3);

        const deltaTendered = Reports.parseCurrency(totalTenderedStr) - InitalTendervalue;
        const deltaRegister = Reports.parseCurrency(totalRegisterStr) - InitalRegistervalue;

        // --- Step 6: Verify Totals Match ---
        expect(deltaTendered, `Error: Total Tendered (${deltaTendered}) did not match Total Register (${deltaRegister})`)
            .toEqual(deltaRegister);
    });

    test('[C4567] Verify NCA amount is excluded from Hourly Sales in Day Report', { tag: ['@NCA', '@Reports', '@DayReport'] }, async ({ page }) => {


        await API.Init();
        const dayReport = await API.Reports.DayReport();
        const oldHourlySales = Number(dayReport.Total_Hourly_Sales ?? 0);
        await API.Finish();

        // --- Step 1: Login ---
        await POS.Login.In();    
        await POS.Register.AddItemByStockcode({ stockCode: ITEMS.JACK.BARCODE });
        await POS.Register.NCApay.Click();

        const ncaSaleTotalStr = await POS.Dialog.Checkout.NCATotal.getText();
        const ncaSaleTotal = Reports.parseCurrency(ncaSaleTotalStr);

        await payfac.Read({ amount: ncaSaleTotal });
        await POS.Dialog.Checkout.Card.Click();
        await POS.Dialog.Success.Close.Click();

        // --- Step 2: Capture Hourly Sales after transaction ---
        await POS.Admin.Click();
        await ADMIN.Menu.Reports.GoTo();
        await ADMIN.Reports.ReportType.SelectOption({ byText: 'Day Report' });
        const newHourlySalesStr = await ADMIN.Reports.DayReport.Table.GetCellValueByRowLabel("Hourly Sales", 3);
        const newHourlySales = Reports.parseCurrency(newHourlySalesStr);

        // --- Step 3: Validate Hourly Sales exclude NCA ---
        const delta = newHourlySales - oldHourlySales;
        expect(delta, `Hourly Sales delta (${delta}) should not equal full NCA sale total (${ncaSaleTotal})`).not.toEqual(ncaSaleTotal);
    });

    // this is bug need to discuss
    test.skip('[C4148] Verify NCA exclusion by Admin category', { tag: ['@DualPrice', '@ExcludeCAT'] }, async ({ page }) => {
        // --- Step 1: Login to POS ---
        await POS.Login.In();

        // --- Step 2: Add item that belongs to NCA excluded category ---
        await POS.Register.AddItemByStockcode({ stockCode: ITEMS.ExcludecatfromDualPriceitem.BARCODE });

        // --- Step 3: Proceed to Checkout ---
        await POS.Register.PayButton.Click();

        // --- Step 4: Get Cash & Card totals ---
        const cashAmount = await POS.Dialog.Checkout.CashTotal.getText();
        const cardAmount = await POS.Dialog.Checkout.RegularTotal.getText();

        // --- Step 5: Validate Cash and Card are equal (NCA exclusion applies) ---
        expect( cashAmount, 'Error: Cash and Card amount should be same for NCA excluded category').toEqual(cardAmount);
    });

    test('[C4191] Verify refunded sale with NCA includes full NCA amount', { tag: ['@NCA', '@Refund', '@Reports', '@SummaryReport'] }, async ({ page }) => {
        // --- Step 1: Login ---
        await POS.Login.In();

        // --- Step 2: Complete a Dual Pricing Sale ---
        await POS.Register.Click();
        await POS.Register.AddItemByStockcode({ stockCode: ITEMS.JACK.BARCODE });
        await POS.Register.NCApay.Click();
       

        const ncaTotalStr = await POS.Dialog.Checkout.NCATotal.getText();
        const ncaTotal = Reports.parseCurrency(ncaTotalStr);

        await payfac.Read({ amount: ncaTotal });
        await POS.Dialog.Checkout.Card.Click();
        await POS.Dialog.Success.Close.Click();

        // --- Step 4: Refund the Sale ---
        await POS.Sales.Click();
        await POS.Sales.transactions.Table.ViewTransactionDetail({ byIndex: 1 });
        await POS.Dialog.TransactionDetails.Refund.Click();
       
        const refundTotalStr = await POS.Dialog.RefundTransaction.Total.getText();
        const refundTotal = Reports.parseCurrency(refundTotalStr);

        await payfac.Refund({ amount: refundTotal });
        await POS.Dialog.RefundTransaction.Card.Click();
        await POS.Dialog.Confirmation.Yes.Click();

        // --- Step 5: Verify refund completed successfully ---
        if (await POS.Dialog.Error.IsVisible()) {
            const alertMessage = await POS.Dialog.Error.GetMessage();
            expect(alertMessage, "Refund should not show error alert").toBe("");
        }

        await expect(POS.Dialog.Success.IsVisible()).resolves.toBeTruthy();
        await POS.Dialog.Success.Close.Click();

        // --- Step 6: Refund Amount verification ---
        await POS.Admin.Click();
        await ADMIN.Menu.Reports.GoTo();

        await ADMIN.Reports.SummaryReportTable.ClickCell(
            { clickOn: "# Sales" },
            { rowQuery: [{ rowColumn: "label", rowValue: "Refunds" }] }
        );

         await ADMIN.Dialog.ReportTransaction.TransactionTable.SortByColumn({
            columnTitle: "Time",
            sortOrder: "descending"
        });

        const RefundedTotalStr = await ADMIN.Dialog.ReportTransaction.TransactionTable.GetCellValue(
            { getValueFrom: "Total" },
            { rowIndex: 1 }
        );
        const RefundedTotal = Reports.parseCurrency(RefundedTotalStr);

        // --- Step 7: Validate refund amount matches DP-inclusive sale ---
        expect(RefundedTotal,`Refund should equal nca total (${ncaTotal})`).toEqual(ncaTotal);
    });
});
