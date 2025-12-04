import { test, expect } from '@playwright/test';
import { Initializer } from '../../../../src/utils';
import { POS } from '../../../../src/section/POS';
import { USERS } from '../../../../src/utils/data/data.users';

//This block runs before each test
test.beforeEach(async ({ page }) => {
    await Initializer.Init(page);
});

//This block runs after each test
test.afterEach(async ({ page }, testInfo) => {
    await Initializer.Finalize(page, testInfo);
});

test.describe('Admin Section - Login', { tag: ['@smoke', '@pos', '@login'] }, () => {
    test('[C1413] As a user, I want to verify that login is successful with a valid username and password on the Electron App ', { tag: ['@valid'] }, async ({}) => {
        // TODO: Implement test for valid login credentials
        await POS.Login.In();
        //Wait for 3 seconds to ensure the login is successful
        await POS.waitForTimeout(3000);
        expect(await POS.Logout.IsVisible(), 'Error: Logout button should be visible').toBeTruthy();
    });

    test('[C1414] As a Cashier, I want to be restricted from logging in with invalid credentials so that unauthorized access is prevented ', { tag: ['@invalid'] }, async ({}) => {
        // Login with invalid credentials
        await POS.Dialog.Legacy_Alert.Ok.Click();
        await POS.Login.UserName.setText({value: 'register'});
        await POS.Login.Password.setText({value: 'invalid'});
        await POS.Login.LoginButton.Click();
        // Verify if the login error dialog is visible
        expect(await POS.Dialog.LoginError.IsVisible(), 'Error: Login error dialog should be visible').toBeTruthy();
        await POS.Dialog.LoginError.Ok.Click();
    });

    test('[C1416] As a Cashier, I want to log out of the application so that I can securely end my session', { tag: ['@logout'] }, async ({}) => {
        // Login as Admin
        await POS.Login.In();
        // Logout
        await POS.waitForTimeout(3000);
        await POS.Logout.Click();
        await POS.Dialog.Logout.Yes.Click();
        // Login as Register
        await POS.Login.In({ user: USERS.REGISTER.USERNAME, password: USERS.REGISTER.PASSWORD });
        await POS.waitForTimeout(3000);
        await POS.Logout.Click();
        // Logout
        await POS.Dialog.Logout.Yes.Click();
        await POS.waitForTimeout(3000);
        // Verify if the login form is visible
        expect(await POS.Login.FormVisible(), 'Error: Login form should be visible').toBeTruthy();
    });

  
});
