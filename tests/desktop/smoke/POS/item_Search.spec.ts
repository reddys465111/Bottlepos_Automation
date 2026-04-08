import { test, expect } from '@playwright/test';
import { POS } from '../../../../src/section/POS';
import { Initializer, ITEMS, KEY } from '../../../../src/utils';

//This block runs before each test
test.beforeEach(async ({ page }) => {
    await Initializer.Init(page);
});

//This block runs after each test
test.afterEach(async ({ page }, testInfo) => {
    await Initializer.Finalize(page, testInfo);
});

test.describe('POS Section - Item Search', { tag: ['@smoke', '@pos', '@ringup'] }, () => {

    test('[C1433] As a Cashier, I want to search for an item using its exact or similar name so that I can easily add the line item to the Register Item table', { tag: ['@title', '@search'] }, async ({}) => {
         //Login to the POS application
         await POS.Login.In();
         //Add the same item through the stock search
         await POS.Register.StockSearch.SearchAndSelect({title: ITEMS.NO_AGE_VERIFICATION.TITLE});
         //Verify that the Item qty is updated to 1
         expect(await POS.Register.TotalItems.getText(), 'Total items should be 1').toEqual('1');
         //Verify that the Item added is the correct item
         expect(await POS.Register.ItemLines.GetItemName({row: 1}), 'Item should be '+ITEMS.NO_AGE_VERIFICATION.TITLE).toContain(ITEMS.NO_AGE_VERIFICATION.TITLE);
    });

    test('[C1434] As a Cashier, I want to scan items using their barcode so that I can quickly find and add them directly to the Register Item table', { tag: ['@barcode', '@search'] }, async ({}) => {
        //Login to the POS application
        await POS.Login.In();
        //Add the same item through the stock search
        await POS.Register.StockCode.setText({value: ITEMS.NO_AGE_VERIFICATION.BARCODE});
        await POS.Register.AddStockCode.Click();
        //Verify that the Item qty is updated to 1
        expect(await POS.Register.TotalItems.getText(), 'Total items should be 1').toEqual('1');
        //Verify that the Item added is the correct item
        expect(await POS.Register.ItemLines.GetItemName({row: 1}), 'Item should be '+ITEMS.NO_AGE_VERIFICATION.TITLE).toContain(ITEMS.NO_AGE_VERIFICATION.TITLE);
   });

    // test('[C4205] As a Cashier, I want to scan and add an item using the stock code field so that I can quickly process sales ', { tag: ['@add','@nonparallelizable'] }, async ({}) => {
    //      //Login to the POS application
    //     await POS.Login.In();
    //      const randomBarcode = await POS.FakeData.getItemBarcode();
    //      //Add the same item through the stock search
    //     await POS.Register.AddItemByStockcode({stockCode: randomBarcode.toString()});
 
    //     //Verify that the Item not found dialog is visible
    //     expect(await POS.Dialog.ItemNotFound.IsVisible(), 'Item not found dialog should be visible').toBeTruthy();
    //     //Click on the Add Item button
    //     await POS.Dialog.ItemNotFound.AddItem.Click();
    //     //Generate a barcode for the item
    //     await POS.Dialog.AddItem.General.MultipackStockcode.GenerateBarcode({row: 1});
    //     //Set the name of the item
    //     const samplename = (await POS.FakeData.getName()).toUpperCase();
    //     await POS.Dialog.AddItem.General.Name.setText({value: samplename});
       
    //     //Edit the price of the item
    //     await POS.Dialog.AddItem.General.MultipackQty.EditPrice({row: 1, price: 10});
       
    //     // Get the barcode of the item
    //     const barcode = await POS.Dialog.AddItem.General.MultipackStockcode.GetBarcode({row: 1});
    //     // Save the item
    //     await POS.Dialog.AddItem.Create.Click();
 
    //     // Verify that the Success dialog is visible
    //     expect(await POS.Dialog.Success.IsVisible(), 'Success dialog should be visible').toBeTruthy();
 
    //     //Click on the Ok button
    //     await POS.Dialog.Success.Ok.Click();
 
    //     // Add the item through the stock code field
    //     await POS.Register.StockCode.setText({value: barcode});
    //     await POS.Register.AddStockCode.Click();
 
    //     // Verify that the Item name is the same as the sample item
    //     const rowItemName = await POS.Register.ItemLines.GetItemName({row: 1});
    //     expect(rowItemName, 'Item name should be '+ samplename).toContain(samplename);
    // });
 

    test('[C78] As a Cashier, I want to be able to increase the Qty of an item I am about to sell by Stock Code, Stock Search and Shortcuts', { tag: ['@qty', '@update'] }, async ({}) => {
        //Login to the POS application
        await POS.Login.In();
        //Open Shortcuts panel
        await POS.Register.Shortcuts.Open();
        //Select an Item
        await POS.Register.Shortcuts.Click({title: ITEMS.NO_AGE_VERIFICATION.SHORTCUTNAME});
        //Add the same item through the stock search
        await POS.Register.StockSearch.SearchAndSelect({title: ITEMS.NO_AGE_VERIFICATION.TITLE});
        //Search the same item by its Barcode
        await POS.Register.AddItemByStockcode({stockCode: ITEMS.NO_AGE_VERIFICATION.BARCODE});  
        //Verify that the Item qty is updated to 3
        expect(await POS.Register.TotalItems.getText(), 'Total items should be 3').toEqual('3');
        //Click on the pay button on register screen
        await POS.Register.PayButton.Click();
        //Select the exact change cash value
        await POS.Dialog.Checkout.ClickCashPaymentButton({index: 1});
        expect(await POS.Dialog.CheckoutComplete.Change.getText(), 'Change should be $0.00').toEqual('Change: $0.00')
        await POS.Dialog.CheckoutComplete.No.Click();
    });
});