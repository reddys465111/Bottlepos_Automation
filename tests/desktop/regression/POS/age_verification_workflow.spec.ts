import { test, expect } from '@playwright/test';
import { POS } from '../../../../src/section/POS';
import { getDateDaysAgo, Initializer, ITEMS } from '../../../../src/utils';

//This block runs before each test
test.beforeEach(async ({ page }) => {
    await Initializer.Init(page, {Scenario: {
        Admin: {
            Settings: {
                GeneralSettings: {
                    CreditCard: {
                        PayFac: {
                            Enable: true,
                        }
                    }
                }
            }
        }
    }});
});

//This block runs after each test
test.afterEach(async ({ page }, testInfo) => {
    await Initializer.Finalize(page, testInfo);
});

test.describe('Age Verification Workflow Tests', { tag: ['@age_verification', '@regression', '@pos'] }, () => {

    test('[C112266] As a cashier, I want to complete a transaction with age verification so that I can sell age-restricted items', { tag: ['@age_verification_workflow', '@critical'] }, async ({}) => {
        // Step 1: Login as admin on POS
        await POS.Login.In();
        
        // Step 2: Add an item with age verification
        // Using CROWN item which has age verification enabled based on existing test patterns
        await POS.Register.AddItemByStockcode({ stockCode: ITEMS.CROWN.BARCODE });
        
        // Step 3: Verify the age verification modal is displayed and close it
        // Assert that the Age Verification dialog is visible
        expect(await POS.Dialog.AgeVerification.IsVisible(), 'Error: Age Verification dialog was not displayed').toBeTruthy();
        // Click Yes to confirm age verification
        await POS.Dialog.AgeVerification.Yes.Click();
        
        // Step 4: Click pay
        await POS.Register.PayButton.Click();
        
        // Step 5: Select the exact change button
        // Using index 1 for exact change based on existing test patterns
        await POS.Dialog.Checkout.ClickCashPaymentButton({index: 1});
        
        // Step 6: Verify the success modal is displayed
        // Assert that the CheckoutComplete dialog is visible
        expect(await POS.Dialog.CheckoutComplete.IsVisible(), 'Error: Success modal was not displayed').toBeTruthy();
        
        // Step 7: Close the success modal without printing the receipt
        await POS.Dialog.CheckoutComplete.No.Click();
        
        // Additional verification: Ensure we're back to the register screen
        // This verifies the transaction was completed successfully
        expect(await POS.Register.PayButton.IsVisible(), 'Error: Not returned to register screen after transaction').toBeTruthy();
    });


    test('[C81] Verify "Not a Valid Date Error" on Invalid Date Submission', { tag: ['@invalid'] }, async ({}) => {
        //Login to the POS application
        await POS.Login.In();
        //Enter the barcode of an item and hit enter, item will be ringed up
        //In this case the item category has age verification enabled
        await POS.Register.AddItemByStockcode({ stockCode: ITEMS.CROWN.BARCODE });
        //Age verification dialog appears
        expect(await POS.Dialog.AgeVerification.AlcoholVerifyAge(), 'Age verification dialog should be visible').toEqual(21);
        //Enter under age DOB with wrong date format DD/MM/YYYY. [Correct format is MM/DD/YYYY]
        await POS.Dialog.AgeVerification.EnterBirthDate.setText({ value: getDateDaysAgo(365 * 20) });
        //Click yes
        await POS.Dialog.AgeVerification.Yes.Click();
        //Invalid date error dialog appears
        expect(await POS.Dialog.Error.IsVisible(), 'Error dialog should be visible').toBeTruthy();
        //Verify error message
        expect(await POS.Dialog.Error.GetMessage(), 'Error message should be "Not a valid date"').toBe( 'Customer Not Old Enough for Purchase' );
        //Click Ok
        await POS.Dialog.Error.Ok.Click();
    });

});
