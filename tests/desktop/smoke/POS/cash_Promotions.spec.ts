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

test.describe("Scenarios related to Promotions", { tag: ['@cash', '@promotion', '@smoke'] }, () => {

    test.skip('[C293] Verify Promotion Application on an Item ', { tag: ['@enabled'] }, async ({}) => {
        //Login to the POS application
        await POS.Login.In();
        //Enter the barcode of an item and hit enter, item will be ringed up
        //In this case the item category has age verification enabled
        await POS.Register.Shortcuts.SearchAndSelectItem({title: ITEMS.CROWN.SHORTCUTNAME});
        //Age verification dialog appears
        //Enter valid DOB
        await POS.Dialog.AgeVerification.EnterBirthDate.setText({ value: getDateDaysAgo(365 * 21) }); 
        //Click yes    
        await POS.Dialog.AgeVerification.Yes.Click();
        await POS.Register.ItemLines.EditQty({ row: 1, qty: 4 });
        //Confirm the promotion was applied, if not throw an error
        expect(await POS.Register.ItemLines.GetPromotion({ row: 1 }), 'When Item is added using Shortcut panel, The promotion is not applied/visible').toEqual('Promotion 1: 4 For $100 ($12.00 Off)');
        await POS.Register.ItemLines.DeleteRow({row: 1});

        await POS.Register.StockSearch.SearchAndSelect({ title: ITEMS.CROWN.TITLE });
        await POS.Dialog.AgeVerification.EnterBirthDate.setText({ value: getDateDaysAgo(365 * 21) }); 
        await POS.Dialog.AgeVerification.Yes.Click();
        await POS.Register.ItemLines.EditQty({ row: 1, qty: 4 });
        //Confirm the promotion was applied, if not throw an error
        expect(await POS.Register.ItemLines.GetPromotion({ row: 1 }), 'When Item is added using the Stock search field, The promotion is not applied/visible').toEqual('Promotion 1: 4 For $100 ($12.00 Off)');
        await POS.Register.ItemLines.DeleteRow({row: 1});

        await POS.Register.AddItemByStockcode({ stockCode: ITEMS.CROWN.BARCODE });
        await POS.Dialog.AgeVerification.EnterBirthDate.setText({ value: getDateDaysAgo(365 * 21) }); 
        await POS.Dialog.AgeVerification.Yes.Click();
        //Change qty to 4, ensure there is a promotion created 4 for $100
        await POS.Register.ItemLines.EditQty({ row: 1, qty: 4 });
        await POS.Register.ItemLines.EditQty({ row: 1, qty: 4 });
        //Confirm the promotion was applied, if not throw an error
        expect(await POS.Register.ItemLines.GetPromotion({ row: 1 }), 'When Item is added using the stockcode field,The promotion is not applied/visible').toEqual('Promotion 1: 4 For $100 ($12.00 Off)');
        //Click on the pay button to checkout  
        
        await POS.Register.PayButton.Click();
        //Select the exact change cash value
        await POS.Dialog.Checkout.ClickCashPaymentButton({index: 1});
        await POS.Dialog.CheckoutComplete.No.Click();
    });

    test('[C1158] Verify Disabled Promotion Status Prevents Application ', { tag: ['@notapplied'] }, async ({}) => {
        //Login to the POS application
        await POS.Login.In();
        //Enter the barcode of an item and hit enter, item will be ringed up
        //In this case the item category has age verification enabled
        await POS.Register.AddItemByStockcode({ stockCode: ITEMS.CROWN.BARCODE });
        //Age verification dialog appears
        //Enter valid DOB
        await POS.Dialog.AgeVerification.EnterBirthDate.setText({ value: getDateDaysAgo(365 * 21) });
        //Click yes
        await POS.Dialog.AgeVerification.Yes.Click();
        //Change qty to 2, ensure that no promotions are set for 2 units
        await POS.Register.ItemLines.EditQty({ row: 1, qty: 2 });
        //Confirm the promotion was not applied, if not throw an error
        expect(await POS.Register.Subtotal.getText(), 'The promotion should not be applied').toEqual('$56.00');
        //Click on the pay to checkout
        await POS.Register.PayButton.Click();
        //Select the exact change cash value
        await POS.Dialog.Checkout.ClickCashPaymentButton({index: 1});
        await POS.Dialog.CheckoutComplete.No.Click();
    });

});
