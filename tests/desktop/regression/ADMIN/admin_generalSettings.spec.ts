import { test, expect } from '@playwright/test';
import { ADMIN } from '../../../../src/section/ADMIN';
import { Initializer, ITEMS } from '../../../../src/utils';
import { POS } from '../../../../src/section/POS';

test.describe.serial("Admin Test Cases General settings", { tag: ['@creditCard', '@generalSettings','@regression'] }, () => {

    //This block runs before each test
    test.beforeEach(async ({ page }) => {
        await Initializer.Init(page, 
            {
                Admin: true,
                Scenario: {
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
                }
            });
    });

    //This block runs after each test
    test.afterEach(async ({ page }, testInfo) => {
        await Initializer.Finalize(page, testInfo);
    });

    
    test('[C3317] Verify Admin can configure Credit Card settings to Pax', { tag: ['@CreditCard', '@Admin', '@Settings'] }, async ({ page }) => {

        // --- Step 1: Login to Admin ---
        await ADMIN.Login.In();
        // --- Step 2: Navigate to General Settings ---
        await ADMIN.Menu.General_Settings.GoTo();
        await ADMIN.Settings.GeneralSettings.CreditCard.CardType.SelectOption({ byText: 'Pax' });

        // --- Step 3: Configure Pax fields ---
        await ADMIN.Settings.GeneralSettings.CreditCard.PaxApplicationName.setText({ value: 'bottlepos' });
        await ADMIN.Settings.GeneralSettings.CreditCard.PaxApplicationVersion.setText({ value: '1.0.0' });
        await ADMIN.Settings.GeneralSettings.CreditCard.PaxConfigurationTimeout.setText({ value: '120' });
        await ADMIN.Settings.GeneralSettings.CreditCard.PaxPromptForSignature.SelectOption({byText:'No'})

        // --- Step 4: Save Settings ---
        await ADMIN.Settings.GeneralSettings.Save.Click();
        await ADMIN.Dialog.Success.Ok.Click();

        // --- Step 5: Validate values persisted ---
        await ADMIN.Menu.General_Settings.GoTo();

        expect(await ADMIN.Settings.GeneralSettings.CreditCard.CardType.GetSelectedOption()).toEqual('Pax');
        expect(await ADMIN.Settings.GeneralSettings.CreditCard.PaxApplicationName.getText()).toEqual('bottlepos');
        expect(await ADMIN.Settings.GeneralSettings.CreditCard.PaxApplicationVersion.getText()).toEqual('1.0.0');
        expect(await ADMIN.Settings.GeneralSettings.CreditCard.PaxConfigurationTimeout.getText()).toEqual('120');
        expect(await ADMIN.Settings.GeneralSettings.CreditCard.PaxPromptForSignature.GetSelectedOption()).toEqual('No');

    });

    test('[C3318] Verify Admin can configure Credit Card settings to TriposDirect', { tag: ['@CreditCard', '@Admin', '@Settings'] }, async ({ page }) => {

        // --- Step 1: Login to Admin ---
        await ADMIN.Login.In();

        // --- Step 2: Navigate to General Settings ---
        await ADMIN.Menu.General_Settings.GoTo();
        await ADMIN.Settings.GeneralSettings.CreditCard.CardType.SelectOption({ byText: 'TriposDirect' });

        // --- Step 3: Configure TriposDirect fields ---
        await ADMIN.Settings.GeneralSettings.CreditCard.triposUrl.setText({ value: 'http://127.0.0.1:8181/api/v1/sale' });
        await ADMIN.Settings.GeneralSettings.CreditCard.triposAccept.setText({ value: 'application/json' });
        await ADMIN.Settings.GeneralSettings.CreditCard.triposContentType.setText({ value: 'application/json' });

        await ADMIN.Settings.GeneralSettings.CreditCard.triposAppId.setText({ value: '8857' });
        await ADMIN.Settings.GeneralSettings.CreditCard.triposAppName.setText({ value: 'bottlepos' });
        await ADMIN.Settings.GeneralSettings.CreditCard.triposAppVersion.setText({ value: '1.0' });

        await ADMIN.Settings.GeneralSettings.CreditCard.triposDeveloperKey.setText({ value: '7913b9fd-2298-4b41-b256-66d5769b4b0f' });
        await ADMIN.Settings.GeneralSettings.CreditCard.triposDeveloperSecret.setText({ value: '10cf325b-5405-4852-808f-9473b5f869a4' });

        // Optional configs
        await ADMIN.Settings.GeneralSettings.CreditCard.triposThresholdAmount.setText({ value: '500' });
        await ADMIN.Settings.GeneralSettings.CreditCard.triposPromptForSignature.setText({ value: 'No' });

        // --- Step 4: Save Settings ---
        await ADMIN.Settings.GeneralSettings.Save.Click();
        await ADMIN.Dialog.Success.Ok.Click();

        // --- Step 5: Validate values persisted ---
        await ADMIN.Menu.General_Settings.GoTo();

        expect(await ADMIN.Settings.GeneralSettings.CreditCard.CardType.GetSelectedOption()).toEqual('TriposDirect');
        expect(await ADMIN.Settings.GeneralSettings.CreditCard.triposUrl.getText()).toEqual('http://127.0.0.1:8181/api/v1/sale');
        expect(await ADMIN.Settings.GeneralSettings.CreditCard.triposAccept.getText()).toEqual('application/json');
        expect(await ADMIN.Settings.GeneralSettings.CreditCard.triposContentType.getText()).toEqual('application/json');

        expect(await ADMIN.Settings.GeneralSettings.CreditCard.triposAppId.getText()).toEqual('8857');
        expect(await ADMIN.Settings.GeneralSettings.CreditCard.triposAppName.getText()).toEqual('bottlepos');
        expect(await ADMIN.Settings.GeneralSettings.CreditCard.triposAppVersion.getText()).toEqual('1.0');

        expect(await ADMIN.Settings.GeneralSettings.CreditCard.triposDeveloperKey.getText()).toEqual('7913b9fd-2298-4b41-b256-66d5769b4b0f');
        expect(await ADMIN.Settings.GeneralSettings.CreditCard.triposDeveloperSecret.getText()).toEqual('10cf325b-5405-4852-808f-9473b5f869a4');

        expect(await ADMIN.Settings.GeneralSettings.CreditCard.triposThresholdAmount.getText()).toEqual('500');
        expect(await ADMIN.Settings.GeneralSettings.CreditCard.triposPromptForSignature.getText()).toEqual('No');

    });


    test('[C3319] Verify Admin can configure Credit Card settings to Payfac', { tag: ['@CreditCard', '@Admin', '@Settings'] }, async ({ page }) => {

        // --- Step 1: Login to Admin ---
        await ADMIN.Login.In();

        // --- Step 2: Navigate to General Settings ---
        await ADMIN.Menu.General_Settings.GoTo();
        await ADMIN.Settings.GeneralSettings.CreditCard.CardType.SelectOption({ byText: 'PayFac' });

        // --- Step 3: Configure Payfac fields ---
        await ADMIN.Settings.GeneralSettings.CreditCard.payfacacid.setText({ value: '1' }); 
        await ADMIN.Settings.GeneralSettings.CreditCard.payfacapiURL.setText({ value: 'https://payment.bottlepos.com/' });


        // --- Step 4: Save Settings ---
        await ADMIN.Settings.GeneralSettings.Save.Click();
        await ADMIN.Dialog.Success.Ok.Click();

        // --- Step 5: Validate values persisted ---
        await ADMIN.Menu.General_Settings.GoTo();

        expect(await ADMIN.Settings.GeneralSettings.CreditCard.CardType.GetSelectedOption()).toEqual('PayFac');
        expect(await ADMIN.Settings.GeneralSettings.CreditCard.payfacacid.getText()).toEqual('1');
        expect(await ADMIN.Settings.GeneralSettings.CreditCard.payfacapiURL.getText()).toEqual('https://payment.bottlepos.com/');

    });



    test('[C8199] Verify Tender Settings configuration in Admin', { tag: ['@sidetender', '@Adminsettings'] }, async ({ page }) => {

        // --- Step 1: Login as Admin ---
        await ADMIN.Login.In();

        // --- Step 2: Navigate to General Settings ---
        await ADMIN.Menu.General_Settings.GoTo();

        // --- Step 3: Verify Side Tender Settings checkbox is clickable ---
        expect(
            await ADMIN.Settings.GeneralSettings.tenderSidecard.Sidecard.IsClickable(),
            'Error: Side Tender checkbox should be visible'
        ).toBeTruthy();

        // --- Step 4: Verify Check Tender checkbox is clickable ---
        expect(
            await ADMIN.Settings.GeneralSettings.tenderSidecard.Check.IsClickable(),
            'Error: Check Tender checkbox should be visible'
        ).toBeTruthy();

        // --- Step 5: Verify Mobile Sidecard checkbox is clickable ---
        expect(
            await ADMIN.Settings.GeneralSettings.tenderSidecard.mobileSidecard.IsClickable(),
            'Error: Mobile Side Tender checkbox should be visible'
        ).toBeTruthy();

        // --- Step 6: Verify Mobile Check checkbox is clickable ---
        expect(
            await ADMIN.Settings.GeneralSettings.tenderSidecard.mobileCheck.IsClickable(),
            'Error: Mobile Check Tender checkbox should be visible'
        ).toBeTruthy();

        // --- Step 7: Enable all Tender Settings checkboxes ---
        await ADMIN.Settings.GeneralSettings.tenderSidecard.Sidecard.Check();
        await ADMIN.Settings.GeneralSettings.tenderSidecard.mobileSidecard.Check();
        await ADMIN.Settings.GeneralSettings.tenderSidecard.mobileCheck.Check();

        // --- Step 8: Save Settings ---
        await ADMIN.Settings.GeneralSettings.Save.Click();
        await ADMIN.Dialog.Success.Ok.Click();


        // --- Step 9: Reopen General Settings to validate persistence ---
        await ADMIN.Menu.General_Settings.GoTo();

        await page.waitForTimeout(5000); 
        expect(await ADMIN.Settings.GeneralSettings.tenderSidecard.Sidecard.IsChecked()).toBeTruthy();
        expect(await ADMIN.Settings.GeneralSettings.tenderSidecard.mobileSidecard.IsChecked()).toBeTruthy();
        expect(await ADMIN.Settings.GeneralSettings.tenderSidecard.mobileCheck.IsChecked()).toBeTruthy();
    });

    
});

test.describe.serial("POS Test Cases General settings", { tag: ['@creditCard', '@generalSettings','@regression'] }, () => {
    test.beforeEach(async ({ page }) => {
        await Initializer.Init(page);
    });

    //This block runs after each test
    test.afterEach(async ({ page }, testInfo) => {
        await Initializer.Finalize(page, testInfo);
    });

    test('[C3900] Verify Side tender payment in Register', { tag: ['@sidetender', '@register'] }, async () => {
        await POS.Login.In();

        await POS.Admin.Click();
      
        // --- Step 2: Enable Side Tender in General Settings ---
        await ADMIN.Menu.General_Settings.GoTo();
        const isChecked = await ADMIN.Settings.GeneralSettings.tenderSidecard.Sidecard.IsChecked();
        if (!isChecked) {
            await ADMIN.Settings.GeneralSettings.tenderSidecard.Sidecard.Check();
        }
        await ADMIN.Settings.GeneralSettings.Save.Click();
        await ADMIN.Dialog.Success.Ok.Click();

        // --- Step 3: Switch to POS ---
        await ADMIN.ChangeToPOS();

        // --- Step 4: Add Item to Register ---
        await POS.Register.AddItemByStockcode({ stockCode: ITEMS.JACK.BARCODE });

        // --- Step 5: Open Checkout Modal ---
        await POS.Register.PayButton.Click();
        expect(await POS.Dialog.Checkout.Sidecard.IsVisible(),'Error: Side Tender button should be visible in checkout screen').toBeTruthy();

        // --- Step 6: Pay with Side Tender ---
        await POS.Dialog.Checkout.Sidecard.Click();

        // --- Step 7: Complete Checkout ---
       await POS.Dialog.CheckoutComplete.No.Click();
    });
});