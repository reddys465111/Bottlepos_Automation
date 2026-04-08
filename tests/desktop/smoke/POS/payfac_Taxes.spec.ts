import { test, expect } from '@playwright/test';
import { POS } from '../../../../src/section/POS';
import { Initializer, payfac } from '../../../../src/utils';

//This block runs before each test
test.beforeEach(async ({ page }, testInfo) => {
  await Initializer.Init(page);
  await payfac.Init(page);
});

//This block runs after each test
test.afterEach(async ({ page }, testInfo) => {
  await Initializer.Finalize(page, testInfo);
});

test.describe("Scenarios related to Taxes with Payfac", { tag: ['@payfac', '@tax', '@smoke'] }, () => {

  // test('[C3792] Verify Sale of Item with No Tax using PayFac', { tag: ['@notax'] }, async ({}) => {
  //   // Login to qa.bottlepos.com
  //   await POS.Login.In();
  //   // Wait for 5s delay
  //   // Click add item button
  //   await POS.Register.Click();
  //   await POS.Register.AddItem.Click();
  //   // Set a price and press enter
  //   await POS.Register.ItemLines.EditPrice({ row: 1, price: 10 });
  //   // Verify total items and subtotal have the expected values
  //   expect(await POS.Register.TotalItems.getText(), 'Error: Total items should be 1').toEqual('1');
  //   await POS.Register.ItemLines.SelectTax({ row: 1, taxOption: "NoTax" });
  //   // Click on the Pay button on register screen.
  //   await POS.Register.PayButton.Click();
  //   // Initiate the payment.
  //   await payfac.Read({ amount: 10.00 });
  //   await POS.Dialog.Checkout.Card.Click();
  //   await POS.Dialog.Success.Close.Click();
  // });
  
});
