import { test, expect } from '@playwright/test';
import { POS } from '../../../../src/section/POS';
import { Initializer, ITEMS, getDateDaysAgo, KEY } from '../../../../src/utils';

//This block runs before each test
test.beforeEach(async ({ page }) => {
    // Disable the ability to change the tax
  await Initializer.Init(page, {Scenario: {
    Admin: {
      Settings: {
        GeneralSettings: {
          CreditCard: {
            PayFac: {
              Enable: true,
            }
          }
        },
        POSSettings: {
          SaleOptions: {
            AllowChangingStoredItemPrices: 'When Price is Blank or 0'
          }
        }
      }
    }
  }});
});

//This block runs after each test
test.afterEach(async ({ page }, testInfo) => {
    // Restore the ability to change the tax
    await Initializer.LoadScenario({
        Admin: {
            Settings: {
                POSSettings: {
                    SaleOptions: {
                        AllowChangingStoredItemPrices: 'Always'
                    }
                }
            }
        }    
    });
    await Initializer.Finalize(page, testInfo);
});


test.describe("Price Control", {tag: ['@item', '@regression'] }, () => {

    test('[C8216] Verify stored item tax changes', { tag: ['@editprice', '@restricted'] }, async ({page}) => {
        // Login to the POS application
        await POS.Login.In();
        // Add the item to the register
        await POS.Register.AddItemByStockcode({stockCode: ITEMS.CROWN.BARCODE});
        // Click on the age verification dialog
        await POS.Dialog.AgeVerification.Yes.Click();
        // Verify that the tax is editable
        expect(await POS.Register.ItemLines.IsPriceNotEditable({row: 1}), 'Price is not disabled').toBe(true);

        await POS.Register.AddItem.Click();
        expect(await POS.Register.ItemLines.IsPriceEditable({row: 2}), 'Price is not enabled').toBe(true);
    });
});