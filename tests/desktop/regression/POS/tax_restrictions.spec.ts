import { test, expect } from '@playwright/test';
import { POS } from '../../../../src/section/POS';
import { Initializer, ITEMS} from '../../../../src/utils';

//This block runs before each test
test.beforeEach(async ({ page }) => {
    // Disable the ability to change the tax
  await Initializer.Init(page, {Scenario: 
    {
        Admin: {
            Settings: {
                POSSettings: {
                    SaleOptions: {
                        AllowChangingStoredItemTax: 'No'
                    }
                }
            }
        }    
    }
  });

});

//This block runs after each test
test.afterEach(async ({ page }, testInfo) => {
    // Restore the ability to change the tax
    await Initializer.LoadScenario({
        Admin: {
            Settings: {
                POSSettings: {
                    SaleOptions: {
                        AllowChangingStoredItemTax: 'Yes'
                    }
                }
            }
        }
    });
    await Initializer.Finalize(page, testInfo);
});


test.describe("Price Control", {tag: ['@tax', '@regression', '@nonparallelizable'] }, () => {

    test('[C8215] Verify stored item tax changes', { tag: ['@edittax', '@restricted'] }, async ({page}) => {
        // Login to the POS application
        await POS.Login.In();
        // Add the item to the register
        await POS.Register.AddItemByStockcode({stockCode: ITEMS.CROWN.BARCODE});
        // Click on the age verification dialog
        await POS.Dialog.AgeVerification.Yes.Click();
        // Verify that the tax is editable
        expect(await POS.Register.ItemLines.IsTaxNotEditable({row: 1}), 'Tax is not disabled').toBe(true);
    });
});