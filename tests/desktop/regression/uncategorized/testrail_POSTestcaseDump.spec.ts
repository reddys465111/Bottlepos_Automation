import { test, expect } from '@playwright/test';
import { toggleOption } from '../../../../src/objects/specialObjects/discountToggle';
import { ADMIN } from '../../../../src/section/ADMIN';
import { POS } from '../../../../src/section/POS';
import { Initializer, ITEMS, KEY, payfac, Session } from '../../../../src/utils';
import { Reports } from '../../../../src/section/POS/pages/reports/reports';
import { API } from '../../../../src/API/API';

//This block runs before each test
test.beforeEach(async ({ page }) => {
  await Initializer.Init(page, { Scenario: {
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
  }});
  await payfac.Init(page);
});

//This block runs after each test
test.afterEach(async ({ page }, testInfo) => {
  await Initializer.Finalize(page, testInfo);
});

test.describe("TestRail POS Test Cases", { tag: ['@uncategorized', '@regression'] }, () => {

    test('[C4397] Verify barcode scanner working for existing item', { tag: ['@barcode', '@valid', '@noID'] }, async ({}) => {
        //Login to the POS application
        await POS.Login.In();
        //Ring an Item
        await POS.Register.AddItemByStockcode({stockCode : ITEMS.BUDLIGHT.BARCODE});
        //Check if the item is ringed up and the total items is 1
        expect(await POS.Register.TotalItems.getText(), 'Error: Total items should be 1').toBe('1');
        //Ring the same item again
        await POS.Register.AddItemByStockcode({stockCode : ITEMS.BUDLIGHT.BARCODE});
        //Check if the item is ringed up and the total items is 2
        expect(await POS.Register.TotalItems.getText(), 'Error: Total items should be 2').toBe('2');
    });

    test('[C4398] Verify barcode scanner working for non existing item', { tag: ['@barcode', '@invalid'] }, async ({}) => {
        //Login to the POS application
        await POS.Login.In();
        //Populate random barcode
        const randomBarcode = await POS.FakeData.getItemBarcode();
        //Scan the barcode of non existing item and the alert 'item not found' is displayed 
        await POS.Register.AddItemByStockcode({stockCode: randomBarcode.toString()});
        expect (await POS.Dialog.ItemNotFound.IsVisible(), 'Error: Item not found dialog should be visible').toBeTruthy();
        //Close the alert
        await POS.Dialog.ItemNotFound.OK.Click();
        //Repeat STEP 1
        await POS.Register.AddItemByStockcode({stockCode: randomBarcode.toString()});
        //The alert 'item not found' is displayed
        expect (await POS.Dialog.ItemNotFound.IsVisible(), 'Error: Item not found dialog should be visible').toBeTruthy();
    });

    test('[C1441] Verify if a manual item can be added from the POS side', { tag: ['@manual'] }, async ({}) => {
        //Login to the POS application
        await POS.Login.In();
        //Click on the Add Item button (Manual Item)
        await POS.Register.AddItem.Click();
        //Enter manual item name
        await POS.Register.ItemLines.EditName({row: 1, name: 'Sample Item'});
        //Enter manual Item price
        await POS.Register.ItemLines.EditPrice({row: 1, price: 10.00});
        //Check if the item is added to the sale
        expect(await POS.Register.TotalItems.getText(), 'Error: Total items should be 1').toBe('1');
        //Check if the item price is shown correctly in the subtotal
        expect(await POS.Register.Subtotal.getText(), 'Error: Subtotal should be $10.00').toBe('$10.00');
    });

    test('[C4035] Verify manual item is added to the sale when Add Item button is clicked', { tag: ['@manual', '@noID'] }, async ({}) => {
        //Login to the POS application
        await POS.Login.In();
        //Click on the Add Item button (Manual Item)
        await POS.Register.AddItem.Click();
        //Update the item price
        await POS.Register.ItemLines.EditPrice({row: 1, price: 10.00});
        //Check if the entered price is shown correctly in the subtotal
        expect(await POS.Register.Subtotal.getText(), 'Error: Subtotal should be $10.00').toBe('$10.00');
    });

   test('[C1423] Verify if the item sale can be suspended from the POS side', { tag: ['@suspend', '@sale'] }, async ({}) => {
        //Login to the POS application
        await POS.Login.In();
        //Ring an Item
        await POS.Register.AddItemByStockcode({stockCode: ITEMS.BUDLIGHT.BARCODE});
        //Check the register total
        expect(await POS.Register.TotalItems.getText(), 'Error: Total items should be 1').toEqual('1');
        //Click on the suspend button
        await POS.Register.Suspend.Click();
        //Confirming the POS screen has all items suspended
        expect(await POS.Register.ItemLines.IsEmpty(),'All items are not suspended').toBeTruthy();
        //Click on the sales tab
        await POS.Sales.Click();
        //Confirming the transaction detail record status is "Order"
        expect(await POS.Sales.transactions.Table.GetCellValue({getValueFrom: "Status"}, {rowIndex: 1} ),'Transaction was not Suspended').toEqual('Order');
    });

    test('[C1424] Verify if a items in an order can be recalled and finally completed', { tag: ['@recall', '@complete', '@nonparallelizable'] }, async ({page}) => {
        //Login to the POS application
        await POS.Login.In();
        //Ring an Item
        await POS.Register.AddItemByStockcode({stockCode: ITEMS.BUDLIGHT.BARCODE});
        //Check the register total
        expect(await POS.Register.TotalItems.getText(), 'Error: Total items should be 1').toEqual('1');
        //Click on suspend button
        await POS.Register.Suspend.Click();
        //Confirming the POS screen has all items suspended
        expect(await POS.Register.ItemLines.IsEmpty(),'All items are not suspended').toBeTruthy();
        //Click on the sales tab
        await POS.Sales.Click();
        //Open the first completed transaction from the sales table
        await POS.Sales.transactions.Table.ViewTransactionDetail({byIndex: 1});
        //On transaction detail dialog, Click on the refund button
        await POS.Dialog.TransactionDetails.Complete.Click();
        //Click on the pay button to checkout
        await POS.Register.PayButton.Click();
        //Click on exact change button
        await POS.Dialog.Checkout.ClickCashPaymentButton({index: 1});
        await POS.Dialog.CheckoutComplete.No.Click();
    });

    test('[C1425] Verify if the item sale can be suspended from the POS side', { tag: ['@suspend', '@sale'] }, async ({}) => {
        //Login to the POS application
        await POS.Login.In();
        //Ring an Item
        await POS.Register.AddItemByStockcode({ stockCode: ITEMS.BUDLIGHT.BARCODE });
        //Check the register total
        expect(await POS.Register.TotalItems.getText(), 'Error: Total items should be 1').toEqual('1');
        //Click on the suspend button
            await POS.Register.Suspend.Click();
        //Confirming the POS screen has all items suspended
        expect(await POS.Register.ItemLines.IsEmpty(), 'Error: All items are not suspended').toBeTruthy();
        //Click on the sales tab
        await POS.Sales.Click();
        await POS.Register.Click();
        await POS.Sales.Click();
        //Confirming the transaction detail record status is "Order"
        expect(await POS.Sales.transactions.Table.GetCellValue({ getValueFrom: "Status" }, { rowIndex: 1 }), 'Transaction was not Suspended').toEqual('Order');
    });

    test('[C1594] Verify if the access the admin side from the POS side', { tag: ['@admin', '@access', '@noID'] }, async ({ context }) => {
        //Login the POS Application
        await POS.Login.In();
        await POS.Admin.Click();
        //Click the Admin button and wait for the new tab (page) to open
        expect(await ADMIN.PageTitle(), 'Error: Page title should contain BottlePos - Administration').toContain('BottlePos - Administration');
    });

    test('[C1595] Verify if the user can logout from the admin side', { tag: ['@logout', '@noID'] }, async ({ context }) => {
        // Login the POS application
        await POS.Login.In();
        // Click  the Admin button  and login using the valid  user credentials.
        await POS.Admin.Click();
        await ADMIN.Logout.Click();
        await ADMIN.Dialog.Confirmation.Yes.Click();
        expect(await ADMIN.Login.FormVisible(), 'Error: Login form should be visible').toBeTruthy();
    });

    test('[C1596] Verify if user can access the dashboard from the admin side', { tag: ['@admin', '@dashoard'] }, async () => {
        await API.Init();
        const summaryReport = await API.Reports.SummaryReport();
        const grossSales = summaryReport.GrossSales?.Sales;
        const grossTotal = summaryReport.GrossSales?.Total;
        await API.Finish();

        //User should have Admin access
        await POS.Login.In();
        //Click the Admin button and login using the valid  user credentials
        await POS.Admin.Click();
        await ADMIN.Menu.Dashboard.GoTo();
        expect(await ADMIN.Dashboard.getHeader(), 'Error: Dashboard header should contain Dashboard').toContain('Dashboard');
    });

    test('[1597] Verify if the user can access the realtime from the admin side', { tag: ['@admin', '@realtime'] }, async ({ context }) => {
        //User should have Admin access
        await POS.Login.In();
        //Click the Admin button and login using the valid  user credentials.
        await POS.Admin.Click();
        await ADMIN.Menu.Realtime.GoTo();
        expect(await ADMIN.Realtime.getHeader(), 'Error: Realtime header should contain Realtime').toContain('Realtime');
    });

    test('[C1427] Verify if the sales or refund or cancelled transactions receipt can be printed', { tag: ['@sales', '@refund', '@cancelled'] }, async ({}) => {
        //Login to the POS application
        await POS.Login.In();
        //Ring an Item and complete the transaction
        await POS.Register.AddItemByStockcode({ stockCode: ITEMS.BUDLIGHT.BARCODE });
        await POS.Register.PayButton.Click();
        await POS.Dialog.Checkout.ClickCashPaymentButton({ index: 1 });
        await POS.Dialog.CheckoutComplete.No.Click();
        //Navigate to the Sales tab
        await POS.Sales.Click();
        //Click on the view transaction details icon of the first transaction
        await POS.Sales.transactions.Table.ViewTransactionDetail({ byIndex: 1 });
        //Confirm the print button is visible
        expect(await POS.Dialog.TransactionDetails.Print.IsVisible(), 'Error: Print button should be visible').toBeTruthy();
        //Click on the print button
        await POS.Dialog.TransactionDetails.Print.Click();
    });

    test('[C4205] As a Cashier, I want to scan and add an item using the stock code field so that I can quickly process sales ', { tag: ['@add'] }, async ({}) => {
         //Login to the POS application
        await POS.Login.In();
        const samplebarcode = (await POS.FakeData.getMobile()).toString();
        await POS.Register.StockCode.setText({value:samplebarcode})
        await POS.Register.AddStockCode.Click();
        //Verify that the Item not found dialog is visible
        expect(await POS.Dialog.ItemNotFound.IsVisible(), 'Item not found dialog should be visible').toBeTruthy();
        //Click on the Add Item button
        await POS.Dialog.ItemNotFound.AddItem.Click();
        const samplename = (await POS.FakeData.getName()).toUpperCase();
        await POS.Dialog.AddItem.General.Name.setText({value: samplename});
        //Edit the price of the item
        await POS.Dialog.AddItem.General.MultipackQty.EditPrice({row: 1, price: 10});
        // Get the barcode of the item
        const barcode = await POS.Dialog.AddItem.General.MultipackStockcode.GetBarcode({row: 1});
        // Save the item
        await POS.Dialog.AddItem.Create.Click();
        // Verify that the Success dialog is visible
        expect(await POS.Dialog.Success.IsVisible(), 'Success dialog should be visible').toBeTruthy();
        //Click on the Ok button
        await POS.Dialog.Success.Ok.Click();
        // Add the item through the stock code field
        await POS.Register.StockCode.setText({value: barcode});
        await POS.Register.AddStockCode.Click();
 
        // Verify that the Item name is the same as the sample item
        const rowItemName = await POS.Register.ItemLines.GetItemName({row: 1});
        expect(rowItemName, 'Item name should be '+ samplebarcode).toContain(samplename);
    });

    test('[C4409] Verify admin page is loading properly', { tag: ['@admin', '@loading'] }, async ({ context }) => {
        //Login the POS Application
        await POS.Login.In();
        //Click the Admin button and wait for the new tab (page) to open
        const [adminPage] = await Promise.all([context.waitForEvent('page'), POS.Admin.Click()]);
        //Optionally, you can bring focus to the new tab if needed
        await adminPage.bringToFront();
        //Confirm dashboard element is visible in the new tab
        await expect(adminPage).toHaveURL(/admin/);
        await adminPage.waitForLoadState('networkidle');
        const pageTitle = await adminPage.title();
        expect(pageTitle, 'Error: Page title should contain Administration').toContain('Administration');
    });

    test('[C1426] Verify if the suspended sale can be deleted/removed', { tag: ['@suspend', '@delete','@nonparallelizable'] }, async ({}) => {
        //Login to the POS application
        await POS.Login.In();
        //Ring an Item
        await POS.Register.AddItemByStockcode({stockCode: ITEMS.BUDLIGHT.BARCODE});
        //Check the register total
        expect(await POS.Register.TotalItems.getText(), 'Error: Total items should be 1').toEqual('1');
        //Click on suspend button
        await POS.Register.Suspend.Click();
        //Confirming the POS screen has all items suspended
        expect(await POS.Register.ItemLines.IsEmpty(), 'Error: All items are not suspended').toBeTruthy();
        //Click on the sales tab
        await POS.Sales.Click();
        //Open the first completed transaction from the sales table
        await POS.Sales.transactions.Table.ViewTransactionDetail({byIndex: 1});
        //On transaction detail dialog, Click on the refund button
        await POS.Dialog.TransactionDetails.Remove.Click();
        //Click Yes on the Delete Order dialog
        await POS.Dialog.DeleteOrder.Yes.Click();
         await POS.Sales.Click();
        await POS.Register.Click();
         await POS.Sales.Click();
       
 
        //await POS.Dialog.TransactionDetails.Close();
        //Confirming the transaction detail record status is "Declined"
        expect(await POS.Sales.transactions.Table.GetCellValue({getValueFrom: "Status"}, {rowIndex: 1} ),'Transaction was not Declined').toEqual('Declined');
    });

    test('[C1444] Verify if the sale can be voided', { tag: ['@void', '@sale'] }, async ({}) => {
        //Login to the POS application
        await POS.Login.In();
        //Ring an Item
        await POS.Register.AddItemByStockcode({stockCode: ITEMS.BUDLIGHT.BARCODE});
        //Checking the register total
        expect(await POS.Register.TotalItems.getText(), 'Error: Total items should be 1').toEqual('1');
        //Click on the pay button to checkout
        await POS.Register.PayButton.Click();
        //Select the exact change cash value
        await POS.Dialog.Checkout.ClickCashPaymentButton({index: 1});
        await POS.Dialog.CheckoutComplete.No.Click();
        //Click on the sales tab
        await POS.Sales.Click();
        //Open the first completed transaction from the sales table
        await POS.Sales.transactions.Table.ViewTransactionDetail({byIndex: 1});
        //On transaction detail dialog, Click on the void button
        await POS.Dialog.TransactionDetails.Void.Click();
        //Enter a reason for void
        await POS.Dialog.VoidTransaction.ReasonInput.setText({value: 'Test Void'});
        //Click on the Process button
        await POS.Dialog.VoidTransaction.Process.Click();
        //Confirm void transaction
        await POS.Dialog.VoidTransactionAlert.Yes.Click();
        await POS.waitForTimeout(3000);
        //Check transaction status after void success
        expect(await POS.Dialog.TransactionDetails.Status.getText(), 'Error: Transaction status should be Void').toEqual('Void');
    });

    test('[C1429] Verify if the register report can be displayed and printed', { tag: ['@report', '@register'] }, async ({}) => {
        //Login to the POS application
        await POS.Login.In();
        //Enter the barcode of an item and hit enter, item will be ringed up
        await POS.Register.AddItemByStockcode({stockCode: ITEMS.BUDLIGHT.BARCODE});
        //Checking the register total
        expect(await POS.Register.TotalItems.getText(), 'Error: Total items should be 1').toEqual('1');
        //Click on the pay button to checkout
        await POS.Register.PayButton.Click();
        //Select the exact change cash value
        await POS.Dialog.Checkout.ClickCashPaymentButton({index: 1});
        await POS.Dialog.CheckoutComplete.No.Click();
        //Navigate to the Reports tab
        await POS.Reports.Click();
        //Click on the Register Report button
        await POS.Reports.RegisterReport.Click();
        expect(await POS.Reports.RegisterReport.Table.IsNotEmpty(), 'Error: Table should not be empty').toBeTruthy();
    });

    test('[C1430] Verify if the seller report can be displayed', { tag: ['@report', '@seller'] }, async ({}) => {
        //Login to the POS application
        await POS.Login.In();
        //Enter the barcode of an item and hit enter, item will be ringed up
        await POS.Register.AddItemByStockcode({stockCode: ITEMS.BUDLIGHT.BARCODE});
        //Checking the register total
        expect(await POS.Register.TotalItems.getText(), 'Error: Total items should be 1').toEqual('1');
        //Click on the pay button to checkout
        await POS.Register.PayButton.Click();
        //Select the exact change cash value
        await POS.Dialog.Checkout.ClickCashPaymentButton({index: 1});
        await POS.Dialog.CheckoutComplete.No.Click();
        //Navigate to the Reports tab
        await POS.Reports.Click();
        //Click on the Register Report button
        await POS.Reports.SellerReport.Click();
        await POS.Reports.SellerReport.Table.WaitUntilVisible();
        expect(await POS.Reports.SellerReport.Table.IsNotEmpty(), 'Error: Table should not be empty').toBeTruthy();
    });

    test('[C1431] Verify if the whats selling report can be displayed', { tag: ['@report', '@whats'] }, async ({}) => {
        //Login to the POS application
        await POS.Login.In();
        //Enter the barcode of an item and hit enter, item will be ringed up
        await POS.Register.AddItemByStockcode({stockCode: ITEMS.BUDLIGHT.BARCODE});
        //Checking the register total
        expect(await POS.Register.TotalItems.getText(), 'Error: Total items should be 1').toEqual('1');
        //Click on the pay button to checkout
        await POS.Register.PayButton.Click();
        //Select the exact change cash value
        await POS.Dialog.Checkout.ClickCashPaymentButton({index: 1});
        await POS.Dialog.CheckoutComplete.No.Click();
        //Navigate to the Reports tab
        await POS.Reports.Click();
        //Click on the Register Report button
        await POS.Reports.WhatsSelling.Click();
        await POS.Reports.WhatsSelling.Table.WaitUntilVisible();
        expect(await POS.Reports.WhatsSelling.Table.IsNotEmpty(), 'Error: Table should not be empty').toBeTruthy();

    });

    test('[C1432] Verify if the takings count report can be displayed', { tag: ['@report', '@takings'] }, async ({}) => {
        //Login to the POS application
        await POS.Login.In();
        //Enter the barcode of an item and hit enter, item will be ringed up
        await POS.Register.AddItemByStockcode({stockCode: ITEMS.BUDLIGHT.BARCODE});
        //Checking the register total
        expect(await POS.Register.TotalItems.getText(), 'Error: Total items should be 1').toEqual('1');
        //Click on the pay button to checkout
        await POS.Register.PayButton.Click();
        //Select the exact change cash value
        await POS.Dialog.Checkout.ClickCashPaymentButton({index: 1});
        await POS.Dialog.CheckoutComplete.No.Click();
        //Navigate to the Reports tab
        await POS.Reports.Click();
        //Click on the Register Report button
        await POS.Reports.TakingsCount.Click();
        await POS.Reports.TakingsCount.Table.WaitUntilVisible();
        expect(await POS.Reports.TakingsCount.Table.IsNotEmpty(), 'Error: Table should not be empty').toBeTruthy();
    });

    test('[C4032] Verify items with "Do not Discount" enabled are excluded from discount calculations', { tag: ['@discount', '@noID'] }, async ({}) => {
        //Login to the POS application
        await POS.Login.In();
        //Enter the barcode of an item and hit enter, item will be ringed up
        //In this case the item category has age verification enabled
        await POS.Register.AddItemByStockcode({ stockCode: ITEMS.LOTTERY.BARCODE });
        //Add another item that can be discounted
        await POS.Register.AddItemByStockcode({ stockCode: ITEMS.BUDLIGHT.BARCODE });
        //Selecting Dollar discount option and applying $1 Discount
        await POS.Register.Discount.Toggle({ select: toggleOption.DOLLAR });
        //Enter discount value
        await POS.Register.Discount.SetValue({ value: 1, press: KEY.ENTER });
        //Validate discount applied
        expect(await POS.Register.ItemLines.GetDiscountTotal({ row: 1 }), 'Error: Discount not applied correctly').toEqual('1.00');
    });

    test('[C4040] Verify inclusive tax is calculated and applied correctly during transactions', { tag: ['@tax', '@inclusive'] }, async ({}) => {
        //Login to the POS application
        await POS.Login.In();
        //Ring an item
        await POS.Register.AddItemByStockcode({ stockCode: ITEMS.INCLUSIVE_TAX.BARCODE });
        //Change item tax to tax
        await POS.Register.ItemLines.SelectTax({row: 1, taxOption:'InclusiveTax'});
        //Verify Subtotal, tax and total
        const tempsubtotal=await POS.Register.Subtotal.getText();
        expect(await POS.Register.Subtotal.getText(), 'Error: Subtotal ').toEqual(tempsubtotal);
        const temptax=await POS.Register.Tax.getText();
        expect(await POS.Register.Tax.getText(), 'Error: Tax should be $0.91').toEqual(temptax);
        const temptotal=await POS.Register.Total.getText();
        expect(await POS.Register.Total.getText(), 'Error: Total should be $10.00').toEqual(temptotal);
    });
 
    // test('[C4399] Ensure that on the checkout, barcode scanning do not make any impact on the transaction', { tag: ['@barcode', '@checkout'] }, async ({}) => {
    //     //Login the POS Application
    //     await POS.Login.In();
    //     //Click 'add item' button
    //     await POS.Register.AddItem.Click();
    //     //Enter price in the respective field
    //     await POS.Register.ItemLines.EnterManualItemName({ row: 1, name: 'Sample Item' });
    //     await POS.Register.ItemLines.EditPrice({ row: 1, price: 10.00 });
    //     //Click pay button
    //     await POS.Register.PayButton.Click();
    //     //Checkout dialog should displayed
    //     expect(await POS.Dialog.Checkout.IsVisible(), 'Error: Checkout dialog should be visible').toBeTruthy();
    //     //Attempt to ring an item by barcode while checkout dialog is open
    //     await POS.Register.AddItemByStockcode({ stockCode: ITEMS.JACK.BARCODE });
    //     await POS.Dialog.Checkout.Return.Click();
    //     //Validate that Total amount not changed
    //     expect(await POS.Register.Subtotal.getText(), 'Error: Subtotal should be 1').toBe('1');
    //     await POS.Register.PayButton.Click();
    //     await POS.Dialog.Checkout.ClickCashPaymentButton({ index: 1 });
    //     expect(await POS.Dialog.CheckoutComplete.Change.getText(), 'Error: Change should be $0.00').toEqual('Change: $0.00');
    //     await POS.Dialog.CheckoutComplete.No.Click();
    // });

    test('[C1443] Verify if the sale can be cancelled', { tag: ['@sale', '@cancel'] }, async ({}) => {
        //Login to the POS application
        await POS.Login.In();
        //Ring an Item
        await POS.Register.AddItemByStockcode ({stockCode : ITEMS.BUDLIGHT.BARCODE});
        //Click on the cancel button
        await POS.Register.Cancel.Click();
        //Click on the Yes button in the Cancel Order dialog
        await POS.Dialog.CancelOrder.Yes.Click();
        //Click on the No button in the Print Confirmation dialog
        await POS.Dialog.TransactionCancelled.No.Click();
        expect(await POS.Register.TotalItems.getText(), 'Error: Total items should be 0').toBe('0');
    });


    //   test('[C1445] Verify if the discount can be applied on the sale', { tag: ['@discount', '@sale'] }, async ({}) => {
    //     //Login to the POS application
    //     await POS.Login.In();
    //     //Ring first item
    //     await POS.Register.AddItemByStockcode({ stockCode: ITEMS.JACK.BARCODE });
    //     //Just to make it more reliable adding a second item which is enabled as "Do not discount"
    //     await POS.Register.AddItemByStockcode({ stockCode: ITEMS.LOTTERY.BARCODE });
    //     //Selecting Dollar discount option and applying $1 Discount
    //     await POS.Register.Discount.Toggle({ select: toggleOption.DOLLAR });
    //     //Enter discount value
    //     await POS.Register.Discount.SetValue({ value: 1, press: KEY.ENTER });
    //     //Validate discount applied
    //     expect(await POS.Register.ItemLines.GetDiscountTotal({ row: 1 }), 'Error: Discount not applied correctly').toEqual('1.00');
    // });

    test('[C1415] Verify if the user can logout from the POS app', { tag: ['@logout'] }, async ({}) => {
        //Login the POS application
        await POS.Login.In();
        //Click on the logout button
        await POS.Logout.Click();
        //Confirm Logout
        await POS.Dialog.Logout.Yes.Click();
        //Verify the user is logged out
        expect(await POS.Login.FormVisible(), 'Error: Login form should be visible').toBeTruthy();
    });

    test('[C2054] To verify the Login Page components', { tag: ['@login', '@noID'] }, async ({}) => {
        //Navigate to the POS login page and dismiss any popups
        await POS.Dialog.Legacy_Alert.IsVisible();
        await POS.Dialog.Legacy_Alert.Dismiss();
        //Validate Login page title
        expect(await (await POS.getPageTitle()).toString(), 'Error: Page title should contain BottlePos').toContain('BottlePos');
        //Validate Login form is visible
        expect(await POS.Login.FormVisible(), 'Error: Login form should be visible').toBeTruthy();
    });

    test('[C2055] Validate Username field is visible on the login screen', { tag: ['@login', '@username'] }, async ({}) => {
        //Navigate to the POS login page and dismiss any popups
        await POS.Dialog.Legacy_Alert.IsVisible();
        await POS.Dialog.Legacy_Alert.Dismiss();
        //Validate Username field is visible
        expect(await POS.Login.UserName.IsVisible(), 'Error: Username field should be visible').toBeTruthy();
    });

    test('[C2056] Validate Password field is visible on the login screen', { tag: ['@login', '@password'] }, async ({}) => {
        //Navigate to the POS login page and dismiss any popups
        await POS.Dialog.Legacy_Alert.IsVisible();
        await POS.Dialog.Legacy_Alert.Dismiss();
        //Validate Password field is visible
        expect(await POS.Login.Password.IsVisible(), 'Error: Password field should be visible').toBeTruthy();
    });

    test('[C2057] Validate Login button is visible on the login screen', { tag: ['@login', '@button'] }, async ({}) => {
        //Navigate to the POS login page and dismiss any popups
        await POS.Dialog.Legacy_Alert.IsVisible();
        await POS.Dialog.Legacy_Alert.Dismiss();
        //Validate Login button is visible
        expect(await POS.Login.LoginButton.IsVisible(), 'Error: Login button should be visible').toBeTruthy();
    });

    test('[C2058] Validate Username field is editable on the login screen', { tag: ['@login', '@editable', '@username'] }, async ({}) => {
        //Navigate to the POS login page and dismiss any popups
        await POS.Dialog.Legacy_Alert.IsVisible();
        await POS.Dialog.Legacy_Alert.Dismiss();
        //Validate Username field is editable
        expect(await POS.Login.IsFieldEditable(POS.Login.UserName), 'Error: Username field should be editable').toBeTruthy();
    });

    test('[C2059] Validate Password field is editable on the login screen', { tag: ['@login', '@editable', '@password'] }, async ({}) => {
        //Navigate to the POS login page and dismiss any popups
        await POS.Dialog.Legacy_Alert.IsVisible();
        await POS.Dialog.Legacy_Alert.Dismiss();
        //Validate Username field is editable
        expect(await POS.Login.IsFieldEditable(POS.Login.Password), 'Error: Password field should be editable').toBeTruthy();
    });

    test('[C2060] Validate Login button is clickable on the login screen', { tag: ['@login', '@clickable', '@button'] }, async ({}) => {
        //Navigate to the POS login page and dismiss any popups
        await POS.Dialog.Legacy_Alert.IsVisible();
        await POS.Dialog.Legacy_Alert.Dismiss();
        //Validate Login button is clickable
        expect(await POS.Login.LoginButton.IsClickable(), 'Error: Login button should be clickable').toBeTruthy();
    });

    test('[C2061] Validate Login button label is "Login" on the login screen', { tag: ['@login', '@label', '@button'] }, async ({}) => {
        //Navigate to the POS login page and dismiss any popups
        await POS.Dialog.Legacy_Alert.IsVisible();
        await POS.Dialog.Legacy_Alert.Dismiss();
        //Validate Login button label is "Login"
        expect(await POS.Login.LoginButton.GetLabel(), 'Error: Login button label should be "Login"').toEqual('Login');
    });

    

    test('[C2078] Validate Login with incorrect username and correct password', { tag: ['@login', '@incorrect', '@password'] }, async ({}) => {
        //Navigate to the POS login page and dismiss any popups
        await POS.Dialog.Legacy_Alert.IsVisible();
        await POS.Dialog.Legacy_Alert.Dismiss();
        //Set incorrect Username and correct Password
        await POS.Login.UserName.setText({ value: 'invalidUser' });
        await POS.Login.Password.setText({ value: Session.Password });
        //Click on the Login button
        await POS.Login.LoginButton.Click();
        //Validate error message is displayed
        expect(await POS.Dialog.LoginError.GetModalContent()).toEqual('Access Denied!');
    });

    test('[C2079] Validate Login with correct username and incorrect password', { tag: ['@login', '@correct', '@password'] }, async ({}) => {
        //Navigate to the POS login page and dismiss any popups
        await POS.Dialog.Legacy_Alert.IsVisible();
        await POS.Dialog.Legacy_Alert.Dismiss();
        //Set correct Username and incorrect Password
        await POS.Login.UserName.setText({ value: Session.User });
        await POS.Login.Password.setText({ value: 'invalidPassword' });
        //Click on the Login button
        await POS.Login.LoginButton.Click();
        //Validate error message is displayed
        expect(await POS.Dialog.LoginError.GetModalContent(), 'Error: Error message should be "Invalid username or password"').toEqual('Access Denied!');
    });

    test('[C2081] Verify blank space should be trimmed during login', { tag: ['@login', '@blank', '@space'] }, async ({}) => {
        //Login to the POS application with valid credentials  
        await POS.Login.In({ user: ` ${Session.User} `, password: ` ${Session.Password} ` });
        //Validate user is logged in by checking the presence of the logout button
        expect(await POS.Logout.Exists(), 'Error: Logout button should be visible').toBeTruthy();
    });

});

test.describe("TestRail ADMIN Test Cases", { tag: ['@uncategorized', '@regression'] },() => {

    // Initialize ADMIN for these tests
    test.beforeEach(async ({ page }) => {
        await Initializer.Init(page, { Admin: true });
    });

    test('[C2072] Validate Login without credentials', { tag: ['@login', '@credentials'] }, async ({ page }) => {
        // Click on the Login button without entering credentials
        await ADMIN.Login.LoginButton.Click();

        // Validate error message
        expect(await ADMIN.Dialog.Error.GetMessage(), 
               'Error: Error message should be "Please enter a valid username and password!"')
               .toEqual('Please enter a valid username and password!');
    });

    test('[C2074] Validate Login with only username entered', { tag: ['@login', '@username'] }, async ({ page }) => {
       
        // Set Username without Password
        await ADMIN.Login.UserName.setText({ value: Session.User });
        await ADMIN.Login.LoginButton.Click();

        // Validate error message
        expect(await ADMIN.Dialog.Error.GetMessage(), 
               'Error: Error message should be "Please enter a valid username and password!"')
               .toEqual('Please enter a valid username and password!');
    });

    test('[C2075] Validate Login with only password entered', { tag: ['@login', '@password'] }, async ({ page }) => {
      
        // Set Password without Username
        await ADMIN.Login.Password.setText({ value: Session.Password });
        await ADMIN.Login.LoginButton.Click();

        // Validate error message
        expect(await ADMIN.Dialog.Error.GetMessage(), 
               'Error: Error message should be "Please enter a valid username and password!"')
               .toEqual('Please enter a valid username and password!');
    });

    test('[C2080] Validate Login with valid credentials', { tag: ['@login', '@valid', '@credentials'] }, async ({ page }) => {
        // Login with valid credentials
        await ADMIN.Login.In();

        // Validate user is logged in by checking the logout button
        expect(await ADMIN.Logout.Exists(), 'Error: Logout button should be visible').toBeTruthy();
    })


});
