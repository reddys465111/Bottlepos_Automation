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
                Type: NonCashAdj_DualPrincingType.DualPricing,
                Percentage: "5",
                ShowCashRegularPriceOnPayButton: true,
            }
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
    //test.describe.configure({ mode: 'serial' });
    test('[C4037] Verify checkout Dual price calculation', { tag: ['@dualprice', '@nca'] }, async ({ page }) => {
        // --- Step 1: Login to POS ---
        await POS.Login.In();

        // --- Step 2: Add Items to Cart ---
        await POS.Register.AddItemByStockcode({ stockCode: ITEMS.JACK.BARCODE });
        await POS.Register.AddItemByStockcode({ stockCode: ITEMS.BUDLIGHT.BARCODE });

        // --- Step 3: Wait for cart update ---
        await page.waitForTimeout(2000);

        // --- Step 4: Get Dual Price label from Pay button ---
        const dualPriceLabel = await POS.Register.PayButton.GetLabel();
     
        // --- Step 5: Extract cash amount from label ---
        const match = dualPriceLabel.match(/Cash:\s*(\$\d+\.\d{2})/);
        const payCashAmount = match ? match[1] : null;

        // --- Step 6: Proceed to Checkout ---
        await POS.Register.PayButton.Click();

        // --- Step 7: Get Checkout Cash Amount ---
        const checkoutCashAmount = await POS.Dialog.Checkout.CashTotal.getText();

        // --- Step 8: Verify amounts match ---
        expect(payCashAmount).toEqual(checkoutCashAmount);
    });

  
    test('[C4149] Verify Dual Pricing amounts are reflected in Summary Report for Card Sales', { tag: ['@bug', '@DualPrice', '@Reports', '@SummaryReport'] }, async ({ page }) => {
        await API.Init();
        const summaryReport = await API.Reports.SummaryReport();
        const oldGrossSales = Number(summaryReport.GrossSales?.Total);
        await API.Finish();

        // --- Step 1: Complete a Card Sale with Dual Pricing in POS ---
        await POS.Login.In();
        await POS.Register.AddItemByStockcode({ stockCode: ITEMS.JACK.BARCODE });
        const AdditionalfeesStr  = await POS.Register.Additionalfees.getText();
        const Additionalfees  = Reports.parseCurrency(AdditionalfeesStr);
        await POS.Register.PayButton.Click();

        const totalAmountStr = await POS.Dialog.Checkout.RegularTotal.getText();
        const totalAmount = Reports.parseCurrency(totalAmountStr);
        const GrossTotal = totalAmount - Additionalfees;
       
        await payfac.Read({ amount: totalAmount });
        await POS.Dialog.Checkout.Card.Click();
        await POS.Dialog.Success.Close.Click();

        // --- Step 2: Open Summary Report in Admin ---
        await POS.Admin.Click();
        await ADMIN.Menu.Reports.GoTo();

        // --- Step 3: Verify Gross Sales updated with DP-inclusive amount ---
        const grossSalesStr = await ADMIN.Reports.SummaryReportTable.GetCellValue(
            { getValueFrom: "Total" },
            { rowQuery: [{ rowColumn: "label", rowValue: "Gross Sales" }] }
        );
        const grossSales = Reports.parseCurrency(grossSalesStr);
        const deltaGrossSales = (grossSales - oldGrossSales);
        expect(
            deltaGrossSales,
            'Error: Gross Sales did not include DP-inclusive card sale'
        ).toBeCloseTo(GrossTotal);

        // --- Step 4: Drill into Card Sales transactions ---
        await ADMIN.Reports.SummaryReportTable.ClickCell(
            { clickOn: "# Sales" },
            { rowQuery: [{ rowColumn: "label", rowValue: "Card" }] }
        );

        await ADMIN.Dialog.ReportTransaction.TransactionTable.SortByColumn({
            columnTitle: "Time",
            sortOrder: "descending"
        });

        const cardTxnTotalStr = await ADMIN.Dialog.ReportTransaction.TransactionTable.GetCellValue(
            { getValueFrom: "Total" },
            { rowIndex: 1 }
        );
        const cardTxnTotal = Reports.parseCurrency(cardTxnTotalStr);
        expect(
            cardTxnTotal,
            'Error: Card Sale transaction did not match DP-inclusive sale total'
        ).toEqual(totalAmount);

        await ADMIN.Dialog.ReportTransaction.Close.Click();

        // --- Step 5: Drill into Gross Sales transactions ---
        await ADMIN.Reports.SummaryReportTable.ClickCell(
            { clickOn: "# Sales" },
            { rowQuery: [{ rowColumn: "label", rowValue: "Gross Sales" }] }
        );

        await ADMIN.Dialog.ReportTransaction.TransactionTable.SortByColumn({
            columnTitle: "Time",
            sortOrder: "descending"
        });

        const grossTxnTotalStr = await ADMIN.Dialog.ReportTransaction.TransactionTable.GetCellValue(
            { getValueFrom: "Total" },
            { rowIndex: 1 }
        );
        const grossTxnTotal = Reports.parseCurrency(grossTxnTotalStr);
        expect(
            grossTxnTotal,
            'Error: Gross Sales transaction did not match DP-inclusive sale total'
        ).toBeCloseTo(totalAmount);

    });

    test('[C4185] Verify Dual Pricing amount is included in Card Sales', { tag: ['@DualPrice', '@Reports', '@SummaryReport', '@nonparallelizable'] }, async ({ page }) => {

        await API.Init();
        const summaryReport = await API.Reports.SummaryReport();
        const oldCard = Number(summaryReport.Card?.Total);
        await API.Finish();

        // --- Step 1: Login ---
        await POS.Login.In();

        // --- Step 2: Complete a Card Sale with Dual Pricing ---
        await POS.Register.AddItemByStockcode({ stockCode: ITEMS.JACK.BARCODE });
        await POS.Register.AddItemByStockcode({ stockCode: ITEMS.BUDLIGHT.BARCODE });

        await POS.Register.PayButton.Click();

        const cardTotalStr = await POS.Dialog.Checkout.RegularTotal.getText();
        const cardTotal = Reports.parseCurrency(cardTotalStr);

        await payfac.Read({ amount: cardTotal });
        await POS.Dialog.Checkout.Card.Click();
        await POS.Dialog.Success.Close.Click();

        // --- Step 3: Capture Card Sales after transaction ---
        await POS.Admin.Click();
        await ADMIN.Menu.Reports.GoTo();

        const newCardStr = await ADMIN.Reports.SummaryReportTable.GetCellValue(
            { getValueFrom: "Total" },
            { rowQuery: [{ rowColumn: "label", rowValue: "Card" }] }
        );
        const newCard = Reports.parseCurrency(newCardStr);

        // --- Step 4: Validate Card Sales increased by transaction amount ---
        const delta = newCard - oldCard;
        expect(
            delta,
            `Error: Card Sales delta (${delta}) did not equal sale total (${cardTotal})`
        ).toBeCloseTo(cardTotal);

    });

    test('[C4186] Verify DP amount is included in Additional Card Fee on Summary Report', { tag: ['@DualPrice', '@Reports', '@SummaryReport', '@nonparallelizable'] }, async ({ page }) => {
        await API.Init();
        const summaryReport = await API.Reports.SummaryReport();
        const oldCardFee = Number(summaryReport.CardFee?.Total ?? 0);
        await API.Finish();

        // --- Step 1: Login into POS ---
        await POS.Login.In();

        // --- Step 2: Complete a Card Sale with Dual Pricing ---
        await POS.Register.AddItemByStockcode({ stockCode: ITEMS.JACK.BARCODE });
        await POS.Register.PayButton.Click();

        const dpTotalStr = await POS.Dialog.Checkout.RegularTotal.getText();
        const dpTotal = Reports.parseCurrency(dpTotalStr);

        await payfac.Read({ amount: dpTotal });
        await POS.Dialog.Checkout.Card.Click();
        await POS.Dialog.Success.Close.Click();

        // --- Step 3: Capture Additional Card Fee after transaction (UI) ---
        await POS.Admin.Click();
        await ADMIN.Menu.Reports.GoTo();
        const newCardFeeStr = await ADMIN.Reports.SummaryReportTable.GetCellValue(
            { getValueFrom: "Total" },
            { rowQuery: [{ rowColumn: "label", rowValue: "Additional Card Fee" }] }
        );
        const newCardFee = Reports.parseCurrency(newCardFeeStr);

        // --- Step 4: Validate DP fee was included in Additional Card Fee ---
        const delta = newCardFee - oldCardFee;
        expect(
            delta,
            `Error: Additional Card Fee delta (${delta}) did not equal DP fee for transaction`
        ).toBeGreaterThan(0);

    });

    //Day report is throwing and SQL error
    test('[C4187] Verify Dual Price Total Tendered matches in Day Report', { tag: ['@bug', '@DualPrice', '@TotalTendered', '@Reports'] }, async ({ page }) => {
        await API.Init();
        const  dayReport = await API.Reports.DayReport();
        const  InitalTendervalue = Number(dayReport.TOTAL_TENDERED ?? 0);
        const  InitalRegistervalue = Number(dayReport.TOTAL_REGISTER ?? 0);
        await API.Finish();

        // --- Step 1: Login to POS ---
        await POS.Login.In();

        // --- Step 2: Complete multiple Dual Pricing transactions ---
        for (let i = 0; i < 5; i++) {   // adjust to 30 for full regression
            await POS.Register.AddItemByStockcode({ stockCode: ITEMS.JACK.BARCODE });
            await POS.Register.PayButton.Click();
            await POS.Dialog.Checkout.ClickCashPaymentButton({ index: 1 });
            await POS.Dialog.CheckoutComplete.No.Click();
            await page.waitForTimeout(1000);
        }

        // --- Step 3: Open Day Report ---
        await POS.Admin.Click();
        await ADMIN.Menu.Reports.GoTo();
        await ADMIN.Reports.ReportType.SelectOption({ byText: 'Day Report' });

        if (await ADMIN.Dialog.DayReportConfirmation.IsVisible()) {
            await ADMIN.Dialog.DayReportConfirmation.Close.Click();
        }

        // --- Step 4: Fetch TOTAL TENDERED and TOTAL REGISTER using Table_DayReport helpers ---
        const totalTenderedStr = await ADMIN.Reports.DayReport.Table.GetCellValueByRowLabel('TOTAL TENDERED', 3);
        const totalRegisterStr = await ADMIN.Reports.DayReport.Table.GetCellValueByRowLabel('TOTAL REGISTER', 3);

        const deltaTendered = Reports.parseCurrency(totalTenderedStr) - InitalTendervalue;
        const deltaRegister = Reports.parseCurrency(totalRegisterStr) - InitalRegistervalue;
        // Normalize and parse as numbers
      

        // --- Step 5: Validate ---
        expect(
        deltaTendered,
        `Error: Total Tendered (${deltaTendered}) did not match Total Register (${deltaRegister}) with DP enabled`
        ).toEqual(deltaRegister);
    });

    test('[C4568] Verify DP amount is excluded from Hourly Sales in Day Report', { tag: ['@DualPrice', '@Reports', '@DayReport', '@nonparallelizable'] }, async ({ page }) => {
        await API.Init();
        const dayReport = await API.Reports.DayReport();
        const oldHourlySales = Number(dayReport.Total_Hourly_Sales ?? 0);
        await API.Finish();
        
        // --- Step 1: Login ---
        await POS.Login.In();
        await POS.Register.AddItemByStockcode({ stockCode: ITEMS.JACK.BARCODE });
        await POS.Register.PayButton.Click();

        const dpSaleTotalStr = await POS.Dialog.Checkout.RegularTotal.getText();
        const dpSaleTotal = Reports.parseCurrency(dpSaleTotalStr);

        await payfac.Read({ amount: dpSaleTotal });
        await POS.Dialog.Checkout.Card.Click();
        await POS.Dialog.Success.Close.Click();

        // --- Step 5: Capture Hourly Sales after transaction ---
        await POS.Admin.Click();
        await ADMIN.Menu.Reports.GoTo();
        await ADMIN.Reports.ReportType.SelectOption({ byText: 'Day Report' });
        const newHourlySalesStr = await ADMIN.Reports.DayReport.Table.GetCellValueByRowLabel("Hourly Sales", 3);
        const newHourlySales = Reports.parseCurrency(newHourlySalesStr);

        // --- Step 6: Validate Hourly Sales exclude DP ---
        const delta = newHourlySales - oldHourlySales;
        expect(delta, `Hourly Sales delta (${delta}) should not equal full DP sale total (${dpSaleTotal})`).not.toEqual(dpSaleTotal);

    });

    test('[C4188] Verify refund of completed sale includes Dual Pricing amount', { tag: ['@DualPrice', '@Refund', '@Reports', '@SummaryReport', '@nonparallelizable'] }, async ({ page }) => {

        // --- Step 1: Login ---
        await POS.Login.In();

        // --- Step 2: Complete a Dual Pricing Sale ---
        await POS.Register.Click();
        await POS.Register.AddItemByStockcode({ stockCode: ITEMS.JACK.BARCODE });
        await POS.Register.PayButton.Click();

        const saleTotalStr = await POS.Dialog.Checkout.RegularTotal.getText();
        const saleTotal = Reports.parseCurrency(saleTotalStr);

        await payfac.Read({ amount: saleTotal });
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
        expect(RefundedTotal,`Refund should equal sale total (${saleTotal})`).toEqual(saleTotal);
    });
});
