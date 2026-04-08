import { test, expect } from '@playwright/test';
import { Initializer, ITEMS } from '../../../../src/utils';
import { POS } from '../../../../src/section/POS';
import { roundToDecimals } from '../../../../src/utils/numberManager';
import { ADDITIONAL_FEES, TAXITEMS } from '../../../../src/utils/data/data.taxes';
import { NonCashAdj_DualPrincingType } from '../../../../src/API/useCases/ADMIN/settings/accountSettings/entity.AccountSettings';

//This block runs before each test
test.beforeEach(async ({ page }) => {
  await Initializer.Init(page, {Scenario: {
    Admin: {
      Settings: {
        AccountingSettings: {
          DefaultEBTTax: 'NoTax',
          DefaultEBTTax_Enable: true,
        },
        GeneralSettings: {
          CreditCard: {
            PayFac: {
              EbtSales: true,
              EbtCash: true,
            }
          }
        }
      }
    }
  }});
});

//This block runs after each test
test.afterEach(async ({ page }, testInfo) => {
  //reset the scenario to the default
  await Initializer.LoadScenario({
    Admin: {
      Settings: {
        AccountingSettings: {
          DefaultEBTTax: 'NoTax',
          DefaultEBTTax_Enable: false,
          AdditionalFees_Enable: false,
          NonCashAdj_DualPricing: {
            Type: NonCashAdj_DualPrincingType.Select,
            Percentage: '0'
          }
        },
        GeneralSettings: {
          CreditCard: {
            PayFac: {
              EbtSales: false,
              EbtCash: false,
            }
          }
        }
      }
    }
  });
  await Initializer.Finalize(page, testInfo);
});

test.describe("Tax Items", { tag: ['@regression'] }, async () => {
    test('[C4176] Verify taxable additional fees in reports', { tag: ['@additionalfee', '@nonparallelizable'] }, async () => {
      await Initializer.LoadScenario({
        Admin: {
            Settings: {
                AccountingSettings: {
                    AdditionalFees_Enable: true,
                }
            },
        }
      })
      // Login to POS
      await POS.Login.In();
      await POS.Reports.Click();
      await POS.Reports.RegisterReport.Click();
      // Get the previous additional fee sales and total
      let prev_additionalFeeSales = 0;
      let prev_additionalFeeTotal = 0;
      if (await POS.Reports.RegisterReport.Table.RowExists({rowColumn: 1, rowValue: `${ADDITIONAL_FEES.TAXABLE_ADDITIONAL_FEE.Name} Additional Fee`})) {
        prev_additionalFeeSales = Number(await POS.Reports.RegisterReport.Table.GetCellValue({getValueFrom: '# Sales'}, {rowQuery: [{rowColumn: 1, rowValue: `${ADDITIONAL_FEES.TAXABLE_ADDITIONAL_FEE.Name} Additional Fee`}] }));
        prev_additionalFeeTotal = Number(await POS.Reports.RegisterReport.Table.GetCellValue({getValueFrom: 'Total'}, {rowQuery: [{rowColumn: 1, rowValue: `${ADDITIONAL_FEES.TAXABLE_ADDITIONAL_FEE.Name} Additional Fee`}] }));
      } else {
        prev_additionalFeeSales = 0;
        prev_additionalFeeTotal = 0;
      }
       
      // Go to register and add the taxable additional fee
      await POS.Register.Click();
      await POS.Register.AddItemByStockcode({ stockCode: ITEMS.TAXABLE_ADDITIONAL_FEE.BARCODE });
    
      // Calculate the price, additional fee, tax, and total
      const price = roundToDecimals(ITEMS.TAXABLE_ADDITIONAL_FEE.PRICE, 2);
      const additionalFee = roundToDecimals(price * ADDITIONAL_FEES.TAXABLE_ADDITIONAL_FEE.Value / 100, 2);
      const tax = roundToDecimals((price + additionalFee) * TAXITEMS.Tax.Value! / 100, 2);
      const total = roundToDecimals(price + additionalFee + tax, 2);
   
      // Verify the price, additional fee, tax, and total
      expect(await POS.Register.Subtotal.getText()).toBe(`$${price.toFixed(2)}`);
      expect(await POS.Register.Additionalfees.getText()).toBe(`$${additionalFee.toFixed(2)}`);
      expect(await POS.Register.Tax.getText()).toBe(`$${tax.toFixed(2)}`);
      expect(await POS.Register.Total.getText()).toBe(`$${total.toFixed(2)}`);

      // Pay the transaction and go to reports
      await POS.Register.PayButton.Click();
      await POS.Dialog.Checkout.ClickCashPaymentButton({ index: 1 });
      await POS.Dialog.CheckoutComplete.No.Click();
      await POS.Reports.Click();
      await POS.Reports.RegisterReport.Click();
       
      // Get the next additional fee sales and total
       const next_additionalFeeSales = Number(await POS.Reports.RegisterReport.Table.GetCellValue({getValueFrom: '# Sales'}, {rowQuery: [{rowColumn: 1, rowValue: `${ADDITIONAL_FEES.TAXABLE_ADDITIONAL_FEE.Name} Additional Fee`}] }));
       const next_additionalFeeTotal = Number(await POS.Reports.RegisterReport.Table.GetCellValue({getValueFrom: 'Total'}, {rowQuery: [{rowColumn: 1, rowValue: `${ADDITIONAL_FEES.TAXABLE_ADDITIONAL_FEE.Name} Additional Fee`}] })  );
       
       // Verify the next additional fee sales and total
       expect(next_additionalFeeSales).toBe(prev_additionalFeeSales + 1);
       expect(next_additionalFeeTotal).toBe(prev_additionalFeeTotal + additionalFee);

    });

    test('[C8256-1] Verify Item with default EBT Taxes', { tag: ['@ebt', '@item', '@nonparallelizable'] }, async () => {
      await POS.Login.In();
      await POS.Register.AddItemByStockcode({ stockCode: ITEMS.EBT.BARCODE });
      
      expect(await POS.Register.ItemLines.IsEBTChecked({row: 1}), 'EBT checkbox should be checked').toBe(true);
      expect(await POS.Register.EbtTotal.getText()).toEqual(`$${ITEMS.EBT_ELIGIBLE_ITEM.PRICE.toFixed(2)}`);
    
    });

    test('[C8256-2] Verify Item with EBT category Tax', { tag: ['@ebt', '@category','@nonparallelizable'] }, async () => {
      await POS.Login.In();
      await POS.Register.AddItemByStockcode({ stockCode: ITEMS.EBT_ELIGIBLE_CATEGORY.BARCODE });
      expect(await POS.Register.ItemLines.IsEBTChecked({row: 1}), 'EBT checkbox should be checked').toBe(true);
      expect(await POS.Register.EbtTotal.getText()).toEqual(`$${ITEMS.EBT_ELIGIBLE_CATEGORY.PRICE.toFixed(2)}`);
     
    });
    test('[C8256-3] Verify multiple EBT items and regular items', { tag: ['@ebt', '@multiple', '@nonparallelizable'] }, async () => {
    
      await POS.Login.In();
      await POS.Register.AddItemByStockcode({ stockCode: ITEMS.EBT.BARCODE });
      await POS.Register.AddItemByStockcode({ stockCode: ITEMS.EBT_ELIGIBLE_CATEGORY.BARCODE });
      await POS.Register.AddItemByStockcode({ stockCode: ITEMS.JACK.BARCODE });
    
      expect(await POS.Register.ItemLines.IsEBTChecked({ row: 1 })).toBe(true);
      expect(await POS.Register.ItemLines.IsEBTChecked({ row: 2 })).toBe(true);
      expect(await POS.Register.ItemLines.IsEBTNotChecked({ row: 3 })).toBe(false);
    
      // STEP 1: Initial EBT total calculation
      let ebtCalc = Number(ITEMS.EBT_ELIGIBLE_ITEM.PRICE.toFixed(2)) +
                    Number(ITEMS.EBT_ELIGIBLE_CATEGORY.PRICE.toFixed(2));
    
      // STEP 2: Make row 3 EBT eligible
      await POS.Register.ItemLines.CheckEBT({ row: 3 });
      expect(await POS.Register.ItemLines.IsEBTChecked({ row: 3 })).toBe(true);
    
      // STEP 3: Add 3rd item price
      let newBtCalc = ebtCalc + Number(ITEMS.JACK.PRICE.toFixed(2));
    
      // STEP 4: Add Deposit if applicable
      let depositText = await POS.Register.Deposit.getText();      
      let deposit = Number(depositText.replace(/[^0-9.]/g, ""));    
    
      let finalEbtCalc = Number((newBtCalc + deposit).toFixed(2));  
     
      await POS.Sales.Click();
      await POS.Register.Click();
    
      // STEP 5: Verify final displayed EBT total
      const ebtTotalText  = await POS.Register.EbtTotal.getText();
      let ebtTotal = Number(ebtTotalText.replace(/[^0-9.]/g, ""));
      
    
    expect(ebtTotal).toBe(Number(finalEbtCalc.toFixed(2)));
    
    });
 

    test('[C8256-4] Verify Item with EBT and dual pricing', { tag: ['@ebt', '@category','@nonparallelizable'] }, async () => {
      const percentage = 1;
      await Initializer.LoadScenario({
        Admin: {
          Settings: {
              AccountingSettings: {
                NonCashAdj_DualPricing: {
                  Type: NonCashAdj_DualPrincingType.DualPricing,
                  Percentage: `${percentage}`,
                  EBT: true,
              },
            },
          }
        },
      }); 

      await POS.Login.In();
      await POS.Register.AddItemByStockcode({ stockCode: ITEMS.EBT_ELIGIBLE_CATEGORY.BARCODE });
      expect(await POS.Register.ItemLines.IsEBTChecked({row: 1}), 'EBT checkbox should be checked').toBe(true);
      let ebtTotal = Number(ITEMS.EBT_ELIGIBLE_CATEGORY.PRICE.toFixed(2)) + (percentage/100 * Number(ITEMS.EBT_ELIGIBLE_CATEGORY.PRICE.toFixed(2)));
      expect(await POS.Register.EbtTotal.getText()).toEqual(`$${ebtTotal.toFixed(2)}`);
    });
  });
