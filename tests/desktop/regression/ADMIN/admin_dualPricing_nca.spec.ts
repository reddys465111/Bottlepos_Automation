import { test, expect } from '@playwright/test';
import { ADMIN } from '../../../../src/section/ADMIN';
import { Initializer } from '../../../../src/utils';

//This block runs before each test
test.beforeEach(async ({ page }) => {
    await Initializer.Init(page, {Admin: true});
});

//This block runs after each test
test.afterEach(async ({ page }, testInfo) => {
    await Initializer.Finalize(page, testInfo);
});

test.describe("Admin Test Cases Dual Pricing and nca", { tag: ['@DualPricing', '@nca','@regression','@nonparallelizable'] }, () => {
    
    test('[C8262 Verify NCA/Dual Pricing settings]', { tag: ['@NCA', '@DualPricing'] }, async ({ page }) => {
        //Login the Admin
        await ADMIN.Login.In();
        //Navigate to Accounting Settings page
        await ADMIN.Menu.Accounting_Settings.GoTo();
        //Locate the Non Cash Adj/Dual Pricing section
        expect(await ADMIN.Settings.AccountingSettings.DuelPricing.IsVisible(), 'Error: Non Cash Adjustment/Dual Pricing section should be visible').toBeTruthy();
        //Check that the Type dropdown is visible and allows selecting an option
        expect(await ADMIN.Settings.AccountingSettings.DuelPricing.Type.IsClickable(), 'Error: Type dropdown should be visible').toBeTruthy();
        //Toggle the checkboxes for Debit, EBT, Gift Card, and Side Card individually and allow checking and unchecking
        expect(await ADMIN.Settings.AccountingSettings.DuelPricing.EBT.IsClickable(), 'Error: EBT checkbox should be visible').toBeTruthy();
        expect(await ADMIN.Settings.AccountingSettings.DuelPricing.Debit.IsClickable(), 'Error: Debit checkbox should be visible').toBeTruthy();
        expect(await ADMIN.Settings.AccountingSettings.DuelPricing.GiftCard.IsClickable(), 'Error: Gift Card checkbox should be visible').toBeTruthy();
        expect(await ADMIN.Settings.AccountingSettings.DuelPricing.SideCard.IsClickable(), 'Error: Side Card checkbox should be visible').toBeTruthy();
        //Verify the Percentage field allows numeric input in text box
        expect(await ADMIN.Settings.AccountingSettings.DuelPricing.Percentage.IsEditable(), 'Error: Percentage field should allow numeric input').toBeTruthy();
        //Verify Show Cash & Regular price on Pay button checkbox is present in the page
        expect(await ADMIN.Settings.AccountingSettings.DuelPricing.ShowCashRegularPriceOnPayButton.IsClickable(), 'Error: Show Cash & Regular price on Pay button checkbox should be visible').toBeTruthy();
        //Toggle the Show Exclude Regular Price Button
        expect(await ADMIN.Settings.AccountingSettings.DuelPricing.Roundto9thcent.IsClickable(), 'Error: Round to 9th cent checkbox should be visible').toBeTruthy();
    });
});

