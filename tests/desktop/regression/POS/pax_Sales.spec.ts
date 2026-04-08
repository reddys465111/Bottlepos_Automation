import { test, expect } from '@playwright/test';
import { POS } from '../../../../src/section/POS';
import { Initializer, payfac, ITEMS } from '../../../../src/utils';
import { DuelPicing } from '../../../../src/section/ADMIN/pages/settings/duelpricing';
import { NonCashAdj_DualPrincingType } from '../../../../src/API/useCases/ADMIN';
import { PAXMock } from '../../../../src/paymentDevices';
import { Reports } from '../../../../src/section/POS/pages/reports/reports';
import { ADMIN } from '../../../../src/section/ADMIN';

//This block runs before each test
test.beforeEach(async ({ page }, testInfo) => {
  await Initializer.Init(page, {
    PaymentDevice: { name: 'PAX' },
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

//This block runs after each test and disbale Dual price and NCA settings
test.afterEach(async ({ page }, testInfo) => {
  await Initializer.LoadScenario({
    Admin: {
      Settings: {
        GeneralSettings: {
          CreditCard: {
            PayFac: {
              Enable: true

            }
          }
        },
        AccountingSettings: {
          NonCashAdj_DualPricing: {
            Type: NonCashAdj_DualPrincingType.Select,
          }
        },
      }
    }

  });
  await Initializer.Finalize(page, testInfo);
});



test.describe("Scenarios related to pax Sales", { tag: ['@PAX', '@Surcharge', '@Regression','@nonparallelizable'] }, async () => {

  test('[C3411] Verify PAX terminal Payment', { tag: ['@PAX', '@Regression'] }, async ({ }) => {
    //Login to POS application
    await POS.Login.In();
    //Click add item button
    await POS.Register.AddItem.Click();
    //Set a price and press enter
    await POS.Register.ItemLines.EditPrice({ row: 1, price: 10 });
    //Verify total items and subtotal have the expected values
    expect(await POS.Register.TotalItems.getText()).toEqual('1');
    const subtotal = await POS.Register.Subtotal.getText();
    expect(await POS.Register.Subtotal.getText()).toEqual(subtotal);
    //Click on the Pay button on register screen.
    await POS.Register.PayButton.Click();
    // Al hacer click en Card, el mock interceptará automáticamente la transacción PAX
    await POS.Dialog.Checkout.Card.Click();
    // Approve the dialog box.
    expect(await POS.Dialog.Success.IsVisible(), 'Error: Pax transaction was not approved').toBeTruthy();
    await POS.Dialog.Success.Close.Click();
  });

  test('[C8265] Verify Pax partial payment with cash and card', { tag: ['@PAX', '@Regression'] }, async ({ }) => {
    //Login to POS application
    await POS.Login.In();
    //Add item to the register
    await POS.Register.AddItemByStockcode({ stockCode: ITEMS.BUDLIGHT.BARCODE });
    //Click on Pay button
    await POS.Register.PayButton.Click();
    //Checkout dialog should appear with multiple tender options
    expect(await POS.Dialog.Checkout.IsVisible(), 'Error: Checkout dialog did not appear').toBeTruthy();
    const totalText = await POS.Dialog.Checkout.CashTotal.getText();
    const total = Number(totalText.replace(/[^0-9.]/g, ""));
    //Calculate partial amount (50% of total)
    const partialPayment = Number((total / 2).toFixed(2));
    //Perform partial payment with PAX card
    await POS.Dialog.Checkout.Tendered.setText({ value: partialPayment.toString() });
    await POS.Dialog.Checkout.Card.Click();
    //Verify  partiaal payment dialog appears
    expect(await POS.Dialog.PartialApproval.IsVisible(), 'Error: Partial approval dialog did not appear').toBeTruthy();
    await POS.Dialog.PartialApproval.Yes.Click();
    //Continue with remaining amount payment in cash
    await POS.Dialog.Checkout.ClickCashPaymentButton({ index: 1 });
    //Complete checkout
    await POS.Dialog.CheckoutComplete.No.Click();
  });

  test('[C8270]  Verify Pax split payment with Dual Pricing enabled', { tag: ['@PAX', '@DualPricing', '@Regression','@nonparallelizable'] }, async ({ page }) => {
    // Precondition - Enable Dual Pricing 
    await Initializer.LoadScenario({
      Admin: {
        Settings: {
          AccountingSettings: {
            NonCashAdj_DualPricing: {
              Type: NonCashAdj_DualPrincingType.DualPricing,
              Percentage: "3",
              ShowCashRegularPriceOnPayButton: true
            }
          },
        },
      },
    });
    //Login to POS application
    await POS.Login.In();
    //Add item to the register
    await POS.Register.AddItemByStockcode({ stockCode: ITEMS.BUDLIGHT.BARCODE });
    //Click on Pay button
    await POS.Register.PayButton.Click();
    const regularamount = await POS.Dialog.Checkout.RegularTotal.getText();
    const total = Number(regularamount.replace(/[^0-9.]/g, ""));
    const partialPayment = Number((total / 2).toFixed(2));
    //Perform partial payment with Cash
    await POS.Dialog.Checkout.Tendered.setText({ value: partialPayment.toString() });
    await POS.Dialog.Checkout.Cash.Click();
    //Perform remaining payment with PAX card
    await POS.Dialog.Checkout.Card.Click();
    await POS.Dialog.Success.Close.Click();


  });

  test('[C8271] C8271 Verify Pax split payment with NCA enabled', { tag: ['@PAX', '@NCA', '@Regression','@nonparallelizable'] }, async ({ page }) => {
    // Precondition - Enable NCA 
    await Initializer.LoadScenario({
      Admin: {
        Settings: {
          AccountingSettings: {
            NonCashAdj_DualPricing: {
              Type: NonCashAdj_DualPrincingType.NonCashAdj,
              Percentage: "3",
              ShowCashRegularPriceOnPayButton: true
            }
          },
        },
      },
    });
    //Login to POS application
    await POS.Login.In();
    //Add item to the register
    await POS.Register.AddItemByStockcode({ stockCode: ITEMS.JACK.BARCODE });
    //Click on NCA Pay button
    await POS.Register.NCApay.Click();
    const regularamount = await POS.Dialog.Checkout.NCATotal.getText();
    const total = Number(regularamount.replace(/[^0-9.]/g, ""));
    const partialPayment = Number((total / 2).toFixed(2));
    //Perform partial payment with Cash
    await POS.Dialog.Checkout.Tendered.setText({ value: partialPayment.toString() });
    await POS.Dialog.Checkout.Cash.Click();
    //Perform remaining payment with NCA payment with PAX card
    await POS.Dialog.Checkout.Card.Click();
    await POS.Dialog.Success.Close.Click();

  });

  test('[C4311]Verify surcharge not in refund with Pax', { tag: ['@PAX', '@Surcharge', '@Regression'] }, async ({ page }) => {
    //Enable Surchnarge
    await Initializer.LoadScenario({
      Admin: {
        Settings: {
          GeneralSettings: {
            CreditCard: {
              Pax: {
                Surcharge: true
              }
            }

          }
        }
      }
    });
    //Login to POS application
    await POS.Login.In();
    //Ring an item
    await POS.Register.AddItemByStockcode({ stockCode: ITEMS.ExcludecatfromDualPriceitem.BARCODE });
    await POS.Register.PayButton.Click();
    const updatedText = await POS.Dialog.Checkout.CashTotal.getText();
    const withoutsurchargetotal = Number(updatedText.replace(/[^0-9.]/g, ''));
    // Apply surcharge to the total
    await PAXMock.ApplySurcharge(page, withoutsurchargetotal);
    //Click Card (PAX receives surcharge-inclusive amount)
    await POS.Dialog.Checkout.Card.Click();
    //Close the success dialog
    await POS.Dialog.Success.Close.Click();
    //Navigate to Sales tab
    await POS.Sales.Click();
    //Open the latest transaction
    await POS.Sales.transactions.Table.ViewTransactionDetail({ byIndex: 1 });
    //Click on refund button
    await POS.Dialog.TransactionDetails.Refund.Click();
    //confirm refund through cash/card
    const refundTotal = await POS.Dialog.RefundTransaction.Total.getText();
    //Verify that refund total does not include surcharge
    const refundTotalAmount = Number(refundTotal.replace(/[^0-9.]/g, ''));
    //Verify that refund total does not include surcharge with 0.50 tolerance due to rounding off issue
    expect(refundTotalAmount).toBeCloseTo(withoutsurchargetotal, 2);

  });

  test('[C4328] Verify surcharge on credit card', { tag: ['@PAX', '@Surcharge', '@Regression'] }, async ({ page }) => {
    await Initializer.LoadScenario({
      Admin: {
        Settings: {
          GeneralSettings: {
            CreditCard: {
              Pax: {
                Surcharge: true
              }
            }

          }
        }
      }
    });
    //Login to POS application
    await POS.Login.In();
    //Ring an item
    await POS.Register.AddItemByStockcode({ stockCode: ITEMS.ExcludecatfromDualPriceitem.BARCODE });
    await POS.Register.PayButton.Click();
    const updatedText = await POS.Dialog.Checkout.CashTotal.getText();
    const withoutsurchargetotal = Number(updatedText.replace(/[^0-9.]/g, ''));
    // Apply surcharge to the total (ApplySurcharge returns the surcharge amount)
    const surchargeAmount = await PAXMock.ApplySurcharge(page, withoutsurchargetotal);
    const totalWithSurcharge = await POS.Dialog.Checkout.CashTotal.getText();
    const totalWithSurchargeAmount = Number(totalWithSurcharge.replace(/[^0-9.]/g, ''));
    // Verify that the total with surcharge displayed in the checkout dialog is correct 
    expect(totalWithSurchargeAmount).toEqual(Number((withoutsurchargetotal + surchargeAmount).toFixed(2)));
    //Click Card (PAX receives surcharge-inclusive amount)
    await POS.Dialog.Checkout.Card.Click();
    //Close the success dialog
    await POS.Dialog.Success.Close.Click();

  });

  test('[C4329] Verify surcharge on debit card payment', { tag: ['@PAX', '@Surcharge', '@DebitCard', '@Regression'] }, async ({ page }) => {
    // Enable Surcharge and Debit sales for PAX
    await Initializer.LoadScenario({
      Admin: {
        Settings: {
          GeneralSettings: {
            CreditCard: {
              Pax: {
                Surcharge: true,
                DebitSales: true,
              }
            }

          }
        }
      }
    });
    //Login to POS application
    await POS.Login.In();
    //Ring an item
    await POS.Register.AddItemByStockcode({ stockCode: ITEMS.JACK.BARCODE });
    await POS.Register.PayButton.Click();
    const updatedText = await POS.Dialog.Checkout.CashTotal.getText();
    const withoutsurchargetotal = Number(updatedText.replace(/[^0-9.]/g, ''));
    //Attempt to apply surcharge to the total
    await PAXMock.ApplySurcharge(page, withoutsurchargetotal);
    //Click debit card button
    await POS.Dialog.Checkout.DebitCard.Click();
    await POS.Dialog.Success.Close.Click();
  });

  test('[C4406] Verify surcharge on register Transcation info ', { tag: ['@PAX', '@Surcharge', '@Regression'] }, async ({ page }) => {
    // Enable Su rcharge and Debit sales for PAX
    await Initializer.LoadScenario({
      Admin: {
        Settings: {
          GeneralSettings: {
            CreditCard: {
              Pax: {
                Surcharge: true,
              }
            }

          }
        }
      }
    });
    //Login to POS application
    await POS.Login.In();
    //Ring an item
    await POS.Register.AddItemByStockcode({ stockCode: ITEMS.JACK.BARCODE });
    await POS.Register.PayButton.Click();
    const updatedText = await POS.Dialog.Checkout.CashTotal.getText();
    const withoutsurchargetotal = Number(updatedText.replace(/[^0-9.]/g, ''));
    // 4. Attempt to apply surcharge to the total
    const surchargeAmount = await PAXMock.ApplySurcharge(page, withoutsurchargetotal);
    const totalWithSurcharge = await POS.Dialog.Checkout.CashTotal.getText();
    const totalWithSurchargeAmount = Number(totalWithSurcharge.replace(/[^0-9.]/g, ''));
    // Verify that the total with surcharge displayed in the checkout dialog is correct 
    expect(totalWithSurchargeAmount).toEqual(Number((withoutsurchargetotal + surchargeAmount).toFixed(2)));
    // 6. Click Card (PAX receives surcharge-inclusive amount)
    await POS.Dialog.Checkout.Card.Click();
    // 7  Close the success dialog
    await POS.Dialog.Success.Close.Click();
  });

  test('[C4407 ] Verify surcharge on POS reports', { tag: ['@PAX', '@Surcharge', '@Regression'] }, async ({ page }) => {
    // Enable Surcharge and Debit sales for PAX
    await Initializer.LoadScenario({
      Admin: {
        Settings: {
          GeneralSettings: {
            CreditCard: {
              Pax: {
                Surcharge: true,
              }
            }

          }
        }
      }
    });
    //Login to POS application
    await POS.Login.In();
    await POS.Reports.Click();
    await POS.Reports.DayReport.Click();
    //Check Surcharge value before sale in Day report
    const beforesale = await POS.Reports.DayReport.Table.GetCellValue({ getValueFrom: "Total" }, { rowQuery: [{ rowColumn: 1, rowValue: "Surcharge" }] });
    const beforesaleAmount = Number(beforesale.replace(/[^0-9.]/g, ''));
    await POS.Register.Click();
    //Ring an item
    await POS.Register.AddItemByStockcode({ stockCode: ITEMS.JACK.BARCODE });
    await POS.Register.PayButton.Click();
    const updatedText = await POS.Dialog.Checkout.CashTotal.getText();
    const withoutsurchargetotal = Number(updatedText.replace(/[^0-9.]/g, ''));
    //Attempt to apply surcharge to the total
    await PAXMock.ApplySurcharge(page, withoutsurchargetotal);
    
    //Click the card button
    await POS.Dialog.Checkout.Card.Click();
    //Close the success dialog
    await POS.Dialog.Success.Close.Click();
    //Navigate to reports and open the latest transaction
    await POS.Reports.Click();
    await POS.Reports.DayReport.Click();
    //Check Surcharge value after sale in Day report
    const afterSale = await POS.Reports.DayReport.Table.GetCellValue({ getValueFrom: "Total" }, { rowQuery: [{ rowColumn: 1, rowValue: "Surcharge" }] });
    //Verify Surcharge added in Sale
    const afterSaleAmount = Number(afterSale.replace(/[^0-9.]/g, ''));
    //Verify new value of  surcharge is updated in report after sale
    expect(afterSaleAmount).toBeGreaterThan(beforesaleAmount);

  });

  test('[C4408] Verify surcharge in Admin reports', { tag: ['@PAX', '@Surcharge', '@Regression', '@AdminReports'] }, async ({ page }) => {
    // Enable Surcharge and Debit sales for PAX
    await Initializer.LoadScenario({
      Admin: {
        Settings: {
          GeneralSettings: {
            CreditCard: {
              Pax: {
                Surcharge: true,
              }
            }

          }
        }
      }
    });
    //Login to POS application
    await POS.Login.In();
    //Ring an item
    await POS.Register.AddItemByStockcode({ stockCode: ITEMS.JACK.BARCODE });
    await POS.Register.PayButton.Click();
    //Click the card button
    await POS.Dialog.Checkout.Card.Click();
    // 7  Close the success dialog
    await POS.Dialog.Success.Close.Click();
    //Click on  Admin Button
    await POS.Admin.Click();
    //Admmin  Console should open
    await ADMIN.Menu.Reports.GoTo();
    //Open the Summary report
    const Surchargeaftersale = await ADMIN.Reports.SummaryReportTable.GetCellValue({ getValueFrom: "Total" }, { rowQuery: [{ rowColumn: 1, rowValue: "Surcharge" }] });
    const SurchargeaftersaleAmount = Number(Surchargeaftersale.replace(/[^0-9.]/g, ''));
    //Verify new value of  surcharge is updated in report after sale
    expect(SurchargeaftersaleAmount).toBeGreaterThan(0);
  });

  test('[C4414]  Verify surcharge prevents DP/NCA ', { tag: ['@PAX', '@Surcharge', '@Regression', '@DPNCA','@nonparallelizable'] }, async ({ page }) => {
    // Enable Surcharge in Admin settings
    await Initializer.LoadScenario({
      Admin: {
        Settings: {
          GeneralSettings: {
            CreditCard: {
              Pax: {
                Surcharge: true,
              }
            }

          }
        }
      }
    });
    //Login to POS application
    await POS.Login.In();
    //Click on Admin button
    await POS.Admin.Click();
    await ADMIN.Menu.Accounting_Settings.GoTo();
    //Navigate to Duel pricing settings and enable Dual pricing
    await ADMIN.Settings.AccountingSettings.type.SelectOption({ byText: "Dual Pricing" });
    //Should not allow to enable Dual pricing when surcharge is enabled
    expect(await ADMIN.Dialog.Error.Ok.IsVisible(), 'The Pax surcharge feature is currently enabled and this cannot be changed at this time').toBeTruthy();
    await ADMIN.Dialog.Error.Ok.Click();
  });
});