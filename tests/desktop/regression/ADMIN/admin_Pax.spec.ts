import { test, expect } from '@playwright/test';
import { ADMIN } from '../../../../src/section/ADMIN';
import { Initializer } from '../../../../src/utils';

import { USERS } from '../../../../src/utils/data/data.users';


test.beforeEach(async ({ page }) => {
    await Initializer.Init(page, {Admin: true, 
        Scenario: {
            Admin: {
                Settings: {
                    GeneralSettings: {
                        CreditCard: {
                            Pax: {
                                PaxApplicationName: 'bottlepos',
                                ConfigurationTimeout: '120',
                                Surcharge: false,
                            }
                        }
                    }
                }
            }
        }}
    );
});

//This block runs after each test
test.afterEach(async ({ page }, testInfo) => {
    await Initializer.LoadScenario({
        Admin: {
            Settings: {
                GeneralSettings: {
                    CreditCard: {
                        Pax: {
                            Surcharge: false,
                        }
                    }
                }
            }
        }
    });
    await Initializer.LoadScenario({
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
    });
    await Initializer.Finalize(page, testInfo);
});

test('[C4415] Verify Surcharge Settings enabled in Admin', { tag: ['@surcharge', '@Adminsettings'] }, async ({ page }) => {
    // --- Step 1: Login as Admin ---
    await ADMIN.Login.In();

    // --- Step 2: Navigate to General Settings ---
    await ADMIN.Menu.General_Settings.GoTo();

    // --- Step 3: Switch Credit Card Type to Pax ---
    await ADMIN.Settings.GeneralSettings.CreditCard.CardType.SelectOption({ byText: 'Pax' });

    // --- Step 4: Enable Surcharge ---
    await ADMIN.Settings.GeneralSettings.CreditCard.PaxSurcharge.Check();
    expect(await ADMIN.Settings.GeneralSettings.CreditCard.PaxSurcharge.IsChecked(),
    'Error: Surcharge checkbox should be checked after toggle'
    ).toBeTruthy();

    expect(await ADMIN.Dialog.Confirm.IsVisible()).toBeTruthy();
    await ADMIN.Dialog.Confirm.Yes.Click();
    await ADMIN.Dialog.EnterPassword.Password.setText({value: USERS.SUPERUSER.PASSWORD});
    await ADMIN.Dialog.EnterPassword.Submit.Click();
    

    // --- Step 5: Save Settings ---
    await ADMIN.Settings.GeneralSettings.Save.Click();
    await ADMIN.Dialog.Success.Ok.Click();

    // --- Step 6: Reopen General Settings to validate persistence ---
    await ADMIN.Menu.General_Settings.GoTo();
    expect(
        await ADMIN.Settings.GeneralSettings.CreditCard.PaxSurcharge.IsChecked(),
        'Error: Surcharge setting did not persist after save'
    ).toBeTruthy();

});