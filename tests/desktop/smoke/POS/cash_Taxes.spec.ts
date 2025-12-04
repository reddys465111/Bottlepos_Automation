import { test, expect } from '@playwright/test';
import { POS } from '../../../../src/section/POS';
import { Initializer } from '../../../../src/utils';

//This block runs before each test
test.beforeEach(async ({ page }) => {
  await Initializer.Init(page, { 
    Scenario:{
      Admin: {
        Settings: {
          POSSettings: {
            SaleOptions: {
              AllowChangingStoredItemTax: 'Yes',
              AllowChangingStoredItemPrices:'Always'
            }
          }
        }
      }
    }});
});

//This block runs after each test
test.afterEach(async ({ page }, testInfo) => {
  await Initializer.Finalize(page, testInfo);
});

test.describe("Scenarios related to cash and taxes", { tag: ['@cash', '@tax', '@smoke'] }, () => {
  
  test('[C31] Verify Sale of Item with No Tax', { tag: ['@notax'] }, async ({}) => {
    await Initializer.LoadScenario({
      Admin: {
        Settings: {
          POSSettings: {
            SaleOptions: {
              AllowChangingStoredItemTax: 'Yes',
              AllowChangingStoredItemPrices: 'Always'
            }
          }
        },
      },
    });
    await POS.Login.In();
    //Click add item button
    await POS.Register.AddItem.Click();
    //Set a price and press enter
    await POS.Register.ItemLines.EditPrice({row: 1, price:10});
    //Verify total items and subtotal have the expected values
    expect(await POS.Register.TotalItems.getText(), 'Total items should be 1').toEqual('1');
    expect(await POS.Register.Subtotal.getText(), 'Subtotal should be $10.00').toEqual('$10.00');
    //Change item tax to tax
    await POS.Register.ItemLines.SelectTax({row: 1, taxOption:'NoTax'});
    expect(await POS.Register.Tax.getText(), 'Tax should be $0.00').toEqual('$0.00');
    //Click on the pay button on register screen
    await POS.Register.PayButton.Click();
    //Select the exact change cash value
    await POS.Dialog.Checkout.ClickCashPaymentButton({index: 1});
    expect(await POS.Dialog.CheckoutComplete.Change.getText(), 'Change should be $0.00').toEqual('Change: $0.00')
    await POS.Dialog.CheckoutComplete.No.Click();
  })

});
