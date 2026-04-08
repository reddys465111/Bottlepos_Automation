import { test, expect } from '@playwright/test';
import { ADMIN } from '../../../../src/section/ADMIN';
import { POS } from '../../../../src/section/POS';
import { Initializer, ITEMS, KEY, payfac, Session } from '../../../../src/utils';
import { Reports } from '../../../../src/section/POS/pages/reports/reports';


//This block runs before each test
test.beforeEach(async ({ page }) => {
    await Initializer.Init(page, {
        Scenario: {
            Admin: {
                Settings: {
                    GeneralSettings: {
                        CreditCard: {
                            PayFac: {
                                Enable: true,
                            }
                        }
                    },
                    POSSettings: {
                        SaleOptions: {
                            AllowChangingStoredItemTax: 'Yes'
                        }
                    }
                }
            }
        }
    });
    await payfac.Init(page);
});

//This block runs after each test
test.afterEach(async ({ page }, testInfo) => {
    await Initializer.Finalize(page, testInfo);
});

test.describe("TestRail POS Test Cases Tax Reports", { tag: ['@tax report', '@regression','@nonparallelizable'] }, () => {
    test('[C4173] verify that tax amounts are calculated and displayed correctly in reports', { tag: ['@Tax', '@nonparallelizable'] }, async () => {
        await POS.Login.In();

        // --- Step 1: Ring first item (Taxable) ---
        await POS.Register.AddItemByStockcode({ stockCode: ITEMS.CROWN.BARCODE });
        await POS.Dialog.AgeVerification.Yes.Click();

        await POS.Register.ItemLines.SelectTax({ row: 1, taxOption: "Tax" });

        const appliedTax1 = await POS.Register.ItemLines.GetTax({ row: 1 });

        expect(appliedTax1).toContain("Tax");

        // --- Step 2: Ring second item (Non-Taxable) ---
        await POS.Register.AddItemByStockcode({ stockCode: ITEMS.JACK.BARCODE });
        await POS.Register.ItemLines.SelectTax({ row: 2, taxOption: "NoTax" });
        await POS.waitForTimeout(3000);

        const appliedTax2 = await POS.Register.ItemLines.GetTax({ row: 2 });

        expect(appliedTax2).toContain("NoTax");

        // --- Step 2: Complete Transaction ---
        await POS.Register.PayButton.Click();
        await POS.Dialog.Checkout.ClickCashPaymentButton({ index: 1 });
        await POS.Dialog.CheckoutComplete.No.Click();
      


        // --- Step 3: Go to Reports and Verify ---
        await POS.Admin.Click();
        await ADMIN.Menu.Reports.GoTo();

        const dayReportTax = Reports.parseCurrency(
            await ADMIN.Reports.SummaryReportTable.GetCellValue(
                { getValueFrom: "Total" },
                { rowQuery: [{ rowColumn: "label", rowValue: "Sale Tax" }] }
            )
        );


        // --- Step 4: Go to Tax Breakdown Report and match tax amounts ---
        await ADMIN.Reports.ReportType.SelectOption({ byText: "Tax Breakdown" });


        const breakdownTaxTotal =
            await ADMIN.Reports.TaxBreakdown.Table.getTotalTax();


        expect(dayReportTax, `Error:  Tax mismatch detected:
                                     Day Report Tax: ${dayReportTax}
                                     Tax Breakdown Total: ${breakdownTaxTotal}`).toBeCloseTo(breakdownTaxTotal, 2);
    });

 
    test('[C6172] Verify multiple exclusive taxes are applied and reported correctly in Summary Report', { tag: ['@Tax','@nonparallelizable'] }, async () => {
        await POS.Login.In();

        // --- Step 1: Capture baseline Sale Tax from Summary Report ---
        await POS.Admin.Click();
        await ADMIN.Menu.Reports.GoTo();

        const salesTaxBefore = Reports.parseCurrency(
            await ADMIN.Reports.SummaryReportTable.GetCellValue(
                { getValueFrom: "Total" },
                { rowQuery: [{ rowColumn: "label", rowValue: "Sale Tax" }] }
            )
        );

        // --- Step 2: Perform a sale with exclusive multiple tax ---
        await POS.Register.Click();
        await POS.Register.AddItemByStockcode({ stockCode: ITEMS.JACK.BARCODE });
        await POS.Register.ItemLines.SelectTax({ row: 1, taxOption: "MultiExclisiveTax" });

        const appliedTax = await POS.Register.ItemLines.GetTax({ row: 1 });
        expect(appliedTax).toContain("MultiExclisiveTax");

        const TaxApplied = Reports.parseCurrency(await POS.Register.Tax.GetLabel());

        await POS.Register.PayButton.Click();
        await POS.Dialog.Checkout.ClickCashPaymentButton({ index: 1 });
        await POS.Dialog.CheckoutComplete.No.Click();

        // --- Step 3: Capture updated Sale Tax from Summary Report ---
        await POS.Admin.Click();
        await ADMIN.Menu.Reports.GoTo();

        const salesTaxAfter = Reports.parseCurrency(
            await ADMIN.Reports.SummaryReportTable.GetCellValue(
                { getValueFrom: "Total" },
                { rowQuery: [{ rowColumn: "label", rowValue: "Sale Tax" }] }
            )
        );

        // --- Step 4: Compute delta ---
        const deltaSalesTax = salesTaxAfter - salesTaxBefore;

        // --- Step 5: Assertion with detailed error message ---
        expect(deltaSalesTax, `Error: Sale Tax mismatch!
                    Expected Sale Tax to increase by applied tax for "MultiExclisiveTax"
                    Before: ${salesTaxBefore}
                    After: ${salesTaxAfter}
                    Δ: ${deltaSalesTax}`).toBeCloseTo(TaxApplied);
    });

   
    test('[C6173] Transaction details including the tax details to be accurate when multiple exclusive taxes are applied ', { tag: ['@Tax', '@nonparallelizable'] }, async () => {
        await POS.Login.In();

        await POS.Register.Click();
        await POS.Register.AddItemByStockcode({ stockCode: ITEMS.JACK.BARCODE });
        await POS.Register.ItemLines.SelectTax({ row: 1, taxOption: "MultiExclisiveTax" });

        const appliedTax = await POS.Register.ItemLines.GetTax({ row: 1 });
        await POS.waitForTimeout(3000);
        expect(appliedTax).toContain("MultiExclisiveTax");

        const TaxApplied = Reports.parseCurrency(await POS.Register.Tax.GetLabel());
        

        await POS.Register.PayButton.Click();
        await POS.Dialog.Checkout.ClickCashPaymentButton({ index: 1 });
        await POS.Dialog.CheckoutComplete.No.Click();
        await POS.Sales.Click();
        await POS.Register.Click();
        await POS.Sales.Click();
        const posref=await POS.Sales.transactions.Table.GetRefNumber(1);
    

        // --- Step 3: Capture updated Sale Tax from Summary Report ---
        await POS.Admin.Click();
        await ADMIN.Menu.Reports.GoTo();

        await ADMIN.Reports.SummaryReportTable.ClickCell(
            { clickOn: "# Sales" },
            { rowQuery: [{ rowColumn: "label", rowValue: "Cash" }] }
        );

        await ADMIN.Dialog.ReportTransaction.Search.setText({value:posref})
        // await ADMIN.Dialog.ReportTransaction.TransactionTable.SortByColumn({
        //     columnTitle: "Time",
        //     sortOrder: "descending"
        // });

        await ADMIN.Dialog.ReportTransaction.TransactionTable.ClickCell(
            { clickOn: "Details" },
            { rowIndex: 1 }
        );

        const taxes = await ADMIN.Dialog.TransactionDetails.Tax.getAllInnerTexts();
        const taxValues = taxes.map(Reports.parseCurrency);
        
        const totalTax = taxValues.reduce((a, b) => a + b, 0);
        

        expect(totalTax, `Error: Tax mismatch! 
        From Transaction Details: ${totalTax} 
        From Register: ${TaxApplied} 
        Raw spans: ${JSON.stringify(taxes)}`).toBeCloseTo(
            TaxApplied,2
        );

    });

   
    test('[C6223] Verify card transaction with multiple exclusive tax reflected correctly in Reports', { tag: ['@Tax','@nonparallelizable'] }, async () => {
        // --- Step 1: Login & Ring Item ---
        await POS.Login.In();
        await POS.Register.Click();

        // Ring item with multiple exclusive tax
        await POS.Register.AddItemByStockcode({ stockCode: ITEMS.JACK.BARCODE }); // or any item
        await POS.Register.ItemLines.SelectTax({ row: 1, taxOption: "MultiExclisiveTax" });

        // Capture subtotal from POS register
        const registerSubtotal = Reports.parseCurrency(
            await POS.Register.Subtotal.GetLabel()
        );

        // Capture Total from POS register
        const registerTotal = Reports.parseCurrency(
            await POS.Register.Total.GetLabel()
        );
        const registerTaxLabel = await POS.Register.ItemLines.GetTax({ row: 1 });
        expect(registerTaxLabel).toContain("MultiExclisiveTax");

        const registerTax = Reports.parseCurrency(await POS.Register.Tax.GetLabel());

        // --- Step 2: Checkout using Card ---
        await POS.Register.PayButton.Click();
        await payfac.Read({ amount: registerTotal });
        await POS.Dialog.Checkout.Card.Click();

        expect(await POS.Dialog.Success.IsVisible(), "Error: Payfac transaction was not approved").toBeTruthy();

        await POS.Dialog.Success.Close.Click();
         await POS.Sales.Click();
        await POS.Register.Click();
        await POS.Sales.Click();
        const posref=await POS.Sales.transactions.Table.GetRefNumber(1);

        // --- Step 3: Reports → Filter for Card transactions ---
        await POS.Admin.Click();
        await ADMIN.Menu.Reports.GoTo();

        // Filter to "Card" in Summary Report
        await ADMIN.Reports.SummaryReportTable.ClickCell(
            { clickOn: "# Sales" },
            { rowQuery: [{ rowColumn: "label", rowValue: "Card" }] }
        );

       await ADMIN.Dialog.ReportTransaction.Search.setText({value:posref})

        // --- Step 4: Open Details for latest transaction ---
        await ADMIN.Dialog.ReportTransaction.TransactionTable.ClickCell(
            { clickOn: "Details" },
            { rowIndex: 1 }
        );

        // --- Step 5: Validate Taxes & Totals ---
        const taxes = await ADMIN.Dialog.TransactionDetails.Tax.getAllInnerTexts();
        const taxValues = taxes.map(Reports.parseCurrency);
        const reportTax = taxValues.reduce((a, b) => a + b, 0);

        const reportSubtotal = Reports.parseCurrency(
            await ADMIN.Dialog.TransactionDetails.Subtotal.getText()
        );
        const reportTotal = Reports.parseCurrency(
            await ADMIN.Dialog.TransactionDetails.Total.getText()
        );


        expect(reportSubtotal, `Error: Subtotal mismatch! Register=${registerSubtotal}, Report=${reportSubtotal}`).toBeCloseTo(registerSubtotal,2);

        
        expect(reportTax,`Error: Tax mismatch! Register=${registerTax}, Report=${reportTax}, Raw spans=${JSON.stringify(taxes)}`).toBeCloseTo(registerTax, 2);

        expect(reportTotal, `Error:Total mismatch! Expected ${reportTotal}, got ${reportTotal}`).toBeCloseTo(registerTotal,2);

    });


   
    test(' [C6225] Verify transaction details show accurate tax (0) when No Tax is applied and payment is made in cash', { tag: ['@Tax'] }, async () => {
        // --- Step 1: Login & Ring Item ---
        await POS.Login.In();
        await POS.Register.Click();

        // Ring item with No Tax
        await POS.Register.AddItemByStockcode({ stockCode: ITEMS.JACK.BARCODE }); // $10 item
        await POS.Register.ItemLines.SelectTax({ row: 1, taxOption: "NoTax" });

        // Capture Subtotal & Total from POS register
        const registerSubtotal = Reports.parseCurrency(await POS.Register.Subtotal.GetLabel());
        const registerTotal = Reports.parseCurrency(await POS.Register.Total.GetLabel());
        const registerTax = Reports.parseCurrency(await POS.Register.Tax.GetLabel());

        console.log('registerSubtotal', registerSubtotal);
        console.log('registerTotal', registerTotal);
        console.log('registerTax', registerTax);

        expect(registerTax, "Error: Tax should be 0 for No Tax item").toEqual(0);

        // --- Step 2: Checkout using Cash ---
        await POS.Register.PayButton.Click();
        await POS.Dialog.Checkout.ClickCashPaymentButton({ index: 1 });
        await POS.Dialog.CheckoutComplete.No.Click();
        await POS.Sales.Click();
        await POS.Register.Click();
        await POS.Sales.Click();
        const posref=await POS.Sales.transactions.Table.GetRefNumber(1);


        // --- Step 3: Reports → Filter for Cash transactions ---
        await POS.Admin.Click();
        await ADMIN.Menu.Reports.GoTo();

        await ADMIN.Reports.SummaryReportTable.ClickCell(
            { clickOn: "# Sales" },
            { rowQuery: [{ rowColumn: "label", rowValue: "Cash" }] }
        );

      await ADMIN.Dialog.ReportTransaction.Search.setText({value:posref})

        // --- Step 4: Open Details for latest transaction ---
        await ADMIN.Dialog.ReportTransaction.TransactionTable.ClickCell(
            { clickOn: "Details" },
            { rowIndex: 1 }
        );

        // --- Step 5: Validate Transaction Details ---
        const reportSubtotal = Reports.parseCurrency(
            await ADMIN.Dialog.TransactionDetails.Subtotal.getText()
        );
        const reportTaxValues = await ADMIN.Dialog.TransactionDetails.Tax.getAllInnerTexts();
        const reportTax = reportTaxValues.map(Reports.parseCurrency).reduce((a, b) => a + b, 0);

        const reportTotal = Reports.parseCurrency(
            await ADMIN.Dialog.TransactionDetails.Total.getText()
        );

        console.log('reportSubtotal', reportSubtotal);
        console.log('reportTaxValues', reportTaxValues);
        console.log('reportTax', reportTax);

        // --- Assertions ---
        expect(reportSubtotal, `Error:Subtotal mismatch! Register=${registerSubtotal}, Report=${reportSubtotal}`)
            .toEqual(registerSubtotal);

        expect(reportTax, `Error: Tax mismatch! Expected 0, got ${reportTax}, Raw spans=${JSON.stringify(reportTaxValues)}`)
            .toEqual(0);

        expect(reportTotal, `Error: Total mismatch! Register=${registerTotal}, Report=${reportTotal}`).toEqual(registerTotal);

    });

   
    test('[C6226] Verify card transaction with No Tax reflected correctly in Reports', { tag: ['@Tax'] }, async () => {
        // --- Step 1: Login & Ring Item ---
        await POS.Login.In();
        await POS.Register.Click();

        // Ring item with No Tax
        await POS.Register.AddItemByStockcode({ stockCode: ITEMS.JACK.BARCODE }); // $10 item
        await POS.Register.ItemLines.SelectTax({ row: 1, taxOption: "NoTax" });

        // Capture Subtotal, Tax & Total from POS register
        const registerSubtotal = Reports.parseCurrency(await POS.Register.Subtotal.GetLabel());
        const registerTotal = Reports.parseCurrency(await POS.Register.Total.GetLabel());
        const registerTax = Reports.parseCurrency(await POS.Register.Tax.GetLabel());

        expect(registerTax, "Error: Tax should be 0 for No Tax item").toEqual(0);

        // --- Step 2: Checkout using Card ---
        await POS.Register.PayButton.Click();
        await payfac.Read({ amount: registerTotal });
        await POS.Dialog.Checkout.Card.Click();

        expect(await POS.Dialog.Success.IsVisible(), "Error: Payfac transaction was not approved").toBeTruthy();

        await POS.Dialog.Success.Close.Click();
        await POS.Sales.Click();
        await POS.Register.Click();
        await POS.Sales.Click();
        const posref=await POS.Sales.transactions.Table.GetRefNumber(1);

        // --- Step 3: Reports → Filter for Card transactions ---
        await POS.Admin.Click();
        await ADMIN.Menu.Reports.GoTo();

        await ADMIN.Reports.SummaryReportTable.ClickCell(
            { clickOn: "# Sales" },
            { rowQuery: [{ rowColumn: "label", rowValue: "Card" }] }
        );

       await ADMIN.Dialog.ReportTransaction.Search.setText({value:posref})

        // --- Step 4: Open Details for latest transaction ---
        await ADMIN.Dialog.ReportTransaction.TransactionTable.ClickCell(
            { clickOn: "Details" },
            { rowIndex: 1 }
        );

        // --- Step 5: Validate Transaction Details ---
        const reportSubtotal = Reports.parseCurrency(
            await ADMIN.Dialog.TransactionDetails.Subtotal.getText()
        );

        const reportTaxValues = await ADMIN.Dialog.TransactionDetails.Tax.getAllInnerTexts();
        const reportTax = reportTaxValues.map(Reports.parseCurrency).reduce((a, b) => a + b, 0);

        const reportTotal = Reports.parseCurrency(
            await ADMIN.Dialog.TransactionDetails.Total.getText()
        );

        const reportCashDiscount = Reports.parseCurrency(
            await ADMIN.Dialog.TransactionDetails.Discount.getText()
        );

        // --- Assertions ---
        expect(reportSubtotal).toEqual(registerSubtotal);
        expect(reportTax, `Error: Expected Tax=0, got ${reportTax}, Raw spans=${JSON.stringify(reportTaxValues)}`).toEqual(0);
        expect(reportCashDiscount).toEqual(0);
        expect(reportTotal).toEqual(registerTotal);
    });

   
    test('[C6227] Verify transaction details show accurate tax breakdown when multiple inclusive taxes are applied and payment is made in cash.', { tag: ['@Tax'] }, async () => {
        // --- Step 1: Login & Ring Item ---
        await POS.Login.In();
        await POS.Register.Click();

        // Ring item with Multiple Inclusive Tax
        await POS.Register.AddItemByStockcode({ stockCode: ITEMS.JACK.BARCODE });
        await POS.Register.ItemLines.SelectTax({ row: 1, taxOption: "MultiInclusiveTax" });

        // Capture values from POS Register
        const registerSubtotal = Reports.parseCurrency(await POS.Register.Subtotal.GetLabel());
        const registerTotal = Reports.parseCurrency(await POS.Register.Total.GetLabel());
        const registerTax = Reports.parseCurrency(await POS.Register.Tax.GetLabel());
        const registerTaxLabel = await POS.Register.ItemLines.GetTax({ row: 1 });

        expect(registerTaxLabel).toContain("MultiInclusiveTax");

        // --- Step 2: Checkout using Cash ---
        await POS.Register.PayButton.Click();
        await POS.Dialog.Checkout.ClickCashPaymentButton({ index: 1 });
        await POS.Dialog.CheckoutComplete.No.Click();
        await POS.Sales.Click();
        await POS.Register.Click();
        await POS.Sales.Click();
        const posref=await POS.Sales.transactions.Table.GetRefNumber(1);

        // --- Step 3: Reports → Filter for Cash transactions ---
        await POS.Admin.Click();
        await ADMIN.Menu.Reports.GoTo();

        await ADMIN.Reports.SummaryReportTable.ClickCell(
            { clickOn: "# Sales" },
            { rowQuery: [{ rowColumn: "label", rowValue: "Cash" }] }
        );

       await ADMIN.Dialog.ReportTransaction.Search.setText({value:posref})

        // --- Step 4: Open Details for latest transaction ---
        await ADMIN.Dialog.ReportTransaction.TransactionTable.ClickCell(
            { clickOn: "Details" },
            { rowIndex: 1 }
        );

        // --- Step 5: Validate Taxes & Totals ---
        const reportSubtotal = Reports.parseCurrency(
            await ADMIN.Dialog.TransactionDetails.Subtotal.getText()
        );

        const taxLabels = await ADMIN.Dialog.TransactionDetails.Tax.getAllInnerTexts();
        const taxValues = taxLabels.map(Reports.parseCurrency);
        const reportTax = taxValues.reduce((a, b) => a + b, 0);

        const reportTotal = Reports.parseCurrency(
            await ADMIN.Dialog.TransactionDetails.Total.getText()
        );

        // --- Assertions ---
        expect(reportSubtotal, `Error: Subtotal mismatch! Register=${registerSubtotal}, Report=${reportSubtotal}`)
            .toEqual(registerSubtotal);

        expect(reportTax, `Error: Tax mismatch! Register=${registerTax}, Report=${reportTax}, Raw spans=${JSON.stringify(taxLabels)}`)
            .toEqual(registerTax);

        expect(reportTotal, `Error: Total mismatch! Register=${registerTotal}, Report=${reportTotal}`)
            .toEqual(registerTotal);
    });

   
    test('[C6241] Verify card transaction with multiple inclusive taxes reflected correctly in Reports', { tag: ['@Tax'] }, async () => {
        // --- Step 1: Login & Ring Item ---
        await POS.Login.In();
        await POS.Register.Click();

        // Ring item with Multiple Inclusive Tax
        await POS.Register.AddItemByStockcode({ stockCode: ITEMS.JACK.BARCODE });
        await POS.Register.ItemLines.SelectTax({ row: 1, taxOption: "MultiInclusiveTax" });

        // Capture values from POS Register
        const registerSubtotal = Reports.parseCurrency(await POS.Register.Subtotal.GetLabel());
        const registerTotal = Reports.parseCurrency(await POS.Register.Total.GetLabel());
        const registerTax = Reports.parseCurrency(await POS.Register.Tax.GetLabel());
        const registerTaxLabel = await POS.Register.ItemLines.GetTax({ row: 1 });

        expect(registerTaxLabel).toContain("MultiInclusiveTax");

        // --- Step 2: Checkout using Card ---
        await POS.Register.PayButton.Click();
        await payfac.Read({ amount: registerTotal });
        await POS.Dialog.Checkout.Card.Click();

        expect(
            await POS.Dialog.Success.IsVisible(),
            "Error: Payfac transaction was not approved"
        ).toBeTruthy();

        await POS.Dialog.Success.Close.Click();
        await POS.Sales.Click();
        await POS.Register.Click();
        await POS.Sales.Click();
        const posref=await POS.Sales.transactions.Table.GetRefNumber(1);

        // --- Step 3: Reports → Filter for Card transactions ---
        await POS.Admin.Click();
        await ADMIN.Menu.Reports.GoTo();

        await ADMIN.Reports.SummaryReportTable.ClickCell(
            { clickOn: "# Sales" },
            { rowQuery: [{ rowColumn: "label", rowValue: "Card" }] }
        );

        await ADMIN.Dialog.ReportTransaction.Search.setText({value:posref})

        // --- Step 4: Open Details for latest transaction ---
        await ADMIN.Dialog.ReportTransaction.TransactionTable.ClickCell(
            { clickOn: "Details" },
            { rowIndex: 1 }
        );

        // --- Step 5: Validate Taxes & Totals ---
        const reportSubtotal = Reports.parseCurrency(
            await ADMIN.Dialog.TransactionDetails.Subtotal.getText()
        );

        const taxLabels = await ADMIN.Dialog.TransactionDetails.Tax.getAllInnerTexts();
        const taxValues = taxLabels.map(Reports.parseCurrency);
        const reportTax = taxValues.reduce((a, b) => a + b, 0);

        const reportTotal = Reports.parseCurrency(
            await ADMIN.Dialog.TransactionDetails.Total.getText()
        );

        const reportCashDiscount = Reports.parseCurrency(
            await ADMIN.Dialog.TransactionDetails.Discount.getText()
        );


        // --- Assertions ---
        expect(reportSubtotal, `Error: Subtotal mismatch! Register=${registerSubtotal}, Report=${reportSubtotal}`)
            .toEqual(registerSubtotal);

        expect(reportTax, `Error: Tax mismatch! Register=${registerTax}, Report=${reportTax}, Raw spans=${JSON.stringify(taxLabels)}`)
            .toEqual(registerTax);

        expect(reportCashDiscount, "Error: Cash Discount should be 0").toEqual(0);

        expect(reportTotal, `Error: Total mismatch! Register=${registerTotal}, Report=${reportTotal}`)
            .toEqual(registerTotal);
    });

    test('[C6242] Verify cash transaction with single inclusive tax reflected correctly in Reports', { tag: ['@Tax'] }, async () => {
        // --- Step 1: Login & Ring Item ---
        await POS.Login.In();
        await POS.Register.Click();

        await POS.Register.AddItemByStockcode({ stockCode: ITEMS.JACK.BARCODE });
        await POS.Register.ItemLines.SelectTax({ row: 1, taxOption: "InclusiveTax" });

        // Capture register values
        const registerSubtotal = Reports.parseCurrency(await POS.Register.Subtotal.GetLabel());
        const registerTotal = Reports.parseCurrency(await POS.Register.Total.GetLabel());
        const registerTax = Reports.parseCurrency(await POS.Register.Tax.GetLabel());
        const registerTaxLabel = await POS.Register.ItemLines.GetTax({ row: 1 });

        expect(registerTaxLabel).toContain("InclusiveTax");

        // --- Step 2: Checkout with Cash ---
        await POS.Register.PayButton.Click();
        await POS.Dialog.Checkout.ClickCashPaymentButton({ index: 1 });
        await POS.Dialog.CheckoutComplete.No.Click();
        await POS.Sales.Click();
        await POS.Register.Click();
        await POS.Sales.Click();
        const posref=await POS.Sales.transactions.Table.GetRefNumber(1);

        // --- Step 3: Reports → Cash filter ---
        await POS.Admin.Click();
        await ADMIN.Menu.Reports.GoTo();

        await ADMIN.Reports.SummaryReportTable.ClickCell(
            { clickOn: "# Sales" },
            { rowQuery: [{ rowColumn: "label", rowValue: "Cash" }] }
        );

       await ADMIN.Dialog.ReportTransaction.Search.setText({value:posref})

        // --- Step 4: Open Details for latest transaction ---
        await ADMIN.Dialog.ReportTransaction.TransactionTable.ClickCell(
            { clickOn: "Details" },
            { rowIndex: 1 }
        );

        // --- Step 5: Validate Tax Breakdown & Totals ---
        const reportSubtotal = Reports.parseCurrency(await ADMIN.Dialog.TransactionDetails.Subtotal.getText());

        const taxLabels = await ADMIN.Dialog.TransactionDetails.Tax.getAllInnerTexts();
        const taxValues = taxLabels.map(Reports.parseCurrency);
        const reportTax = taxValues.reduce((a, b) => a + b, 0);

        const reportTotal = Reports.parseCurrency(await ADMIN.Dialog.TransactionDetails.Total.getText());


        // --- Assertions with Error Messages ---
        expect(reportSubtotal, `Error: Subtotal mismatch! Register=${registerSubtotal}, Report=${reportSubtotal}`)
            .toEqual(registerSubtotal);

        expect(reportTax, `Error: Tax mismatch! Register=${registerTax}, Report=${reportTax}, Raw spans=${JSON.stringify(taxLabels)}`)
            .toEqual(registerTax);

        expect(reportTotal, `Error: Total mismatch! Register=${registerTotal}, Report=${reportTotal}`)
            .toEqual(registerTotal);
    });

  
    test('[C6243] Verify card transaction with single inclusive tax reflected correctly in Reports', { tag: ['@Tax'] }, async () => {
        // --- Step 1: Login & Ring Item ---
        await POS.Login.In();
        await POS.Register.Click();

        await POS.Register.AddItemByStockcode({ stockCode: ITEMS.JACK.BARCODE });
        await POS.Register.ItemLines.SelectTax({ row: 1, taxOption: "InclusiveTax" });

        // Capture register values
        const registerSubtotal = Reports.parseCurrency(await POS.Register.Subtotal.GetLabel());
        const registerTotal = Reports.parseCurrency(await POS.Register.Total.GetLabel());
        const registerTax = Reports.parseCurrency(await POS.Register.Tax.GetLabel());
        const registerTaxLabel = await POS.Register.ItemLines.GetTax({ row: 1 });

        expect(registerTaxLabel).toContain("InclusiveTax");

        // --- Step 2: Checkout with Card ---
        await POS.Register.PayButton.Click();
        await payfac.Read({ amount: registerTotal });
        await POS.Dialog.Checkout.Card.Click();

        expect(
            await POS.Dialog.Success.IsVisible(),
            "Error: Payfac transaction was not approved"
        ).toBeTruthy();

        await POS.Dialog.Success.Close.Click();
        await POS.Sales.Click();
        await POS.Register.Click();
        await POS.Sales.Click();
        const posref=await POS.Sales.transactions.Table.GetRefNumber(1);

        // --- Step 3: Reports → Card filter ---
        await POS.Admin.Click();
        await ADMIN.Menu.Reports.GoTo();

        await ADMIN.Reports.SummaryReportTable.ClickCell(
            { clickOn: "# Sales" },
            { rowQuery: [{ rowColumn: "label", rowValue: "Card" }] }
        );

       await ADMIN.Dialog.ReportTransaction.Search.setText({value:posref})

        // --- Step 4: Open Details for latest transaction ---
        await ADMIN.Dialog.ReportTransaction.TransactionTable.ClickCell(
            { clickOn: "Details" },
            { rowIndex: 1 }
        );

        // --- Step 5: Validate Transaction Details ---
        const reportSubtotal = Reports.parseCurrency(await ADMIN.Dialog.TransactionDetails.Subtotal.getText());

        const taxLabels = await ADMIN.Dialog.TransactionDetails.Tax.getAllInnerTexts();
        const taxValues = taxLabels.map(Reports.parseCurrency);
        const reportTax = taxValues.reduce((a, b) => a + b, 0);

        const reportTotal = Reports.parseCurrency(await ADMIN.Dialog.TransactionDetails.Total.getText());
        const reportCashDiscount = Reports.parseCurrency(await ADMIN.Dialog.TransactionDetails.Discount.getText());


        // --- Assertions with Error Messages ---
        expect(reportSubtotal, `Error: Subtotal mismatch! Register=${registerSubtotal}, Report=${reportSubtotal}`)
            .toEqual(registerSubtotal);

        expect(taxLabels.length, `Error: Expected a single tax line, got ${taxLabels.length}: ${JSON.stringify(taxLabels)}`)
            .toEqual(1);

        expect(reportTax, `Error: Tax mismatch! Register=${registerTax}, Report=${reportTax}, Raw spans=${JSON.stringify(taxLabels)}`)
            .toEqual(registerTax);

        expect(reportCashDiscount, "Error: Cash Discount should be 0").toEqual(0);

        expect(reportTotal, `Error: Total mismatch! Register=${registerTotal}, Report=${reportTotal}`)
            .toEqual(registerTotal);
    });

   
    test('[C6244] Verify cash transaction with single exclusive tax reflected correctly in Reports', { tag: ['@tax','@nonparallelizable'] }, async () => {
        // --- Step 1: Login & Ring Item ---
        await POS.Login.In();
        await POS.Register.Click();

        await POS.Register.AddItemByStockcode({ stockCode: ITEMS.JACK.BARCODE });
        await POS.Register.ItemLines.SelectTax({ row: 1, taxOption: "ExclusiveTax" });

        // Capture register values
        const registerSubtotal = Reports.parseCurrency(await POS.Register.Subtotal.GetLabel());
        const registerTotal = Reports.parseCurrency(await POS.Register.Total.GetLabel());
        const registerTax = Reports.parseCurrency(await POS.Register.Tax.GetLabel());
        const registerTaxLabel = await POS.Register.ItemLines.GetTax({ row: 1 });

        expect(registerTaxLabel).toContain("ExclusiveTax");

        // --- Step 2: Checkout with Cash ---
        await POS.Register.PayButton.Click();
        await POS.Dialog.Checkout.ClickCashPaymentButton({ index: 1 });
        await POS.Dialog.CheckoutComplete.No.Click();
        await POS.Sales.Click();
        await POS.Register.Click();
        await POS.Sales.Click();
        const posref=await POS.Sales.transactions.Table.GetRefNumber(1);

        // --- Step 3: Reports → Cash filter ---
        await POS.Admin.Click();
        await ADMIN.Menu.Reports.GoTo();

        await ADMIN.Reports.SummaryReportTable.ClickCell(
            { clickOn: "# Sales" },
            { rowQuery: [{ rowColumn: "label", rowValue: "Cash" }] }
        );

      await ADMIN.Dialog.ReportTransaction.Search.setText({value:posref})

        // --- Step 4: Open Details for latest transaction ---
        await ADMIN.Dialog.ReportTransaction.TransactionTable.ClickCell(
            { clickOn: "Details" },
            { rowIndex: 1 }
        );

        // --- Step 5: Validate Transaction Details ---
        const reportSubtotal = Reports.parseCurrency(await ADMIN.Dialog.TransactionDetails.Subtotal.getText());

        const taxLabels = await ADMIN.Dialog.TransactionDetails.Tax.getAllInnerTexts();
        const taxValues = taxLabels.map(Reports.parseCurrency);
        const reportTax = taxValues.reduce((a, b) => a + b, 0);

        const reportTotal = Reports.parseCurrency(await ADMIN.Dialog.TransactionDetails.Total.getText());


        // --- Assertions with Error Messages ---
        expect(reportSubtotal, `Error: Subtotal mismatch! Register=${registerSubtotal}, Report=${reportSubtotal}`)
            .toEqual(registerSubtotal);

        expect(taxLabels.length, `Error: Expected single tax line, got ${taxLabels.length}: ${JSON.stringify(taxLabels)}`)
            .toEqual(1);

        expect(reportTax, `Error: Tax mismatch! Register=${registerTax}, Report=${reportTax}, Raw spans=${JSON.stringify(taxLabels)}`)
            .toEqual(registerTax);

        expect(reportTotal, `Error: Total mismatch! Register=${registerTotal}, Report=${reportTotal}`)
            .toEqual(registerTotal);
    });

    test('[C6245] Verify card transaction with single exclusive tax reflected correctly in Reports', { tag: ['@Tax','@nonparallelizable'] }, async () => {
        // --- Step 1: Login & Ring Item ---
        await POS.Login.In();
        await POS.Register.Click();

        await POS.Register.AddItemByStockcode({ stockCode: ITEMS.JACK.BARCODE });
        await POS.Register.ItemLines.SelectTax({ row: 1, taxOption: "ExclusiveTax" });

        // Capture register values
        const registerSubtotal = Reports.parseCurrency(await POS.Register.Subtotal.GetLabel());
        const registerTotal = Reports.parseCurrency(await POS.Register.Total.GetLabel());
        const registerTax = Reports.parseCurrency(await POS.Register.Tax.GetLabel());
        const registerTaxLabel = await POS.Register.ItemLines.GetTax({ row: 1 });

        expect(registerTaxLabel).toContain("ExclusiveTax");

        // --- Step 2: Checkout with Card ---
        await POS.Register.PayButton.Click();
        await payfac.Read({ amount: registerTotal });
        await POS.Dialog.Checkout.Card.Click();

        expect(
            await POS.Dialog.Success.IsVisible(),
            "Error: Payfac transaction was not approved"
        ).toBeTruthy();

        await POS.Dialog.Success.Close.Click();
         await POS.Sales.Click();
        await POS.Register.Click();
        await POS.Sales.Click();
        const posref=await POS.Sales.transactions.Table.GetRefNumber(1);

        // --- Step 3: Reports → Card filter ---
        await POS.Admin.Click();
        await ADMIN.Menu.Reports.GoTo();

        await ADMIN.Reports.SummaryReportTable.ClickCell(
            { clickOn: "# Sales" },
            { rowQuery: [{ rowColumn: "label", rowValue: "Card" }] }
        );

        await ADMIN.Dialog.ReportTransaction.Search.setText({value:posref})

        // --- Step 4: Open Details for latest transaction ---
        await ADMIN.Dialog.ReportTransaction.TransactionTable.ClickCell(
            { clickOn: "Details" },
            { rowIndex: 1 }
        );

        // --- Step 5: Validate Transaction Details ---
        const reportSubtotal = Reports.parseCurrency(await ADMIN.Dialog.TransactionDetails.Subtotal.getText());

        const taxLabels = await ADMIN.Dialog.TransactionDetails.Tax.getAllInnerTexts();
        const taxValues = taxLabels.map(Reports.parseCurrency);
        const reportTax = taxValues.reduce((a, b) => a + b, 0);

        const reportTotal = Reports.parseCurrency(await ADMIN.Dialog.TransactionDetails.Total.getText());
        const reportCashDiscount = Reports.parseCurrency(await ADMIN.Dialog.TransactionDetails.Discount.getText());

        // --- Assertions with Error Messages ---
        expect(reportSubtotal, `Error: Subtotal mismatch! Register=${registerSubtotal}, Report=${reportSubtotal}`)
            .toEqual(registerSubtotal);

        expect(taxLabels.length, `Error: Expected single tax line, got ${taxLabels.length}: ${JSON.stringify(taxLabels)}`)
            .toEqual(1);

        expect(reportTax, `Error: Tax mismatch! Register=${registerTax}, Report=${reportTax}, Raw spans=${JSON.stringify(taxLabels)}`)
            .toEqual(registerTax);

        expect(reportCashDiscount, "Error: Cash Discount should be 0").toEqual(0);

        expect(reportTotal, `Error: Total mismatch! Register=${registerTotal}, Report=${reportTotal}`)
            .toEqual(registerTotal);
    });


});
