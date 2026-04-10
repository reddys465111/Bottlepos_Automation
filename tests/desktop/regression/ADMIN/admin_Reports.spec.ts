import { test, expect } from "@playwright/test";
import { ADMIN } from "../../../../src/section/ADMIN";
import { Initializer, ITEMS } from "../../../../src/utils";
import { POS } from "../../../../src/section/POS";

//This block runs before each test
test.beforeEach(async ({ page }) => {
  await Initializer.Init(page, { Admin: true });
});

//This block runs after each test
test.afterEach(async ({ page }, testInfo) => {
  await Initializer.Finalize(page, testInfo);
});

test.describe("Admin Reports for Cents in Sales", { tag: ['@smoke', '@Admin', '@Reports'] }, () => {

  test('[C8719]Verify cash roundinig for 5cents will add to row Sale Rounding each time a transaction is completed', { tag: ['@5cents', '@SummaryReport'] }, async ({ }) => {
    //Enable the Cash Rounding for 5 cents
    await Initializer.LoadScenario({
      Admin: {
        Settings: {
          POSSettings: {
            SaleOptions: {
              CashRounding: '0'
            }
          }
        }
      }
    })
    //Login the Admin
    await ADMIN.Login.In();
    //Change to POS
    await ADMIN.ChangeToPOS();
    //Add item to cart
    await POS.Register.AddItemByStockcode({ stockCode: ITEMS.BUDLIGHT.BARCODE });
    //Complete the transaction with cash payment
    await POS.Register.PayButton.Click();
    await POS.Dialog.Checkout.ClickCashPaymentButton({ index: 1 });
    await POS.Dialog.CheckoutComplete.No.Click();
    await POS.Sales.Click();
    await POS.Register.Click();
    await POS.Sales.Click();
    const posref = await POS.Sales.transactions.Table.GetRefNumber(1);
    //Go back to Admin
    await POS.Admin.Click();
    //Navigate to Reports
    await ADMIN.Menu.Reports.GoTo();
    //Go to Summary report
    await ADMIN.Reports.SummaryReportTable.ClickCell({ clickOn: "# Sales" }, { rowQuery: [{ rowColumn: "label", rowValue: "Cash" }] });
    await ADMIN.Dialog.ReportTransaction.Search.setText({ value: posref })
    //Get the value of Sale Rounding
    await ADMIN.Dialog.ReportTransaction.TransactionTable.ClickCell({ clickOn: "Details" }, { rowIndex: 1 }
    );
    const saleRoundingValue = await ADMIN.Dialog.TransactionDetails.details.rounding.getText();
    //Verify the Sale Rounding value is greather than 0
    await expect(parseFloat(saleRoundingValue.replace('$', '')), 'Sale Rounding value is not applied to Total Amount').toBeGreaterThan(0);
    //disable the Cash Rounding for 5 cents
    await Initializer.LoadScenario({
      Admin: {
        Settings: {
          POSSettings: {
            SaleOptions: {
              CashRounding: '10'
            }
          }
        }
      }
    })


  });

  test('[C8720]Verify cash roundinig for 10cents will add to row Sale Rounding each time a transaction is completed', { tag: ['@5cents', '@SummaryReport'] }, async ({ }) => {
    //Enable the Cash Rounding for 5 cents
    await Initializer.LoadScenario({
      Admin: {
        Settings: {
          POSSettings: {
            SaleOptions: {
              CashRounding: '5'
            }
          }
        }
      }
    })
    //Login the Admin
    await ADMIN.Login.In();
    //Change to POS
    await ADMIN.ChangeToPOS();
    //Add item to cart
    await POS.Register.AddItemByStockcode({ stockCode: ITEMS.BUDLIGHT.BARCODE });
    //Complete the transaction with cash payment
    await POS.Register.PayButton.Click();
    await POS.Dialog.Checkout.ClickCashPaymentButton({ index: 1 });
    await POS.Dialog.CheckoutComplete.No.Click();
    await POS.Sales.Click();
    await POS.Register.Click();
    await POS.Sales.Click();
    const posref = await POS.Sales.transactions.Table.GetRefNumber(1);
    //Go back to Admin
    await POS.Admin.Click();
    //Navigate to Reports
    await ADMIN.Menu.Reports.GoTo();
    //Go to Summary report
    await ADMIN.Reports.SummaryReportTable.ClickCell({ clickOn: "# Sales" }, { rowQuery: [{ rowColumn: "label", rowValue: "Cash" }] });
    await ADMIN.Dialog.ReportTransaction.Search.setText({ value: posref })
    //Get the value of Sale Rounding
    await ADMIN.Dialog.ReportTransaction.TransactionTable.ClickCell({ clickOn: "Details" }, { rowIndex: 1 }
    );
    const saleRoundingValue = await ADMIN.Dialog.TransactionDetails.details.rounding.getText();
    //Verify the Sale Rounding value is greather than 0
    await expect(parseFloat(saleRoundingValue.replace('$', '')), 'Sale Rounding value is not applied to Total Amount').toBeGreaterThan(0);
    //disable the Cash Rounding for 5 cents
    await Initializer.LoadScenario({
      Admin: {
        Settings: {
          POSSettings: {
            SaleOptions: {
              CashRounding: '10'
            }
          }
        }
      }
    })


  });

  test('[C8721]  verify that the option to toggle between stores disable if no linked together on the Summary Report', { tag: ['@SummaryReport', '@linkedStores'] }, async ({ }) => {
    //login to Admin
    await ADMIN.Login.In();
    // Navigate to Reports
    await ADMIN.Menu.Reports.GoTo();
    // Verify the Stores dropdown is disabled
    await expect(await ADMIN.Reports.Summary.Stores.IsClickable().catch(() => false), 'Store dropdown is still visible and clickable').toBeFalsy();
  });

  ///C8751 multistore is not yet implemented, need to update the test once the feature is ready

  test('[C8833]Verify advanced search filter in the Summary Report can be reset by clicking the clear search button', { tag: ['@SummaryReport', '@AdvancedSearch'] }, async ({ }) => {
    //login to Admin
    await ADMIN.Login.In();
    // Navigate to Reports
    await ADMIN.Menu.Reports.GoTo();
    // Click on Advanced Search
    await ADMIN.Reports.Summary.AdvanceSearch.Click();
    await ADMIN.Dialog.reportAdvanceSearch.User.SelectOption({ byIndex: 1 });
    await ADMIN.Dialog.reportAdvanceSearch.Device.SelectOption({ byIndex: 1 });
    await ADMIN.Dialog.reportAdvanceSearch.itemtype.SelectOption({ byIndex: 1 });
    await ADMIN.Dialog.reportAdvanceSearch.Search.Click();
    await ADMIN.Reports.Summary.clearSearch.Click();
    //Verify that the advanced search filters are cleared and the summary report is reset to its default state
    await expect(await ADMIN.Reports.Summary.clearSearch.IsVisible(), 'Clear Search button is still visible').toBeFalsy();

  });

  test('[C8835] Veriify all shifts on the summary reports and the details of individuals and total shifts', { tag: ['@SummaryReport', '@Shifts'] }, async ({ }) => {
    //Test case need to understand
  });

  test('[C8836] Verify the option to toggle between shifts only exists for multiple shifts on the summary report', { tag: ['@SummaryReport', '@Shifts'] }, async ({ }) => {
    //Test case need to understand
  });


  test('[C8845]Verify user is not able to select any zero value on the summary report ', { tag: ['@SummaryReport', '@ZeroRows'] }, async ({ }) => {
    //login to Admin
    await ADMIN.Login.In();
    // Change to POS
    await ADMIN.ChangeToPOS();
    // Add item to cart
    await POS.Register.AddItemByStockcode({ stockCode: ITEMS.JACK.BARCODE });
    await POS.Register.AddItemByStockcode({ stockCode: ITEMS.ExcludecatfromDualPriceitem.BARCODE });
    //Click Pay and complete the transaction with cash payment
    await POS.Register.PayButton.Click();
    await POS.Dialog.Checkout.ClickCashPaymentButton({ index: 1 });
    await POS.Dialog.CheckoutComplete.No.Click();
    await POS.Admin.Click();
    // Navigate to Reports
    await ADMIN.Menu.Reports.GoTo();
    // identify a cell with 0 value and try to click on it
    await expect(async () => {
      await ADMIN.Reports.SummaryReportTable.ClickCell({ clickOn: "# Sales" },
        { rowQuery: [{ rowColumn: "Total", rowValue: "$0.00" }] });
    }, 'Cell with 0 value is clickable').rejects.toThrow();

  });

  test('[C9025] Verify that date range in day report is working properly', { tag: ['@DayReport', '@DateRange'] }, async ({ }) => {
    //login to Admin
    await ADMIN.Login.In();
    // Navigate to Reports
    await ADMIN.Menu.Reports.GoTo();
    // Go to Day report
    await ADMIN.Reports.ReportType.SelectOption({ byText: 'Day Report' });
    //Close the report Popup dailog
    if (await ADMIN.Dialog.DayReportConfirmation.IsVisible()) {
      await ADMIN.Dialog.DayReportConfirmation.Close.Click();
    }
    //Select the date range for last 7 days
    await ADMIN.Reports.DayReport.Range.SelectOption({ byText: 'Last 7 Days' });
    if (await ADMIN.Dialog.DayReportConfirmation.IsVisible()) {
      await ADMIN.Dialog.DayReportConfirmation.Close.Click();
    }
    //Verify the data ranges according to the selected date range
    const firstdate = await ADMIN.Reports.DayReport.Range.GetSelectedOption();
    //Select the date range for last 30 days
    await ADMIN.Reports.DayReport.Range.SelectOption({ byText: 'Last 30 Days' });
    if (await ADMIN.Dialog.DayReportConfirmation.IsVisible()) {
      await ADMIN.Dialog.DayReportConfirmation.Close.Click();
    }
    //Verify the data is displayed according to the selected date range
    const seconddate = await ADMIN.Reports.DayReport.Range.GetSelectedOption();
    //Verify the first date range is different from second date range
    await expect(firstdate, 'Date range selection did not apply').not.toBe(seconddate);

  });

  test.only('[C9068]Verify total of the Expenses Report to total up the number of Payments and the Grand Total Amount', { tag: ['@ExpensesReport', '@Admin'] }, async ({ }) => {
    //Step 1: Login to Back Office
    await ADMIN.Login.In()
    //Step 2: Navigate to Expense Page
    await ADMIN.Menu.Expense.GoTo();
    //Step 3: Click on Add Expense Button
    for (let i = 0; i < 3; i++) {
      await ADMIN.Expense.Add.Click();
      //Step 4: Add Expense category
      await ADMIN.Dialog.AddExpense.AddCategory.Click();
      const categoryname = await ADMIN.FakeData.getName();
      await ADMIN.Dialog.AddExpensecategory.Name.setText({ value: categoryname });
      await ADMIN.Dialog.AddExpensecategory.Save.Click();
      await ADMIN.Dialog.AddExpense.Category.SelectOption({ byText: categoryname });
      //Step 5 : Add the Amount
      const expenseamount = await ADMIN.FakeData.getItemPrice();
      await ADMIN.Dialog.AddExpense.Amount.setText({ value: expenseamount });
      //Step 6: Save the Expense
      await ADMIN.Dialog.AddExpense.Save.Click();
    }
    //Step 7: Navigate to Reports
    await ADMIN.Menu.Reports.GoTo();
    //Step 8: Go to Expense report
    await ADMIN.Reports.ReportType.SelectOption({ byText: 'Expenses' });
    await ADMIN.Reports.Expenses.ShowEntries.SelectOption({ byText: '100' });
    //Step 9: Get the total number of payments and the grand total amount
    const totals = await ADMIN.Reports.Expenses.Table.GetTotals();
    // Payments → Total vs Grand Total should match
    expect(totals.totalPayments).toBe(totals.grandPayments);
    // Amount → Total vs Grand Total should match
    expect(totals.totalAmount).toBe(totals.grandAmount);

  });


});
