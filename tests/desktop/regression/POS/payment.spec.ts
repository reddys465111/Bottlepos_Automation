import { test, expect } from '@playwright/test';
import { POS } from '../../../../src/section/POS';
import { Initializer, ITEMS,payfac } from '../../../../src/utils';

//This block runs before each test
test.beforeEach(async ({ page }) => {
  await Initializer.Init(page, {
    Scenario: {
      Admin: {
        Settings: {
          GeneralSettings: {
            CreditCard: {
              PayFac: {
                Enable: true
              }
            }
          },
          POSSettings: {
            SaleOptions: {
              AllowChangingStoredItemTax: 'Yes'
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


test.describe("TestRail POS Test Cases Payments", { tag: ['@Payments','@regression'] }, () => {

    test('[C3331] Verify cash payment Recording', { tag: ['@cash', '@register'] }, async ({ page }) => { 

        //Login to POS 

        await POS.Login.In(); 

        //Navigate to Register 

        await POS.Register.Click(); 

        //Add item to cart 

        await POS.Register.AddItemByStockcode({ stockCode: ITEMS.JACK.BARCODE }); 

        //Click Pay button 

        await POS.Register.PayButton.Click(); 

        const cashTotal = await POS.Dialog.Checkout.CashTotal.getText(); 

        // Enter the cash amount in tendered field 

        await POS.Dialog.Checkout.Tendered.setText({ value: cashTotal.replace('$', '') }); 

        //Verify cash amount is entered in tendered field 

        expect(await POS.Dialog.Checkout.Tendered.getText(), 'Error: Cash amount should be entered in tendered field').toEqual(cashTotal); 

        console.log('Cash amount entered in tendered field:', await POS.Dialog.Checkout.Tendered.getText()); 

        //Click Cash payment button 

        await POS.Dialog.Checkout.Cash.Click(); 

        //Click No in print dialog 

        await POS.Dialog.CheckoutComplete.No.Click(); 

        //Verify success dialog is not visible 

        expect(await POS.Dialog.Success.IsVisible(), 'Error: Success dialog should not be visible after cash payment').toBeFalsy(); 

    }); 


    test('[C3792] Verify Sale of Item with No Tax using PayFac', { tag: ['@notax','@payfac','@regression'] }, async ({}) => {
      
        // Login to qa.bottlepos.com
        await POS.Login.In();
        // Click add item button
        await POS.Register.Click();
        await POS.Register.AddItem.Click();
        // Set a price and press enter
        await POS.Register.ItemLines.EditPrice({ row: 1, price: 10 });
        // Verify total items and subtotal have the expected values
        expect(await POS.Register.TotalItems.getText(), 'Error: Total items should be 1').toEqual('1');
        await POS.Register.ItemLines.SelectTax({ row: 1, taxOption: "NoTax" });
        // Click on the Pay button on register screen.
        await POS.Register.PayButton.Click();
        // Initiate the payment.
        await payfac.Read({ amount: 10.00 });
        await POS.Dialog.Checkout.Card.Click();
        await POS.Dialog.Success.Close.Click();
    }); 
});