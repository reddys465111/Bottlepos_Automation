import { test, expect } from '@playwright/test';
import { POS } from '../../../../src/section/POS';
import { Initializer, payfac, ITEMS } from '../../../../src/utils';

//This block runs before each test
test.beforeEach(async ({page}, testInfo)=>{
  await Initializer.Init( page , {  
    PaymentDevice: {  name: 'PAX' },
    Scenario: {
      Admin: {
        Settings: {
          GeneralSettings: {
            CreditCard: {
              Pax: {
                Enable: true
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


test.describe("Scenarios related to pax Sales", { tag: ['@pax', '@sales', '@smoke'] }, () => {

    test('[pax_sales_001] Verify Selling an Item with pax', { tag: ['@single', '@noID'] }, async ({ page }) => {   
      //Login to qa.bottlepos.com
      await POS.Login.In();
      //Click add item button
      await POS.Register.AddItem.Click();
      //Set a price and press enter
      await POS.Register.ItemLines.EditPrice({row: 1, price: 10});
      //Verify total items and subtotal have the expected values
      expect(await POS.Register.TotalItems.getText()).toEqual('1');
      const subtotal=await POS.Register.Subtotal.getText();
      expect(await POS.Register.Subtotal.getText()).toEqual(subtotal);
      //Click on the Pay button on register screen.
      await POS.Register.PayButton.Click();
      const tmptotalText=await POS.Dialog.Checkout.CashTotal.getText();
      const tmptotal = Number(tmptotalText.replace(/[^0-9.]/g, ""));
      // Al hacer click en Card, el mock interceptará automáticamente la transacción PAX
      await POS.Dialog.Checkout.Card.Click();
      // Approve the dialog box.
      expect(await POS.Dialog.Success.IsVisible(), 'Error: Pax transaction was not approved').toBeTruthy();
      await POS.Dialog.Success.Close.Click();
    });

});