import { test, expect } from '@playwright/test';
import { POS } from '../../../../src/section/POS';
import { Initializer, ITEMS } from '../../../../src/utils';

//This block runs before each test
test.beforeEach(async ({ page }) => {
    await Initializer.Init(page);
});

//This block runs after each test
test.afterEach(async ({ page }, testInfo) => {
    await Initializer.Finalize(page, testInfo);
});

test.describe('POS Section - Reports', { tag: ['@smoke', '@pos', '@cash', '@reports'] }, () => {
    
    test('[C4456] Cross-verify Today\'s Takings Summary with One Sale, One Void, One Refund]', { tag: ['@takingsCount', '@nonparallelizable'] }, async ({}) => {
        // Login as admin to register device
        await POS.Login.In();
       
        // Baseline: Capture initial takings values before test transactions
        await POS.Reports.Click();
        await POS.Reports.TakingsCount.Click();
       
        let initialPayments = 0;
        let initialTakings = 0;
        let initialRefunds = 0;
        let initialBalance = 0;
        let initialRefundsAmount = 0;
       
        // Check if Cash method row exists in takings table
        const cashRowExists = await POS.Reports.TakingsCount.Table.RowExists({rowColumn: "Method", rowValue: "cash"});
       
        if (cashRowExists) {
            // Get existing Cash method values
            const initialPaymentsText = await POS.Reports.TakingsCount.Table.GetCellValue({getValueFrom: "# Payments"}, {rowQuery: [{rowColumn: "Method", rowValue: "cash"}]});
            const initialTakingsText = await POS.Reports.TakingsCount.Table.GetCellValue({getValueFrom: "Takings"}, {rowQuery: [{rowColumn: "Method", rowValue: "cash"}]});
            const initialRefundsText = await POS.Reports.TakingsCount.Table.GetCellValue({getValueFrom: "# Refunds"}, {rowQuery: [{rowColumn: "Method", rowValue: "cash"}]});
            const initialRefundsAmountText = await POS.Reports.TakingsCount.Table.GetCellValue({getValueFrom: "Refunds"}, {rowQuery: [{rowColumn: "Method", rowValue: "cash"}]});
            const initialBalanceText = await POS.Reports.TakingsCount.Table.GetCellValue({getValueFrom: "Balance"}, {rowQuery: [{rowColumn: "Method", rowValue: "cash"}]});
               
            initialPayments = parseInt(initialPaymentsText.replace(/\$|,/g, ''));
            initialTakings = parseFloat(initialTakingsText.replace(/\$|,/g, ''));
            initialRefunds = parseInt(initialRefundsText.replace(/\$|,/g, ''));
            initialBalance = parseFloat(initialBalanceText.replace(/\$|,/g, ''));
            initialRefundsAmount = parseFloat(initialRefundsAmountText.replace(/\$|,/g, ''));
           
        } else {
            console.log('No existing Cash transactions found, starting from baseline 0');
        }
       
        // Navigate back to Register for transactions
        await POS.NavigationBar.Register.Click();
       
        // Step 1: Complete 3 transactions with cash same item "ITEM NO AGE"
       
        // Transaction 1 (will be REFUNDED)
        await POS.Register.AddItemByStockcode({stockCode: ITEMS.NO_AGE_VERIFICATION.BARCODE});
        await POS.Register.PayButton.Click();
        await POS.Dialog.Checkout.ClickCashPaymentButton({index: 1}); // Exact change
        await POS.Dialog.CheckoutComplete.No.Click(); // No receipt
       
        // Transaction 2 (will be VOIDED)
        await POS.Register.AddItemByStockcode({stockCode: ITEMS.NO_AGE_VERIFICATION.BARCODE});
        await POS.Register.PayButton.Click();
        await POS.Dialog.Checkout.ClickCashPaymentButton({index: 1}); // Exact change
        await POS.Dialog.CheckoutComplete.No.Click(); // No receipt
       
        // Transaction 3 (will remain SUCCESSFUL)
        await POS.Register.AddItemByStockcode({stockCode: ITEMS.NO_AGE_VERIFICATION.BARCODE});
        await POS.Register.PayButton.Click();
        await POS.Dialog.Checkout.ClickCashPaymentButton({index: 1}); // Exact change
        await POS.Dialog.CheckoutComplete.No.Click(); // No receipt
       
        // Step 2: Go to sales tab
        await POS.Sales.Click();
        await POS.Register.Click();
        await POS.Sales.Click();
        // Step 3: Refund the first transaction
        await POS.Sales.FilterTransactionsByStatus({statusOption: 'Complete'});
        await POS.Sales.transactions.Table.ViewTransactionDetail({byIndex: 1});
        await POS.Dialog.TransactionDetails.Refund.Click();
        await POS.Dialog.RefundTransaction.Cash.Click();
        await POS.Dialog.Confirmation.Yes.Click(); // Confirm refund
        await POS.Dialog.Confirmation.No.Click(); // No print receipt
        // close dialog
        await POS.Dialog.TransactionDetails.WaitForVisible();
        await POS.Dialog.TransactionDetails.Close(); // Close dialog
 
        // Step 4: Void the second transaction
        await POS.Sales.transactions.Table.ViewTransactionDetail({byIndex: 1});
        await POS.Dialog.TransactionDetails.Void.Click();
        await POS.Dialog.VoidTransaction.ReasonInput.setText({value: 'Test void for takings verification'});
        await POS.Dialog.VoidTransaction.Process.Click();
        await POS.Dialog.VoidTransaction.Yes.Click(); // Confirm void
 
        // Close dialog
        await POS.Dialog.TransactionDetails.WaitForVisible();
        await POS.Dialog.TransactionDetails.Close(); // Close dialog
       
        // Step 5: Go to reports tab
        await POS.Reports.Click();
        await POS.Reports.TakingsCount.Click();
       
        // Final Verification: Compare current values with baseline + expected changes
        const finalMethodValue = await POS.Reports.TakingsCount.Table.GetCellValue({getValueFrom: "Method"}, {rowQuery: [{rowColumn: "Method", rowValue: "cash"}]});
        const finalPaymentsCount = await POS.Reports.TakingsCount.Table.GetCellValue({getValueFrom: "# Payments"}, {rowQuery: [{rowColumn: "Method", rowValue: "cash"}]});
        const finalTakingsAmount = await POS.Reports.TakingsCount.Table.GetCellValue({getValueFrom: "Takings"}, {rowQuery: [{rowColumn: "Method", rowValue: "cash"}]});
        const finalRefundsCount = await POS.Reports.TakingsCount.Table.GetCellValue({getValueFrom: "# Refunds"}, {rowQuery: [{rowColumn: "Method", rowValue: "cash"}]});
        const finalRefundsAmount = await POS.Reports.TakingsCount.Table.GetCellValue({getValueFrom: "Refunds"}, {rowQuery: [{rowColumn: "Method", rowValue: "cash"}]});
        const finalBalanceAmount = await POS.Reports.TakingsCount.Table.GetCellValue({getValueFrom: "Balance"}, {rowQuery: [{rowColumn: "Method", rowValue: "cash"}]});
       
        // Convert to numbers for calculation  
        const finalPayments = parseInt(finalPaymentsCount.replace(/\$|,/g, ''));
        const finalTakings = parseFloat(finalTakingsAmount.replace(/\$|,/g, ''));
        const finalRefunds = parseInt(finalRefundsCount.replace(/\$|,/g, ''));
        const finalBalance = parseFloat(finalBalanceAmount.replace(/\$|,/g, ''));
        const finalRefundsAmountBalance = parseFloat(finalRefundsAmount.replace(/\$|,/g, ''));
             
       
        // Step 6: Verify that in the method column only cash method is displayed
        expect(finalMethodValue, 'Method column should show Cash').toEqual('Cash');
       
        // Step 6.1: Payment column should increase by 1 (3 transactions - 1 refund - 1 void = 1 net)
        const expectedFinalPayments = initialPayments + 2;
        expect(finalPayments, `Cash payments count should be ${expectedFinalPayments} (initial: ${initialPayments} + 1 net transaction)`).toEqual(expectedFinalPayments);
       
        // Step 6.2: Takings column should increase by $10.80 (1 successful transaction × $10.80)
        const expectedFinalTakings = initialTakings + (10.8 * 2);
        expect(finalTakings, `Cash takings should be $${expectedFinalTakings.toFixed(2)} (initial: $${initialTakings.toFixed(2)} + $10.80)`).toBeCloseTo(expectedFinalTakings, 2);
       
        // Step 6.3: Refunds column should increase by 1 (we performed 1 refund operation)
        const expectedFinalRefunds = initialRefunds + 1;
        expect(finalRefunds, `Cash refunds count should be ${expectedFinalRefunds} (initial: ${initialRefunds} + 1 refund operation)`).toEqual(expectedFinalRefunds);
       
        // Step 6.4: Refunds amount column should increase by $10.80 (1 successful transaction × $10.80)
        const expectedFinalRefundsAmount = initialRefundsAmount + 10.8;
        expect(finalRefundsAmountBalance, `Cash refunds amount should be $${expectedFinalRefundsAmount.toFixed(2)} (initial: $${initialRefundsAmount.toFixed(2)} + $10.80)`).toBeCloseTo(expectedFinalRefundsAmount, 2);
       
        // Step 6.5: Balance column should increase by $10.80 (net takings from 1 successful transaction)
        const expectedFinalBalance = initialBalance + 10.8;
        expect(finalBalance, `Cash balance should be $${expectedFinalBalance.toFixed(2)} (initial: $${initialBalance.toFixed(2)} + $10.80)`).toBeCloseTo(expectedFinalBalance, 2);
    });

   
});
