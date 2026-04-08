import { test, expect } from '@playwright/test';
import { ADMIN } from '../../../../src/section/ADMIN';
import { Initializer, ITEMS } from '../../../../src/utils';
import { POS } from '../../../../src/section/POS';

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
                    },
                    POSSettings: {
                        SaleOptions: {
                            DoNotSaleBelowCost: 'Alert',
                            AllowChangingStoredItemPrices: 'Always'
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

test.describe('Items', {tag: ['@regression']}, () => {
    test('Do Not Sell Item Below Cost', { tag: ['@uncategorized'] },  async ({}) => {
        await POS.Login.In();
        await POS.Register.AddItemByStockcode({stockCode: ITEMS.NO_AGE_VERIFICATION.BARCODE});
        await POS.Register.ItemLines.EditPrice({row: 1, price: 9});

        const minPriceAlert = await POS.Register.ItemLines.GetMinimumPriceAlert({row: 1});
        expect(minPriceAlert, 'Min price alert: Item title does not match with the actual item').toContain(ITEMS.NO_AGE_VERIFICATION.TITLE);
        expect(minPriceAlert,`Min price alert: Item min price(${ITEMS.NO_AGE_VERIFICATION.MIN_PRICE}) is not correct`).toContain(`${ITEMS.NO_AGE_VERIFICATION.MIN_PRICE}`);
    });
});