import { test, expect } from '@playwright/test';
import { POS } from '../../../../src/section/POS';
import { Initializer, ITEMS,payfac } from '../../../../src/utils';
import { Reports } from '../../../../src/section/POS/pages/reports/reports';


//This block runs before each test
test.beforeEach(async ({ page }) => {
  await Initializer.Init(page, { device: { view: 'mobile' } });
  await payfac.Init(page);
});

//This block runs after each test
test.afterEach(async ({ page }, testInfo) => {
  await Initializer.Finalize(page, testInfo);
});



test.describe("TestRail POS Test Cases for Mobile ", { tag: ['@mobile', '@regression'] }, () => {

    test('[C6470] Verify Mobile cash refund', { tag: ['@mobile', '@cash', '@refund'] }, async ({ page}) => { 

        //Login to POS 
        await POS.Login.In(); 

        //Add item to the cart 
        await POS.Register.AddItemByStockcode({ stockCode: ITEMS.BUDLIGHT.BARCODE }); 

        //Click on cash payment button 
        await POS.Register.PayButton.Click(); 

        //wait for the checkout dialog to be visible 
        expect(await POS.Dialog.Checkout.IsVisible()).toBeTruthy(); 

        //Select cash as payment method 
        await POS.Dialog.Checkout.ClickCashPaymentButton({ index: 1 }); 

        //Click on No print button 
        await POS.Dialog.CheckoutComplete.No.Click(); 

        //Click on Sale tab 
        await POS.Sales.Click(); 

        //Click the Eye icon to view the last transaction 
        await POS.Sales.transactions.Table.ViewTransactionDetail({byIndex: 1}); 

        await POS.Dialog.TransactionDetails.Refund.Click(); 

        //Click on cash payment button to refund the amount 
        await POS.Dialog.RefundTransaction.Cash.Click(); 

        //Dialog confirmation 
        await POS.Dialog.Confirmation.Yes.Click(); 

        await POS.Dialog.Confirmation.No.Click(); 

    });

    test('[C8272] Verify card refund', { tag: ['@mobile', '@cash', '@refund'] }, async ({ page}) => { 

        //Login to POS 
        await POS.Login.In(); 

        //Add item to the cart 
        await POS.Register.AddItemByStockcode({ stockCode: ITEMS.BUDLIGHT.BARCODE }); 

        //Click on cash payment button 
        await POS.Register.PayButton.Click(); 

        //wait for the checkout dialog to be visible 
        expect(await POS.Dialog.Checkout.IsVisible()).toBeTruthy(); 

        //Select card payment method 
        const saleTotalStr = await POS.Dialog.Checkout.CashTotal.getText();
        const saleTotal = Reports.parseCurrency(saleTotalStr);
      
        await payfac.Read({ amount: saleTotal });
        await POS.Dialog.Checkout.Card.Click();
        await POS.Dialog.Success.Close.Click();
      
        //Click on Sale tab 
        await POS.Sales.Click(); 

        //Click the Eye icon to view the last transaction 
        await POS.Sales.transactions.Table.ViewTransactionDetail({byIndex: 1}); 

        await POS.Dialog.TransactionDetails.Refund.Click(); 

        //Click on cash payment button to refund the amount 
        const refundTotalStr = await POS.Dialog.RefundTransaction.Total.getText();
        const refundTotal = Reports.parseCurrency(refundTotalStr);


        await payfac.Refund({ amount: refundTotal });
        await POS.Dialog.RefundTransaction.Card.Click();
        await POS.Dialog.Confirmation.Yes.Click();

        //Dialog confirmation 
        await POS.Dialog.Success.Close.Click(); 

    });
    
    
    
});