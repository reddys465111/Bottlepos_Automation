import { test, expect } from '@playwright/test';
import { POS } from '../../../../src/section/POS';
import { Initializer, ITEMS } from '../../../../src/utils';

//This block runs before each test
test.beforeEach(async ({ page }) => {
  await Initializer.Init(page, {
    Scenario: {
      Admin: {
        Settings: {
          POSSettings: {
            SaleOptions: {
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

test.describe("Scenarios related to Sales", { tag: ['@cash', '@sales', '@smoke'] }, () => {
  
  test('[C26] Verify Selling an Item with Cash', { tag: ['@single'] }, async ({}) => {
    //Login to the POS application
    await POS.Login.In();
    //Click add item button
    await POS.Register.AddItem.Click();
    //Enter manual item price $10
    await POS.Register.ItemLines.EditPrice({row: 1, price: 10});
    //Verify total items and subtotal have the expected values
    expect(await POS.Register.TotalItems.getText(), 'Total items should be 1').toEqual('1');
    expect(await POS.Register.Subtotal.getText(), 'Subtotal should be $10.00').toEqual('$10.00');

    //This valadation was commented because if the Tax rate is prone to be changed from the Admin panel
    //expect(await POS.Register.Tax.getText()).toEqual('$0.50');
    //expect(await POS.Register.Total.getText()).toEqual('$10.50');

    //Click on the Pay button on register screen
    await POS.Register.PayButton.Click();
    //Select the exact change cash value
    await POS.Dialog.Checkout.ClickCashPaymentButton({index: 1});
    expect(await POS.Dialog.CheckoutComplete.Change.getText()).toEqual('Change: $0.00');
    await POS.Dialog.CheckoutComplete.No.Click();
  });

  test('[C75] Verify Multi-Item Sale with Cash Payment', { tag: ['@multiple'] }, async ({}) => {
    //Login to the POS application
    await POS.Login.In();
    //Add first item
    await POS.Register.AddItem.Click();
    //Enter the price of first manual item $10
    await POS.Register.ItemLines.EditPrice({row: 1, price: 10});
    //Add second item
    await POS.Register.AddItem.Click();
    //Enter the price of second manual item $20
    await POS.Register.ItemLines.EditPrice({row: 2, price: 20});
    //Verify total items is equal to 2
    expect(await POS.Register.TotalItems.getText(), 'Total items should be 2').toEqual('2');
    //Verify subtotal is equal $30.00
    expect(await POS.Register.Subtotal.getText(), 'Subtotal should be $30.00').toEqual('$30.00');
    //Click on the pay button
    await POS.Register.PayButton.Click();
    //Select the exact change cash value
    await POS.Dialog.Checkout.ClickCashPaymentButton({index: 1});
    //Verify the checkout dialog
    expect(await POS.Dialog.CheckoutComplete.Change.getText(), 'Change should be $0.00').toEqual('Change: $0.00');
    await POS.Dialog.CheckoutComplete.No.Click();
  });

  test('[C428] Verify Validation for Setting Item Price Below Minimum', { tag: ['@price', '@mininum'] }, async ({page}) => {
    await Initializer.LoadScenario({
      Admin: {
        Settings: {
          POSSettings: {
            SaleOptions: {
              AllowChangingStoredItemPrices: 'Always'
            },
          },
        },
      },
    });

    //Login to the POS application
    await POS.Login.In();
    //Ring an item
    await POS.Register.AddItemByStockcode({stockCode: ITEMS.BUDLIGHT.BARCODE});
    //Change the item price to lower then the min price
    await POS.Register.ItemLines.EditPrice({row:1, price:19});
    //Confirming the item and the min price
    let PriceAlert = await POS.Register.ItemLines.GetMinimumPriceAlert({row: 1});
    expect(PriceAlert, 'Min price alert: Item title does not match with the actual item').toContain(ITEMS.BUDLIGHT.TITLE);
    expect(PriceAlert,`Min price alert: Item min price(${ITEMS.BUDLIGHT.MIN_PRICE}) is not correct`).toContain(`${ITEMS.BUDLIGHT.MIN_PRICE}`);
  });

});
