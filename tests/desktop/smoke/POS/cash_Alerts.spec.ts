import { test, expect } from '@playwright/test';

import { Initializer, ITEMS, getDateDaysAgo } from '../../../../src/utils';
import { POS } from '../../../../src/section/POS';

//This block runs before each test
test.beforeEach(async ({ page }) => {
    await Initializer.Init(page);
});

//This block runs after each test
test.afterEach(async ({ page }, testInfo) => {
    await Initializer.Finalize(page, testInfo);
});

test.describe('Tests related to Age verification', { tag: ['@cash', '@age', '@smoke'] }, () => {

    test('[C80] Verify Display of Age Verification Popup ', { tag: ['@valid', '@smoke'] }, async ({}) => {
        //Login to the POS application
        await POS.Login.In();
        //Enter the barcode of an item and hit enter, item will be ringed up
        //In this case the item category has age verification enabled
        await POS.Register.AddItemByStockcode({ stockCode: ITEMS.CROWN.BARCODE });
        //Age verification dialog appears
        expect(await POS.Dialog.AgeVerification.AlcoholVerifyAge(), 'Age verification dialog should be visible').toEqual(21);
        //Enter under age DOB
        await POS.Dialog.AgeVerification.EnterBirthDate.setText({ value: getDateDaysAgo(365 * 20) });
        //Click yes
        await POS.Dialog.AgeVerification.Yes.Click();
        //Under age error dialog appears
        expect(await POS.Dialog.Error.IsVisible(), 'Error dialog should be visible').toBeTruthy();
        //Verify error message
        expect(await POS.Dialog.Error.GetMessage(), 'Error message should be "Customer Not Old Enough for Purchase"').toBe( 'Customer Not Old Enough for Purchase');
        //Click Ok
        await POS.Dialog.Error.Ok.Click();
    });
});
