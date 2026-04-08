import { test, expect } from '@playwright/test';
import { POS } from '../../../../src/section/POS';
import { Initializer, ITEMS, getDateDaysAgo } from '../../../../src/utils';

//This block runs before each test
test.beforeEach(async ({ page }) => {
    await Initializer.Init(page, {
        Scenario: {
            Admin: {
                Settings: {
                    AccountingSettings: {
                        DefaultEBTTax_Enable: false,
                        
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

test.describe('Suspend and Recall Sales', { tag: ['@smoke', '@register', '@nonparallelizable'] }, () => {
    
    test('[C1424] Recall suspended order items', { tag: ['@recall', '@suspend', '@nonparallelizable'] }, async ({}) => {
        // Login to POS system
        await POS.Login.In();
        
        // Step 1: Ring up 4 items (between age required and not)
        
        // Add first item - age verification required (CROWN)
        await POS.Register.AddItemByStockcode({stockCode: ITEMS.CROWN.BARCODE});
        // Handle age verification dialog
        await POS.Dialog.AgeVerification.IsVisible();
        await POS.Dialog.AgeVerification.EnterBirthDate.setText({ value: getDateDaysAgo(365 * 21) });
        await POS.Dialog.AgeVerification.Yes.Click();
        await POS.Dialog.AgeVerification.WaitForHidden();
        
        // Add second item - no age verification required
        await POS.Register.AddItemByStockcode({stockCode: ITEMS.NO_AGE_VERIFICATION.BARCODE});
        
        // Add third item - age verification required (JACK) - NO dialog (already verified for transaction)
        await POS.Register.AddItemByStockcode({stockCode: ITEMS.JACK.BARCODE});
        
        // Add fourth item - no age verification required
        await POS.Register.AddItemByStockcode({stockCode: ITEMS.EDITABLE_ITEM.BARCODE});
        
        //get the total items before suspend
        expect(await POS.Register.TotalItems.getText(), 'Should have 4 items in cart before suspend').toEqual('4');
        
        const total_before_suspend = await POS.Register.Total.getText();
        // Step 2: Suspend the transaction with the 4 items
        await POS.Register.Suspend.Click();
        
        // Confirm suspension if dialog appears
        if (await POS.Dialog.Confirmation.IsVisible()) {
            await POS.Dialog.Confirmation.Yes.Click();
        }
        
        // Step 3: Verify that there are no items in the register table
        expect(await POS.Register.TotalItems.getText(), 'Cart should be empty after suspend').toEqual('0');
        expect(await POS.Register.Total.getText(), 'Total should be $0.00 after suspend').toEqual('$0.00');
        
        // Step 4: Click on the recall button to bring back the transaction
        await POS.Register.Recall.Click();
        
        // Transaction Details Modal appears with suspended transaction information
        await POS.Dialog.TransactionDetails.IsVisible();
        
        // Click "Complete" button to actually recall the transaction
        await POS.Dialog.TransactionDetails.Complete.Click();
        
        
        // Step 5: Verify that all 4 items are present in the register table
        expect(await POS.Register.TotalItems.getText(), 'Should have 4 items after recall').toEqual('4');

        //verify the total is the same as the total before suspend
        const total_after_recall = await POS.Register.Total.getText();
        expect(total_after_recall, 'Total should equal the total before suspend').toEqual(total_before_suspend);
        
        // Verify specific items are restored by checking each item name in the cart
        const item1Name = await POS.Register.ItemLines.GetItemName({row: 1});
        const item2Name = await POS.Register.ItemLines.GetItemName({row: 2});
        const item3Name = await POS.Register.ItemLines.GetItemName({row: 3});
        const item4Name = await POS.Register.ItemLines.GetItemName({row: 4});
        
        // Verify all items have names (not empty) - indicating successful restoration
        expect(item1Name, `First item "${item1Name}" should be restored with name: ${ITEMS.CROWN.TITLE}`).toEqual(ITEMS.CROWN.TITLE);
        expect(item2Name, `Second item "${item2Name}" should be restored with name: ${ITEMS.NO_AGE_VERIFICATION.TITLE}`).toEqual(ITEMS.NO_AGE_VERIFICATION.TITLE);
        expect(item3Name, `Third item "${item3Name}" should be restored with name: ${ITEMS.JACK.TITLE}`).toEqual(ITEMS.JACK.TITLE);
        expect(item4Name, `Fourth item "${item4Name}" should be restored with name: ${ITEMS.EDITABLE_ITEM.TITLE}`).toEqual(ITEMS.EDITABLE_ITEM.TITLE);
        
        // Verify the transaction total is restored (not $0.00)
        const total = await POS.Register.Total.getText();
        expect(total, 'Total should not be $0.00 after recall').not.toEqual('$0.00');
        expect(parseFloat(total.replace('$', '')), 'Total should be greater than 0').toBeGreaterThan(0);
        
        // ensure Pay button is visible for completing the transaction
        await POS.Register.PayButton.Click();
        // checkout dialog displayed
        // click on cash payment button with the exact change option
        await POS.Dialog.Checkout.ClickCashPaymentButton({index: 1});
        // checkout complete dialog displayed
        // click on no button, to no print receipt
        await POS.Dialog.CheckoutComplete.No.Click();
        // verify cart is empty
        expect(await POS.Register.TotalItems.getText(), 'Total items should be 0').toEqual('0');
    });
});
