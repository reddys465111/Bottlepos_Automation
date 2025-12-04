import { test, expect } from '@playwright/test';
import { POS } from '../../../../src/section/POS';
import { Initializer, payfac } from '../../../../src/utils';

//This block runs before each test
test.beforeEach(async ({ page }, testInfo) => {
    await Initializer.Init(page);
    await payfac.Init(page);
});

//This block runs after each test
test.afterEach(async ({ page }, testInfo) => {
    await Initializer.Finalize(page, testInfo);
});

test.describe('PayFac Transaction Clearing', { tag: ['@smoke', '@payfac', '@register'] }, () => {
    
    test('[C1234] As an admin, I want to verify cart clears after PayFac payment so that register is ready for next customer', { tag: ['@payment', '@cart_clearing'] }, async ({}) => {
        // Step 1: Login as admin on POS
        await POS.Login.In();
        
        // Step 2: Add an item with price = 10, and name = item 1
        await POS.Register.AddItem.Click();
        await POS.Register.ItemLines.EditPrice({ row: 1, price: 10 });
        
        // Verify item was added correctly
        expect(await POS.Register.TotalItems.getText(), 'Total items should be 1').toEqual('1');
        expect(await POS.Register.Total.getText(), 'Total should reflect item price plus tax').toContain('10');
        
        // Step 3: Pay the item with PayFac card
        await POS.Register.PayButton.Click();
        
        // Process PayFac payment - simulate card payment with total amount
        const totalAmount = parseFloat((await POS.Dialog.Checkout.CashTotal.getText()).replace('$', ''));
        await payfac.Read({ amount: totalAmount });
        
        // Select card payment method
        await POS.Dialog.Checkout.Card.Click();
        
        // Wait for PayFac processing and approval
        expect(await POS.Dialog.Success.IsVisible(), 'Payment should be approved').toBeTruthy();
        await POS.Dialog.Success.Close.Click();
        
        // Step 4: Verify that the register page doesn't have any item in the table
        expect(await POS.Register.TotalItems.getText(), 'Cart should be empty after successful transaction').toEqual('0');
        expect(await POS.Register.Total.getText(), 'Total should be $0.00 after transaction completion').toEqual('$0.00');
        
        // Additional verification - ensure register is ready for next customer
        expect(await POS.Register.AddItem.IsVisible(), 'Add Item button should be visible for next transaction').toBeTruthy();
        expect(await POS.Register.PayButton.IsVisible(), 'Pay button should be visible for next transaction').toBeTruthy();
    });
});
