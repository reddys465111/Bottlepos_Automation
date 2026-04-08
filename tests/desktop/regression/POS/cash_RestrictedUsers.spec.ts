import { test, expect } from '@playwright/test';
import { POS } from '../../../../src/section/POS';
import { Initializer, ITEMS, getDateDaysAgo, KEY } from '../../../../src/utils';
import { USERS } from '../../../../src/utils/data/data.users';

//This block runs before each test
test.beforeEach(async ({ page }) => {
  await Initializer.Init(page, {
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

test.describe("Scenarios related to user permissions", {tag: ['@cash', '@permission', '@regression'] }, () => {

  test.skip('[C727] Verify Discount Application Restrictions Based on User Permissions', { tag: ['@user', '@restricted', '@smoke'] }, async ({page}) => {
    //Login to the POS application as Admin for initial device setup
    await POS.Login.In();
    await POS.Logout.Click();
    //Logout as Admin after device registration
    await POS.Dialog.Logout.Yes.Click();
    await page.waitForTimeout(5000);
    //Login as a Cashier with no Admin rights
    await POS.Login.In({user: 'register', reloadURL: true});
    //Enter the barcode of an item and hit enter, item will be ringed up
    //In this case the item category has age verification enabled
    await POS.Register.AddItemByStockcode({stockCode: ITEMS.CROWN.BARCODE});
    //Age verification dialog appears
    //Enter valid DOB
    await POS.Dialog.AgeVerification.EnterBirthDate.setText({ value: getDateDaysAgo(365 * 21) });
    //Click yes
    await POS.Dialog.AgeVerification.Yes.Click();
    //Click on the apply discount
    await POS.Register.ApplyDiscount.Click();
    //Enter discount value
    await POS.Dialog.ApplyDiscount.Discount.SetValue({value:1, press:KEY.ENTER});
    //Click on the Authorize button
    await POS.Dialog.ApplyDiscount.AddDiscount.Click();
    expect(await POS.Dialog.Error.GetMessage(),'Restricted user is able to apply discount').toContain('Please enter password');
  });
  
});
