import { test, expect } from '@playwright/test';
import { POS } from '../../../../src/section/POS';
import { Initializer, ITEMS,payfac } from '../../../../src/utils';
import { Reports } from '../../../../src/section/POS/pages/reports/reports';
import { USERS } from '../../../../src/utils/data/data.users';


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
    
    test('[C6466] Mobile :As a cashier, I want to log in to the POS system so that I can verify its functionality', { tag: ['@mobile', '@login'] }, async ({ page }) => {
        // Login with Admin credentials  as POS does not allow to login with cashier credentials
        //  if the user has never logged in before with admin credentials
        await POS.Login.In();
        await POS.Logout.Click();
        await POS.Dialog.Logout.Yes.Click();
        //Login with cashier credentials
        await POS.Login.UserName.setText({ value: USERS.REGISTER.USERNAME });
        await POS.Login.Password.setText({ value: USERS.REGISTER.PASSWORD });
        await POS.Login.LoginButton.Click();
        //Verify that No line Items are present in the register after login
        expect(await POS.Register.ItemLines.IsEmpty(), 'Cash Sale Transaction not completed in Mobile').toBeTruthy();
    });
 
    test('[C6467] Mobile: Verify user can access the Admin panel from the POS using a mobile browser', { tag: ['@mobile', '@admin'] }, async ({ page }) => {
        //Login to POS with admin credentials
        await POS.Login.In();
        // Click on Admin button to open admin panel
        await POS.MobileHamburgerMenu.Click();
        await POS.Admin.Click();
        // Verify that the admin button is visible and clickable
        expect(await POS.Admin.IsVisible(), 'POS-Admin button unable to access in Admin Dashboard Mobile').toBeTruthy();
    });
 
    test('[C6468] Mobile: Verify user can perform a sale transaction using cash payment', { tag: ['@mobile', '@sale', '@cash'] }, async ({ page }) => {
        //Login to POS
        await POS.Login.In();
        //Add item to the cart
        await POS.Register.AddItemByStockcode({ stockCode: ITEMS.BUDLIGHT.BARCODE });
        //Click on cash payment button
        await POS.Register.PayButton.Click();
        //wait for the checkout dialog to be visible
        expect(await POS.Dialog.Checkout.IsVisible()).toBeTruthy();
        //Tender the Cash payment
        const tenderedAmount = await POS.Dialog.Checkout.CashTotal.getText();
        //Enter the cash amount
        await POS.Dialog.Checkout.Tendered.setText({ value: tenderedAmount });
        await POS.Dialog.Checkout.Cash.Click();
        //Click on No print button
        await POS.Dialog.CheckoutComplete.No.Click();
        //Verify that the transaction is completed and the user is navigated back to the home screen
        expect(await POS.Register.ItemLines.IsEmpty(), 'Cash Sale Transaction not completed in Mobile').toBeTruthy();
    });
 
    test('[C6471] Mobile: Verify user can void a Cash transaction', { tag: ['@mobile', '@void', '@cash'] }, async ({ page }) => {
        //Login to POS
        await POS.Login.In();
        await POS.Register.AddItemByStockcode({ stockCode: ITEMS.BUDLIGHT.BARCODE });
        //Click on cash payment button
        await POS.Register.PayButton.Click();
        //wait for the checkout dialog to be visible
        expect(await POS.Dialog.Checkout.IsVisible()).toBeTruthy();
        //Tender the Cash payment
        const tenderedAmount = await POS.Dialog.Checkout.CashTotal.getText();
        //Enter the cash amount
        await POS.Dialog.Checkout.Tendered.setText({ value: tenderedAmount });
        await POS.Dialog.Checkout.Cash.Click();
        //Click on No print button
        await POS.Dialog.CheckoutComplete.No.Click();
        //Click on Sale tab
        await POS.Sales.Click();
        //Click the Eye icon to view the last transaction
        await POS.Sales.transactions.Table.ViewTransactionDetail({ byIndex: 1 });
        //Click on Void button to void the transaction
        await POS.Dialog.TransactionDetails.Void.Click();
        //Dialog confirmation
        await POS.Dialog.VoidTransaction.ReasonInput.setText({ value: 'Testing Void Transaction' });
        //Click on process button to void the transaction
        await POS.Dialog.VoidTransaction.Process.Click();
        //Verify dialog confirmation
        await POS.Dialog.VoidTransaction.Yes.Click();
        //Close the transaction details dialog
        await POS.Dialog.TransactionDetails.Close();
        await POS.Register.Click();
        await POS.Sales.Click();
        //Verify that the transaction is voided successfully
        expect(await POS.Sales.transactions.Table.GetStatusBadge({ byIndex: 1 }), 'Transaction not voided successfully').toBe('Void');
    });
    test('[C6472] Mobile: Verify user can suspend a transaction', { tag: ['@mobile', '@suspend', '@cash'] }, async ({ page }) => {
        //Login to POS
        await POS.Login.In();
        //Add item to the cart
        await POS.Register.AddItemByStockcode({ stockCode: ITEMS.JACK.BARCODE });
        //Verify Item is added to the cart
        expect(await POS.Register.ItemLines.IsEmpty(), 'Item not added to the cart in Mobile').toBeFalsy();
        //Click on Others button to expand the options in mobile
        await POS.Register.OtherButton.Click();
        //Click on Suspend button
        await POS.Register.Suspend.Click();
        //Verify the regsiter is suspended and the Screen clear the cart
        expect(await POS.Register.ItemLines.IsEmpty(), 'Transaction not suspended successfully in Mobile').toBeTruthy();
    });
 
    
    
});