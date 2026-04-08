import { test, expect } from '@playwright/test';
import { POS } from '../../../../src/section/POS';
import { Initializer, ITEMS } from '../../../../src/utils';

//This block runs before each test
test.beforeEach(async ({ page }) => {
    await Initializer.Init(page, {
        Scenario: {
            Admin: {
                Settings: {
                    POSSettings: {
                        SaleOptions: {
                            AllowChangingStoredItemPrices: 'Always'
                        }
                    }
                }
            }
       }
    });
});

//This block runs after each test
test.afterEach(async ({ page }, testInfo) => {
    await Initializer.Finalize(page, testInfo);
});

test.describe("Scenarios related to Validate items with cash", { tag: ['@cash', '@item', '@smoke'] }, () => {

    test('[C78] Verify Item qty Update via Stock Code, Stock Search, and Box Panel', { tag: ['@search'] }, async ({}) => {
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
    
    test('[C76] Verify Sale of Item Added Through Stock Code Field', { tag: ['@stockcode', '@noID'] }, async ({}) => {
        //Login to the POS application
        await POS.Login.In();
        //Ring an item
        await POS.Register.AddItemByStockcode({stockCode: ITEMS.NO_AGE_VERIFICATION.BARCODE});
        //Verify total items and subtotal have the expected values
        expect(await POS.Register.TotalItems.getText(), 'Total items should be 1').toEqual('1');
        expect(await POS.Register.Subtotal.getText(), 'Subtotal should be $10.00').toEqual('$10.00');
        //Click on the pay button on register screen
        await POS.Register.PayButton.Click();
        //Select the exact change cash value
        await POS.Dialog.Checkout.ClickCashPaymentButton({index: 1});
        expect(await POS.Dialog.CheckoutComplete.Change.getText(), 'Change should be $0.00').toEqual('Change: $0.00');
        await POS.Dialog.CheckoutComplete.No.Click();
    });

    test('[C77] Verify Item Editing Through Options Button', { tag: ['@edit', '@price'] }, async ({}) => {
        //Login to the POS application
        await POS.Login.In();
        //Ring an item
        await POS.Register.AddItemByStockcode({stockCode: ITEMS.EDITABLE_ITEM.BARCODE});
        //Click on option to edit
        await POS.Register.ItemLines.OpenOptions({row: 1});
        //Edit price $20
        await POS.Dialog.EditItem.General.MultipackQty.EditPrice({row: 1, price:20.00});
        //Click on the update button
        await POS.Dialog.EditItem.Update.Click();
        //Click on the Ok button
        await POS.Dialog.Success.Ok.Click();
        //Remove item from register
        await POS.Register.ItemLines.ClickRemove({row: 1});
        await POS.waitForTimeout(2000);
        //Ring the item again (to check the changes has been updated)
        await POS.Register.AddItemByStockcode({stockCode: ITEMS.EDITABLE_ITEM.BARCODE});
        //Verify total items and subtotal have the expected values
        expect(await POS.Register.TotalItems.getText(), 'Total items should be 1').toEqual('1');
        expect(await POS.Register.Subtotal.getText(), 'Subtotal should be $20.00').toEqual('$20.00');
        //Click on the pay button
        await POS.Register.PayButton.Click();
        //Select the exact change cash value
        await POS.Dialog.Checkout.ClickCashPaymentButton({index: 1});
        expect(await POS.Dialog.CheckoutComplete.Change.getText(), 'Change should be $0.00').toEqual('Change: $0.00');
        await POS.Dialog.CheckoutComplete.No.Click();
        //Revert item price
        await POS.Register.AddItemByStockcode({stockCode: ITEMS.EDITABLE_ITEM.BARCODE});
        await POS.Register.ItemLines.OpenOptions({row: 1});
        await POS.Dialog.EditItem.General.MultipackQty.EditPrice({row: 1, price:10.00});
        await POS.Dialog.EditItem.Update.Click();
        await POS.Dialog.Success.Ok.Click();
    });

    test('[C79] Verify Sale of Item with Modified Price', { tag: ['@new', '@price'] }, async ({}) => {
        //Login to the POS application
        await POS.Login.In();
        //Ring an item
        await POS.Register.AddItemByStockcode({stockCode: ITEMS.NO_AGE_VERIFICATION.BARCODE});
        //Set a price and press enter
        await POS.Register.ItemLines.EditPrice({row: 1, price: 10});
        //Verify total items and subtotal have the expected values
        expect(await POS.Register.TotalItems.getText(), 'Total items should be 1').toEqual('1');
        expect(await POS.Register.Subtotal.getText(), 'Subtotal should be $10.00').toEqual('$10.00');
        //Click on the pay button
        await POS.Register.PayButton.Click();
        //Select the exact change cash value
        await POS.Dialog.Checkout.ClickCashPaymentButton({index: 1});
        expect(await POS.Dialog.CheckoutComplete.Change.getText(), 'Change should be $0.00').toEqual('Change: $0.00');
        await POS.Dialog.CheckoutComplete.No.Click();
    });
});
