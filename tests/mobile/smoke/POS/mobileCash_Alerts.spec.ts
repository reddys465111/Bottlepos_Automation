import { test, expect } from '@playwright/test';
import { POS } from '../../../../src/section/POS';
import { Initializer, ITEMS, getDateDaysAgo } from '../../../../src/utils';

//This block runs before each test
test.beforeEach(async ({ page }) => {
    // Initialize the POS page with mobile view and iPhone 14 Pro Max device configuration
    await Initializer.Init(page, {device: {view: 'mobile'}});
});

//This block runs after each test
test.afterEach(async ({ page }, testInfo) => {
    await Initializer.Finalize(page, testInfo);
});

test.describe('Tests related to Age verification', { tag: ['@mobile', '@cash', '@age', '@smoke'] }, () => {

    test('[C80-1] Verify Display of Age Verification Popup ', { tag: ['@valid'] }, async ({page}) => {
        // Login to the POS application
        await POS.Login.In();
        //Enter the barcode of an item and hit enter, item will be ringed up
        //In this case the item category has age verification enabled
        await POS.Register.AddItemByStockcode({ stockCode: ITEMS.CROWN.BARCODE });
        //Age verification dialog appears
        expect(await POS.Dialog.AgeVerification.AlcoholVerifyAge()).toEqual(21);
        //Enter under age DOB
        await POS.Dialog.AgeVerification.EnterBirthDate.setText({ value: getDateDaysAgo(365 * 20) });
        //Click yes
        await POS.Dialog.AgeVerification.Yes.Click();
        //Under age error dialog appears
        expect(await POS.Dialog.Error.IsVisible()).toBeTruthy();
        //Verify error message
        expect(await POS.Dialog.Error.GetMessage()).toBe( 'Customer Not Old Enough for Purchase');
        //Click Ok
        await POS.Dialog.Error.Ok.Click();
    });

});
