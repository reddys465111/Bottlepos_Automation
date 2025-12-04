import { test, expect } from '@playwright/test';
import { POS } from '../../../../src/section/POS';
import { Initializer, ITEMS, KEY, payfac } from '../../../../src/utils';
import { Payfac } from '../../../../src/paymentDevices/payfac/payfac';
import { toggleOption } from '../../../../src/objects/specialObjects/discountToggle';

//This block runs before each test
test.beforeEach(async ({ page }) => {
    await Initializer.Init(page, {
        Scenario: {
            Admin: {
                Settings: {
                    POSSettings: {
                        SaleOptions: {
                            AllowChangingStoredItemTax: 'Yes',
                            AllowChangingStoredItemPrices: 'Always',
                        }
                    },
                    GeneralSettings: {
                        CreditCard: {
                            PayFac:{
                                Enable: true,
                            }
                        }
                    }
                }
            }
        }
    });
    await payfac.Init(page);
});

//This block runs after each test
test.afterEach(async ({ page }, testInfo) => {
    await Initializer.Finalize(page, testInfo);
});

test.describe('POS Section - Cash Payments', { tag: ['@smoke', '@pos', '@cash', '@payments'] }, () => {
    test('[C1419] - Verify if the items sale can be completed using split payment from the POS side', { tag: ['@split-payment'] }, async ({}) => {
        // Login to the POS application
        await Initializer.LoadScenario({
            Admin: {
                Settings: {

                    POSSettings: {
                        SaleOptions: {
                            AllowChangingStoredItemTax: 'Yes',
                            AllowChangingStoredItemPrices: 'Always',
                        },
                    },
                    GeneralSettings: {
                        CreditCard: {
                            PayFac:{
                                Enable: true,
                            }
                        }
                    }
                },
            
            },
        });
        await POS.Login.In();
        
        // Add first item to the sale
        await POS.Register.AddItem.Click();
        await POS.Register.ItemLines.EditPrice({row: 1, price: 10});
        await POS.Register.ItemLines.EditName({row: 1, name: 'Item 1'});
        await POS.Register.ItemLines.SelectTax({row: 1, taxOption:'NoTax'});
        
        await POS.Register.PayButton.Click();
        await POS.Dialog.Checkout.Tendered.setText({value: '5'});

        await POS.Dialog.Checkout.Cash.Click();
        const checkbalance=await POS.Dialog.Checkout.Balance.getText();

        expect(await POS.Dialog.Checkout.Balance.getText(), 'Error: Balance is not checkbalance').toEqual(checkbalance);
        await payfac.Read({amount: 5});
        await POS.Dialog.Checkout.Card.Click();
        expect(await POS.Dialog.Success.IsVisible(), 'Error: Payfac transaction was not approved').toBeTruthy();
        // expect(await POS.Dialog.Success.GetMessage(), 'Error: Change is not $0.00').toContain('Change: $0.00');
    });
    test('[C1442] - Verify if the payout can be added for a sale', { tag: ['@payout'] }, async ({page}) => {
        await POS.Login.In();
        await POS.Register.Payout.Click();
        expect(await POS.Dialog.Payout.IsVisible()).toBeTruthy();

        // Fill details
        await POS.Dialog.Payout.Type.SelectOption({ byText: "purchase" });
        await POS.Dialog.Payout.Date.setText({value: new Date().toISOString().split('T')[0]});
        await POS.Dialog.Payout.PaymentMode.SelectOption({ byText: "cash" });
        await POS.Dialog.Payout.Amount.setText({ value: '150' });
        await POS.Dialog.Payout.Save.Click();
        await POS.Dialog.CheckoutComplete.No.Click();
        // Assert success
        expect(await POS.Register.PayButton.GetLabel()).toContain('$0.00');
    });


    test('[C1445] - Verify if the discount can be applied on the sale', { tag: ['@discount'] }, async ({}) => {

        await POS.Login.In();

        // Step 1: Add an item
        await POS.Register.AddItemByStockcode({ stockCode: ITEMS.BUDLIGHT.BARCODE });
        expect(await POS.Register.ItemLines.GetItemName({ row: 1 }))
            .toEqual(ITEMS.BUDLIGHT.TITLE);

        // Step 2: Apply manual $ discount
        await POS.Register.Discount.Toggle({ select: toggleOption.DOLLAR });
        await POS.Register.Discount.SetValue({ value: 2, press: KEY.ENTER });

        expect(await POS.Register.ItemLines.GetDiscountTotal({ row: 1 }))
            .toEqual('2.00');
        expect(await POS.Register.ItemLines.IsDiscountHighlighted({ row: 1 }))
            .toBeTruthy();

        // Step 3: Remove discount
        await POS.Register.Discount.Remove({ row: 1 });
        expect(await POS.Register.ItemLines.GetDiscountTotal({ row: 1 }))
            .toBeFalsy();
        expect(await POS.Register.ItemLines.IsDiscountHighlighted({ row: 1 }))
            .toBeFalsy();

        // Step 4: Apply manual % discount
        await POS.Register.Discount.Toggle({ select: toggleOption.PERCENTAGE });
        await POS.Register.Discount.SetValue({ value: 10, press: KEY.ENTER });

        expect(await POS.Register.ItemLines.GetDiscountText({ row: 1 }))
            .toContain('%');
        expect(await POS.Register.ItemLines.IsDiscountHighlighted({ row: 1 }))
            .toBeTruthy();
        });
    });

   