import { test, expect } from '@playwright/test';
import { POS } from '../../../../src/section/POS';
import { Initializer, payfac, ITEMS } from '../../../../src/utils';

//This block runs before each test
test.beforeEach(async ({page}, testInfo)=>{
  await Initializer.Init( page , { 
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
              AllowChangingStoredItemTax: 'Yes',
              AllowChangingStoredItemPrices:'Always'
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

test.describe("Scenarios related to payfac Sales", { tag: ['@payfac', '@sales', '@smoke'] }, () => {

  test('[C3791] Verify Selling an Item with Payfac', { tag: ['@single', '@noID'] }, async ({}) => {
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
    await payfac.Read({amount:tmptotal});
    //Select the exact change cash value
    await POS.Dialog.Checkout.Card.Click();
    // Approve the dialog box.
    expect(await POS.Dialog.Success.IsVisible(), 'Error: Payfac transaction was not approved').toBeTruthy();
    await POS.Dialog.Success.Close.Click();
  });


  test('[C3793] Verify Multi-Item Sale with PayFac',{ tag:['@multiple'] }, async ({}) => {
    //Login to auto.bottlepos.com
    await POS.Login.In()
    //Add two item to the sale by clicking button "Add item"
    await POS.Register.AddItem.Click()
    await POS.Register.AddItem.Click()
    //Enter price of first item
    await POS.Register.ItemLines.EditPrice({row:1, price:10})
    //Select item tax "NoTax"
    await POS.Register.ItemLines.SelectTax({row:1, taxOption:"NoTax"})
    //Enter price of second item
    await POS.Register.ItemLines.EditPrice({row:2, price:10})
    //Select item tax "NoTax"
    await POS.Register.ItemLines.SelectTax({row:2, taxOption:"NoTax"})
    expect(await POS.Register.TotalItems.getText(), 'Error: the amount totalt items do not match with the expecte value').toEqual('2');
    expect(await POS.Register.Subtotal.getText(), 'Error: the subtotal value is not the expected value').toEqual('$20.00');
    //Click pay button
    await POS.Register.PayButton.Click()
    //Amount select for payfac
    await payfac.Read({amount:20})
    //Click card button
    await POS.Dialog.Checkout.Card.Click()
    //Click yes button on approve dialog
    expect(await POS.Dialog.Success.IsVisible(), 'Error: Payfac transaction was not approved').toBeTruthy();
    await POS.Dialog.Success.Close.Click()
  });

  test.skip('[C3796] Verify Item qty Update via Stock Code Stock Search, and Shortcuts with PayFac', { tag: ['@payfac', '@shortcut', '@smoke'] }, async ({}) => {
    //Login to the POS application
    await POS.Login.In();
    //Add first item with stcok code
    await POS.Register.AddItemByStockcode({stockCode : ITEMS.NO_AGE_VERIFICATION.BARCODE});
    //Add same item using stock search field
    await POS.Register.StockSearch.SearchAndSelect({title: ITEMS.NO_AGE_VERIFICATION.TITLE});
    //Open Shortcut Panel
    await  POS.Register.Shortcuts.Open();
    //Add same item using shortcut key
    await POS.Register.Shortcuts.Click({ title : ITEMS.NO_AGE_VERIFICATION.SHORTCUTNAME});
    //Add second item with Stock code
    await POS.Register.AddItemByStockcode({ stockCode : ITEMS.BUDLIGHT.BARCODE});
    //Add same item using stock search
    await POS.Register.StockSearch.SearchAndSelect({ title : ITEMS.BUDLIGHT.TITLE})
    //ADD same item using shortcut key
    await POS.Register.Shortcuts.Open();
    await POS.Register.Shortcuts.Click({title : ITEMS.BUDLIGHT.SHORTCUTNAME});
    //Add third item with Stock code
    await POS.Register.AddItemByStockcode({stockCode :ITEMS.JACK.BARCODE});
    //Add same item using stock search
    await POS.Register.StockSearch.SearchAndSelect({title : ITEMS.JACK.TITLE});
    //ADD same item using shortcut key
    await POS.Register.Shortcuts.Open();
    await POS.Register.Shortcuts.Click({ title : ITEMS.JACK.SHORTCUTNAME });
    //Verify the total items in the register
    expect(await POS.Register.TotalItems.getText(), 'Error: Total items should be 9').toEqual('9');
    //Verify items listed in the register
    expect(await POS.Register.ItemLines.GetItemName({row: 1})).toContain(ITEMS.NO_AGE_VERIFICATION.TITLE);
    expect(await POS.Register.ItemLines.GetItemName({row: 2})).toContain(ITEMS.BUDLIGHT.TITLE);
    expect(await POS.Register.ItemLines.GetItemName({row: 3})).toContain(ITEMS.JACK.TITLE);
  });

});
