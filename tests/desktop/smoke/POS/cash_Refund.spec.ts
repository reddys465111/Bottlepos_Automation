import { test, expect } from '@playwright/test';
import { POS } from '../../../../src/section/POS';
import { Initializer, ITEMS, getDateDaysAgo } from '../../../../src/utils';

//This block runs before each test
test.beforeEach(async ({ page }) => {
  await Initializer.Init(page);
});

//This block runs after each test
test.afterEach(async ({ page }, testInfo) => {
  await Initializer.Finalize(page, testInfo);
});

test.describe("Scenarios related to Refund", { tag: ['@cash', '@refund', '@smoke'] }, () => {
  
  test('[C204] Verify Refund Process with Cash Payment ', { tag: ['@register'] }, async ({}) => {
    //Login to the POS application
    await POS.Login.In();
    //Enter the barcode of an item and hit enter, item will be ringed up
    //In this case the item category has age verification enabled
    await POS.Register.AddItemByStockcode({stockCode: ITEMS.CROWN.BARCODE});
    //Age verification dialog appears
    //Enter valid DOB
    await POS.Dialog.AgeVerification.EnterBirthDate.setText({ value: getDateDaysAgo(365 * 21) });
    //Click yes
    await POS.Dialog.AgeVerification.Yes.Click();
    //Change item qty to negative 1 (-1)
    await POS.Register.ItemLines.EditQty({row:1, qty:-1});
    const change=await POS.Register.Total.getText();
   
    //Click on the pay button to checkout
    await POS.Register.PayButton.Click();
    expect(await POS.Dialog.Checkout.CashTotal.getText()).toEqual(change);
    //Select the exact change cash value
    await POS.Dialog.Checkout.ClickCashPaymentButton({index: 1});
    await POS.Dialog.CheckoutComplete.No.Click();
  });
 
  
  test('[C294] Verify Refund process from sales ', { tag: ['@sales', '@noID'] }, async ({}) => {
    //Ring an item
    await POS.Login.In();
    //Enter the barcode of an item and hit enter, item will be ringed up
    await POS.Register.AddItemByStockcode({stockCode: ITEMS.NO_AGE_VERIFICATION.BARCODE});
    //Click on the pay button to checkout
    await POS.Register.PayButton.Click();
    //Select the exact change cash value
    await POS.Dialog.Checkout.ClickCashPaymentButton({index: 1});
    //Click no
    await POS.Dialog.CheckoutComplete.No.Click();
    //Click on the sales tab
    await POS.Sales.Click();
    //Filter Completed transactions
    await POS.Sales.FilterTransactionsByStatus({statusOption: 'Complete'});
    //Open the first completed transaction from the sales table
    await POS.Sales.transactions.Table.ViewTransactionDetail({byIndex: 1});
    //On transaction detail dialog, Click on the refund button
    await POS.Dialog.TransactionDetails.Refund.Click();
    //Select cash refund option
    await POS.Dialog.RefundTransaction.Cash.Click();
    //Refund confirmation box appears, click yes
    await POS.Dialog.Confirmation.Yes.Click();
    //Print confirmation box appears, click no
    await POS.Dialog.Confirmation.No.Click();
    await POS.Sales.FilterTransactionsByStatus({statusOption: 'Refunded'});
    //Confirming the transaction detail box status is changed to "Refunded"
    expect(await POS.Sales.transactions.Table.GetCellValue({getValueFrom: "Status"}, {rowIndex: 1} ),'Error: Transaction was not Refunded').toEqual('Refunded');
});

});
