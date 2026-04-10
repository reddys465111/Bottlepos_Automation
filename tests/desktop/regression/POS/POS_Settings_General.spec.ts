import { test, expect } from '@playwright/test';
import { Initializer, ITEMS } from '../../../../src/utils';
import { POS } from '../../../../src/section/POS';
import { rowType } from '../../../../src/section/POS/tables/table_Register/table_Register';


//This block runs before each test
test.beforeEach(async ({ page }) => {
    await Initializer.Init(page);

});

//This block runs after each test
test.afterEach(async ({ page }, testInfo) => {
    await Initializer.Finalize(page, testInfo);
});
test.describe('POS General Settings', { tag: ['@POS', '@SettingsTab', '@regression'] }, () => {

    test('[C9078] General: Verify "Use On-screen Keypad" can be Enabled', { tag: ['@POS', '@EnableKeyboard', '@regression'] }, async () => {
        //Login to the  POS Application
        await POS.Login.In();
        //Navigate to Settings tab
        await POS.Settings.Click();
        //disbale  "Use On-screen Keypad" disbaled by default
        await POS.Settings.General.UseOnScreenKeypad.UnCheck();
        //Enable "Use On-screen Keypad"
        await POS.Settings.General.UseOnScreenKeypad.Check();
        //Verify "Use On-screen Keypad" is enabled
        expect(await POS.Settings.General.UseOnScreenKeypad.IsChecked(), 'Use On-screen Keypad is not enabled').toBe(true);
        //rESet to default
        await POS.Settings.General.UseOnScreenKeypad.UnCheck();
    });
    test('[C9079] General: Verify "Use On-screen Keypad" can be Disabled', { tag: ['@POS', '@DisableKeyboard', '@regression'] }, async () => {
        //Login to the  POS Application
        await POS.Login.In();
        //Navigate to Settings tab
        await POS.Settings.Click();
        //Enable  "Use On-screen Keypad" disbaled by default
        await POS.Settings.General.UseOnScreenKeypad.Check();
        //Disable "Use On-screen Keypad"
        await POS.Settings.General.UseOnScreenKeypad.UnCheck();
        //Verify "Use On-screen Keypad" is disabled
        expect(await POS.Settings.General.UseOnScreenKeypad.IsChecked(), 'Use On-screen Keypad is not disabled').toBe(false);
    });

    test('[C9080] General: Verify "Show Fixed Keypad" can be enabled and visible on the Register page ', { tag: ['@POS', '@ShowFixedKeypad', '@regression'] }, async () => {
        //Login to the  POS Application
        await POS.Login.In();
        //Navigate to Settings tab
        await POS.Settings.Click();
        //Enable "Show Fixed Keypad"
        await POS.Settings.General.ShowFixedKeypad.Check();
        //Verify "Show Fixed Keypad" is enabled
        expect(await POS.Settings.General.ShowFixedKeypad.IsChecked(), 'Show Fixed Keypad is not enabled').toBe(true);
        //Navigate to regsiter Tab
        await POS.Register.Click();
        //Verify fixed keypad is visible on the register page
        await POS.Register.ItemLines.FixedKeypad();
        expect(await POS.Register.ItemLines.FixedKeypad(), 'Fixed Keypad is not visible').toBe(true);
        //rESet to default
        await POS.Settings.Click();
        await POS.Settings.General.ShowFixedKeypad.UnCheck();
    });
    test('[C9081] Verify "Show Fixed Keypad" can be disabled and is not visible on Register page', { tag: ['@POS', '@ShowFixedKeypad', '@regression'] }, async () => {
        //Login to the  POS Application
        await POS.Login.In();
        //Navigate to Settings tab
        await POS.Settings.Click();
        //Enable "Show Fixed Keypad"
        await POS.Settings.General.ShowFixedKeypad.UnCheck();
        //Verify "Show Fixed Keypad" is enabled
        expect(await POS.Settings.General.ShowFixedKeypad.IsChecked(), 'Show Fixed Keypad is  enabled').toBe(false);
        //Navigate to regsiter Tab
        await POS.Register.Click();
        //Verify fixed keypad is visible on the register page
        await POS.Register.ItemLines.FixedKeypad();
        expect(await POS.Register.ItemLines.FixedKeypad(), 'Fixed Keypad is not visible').toBe(false);

    });
    test('[C9082] General: Verify "Auto Launch Customer Screen" can be enabled and visible', { tag: ['@POS', '@AutoLaunchCustomerScreen', '@regression'] }, async () => {
        //Login to the  POS Application
        await POS.Login.In();
        //Navigate to Settings tab
        await POS.Settings.Click();
        //Enable "Auto Launch Customer Screen"
        await POS.Settings.General.AutoLaunchCustomerScreen.Check();
        //Verify "Auto Launch Customer Screen" is enabled
        expect(await POS.Settings.General.AutoLaunchCustomerScreen.IsChecked(), 'Auto Launch Customer Screen is not enabled').toBe(true);
        //Reset to default
        await POS.Settings.General.AutoLaunchCustomerScreen.UnCheck();


    });

    test('[C9083] General: Verify "Auto Launch Customer Screen" can be disabled and is not visible', { tag: ['@POS', '@AutoLaunchCustomerScreen', '@regression'] }, async () => {
        //Login to the  POS Application
        await POS.Login.In();
        //Navigate to Settings tab
        await POS.Settings.Click();
        //Enable "Auto Launch Customer Screen"
        await POS.Settings.General.AutoLaunchCustomerScreen.UnCheck();
        //Verify "Auto Launch Customer Screen" is enabled
        expect(await POS.Settings.General.AutoLaunchCustomerScreen.IsChecked(), 'Auto Launch Customer Screen is enabled').toBe(false);

    });

    test('[C9084] Verify "Show Total On Customer Screen" can be enabled and visible on the Customer Screen', { tag: ['@POS', '@CustomerScreen', '@regression','@nonparallelizable'] }, async () => {
        //Login the POS Application
        await POS.Login.In();
        //Navigate to Settings tab
        await POS.Settings.Click();
        //Enable "Show Total On Customer Screen"

        await POS.Settings.General.ShowTotalOnCustomerScreen.Check();
        //Verify "Show Total On Customer Screen" is enabled
        expect(await POS.Settings.General.ShowTotalOnCustomerScreen.IsChecked(), 'Show Total On Customer Screen is checkbox not enabled').toBe(true);
        //Navigate to regsiter Tab
        await POS.Register.Click();
        //Add an item to the cart
        await POS.Register.AddItemByStockcode({ stockCode: ITEMS.BUDLIGHT.BARCODE });
        //Click on Customer Screen button to open customer screen
        await POS.CustomerScreenButton.Click();
        //Verify total is visible on the customer screen
        const Headercolumn = await POS.CustomerScreen.Table.IsColumnVisible(0, "Total");
        expect(Headercolumn, 'Total is not visible on Customer Screen').toBeTruthy();

    });

    test('[C9085] Verify "Show Total On Customer Screen" can be disabled and is not visible on the Customer Screen', { tag: ['@POS', '@CustomerScreen', '@regression'] }, async () => {
        // Login the POS Application
        await POS.Login.In();
        // Navigate to Settings tab
        await POS.Settings.Click();
        // Disable "Show Total On Customer Screen" (just uncheck, no expect)
        await POS.Settings.General.ShowTotalOnCustomerScreen.UnCheck();
        // Navigate to Register tab
        await POS.Register.Click();
        // Add an item to the cart
        await POS.Register.AddItemByStockcode({ stockCode: ITEMS.BUDLIGHT.BARCODE });
        // Open Customer Screen
        await POS.CustomerScreenButton.Click();
        // Verify TOTAL is NOT visible on Customer Screen
        const Headercolumn = await POS.CustomerScreen.Table.IsColumnVisible(0, "Total");
        expect(Headercolumn, 'Total should NOT be visible on Customer Screen').toBeFalsy();
    });

    test('[C9086] Verify "Show Price On Customer Screen" can be enabled and visible on the Customer Screen', { tag: ['@POS', '@CustomerScreen', '@regression','@nonparallelizable'] }, async () => {
        //Login the POS Application
        await POS.Login.In();
        //Navigate to Settings tab
        await POS.Settings.Click();
        //Enable "Show Price On Customer Screen"
        await POS.Settings.General.ShowPriceOnCustomerScreen.Check();
        //Verify "Show Price On Customer Screen" is enabled
        expect(await POS.Settings.General.ShowPriceOnCustomerScreen.IsChecked(), 'Show Price On Customer Screen checkbox is not enabled').toBe(true);
        //Navigate to regsiter Tab
        await POS.Register.Click();
        //Add an item to the cart
        await POS.Register.AddItemByStockcode({ stockCode: ITEMS.BUDLIGHT.BARCODE });
        //Click on Customer Screen button to open customer screen
        await POS.CustomerScreenButton.Click();

        //Verify price is visible on the customer screen
        const pricecolumn = await POS.CustomerScreen.Table.IsColumnVisible(0, "Price");
        expect(pricecolumn, 'Price is not visible on Customer Screen').toBeTruthy();
    });

    test('[C9087] Verify "Show Price On Customer Screen" can be turned off and not visible on the Customer Screen', { tag: ['@POS', '@CustomerScreen', '@regression'] }, async () => {
        //Login the POS Application
        await POS.Login.In();
        //Navigate to Settings tab
        await POS.Settings.Click();
        //Enable "Show Price On Customer Screen"
        await POS.Settings.General.ShowPriceOnCustomerScreen.UnCheck();
        //Navigate to regsiter Tab
        await POS.Register.Click();
        //Add an item to the cart
        await POS.Register.AddItemByStockcode({ stockCode: ITEMS.BUDLIGHT.BARCODE });
        //Click on Customer Screen button to open customer screen
        await POS.CustomerScreenButton.Click();
        //Verify price is visible on the customer screen
        const pricecolumn = await POS.CustomerScreen.Table.IsColumnVisible(0, "Price");
        expect(pricecolumn, 'Price is still visible on Customer Screen').toBeFalsy();
    });

    test('[C9088] Verify "Show Customer Number" can be enabled and visible', { tag: ['@POS', '@Customer', '@regression'] }, async () => {
        //Login the POS Application
        await POS.Login.In();
        //Navigate to Settings tab
        await POS.Settings.Click();
        //Enable "Show Customer Number"
        await POS.Settings.General.ShowCustomerNumber.Check();
        //Verify "Show Customer Number" is enabled
        expect(await POS.Settings.General.ShowCustomerNumber.IsChecked(), 'Show Customer Number checkbox is not enabled').toBe(true);
        //Navigate to regsiter Tab
        await POS.Register.Click();
        //Click the Customer deatils button to open customer details pop up
        expect(await POS.Register.Customer.Options.IsClickable(), 'Customer Details button is not clickable').toBeTruthy();
    });

    test('[C9089] Verify "Show Customer Number" can be disabled and not visible', { tag: ['@POS', '@Customer', '@regression'] }, async () => {
        //Login the POS Application
        await POS.Login.In();
        //Navigate to Settings tab
        await POS.Settings.Click();
        //Disable "Show Customer Number"
        await POS.Settings.General.ShowCustomerNumber.UnCheck();
        //Verify "Show Customer Number" is disabled
        expect(await POS.Settings.General.ShowCustomerNumber.IsChecked(), 'Show Customer Number checkbox is not disabled').toBe(false);
        //Navigate to regsiter Tab
        await POS.Register.Click();
        //Click the Customer deatils button to open customer details pop up
        expect(await POS.Register.Customer.Options.IsClickable(), 'Customer Details button is not clickable').toBeFalsy();
        //Reset to default
        await POS.Settings.Click();
        await POS.Settings.General.ShowCustomerNumber.Check();
    });

    test('[C9090] "Show Sale Notes" can be enabled and can edit sale notes', { tag: ['@POS', '@SaleNotes', '@regression'] }, async () => {
        //Login the POS Application
        await POS.Login.In();
        //Navigate to Settings tab
        await POS.Settings.Click();
        //Disable "Show Customer Number"
        await POS.Settings.General.ShowSaleNotes.Check();
        //Verify "Show Sale Notes" is enabled
        expect(await POS.Settings.General.ShowSaleNotes.IsChecked(), 'Show Sale Notes checkbox is not enabled').toBe(true);
        //Navigate to regsiter Tab
        await POS.Register.Click();
        //Click on Sale Notes button to open sale notes pop up
        await POS.Register.SaleNotes.Click();
        //Verify sale notes text area is visible and editable
        expect(await POS.Register.SaleNotes.IsVisible(), 'Sale Notes textarea is not visible').toBeTruthy();
        expect(await POS.Register.SaleNotes.IsEditable(), 'Sale Notes textarea is not editable').toBeTruthy();
    });

    test('[C9091] "Show Sale Notes" can be disabled and not visible', { tag: ['@POS', '@SaleNotes', '@regression'] }, async () => {
        //Login the POS Application
        await POS.Login.In();
        //Navigate to Settings tab
        await POS.Settings.Click();
        //Disable "Show Customer Number"
        await POS.Settings.General.ShowSaleNotes.UnCheck();
        //Navigate to regsiter Tab
        await POS.Register.Click();
        //Verify whether sale notes is visible and editable
        expect(await POS.Register.SaleNotes.IsVisible(), 'Sale Notes textarea is not visible').toBeFalsy();
    });

    test('[C9092] Verify "Always Show Shortcuts" can be enabled and shortcut is visible after login', { tag: ['@POS', '@ShortCuts', '@regression'] }, async () => {
        //Login the POS Application
        await POS.Login.In();
        //Navigate to Settings tab
        await POS.Settings.Click();
        //Enable "Always Show Shortcuts"
        await POS.Settings.General.AlwaysShowShortcuts.Check();
        //Verify "Always Show Shortcuts" is enabled
        expect(await POS.Settings.General.AlwaysShowShortcuts.IsChecked(), 'Always Show Shortcuts checkbox is not enabled').toBe(true);
        //Navigate to regsiter Tab
        await POS.Register.Click();
        //Verify shortcuts are visible on the register page
        expect(await POS.Register.Shortcuts.Categories.IsVisible(), 'Shortcuts are not visible on the register page').toBeTruthy();

    });
    test('[C9093] Verify "Always Show Shortcuts" can be disabled and Shortcuts hidden', { tag: ['@POS', '@ShortCuts', '@regression'] }, async () => {
        //Login the POS Application
        await POS.Login.In();
        //Navigate to Settings tab
        await POS.Settings.Click();
        //Enable "Always Show Shortcuts"
        await POS.Settings.General.AlwaysShowShortcuts.UnCheck();
        //Navigate to regsiter Tab
        await POS.Register.Click();
        //Verify shortcuts are not visible on the register page
        expect(await POS.Register.Shortcuts.Open(), 'Shortcuts box is not closed').toBeFalsy();

    });

    test('[C9094]  Verify "Enable Weborder notifications" can be enabled and receive notifications', { tag: ['@POS', '@WebOrderNotifications', '@regression'] }, async () => {
        //logn to POS Application
        await POS.Login.In();
        //Navigate to Settings tab
        await POS.Settings.Click();
        //Enable "Enable Weborder notifications"
        await POS.Settings.General.EnableWeborderNotifications.Check();
        //Verify "Enable Weborder notifications" is enabled
        expect(await POS.Settings.General.EnableWeborderNotifications.IsChecked(), 'Enable Weborder notifications checkbox is not enabled').toBe(true);
    });

    test('[C9095]  Verify "Enable Weborder notifications" can be disabled', { tag: ['@POS', '@WebOrderNotifications', '@regression'] }, async () => {
        //logn to POS Application
        await POS.Login.In();
        //Navigate to Settings tab
        await POS.Settings.Click();
        //Enable "Enable Weborder notifications"
        await POS.Settings.General.EnableWeborderNotifications.UnCheck();
        //Verify "Enable Weborder notifications" is disabled
        expect(await POS.Settings.General.EnableWeborderNotifications.IsChecked(), 'Enable Weborder notifications checkbox is not disabled').toBe(false);
    });
    test('[C9096] Verify "Hide Total Details" can be enabled and the total is not displayed on POS screen', { tag: ['@POS', '@HideTotalDetails', '@regression'] }, async () => {
        //Login to the  POS Application
        await POS.Login.In();
        //Navigate to Settings tab
        await POS.Settings.Click();
        //Enable "Hide Total Details"
        await POS.Settings.General.HideTotalDetails.Check();
        //Verify "Hide Total Details" is enabled
        expect(await POS.Settings.General.HideTotalDetails.IsChecked(), 'Hide Total Details checkbox is not enabled').toBe(true);
        //Navigate to regsiter Tab
        await POS.Register.Click();
        //Verify total details is not visible on the register page
        expect(await POS.Register.Total.IsVisible(), 'Total details is still visible on the register page').toBeFalsy();
        //Reset to default
        await POS.Settings.Click();
        await POS.Settings.General.HideTotalDetails.UnCheck();
    });

    test('[C9097] Verify "Hide Total Details" can be disabled and the total details are displayed on POS screen', { tag: ['@POS', '@HideTotalDetails', '@regression'] }, async () => {
        //Login to the  POS Application
        await POS.Login.In();
        //Navigate to Settings tab
        await POS.Settings.Click();
        //Enable "Hide Total Details"
        await POS.Settings.General.HideTotalDetails.UnCheck();
        //Navigate to regsiter Tab
        await POS.Register.Click();
        //Verify total details is not visible on the register page
        expect(await POS.Register.Total.IsVisible(), 'Total details is not visible on the register page').toBeTruthy();
    });

});