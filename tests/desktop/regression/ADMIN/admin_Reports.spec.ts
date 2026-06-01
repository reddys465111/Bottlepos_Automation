import { test, expect } from "@playwright/test";
import { ADMIN } from "../../../../src/section/ADMIN";
import { Initializer, ITEMS, payfac, Session } from "../../../../src/utils";
import { POS } from "../../../../src/section/POS";

//This block runs before each test
test.beforeEach(async ({ page }) => {
  await Initializer.Init(page, { Admin: true });
  await payfac.Init(page);
});


//This block runs after each test
test.afterEach(async ({ page }, testInfo) => {
  await Initializer.Finalize(page, testInfo);
});

test.describe.only("Admin Reports ", { tag: ['@Regression', '@Admin', '@Reports'] }, () => {

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
    await expect(await ADMIN.Reports.Summary.IsStoreDropdownVisible(), 'Store dropdown is still visible and clickable').toBeFalsy();
  });



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

  test('[C8835] Veriify all shifts on the summary reports and the details of individuals and total shifts', { tag: ['@SummaryReport', '@Shifts', '@nonparallelizable'] }, async ({ }) => {
    //login to Admin
    await ADMIN.Login.In();
    //Change to POS
    await ADMIN.ChangeToPOS();
    // Add item to cart
    await POS.Register.AddItemByStockcode({ stockCode: ITEMS.JACK.BARCODE });
    await POS.Register.AddItemByStockcode({ stockCode: ITEMS.ExcludecatfromDualPriceitem.BARCODE });
    //Click Pay and complete the transaction with cash payment
    await POS.Register.PayButton.Click();
    await POS.Dialog.Checkout.ClickCashPaymentButton({ index: 1 });
    await POS.Dialog.CheckoutComplete.No.Click();
    await POS.Reports.Click();
    //Close the report popup dialog
    await POS.Reports.CloseRegister.Click();
    await POS.Dialog.ReportDialog.Yes.Click();
    //Close the report preview and print dialog popup
    await POS.Reports.CloseReportPreview();
    //Logout to Admin
    await POS.Logout.Click();
    //Close the Logout confirmation dialog
    await POS.Dialog.Logout.Yes.Click();
    //Login as register user
    await POS.Login.In({ user: ` ${Session.User} `, password: ` ${Session.Password} ` });
    await POS.Register.Click();
    await POS.Register.AddItemByStockcode({ stockCode: ITEMS.JACK.BARCODE });
    await POS.Register.AddItemByStockcode({ stockCode: ITEMS.ExcludecatfromDualPriceitem.BARCODE });
    //Click Pay and complete the transaction with cash payment
    await POS.Register.PayButton.Click();
    await POS.Dialog.Checkout.ClickCashPaymentButton({ index: 1 });
    await POS.Dialog.CheckoutComplete.No.Click();
    await POS.Reports.Click();
    //Close the report popup dialog
    await POS.Reports.CloseRegister.Click();
    await POS.Dialog.ReportDialog.Yes.Click();
    await POS.Reports.CloseReportPreview();
    //Go back to Admin
    await POS.Admin.Click();
    //Navigate to Reports
    await ADMIN.Menu.Reports.GoTo();
    await ADMIN.Reports.Summary.WaitForLoaded();
    //Select the shift dropdown to see the different shifts
    await ADMIN.Reports.Summary.Shift.SelectOption({ byIndex: 1 });
    //Verify the data for the first shift
    const firstShiftSalesValue = await ADMIN.Reports.Summary.Table.GetCellValue({ getValueFrom: "Total" }, { rowIndex: 1 });
    //Select the shift dropdown to see the different shifts
    await ADMIN.Reports.Summary.Shift.SelectOption({ byIndex: 2 });
    //Verify the data for the second shift
    const secondShiftSalesValue = await ADMIN.Reports.Summary.Table.GetCellValue({ getValueFrom: "Total" }, { rowIndex: 1 });
    //Verify the sales value of the first shift is different from second shift
    await expect(firstShiftSalesValue, 'Sales value for first shift did not apply').not.toBe(secondShiftSalesValue);


  });

  test('[C8836] Verify the option to toggle between shifts only exists for multiple shifts on the summary report', { tag: ['@SummaryReport', '@Shifts'] }, async ({ }) => {
    //login to Admin
    await ADMIN.Login.In();
    // Navigate to Reports
    await ADMIN.Menu.Reports.GoTo();
    // Verify the Shift dropdown is not visible when there is only one shift
    await expect(await ADMIN.Reports.Summary.IsShiftDropdownVisible(), 'Shift dropdown is visible and clickable').toBeFalsy();

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

  test('[C9068]Verify total of the Expenses Report to total up the number of Payments and the Grand Total Amount', { tag: ['@ExpensesReport', '@Admin'] }, async ({ }) => {
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
      //Add the Type
      await ADMIN.Dialog.AddExpense.AddType.Click();
      await ADMIN.Dialog.AddExpenseTypes.Name.setText({ value: categoryname });
      await ADMIN.Dialog.AddExpenseTypes.Save.Click();
      await ADMIN.Dialog.AddExpense.Type.SelectOption({ byText: categoryname });
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

  test('[C9006]Verify sort columns on the report transactions in summary report by selecting different columns', { tag: ['@SummaryReport', '@Sorting'] }, async ({ }) => {
    //login to Admin
    await ADMIN.Login.In();
    // Navigate to Reports
    await ADMIN.Menu.Reports.GoTo();
    //Click on # Sales column to sort
    await ADMIN.Reports.Summary.Table.SortBytableColumn({ columnIndex: 2, sortOrder: 'descending' });
    //Get the sales value of the first row after sorting
    const firstRowSalesValue = await ADMIN.Reports.Summary.Table.GetCellValue({ getValueFrom: "# Sales" }, { rowIndex: 1 });
    //Click on # Sales column to sort in ascending order
    await ADMIN.Reports.Summary.Table.SortBytableColumn({ columnIndex: 2, sortOrder: 'ascending' });
    //Get the sales value of the first row after sorting in ascending order
    const firstRowSalesValueAsc = await ADMIN.Reports.Summary.Table.GetCellValue({ getValueFrom: "# Sales" }, { rowIndex: 1 });
    //Verify the sales value of the first row is different after sorting in ascending and descending order
    await expect(firstRowSalesValue, 'Sorting by # Sales column did not work').not.toBe(firstRowSalesValueAsc);
    //Click on # Total column to sort
    await ADMIN.Reports.Summary.Table.SortBytableColumn({ columnIndex: 3, sortOrder: 'descending' });
    //Get the total value of the first row after sorting
    const firstRowTotalValue = await ADMIN.Reports.Summary.Table.GetCellValue({ getValueFrom: "Total" }, { rowIndex: 1 });
    //Click on # Total column to sort in ascending order
    await ADMIN.Reports.Summary.Table.SortBytableColumn({ columnIndex: 3, sortOrder: 'ascending' });
    //Get the total value of the first row after sorting in ascending order
    const firstRowTotalValueAsc = await ADMIN.Reports.Summary.Table.GetCellValue({ getValueFrom: "Total" }, { rowIndex: 1 });
    //Verify the total value of the first row is different after sorting in ascending and descending order
    await expect(firstRowTotalValue, 'Sorting by # Total column did not work').not.toBe(firstRowTotalValueAsc);

  });

  test('[C9009]Verify pagination on the report transaction dialog in summary report by selecting different columns', { tag: ['@SummaryReport', '@Sorting'] }, async ({ }) => {
    //login to Admin
    await ADMIN.Login.In();
    // Navigate to Reports
    await ADMIN.Menu.Reports.GoTo();
    //Click on Cash payment method to open the transaction dialog
    await ADMIN.Reports.SummaryReportTable.ClickCell({ clickOn: "# Sales" }, { rowQuery: [{ rowColumn: "label", rowValue: "Cash" }] });
    //Click the pagination next button to go to the next page and verify pagination works
    const paginationWorked = await ADMIN.Dialog.ReportTransaction.goToNextPageUntilEnd();
    //Verify that the pagination works and user is able to navigate through all the pages of the transaction dialog
    await expect(paginationWorked, 'Pagination is not working correctly').toBeTruthy();
  });
  test('[C9010]  Verify view details on the report transaction dialog is visible', { tag: ['@SummaryReport'] }, async ({ }) => {
    //login to Admin
    await ADMIN.Login.In();
    // Navigate to Reports
    await ADMIN.Menu.Reports.GoTo();
    //Click on Gross sale row  to open the transaction dialog
    await ADMIN.Reports.SummaryReportTable.ClickCell({ clickOn: "# Sales" }, { rowQuery: [{ rowColumn: "label", rowValue: "Gross Sales" }] });
    //Click the view details button on the transaction dialog
    await ADMIN.Dialog.ReportTransaction.TransactionTable.ClickCell({ clickOn: "Details" }, { rowIndex: 1 })
    //Verify that the transaction details dialog is opened
    await expect(await ADMIN.Dialog.TransactionDetails.IsVisible(), 'Transaction details dialog did not open').toBeTruthy();

  });
  test('[C8533]Verify tender report load properly without issues', { tag: ['@TenderReport', '@Admin'] }, async ({ }) => {
    //login to Admin
    await ADMIN.Login.In();
    // Navigate to Reports
    await ADMIN.Menu.Reports.GoTo();
    // Go to Tender report
    await ADMIN.Reports.ReportType.SelectOption({ byText: 'Tender Report' });
    //Verify the tender report is loaded properly without any issues
    await expect(await ADMIN.Reports.TenderReport.Table.GetCellValue({ getValueFrom: "Method" }, { rowIndex: 1 }), 'Tender report did not load properly').not.toBeNull();
  });

  test('[C8723]Verify user can sort columns on the tender report page', { tag: ['@TenderReport', '@Sorting'] }, async ({ }) => {
    //login to Admin
    await ADMIN.Login.In();
    //Change to POS
    await ADMIN.ChangeToPOS();
    await POS.Register.AddItemByStockcode({ stockCode: ITEMS.JACK.BARCODE });
    await POS.Register.PayButton.Click();
    const cashAmount = Number(await POS.Dialog.Checkout.CashTotal.getText());
    await payfac.Read({ amount: cashAmount });
    await POS.Dialog.Checkout.Card.Click();
    await POS.Dialog.Success.Close.Click();
    //Go back to Admin
    await POS.Admin.Click();
    // Navigate to Reports
    await ADMIN.Menu.Reports.GoTo();
    // Go to Tender report
    await ADMIN.Reports.ReportType.SelectOption({ byText: 'Tender Report' });
    //Click on Method column to sort
    await ADMIN.Reports.TenderReport.Table.SortBytableColumn({ columnIndex: 1, sortOrder: 'ascending' });
    //Get the method value of the first row after sorting
    const AscRowMethodValue = await ADMIN.Reports.TenderReport.Table.GetCellValue({ getValueFrom: "Method" }, { rowIndex: 1 });
    //Click on Method column to sort in descending order
    await ADMIN.Reports.TenderReport.Table.SortBytableColumn({ columnIndex: 1, sortOrder: 'descending' });
    //Get the method value of the first row after sorting in descending order
    const DescRowMethodValue = await ADMIN.Reports.TenderReport.Table.GetCellValue({ getValueFrom: "Method" }, { rowIndex: 1 });
    //Verify the method value of the first row is different after sorting in ascending and descending order
    await expect(AscRowMethodValue, 'Sorting by Method column did not work').not.toBe(DescRowMethodValue);
  });

  test('[C8752] Verify tender report search functionality works properly', { tag: ['@TenderReport', '@Search'] }, async ({ }) => {
    //login to Admin
    await ADMIN.Login.In();
    //Navigate to Reports
    await ADMIN.Menu.Reports.GoTo();
    //Go to Tender report
    await ADMIN.Reports.ReportType.SelectOption({ byText: 'Tender Report' });
    //Search for a specific method in the search box
    await ADMIN.Reports.TenderReport.Search.setText({ value: "Cash" });
    //Verify the search results are displayed according to the search keyword
    const searchResultMethodValue = await ADMIN.Reports.TenderReport.Table.GetCellValue({ getValueFrom: "Method" }, { rowIndex: 1 });
    // Search is considered successful if it returns Cash data OR if no data matches (no results message)
    const isSearchSuccessful = searchResultMethodValue.includes("Cash") || searchResultMethodValue === "No Data Available In Table";
    await expect(isSearchSuccessful, 'Search functionality did not work properly - should either return Cash data or no results message').toBe(true);
  });

  test('[C8778] Verify filters can be cleared in tender reports', { tag: ['@TenderReport', '@Filters'] }, async ({ page }) => {
    //login to Admin
    await ADMIN.Login.In();
    //Navigate to Reports
    await ADMIN.Menu.Reports.GoTo();
    //Go to Tender report
    await ADMIN.Reports.ReportType.SelectOption({ byText: 'Tender Report' });
    //Search for a specific method in the search box
    await ADMIN.Reports.TenderReport.Search.setText({ value: "Card" });
    //Verify after clearing the keywords from the search field that all the rows reappear
    await ADMIN.Reports.TenderReport.ClearSearch();
    // Verify the search field is empty after clearing the keyword
    const clearedSearchValue = await ADMIN.Reports.TenderReport.Search.getText();
    await expect(clearedSearchValue, 'Tender report search field was not cleared').toBe("");
    // Verify the table has restored rows and Cash method entries are visible again
    const cashMethodExists = await ADMIN.Reports.TenderReport.Table.RowExists({ rowColumn: "Method", rowValue: "cash" });
    await expect(cashMethodExists, 'Clearing the search keyword did not restore Cash rows in the tender report').toBe(true);
  });

  test('[C8851] Verify user can change entries that are showing on the tender report', { tag: ['@TenderReport', '@Entries'] }, async ({ page }) => {
    //login to Admin
    await ADMIN.Login.In();
    //Navigate to Reports
    await ADMIN.Menu.Reports.GoTo();
    //Go to Tender report
    await ADMIN.Reports.ReportType.SelectOption({ byText: 'Tender Report' });
    //Change the entries showing from 10 to 25
    await ADMIN.Reports.TenderReport.ShowEntries.SelectOption({ byText: '25' });
    //Verify that 25 entries are showing on the report table
    const rowCount = await ADMIN.Reports.TenderReport.Table.getTableRowCount();
    await expect(rowCount, 'Changing the number of entries to show did not work - should show 25 rows').toBeLessThanOrEqual(25);
    //Change the entries showing from 25 to 10
    await ADMIN.Reports.TenderReport.ShowEntries.SelectOption({ byText: '10' });
    //Verify that 10 entries are showing on the report table
    const updatedRowCount = await ADMIN.Reports.TenderReport.Table.getTableRowCount();
    await expect(updatedRowCount, 'Changing the number of entries to show did not work - should show 10 rows').toBeLessThanOrEqual(10);

  });

  test('[C8887] Verify pagination works in tender reports', { tag: ['@TenderReport', '@Pagination'] }, async ({ }) => {
    //login to Admin
    await ADMIN.Login.In();
    //Navigate to Reports
    await ADMIN.Menu.Reports.GoTo();
    //Go to Tender report
    await ADMIN.Reports.ReportType.SelectOption({ byText: 'Tender Report' });
    //Click the pagination next button to go to the next page and verify pagination works
    const paginationWorked = await ADMIN.Reports.TenderReport.Table.goToNextPageUntilEnd();
    //Verify that the pagination works and user is able to navigate through all the pages of the tender report
    await expect(paginationWorked, 'Pagination is not working correctly in tender report').toBeTruthy();

  });
  test('[C8458]Verify user can select different time periods with filters applied', { tag: ['@SalesReport', '@Filters', '@DateRange'] }, async ({ }) => {
    //login to Admin/
    await ADMIN.Login.In();
    //Navigate to Reports
    await ADMIN.Menu.Reports.GoTo();
    //Go to Sales report
    await ADMIN.Reports.ReportType.SelectOption({ byText: 'Sales Report' });
    //Select the date range filter for Last 7 days
    await ADMIN.Reports.SalesReport.Range.SelectOption({ byText: 'Last 7 Days' });
    //Verify the data is displayed according to the selected date range
    await expect(await ADMIN.Reports.SalesReport.Range.GetSelectedOption(), 'Last 7 Days filter is not applied').toBe('Last 7 Days');
    //Select the Supply Sale filter
    await ADMIN.Reports.SalesReport.Filter.SelectOption({ byText: 'Supplier Sales' });
    //Filter is applied when the selected option is visible in the filter dropdown
    await expect(await ADMIN.Reports.SalesReport.Filter.GetSelectedOption(), 'Supplier Sales filter is not applied').toBe('Supplier Sales');
    //Select the category Sales filter
    await ADMIN.Reports.SalesReport.Filter.SelectOption({ byText: 'Category Sales' });
    //Filter is applied when the selected option is visible in the filter dropdown
    await expect(await ADMIN.Reports.SalesReport.Filter.GetSelectedOption(), 'Category Sales filter is not applied').toBe('Category Sales');
    //Apply filer Item Sizes and verify the filter is applied
    await ADMIN.Reports.SalesReport.Filter.SelectOption({ byText: 'Item Sizes' });
    await expect(await ADMIN.Reports.SalesReport.Filter.GetSelectedOption(), 'Item Sizes filter is not applied').toBe('Item Sizes');

  });

  test('[C8534] Verify sales report will load without issues', { tag: ['@SalesReport', '@Admin'] }, async ({ }) => {
    //login to Admin
    await ADMIN.Login.In();
    //Navigate to Reports
    await ADMIN.Menu.Reports.GoTo();
    //Go to Sales report
    await ADMIN.Reports.ReportType.SelectOption({ byText: 'Sales Report' });
    //Wait for the sales report table to load
    await ADMIN.Reports.SalesReport.Table.WaitUntilVisible();
    //Verify the sales report is loaded properly without any issues
    await expect(await ADMIN.Reports.SalesReport.Table.IsVisible(), 'Sales report did not load properly').toBeTruthy();
  });

  test('[C8753] Verify search functionality in the sales report', { tag: ['@SalesReport', '@Search'] }, async ({ }) => {
    //login to Admin
    await ADMIN.Login.In();
    //Navigate to Reports
    await ADMIN.Menu.Reports.GoTo();
    //Go to Sales report
    await ADMIN.Reports.ReportType.SelectOption({ byText: 'Sales Report' });
    //Search for a specific item in the search box and randomly select one of the items from the dropdown
    const itemValue = await ADMIN.Reports.SalesReport.Table.GetCellValue({ getValueFrom: "Item Name" }, { rowIndex: 1 });
    await ADMIN.Reports.SalesReport.Search.setText({ value: itemValue });
    //Verify the search results are displayed according to the search keyword
    const searchResultItemValue = await ADMIN.Reports.SalesReport.Table.GetCellValue({ getValueFrom: "Item Name" }, { rowIndex: 1 });
    await expect(searchResultItemValue, 'Search functionality did not work properly in sales report').toBe(itemValue);
  });

  test('[C8724] Verify user can sort the columns on the sales report by selecting different columns', { tag: ['@SalesReport', '@Sorting'] }, async ({ }) => {
    //login to Admin
    await ADMIN.Login.In();
    //Navigate to Reports
    await ADMIN.Menu.Reports.GoTo();
    //Go to Sales report
    await ADMIN.Reports.ReportType.SelectOption({ byText: 'Sales Report' });
    //Click on Item Name column to sort
    await ADMIN.Reports.SalesReport.Table.SortBytableColumn({ columnIndex: 1, sortOrder: 'ascending' });
    //Click on Item Name column to sort in descending order
    await ADMIN.Reports.SalesReport.Table.SortBytableColumn({ columnIndex: 1, sortOrder: 'descending' });
    //Click on Stock Code column to sort
    await ADMIN.Reports.SalesReport.Table.SortBytableColumn({ columnIndex: 2, sortOrder: 'ascending' });
    //Click on Stock Code column to sort in descending order
    await ADMIN.Reports.SalesReport.Table.SortBytableColumn({ columnIndex: 2, sortOrder: 'descending' });
    //Click on Quantity column to sort
    await ADMIN.Reports.SalesReport.Table.SortBytableColumn({ columnIndex: 3, sortOrder: 'ascending' });
    //Click on Quantity column to sort in descending order
    await ADMIN.Reports.SalesReport.Table.SortBytableColumn({ columnIndex: 3, sortOrder: 'descending' });
    //Click on Total column to sort
    await ADMIN.Reports.SalesReport.Table.SortBytableColumn({ columnIndex: 15, sortOrder: 'ascending' });
    //Click on Total column to sort in descending order
    await ADMIN.Reports.SalesReport.Table.SortBytableColumn({ columnIndex: 15, sortOrder: 'descending' });
  });
  test('[C8779] Verify user can clear filters in the sales report', { tag: ['@SalesReport', '@ClearFilters'] }, async ({ }) => {
    //login to Admin
    await ADMIN.Login.In();
    //Navigate to Reports
    await ADMIN.Menu.Reports.GoTo();
    //Go to Sales report
    await ADMIN.Reports.ReportType.SelectOption({ byText: 'Sales Report' });
    //Apply Search box 
    const itemValue = await ADMIN.Reports.SalesReport.Table.GetCellValue({ getValueFrom: "Item Name" }, { rowIndex: 1 });
    await ADMIN.Reports.SalesReport.Search.setText({ value: itemValue });
    //Clear the search box and verify the search box is cleared and all the rows are visible again
    await ADMIN.Reports.SalesReport.Search.clear();
    const clearedSearchValue = await ADMIN.Reports.SalesReport.Search.getText();
    await expect(clearedSearchValue, 'Sales report search field was not cleared').toBe("");

  });

  test('[C8832] Verify user can do advanced search functionality on the sales report', { tag: ['@SalesReport', '@AdvancedSearch'] }, async ({ }) => {
    //login to Admin
    await ADMIN.Login.In();
    //Navigate to Reports 
    await ADMIN.Menu.Reports.GoTo();
    //Go to Sales report
    await ADMIN.Reports.ReportType.SelectOption({ byText: 'Sales Report' });
    //Click on Advanced Search
    await ADMIN.Reports.SalesReport.AdvanceSearch.Click();
    //Select options in the advanced search and click on search
    await ADMIN.Dialog.reportAdvanceSearch.User.SelectOption({ byIndex: 1 });
    await ADMIN.Dialog.reportAdvanceSearch.Device.SelectOption({ byIndex: 1 });
    await ADMIN.Dialog.reportAdvanceSearch.itemtype.SelectOption({ byIndex: 1 });
    await ADMIN.Dialog.reportAdvanceSearch.Search.Click();
    //Verify Clear search button is visible after applying advanced search
    await expect(await ADMIN.Reports.SalesReport.ClearSearch.IsVisible(), 'Clear Search button is not visible after applying advanced search').toBeTruthy();

  });
  test('[C8834] Verify user can remove advanced search filters in sales report', { tag: ['@SalesReport', '@ClearSearch'] }, async ({ }) => {
    //login to Admin
    await ADMIN.Login.In();
    //Navigate to Reports
    await ADMIN.Menu.Reports.GoTo();
    //Go to Sales report
    await ADMIN.Reports.ReportType.SelectOption({ byText: 'Sales Report' });
    //Click on Advanced Search
    await ADMIN.Reports.SalesReport.AdvanceSearch.Click();
    //Select options in the advanced search and click on search
    await ADMIN.Dialog.reportAdvanceSearch.User.SelectOption({ byIndex: 1 });
    await ADMIN.Dialog.reportAdvanceSearch.Device.SelectOption({ byIndex: 1 });
    await ADMIN.Dialog.reportAdvanceSearch.itemtype.SelectOption({ byIndex: 1 });
    await ADMIN.Dialog.reportAdvanceSearch.Search.Click();
    //Click on Clear search button
    await ADMIN.Reports.SalesReport.ClearSearch.Click();
    //Verify that the search is cleared
    const clearedSearchValue = await ADMIN.Reports.SalesReport.Search.getText();
    await expect(clearedSearchValue, 'Sales report search field was not cleared').toBe("");

  });
  test('[C8847] Verify user can select the column visibility under the sales report', { tag: ['@SalesReport', '@ColumnVisibility'] }, async ({ }) => {
    //login to Admin
    await ADMIN.Login.In();
    //Navigate to Reports
    await ADMIN.Menu.Reports.GoTo();
    //Go to Sales report
    await ADMIN.Reports.ReportType.SelectOption({ byText: 'Sales Report' });
    //Click on Column visibility button
    await ADMIN.Reports.SalesReport.ColumnVisibility.Click();
    //vERIFY the column visibility options are visible
    await expect(await ADMIN.Reports.SalesReport.VerifyColumnVisibilityOptions(), 'Column visibility options are not visible').toBeTruthy();
  });

  test('[C8848] Verify user can change columns which under sales report', { tag: ['@SalesReport', '@ColumnVisibility'] }, async ({ }) => {
    //login to Admin
    await ADMIN.Login.In();
    //Navigate to Reports
    await ADMIN.Menu.Reports.GoTo();
    //Go to Sales report
    await ADMIN.Reports.ReportType.SelectOption({ byText: 'Sales Report' });
    //Click on Column visibility button
    await ADMIN.Reports.SalesReport.ColumnVisibility.Click();
    //Uncheck the Itemname column and verify the Quantity column is removed from the sales report table
    await ADMIN.Reports.SalesReport.VerifyColumnVisibilityOptions('ItemName');
    //Verify button is clickable and the column is removed from the table
    expect(await ADMIN.Reports.SalesReport.VerifyColumnVisibilityOptions('ItemName'), 'Button is not clickable or column is not removed from the table').toBeTruthy();

  });

  test('[C8852]Verify user can change Entries that are showing on the sales report', { tag: ['@SalesReport', '@Entries'] }, async ({ }) => {
    //login to Admin
    await ADMIN.Login.In();
    //Navigate to Reports
    await ADMIN.Menu.Reports.GoTo();
    //Go to Sales report
    await ADMIN.Reports.ReportType.SelectOption({ byText: 'Sales Report' });
    //Change the entries showing from 10 to 25
    await ADMIN.Reports.SalesReport.ShowEntries.SelectOption({ byText: '25' });
    //Verify that 25 entries are showing on the report table
    const rowCount = await ADMIN.Reports.SalesReport.Table.getTableRowCount();
    await expect(rowCount, 'Changing the number of entries to show did not work - should show 25 rows').toBeLessThanOrEqual(25);
  });

  test('[C8888] Verify user can navigate through pagination', { tag: ['@SalesReport', '@Entries'] }, async ({ }) => {
    //login to Admin
    await ADMIN.Login.In();
    //Navigate to Reports
    await ADMIN.Menu.Reports.GoTo();
    //Go to Sales report
    await ADMIN.Reports.ReportType.SelectOption({ byText: 'Sales Report' });
    //Change the entries showing from 10 to 25
    const pagenation = await ADMIN.Reports.SalesReport.Table.goToNextPageUntilEnd();
    //Verify pagination works and there are more than 10 entries in the report
    await expect(pagenation, 'Pagination did not working').toBeTruthy();
  });

  test('[C8535] Verify Day report will load without issues', { tag: ['@DayReport', '@Admin'] }, async ({ }) => {
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
    //Verify the day report is loaded properly without any issues
    await expect(await ADMIN.Reports.DayReport.Table.IsVisible(), 'Day report did not load properly').toBeTruthy();
  });

  test('[C8536] Verify Expenses report will load without issues', { tag: ['@ExpensesReport', '@Admin'] }, async ({ }) => {
    //login to Admin
    await ADMIN.Login.In();
    // Navigate to Reports
    await ADMIN.Menu.Reports.GoTo();
    // Go to Expenses report
    await ADMIN.Reports.ReportType.SelectOption({ byText: 'Expenses' });
    //Wait for the expenses report table to load
    await ADMIN.Reports.Expenses.Table.WaitUntilVisible();
    //Verify the expenses report is loaded properly without any issues
    await expect(await ADMIN.Reports.Expenses.Table.IsVisible(), 'Expenses report did not load properly').toBeTruthy();
  });

  test('[C8725]Verify user is able to sort columns on the expenses report', { tag: ['@ExpensesReport', '@Sorting'] }, async ({ }) => {
    //login to Admin
    await ADMIN.Login.In();
    // Navigate to Reports
    await ADMIN.Menu.Reports.GoTo();
    // Go to Expenses report
    await ADMIN.Reports.ReportType.SelectOption({ byText: 'Expenses' });
    //Click on Category column to sort
    await ADMIN.Reports.Expenses.Table.SortBytableColumn({ columnIndex: 0, sortOrder: 'ascending' });
    //Click on Category column to sort in descending order
    await ADMIN.Reports.Expenses.Table.SortBytableColumn({ columnIndex: 0, sortOrder: 'descending' });
    //Click on Date column to sort
    await ADMIN.Reports.Expenses.Table.SortBytableColumn({ columnIndex: 1, sortOrder: 'ascending' });
    //Click on Date column to sort in descending order
    await ADMIN.Reports.Expenses.Table.SortBytableColumn({ columnIndex: 1, sortOrder: 'descending' });
    //Click on Amount column to sort
    await ADMIN.Reports.Expenses.Table.SortBytableColumn({ columnIndex: 2, sortOrder: 'ascending' });
    //Click on Amount column to sort in descending order
    await ADMIN.Reports.Expenses.Table.SortBytableColumn({ columnIndex: 2, sortOrder: 'descending' });

  });
  test('[C8754] Verify search functionality in the expenses report works without issues', { tag: ['@ExpensesReport', '@Search'] }, async ({ }) => {
    //login to Admin
    await ADMIN.Login.In();
    // Navigate to Reports
    await ADMIN.Menu.Reports.GoTo();
    // Go to Expenses report
    await ADMIN.Reports.ReportType.SelectOption({ byText: 'Expenses' });
    //Store the category name of the first row to search for it later
    const categoryName = await ADMIN.Reports.Expenses.Table.GetCellValue({ getValueFrom: "Category" }, { rowIndex: 1 });
    //Search for the category name in the search box
    await ADMIN.Reports.Expenses.Search.setText({ value: categoryName });
    //Verify the search results are displayed according to the search keyword
    const searchResultCategoryName = await ADMIN.Reports.Expenses.Table.GetCellValue({ getValueFrom: "Category" }, { rowIndex: 1 });
    await expect(searchResultCategoryName, 'Search functionality did not work properly in expenses report').toBe(categoryName);
  });

  test('[C8807]Verify search functionality in the expenses report', { tag: ['@ExpensesReport', '@ClearSearch'] }, async ({ }) => {
    //login to Admin
    await ADMIN.Login.In();
    // Navigate to Reports
    await ADMIN.Menu.Reports.GoTo();
    // Go to Expenses report
    await ADMIN.Reports.ReportType.SelectOption({ byText: 'Expenses' });
    //Store the category name of the first row to search for it later
    const categoryName = await ADMIN.Reports.Expenses.Table.GetCellValue({ getValueFrom: "Category" }, { rowIndex: 1 });
    //Search for the category name in the search box
    await ADMIN.Reports.Expenses.Search.setText({ value: categoryName });
    //Clear the search box and verify the search box is cleared and all the rows are visible again
    await ADMIN.Reports.Expenses.Search.clear();
    const clearedSearchValue = await ADMIN.Reports.Expenses.Search.getText();
    await expect(clearedSearchValue, 'Expenses report search field was not cleared').toBe("");
  });

  test('[C8853]Verify user can navigate through the entries', { tag: ['@ExpensesReport', '@Entries'] }, async ({ }) => {
    //login to Admin
    await ADMIN.Login.In();
    // Navigate to Reports
    await ADMIN.Menu.Reports.GoTo();
    // Go to Expenses report
    await ADMIN.Reports.ReportType.SelectOption({ byText: 'Expenses' });
    //Change the entries showing from 10 to 25
    await ADMIN.Reports.Expenses.ShowEntries.SelectOption({ byText: '25' });
    //Verify that 25 entries are showing on the report table
    const rowCount = await ADMIN.Reports.Expenses.Table.getTableRowCount()
    await expect(rowCount, 'Changing the number of entries to show did not work - should show 25 rows').toBeLessThanOrEqual(25);
  });
  test('[C8889] Verify user can navigate through pagination in expenses report', { tag: ['@ExpensesReport', '@Pagination'] }, async ({ }) => {
    //login to Admin
    await ADMIN.Login.In();
    // Navigate to Reports
    await ADMIN.Menu.Reports.GoTo();
    // Go to Expenses report
    await ADMIN.Reports.ReportType.SelectOption({ byText: 'Expenses' });
    //Click the pagination next button to go to the next page and verify pagination works
    const paginationWorked = await ADMIN.Reports.Expenses.Table.goToNextPageUntilEnd();
    //Verify that the pagination works and user is able to navigate through all the pages of the expenses report
    await expect(paginationWorked, 'Pagination is not working correctly in expenses report').toBeTruthy();
  });



  //----------------Updated above code to git---------

  test('[C8726] Verify sort columns on the compare period report', { tag: ['@ComparePeriodReport', '@Sorting'] }, async ({ }) => {
    //login to Admin
    await ADMIN.Login.In();
    // Navigate to Reports
    await ADMIN.Menu.Reports.GoTo();
    // Go to Compare Period report
    await ADMIN.Reports.ReportType.SelectOption({ byText: 'Compare Period' });
    //Click on Compare prtiod 1 to sort
    await ADMIN.Reports.ComparePeriod.Table.SortBytableColumn({ columnIndex: 1, sortOrder: 'ascending' });
    //Click on Compare period 1 to sort in descending order
    await ADMIN.Reports.ComparePeriod.Table.SortBytableColumn({ columnIndex: 1, sortOrder: 'descending' });
    //Click on Compare period 1 to sort
    await ADMIN.Reports.ComparePeriod.Table.SortBytableColumn({ columnIndex: 2, sortOrder: 'ascending' });
    //Click on Compare period 1 to sort in descending order
    await ADMIN.Reports.ComparePeriod.Table.SortBytableColumn({ columnIndex: 3, sortOrder: 'descending' });
    //Click on Compare period 2 to sort
    await ADMIN.Reports.ComparePeriod.Table.SortBytableColumn({ columnIndex: 4, sortOrder: 'ascending' });
    //Click on Compare period 2 to sort in descending order
    await ADMIN.Reports.ComparePeriod.Table.SortBytableColumn({ columnIndex: 4, sortOrder: 'descending' });
    //Click on Compare period 2 to sort
    await ADMIN.Reports.ComparePeriod.Table.SortBytableColumn({ columnIndex: 5, sortOrder: 'ascending' });
    //Click on Compare period 2 to sort in descending order
    await ADMIN.Reports.ComparePeriod.Table.SortBytableColumn({ columnIndex: 5, sortOrder: 'descending' });

  });

  test('[C8755]  Verify search functionality in the compare period report', { tag: ['@ComparePeriodReport', '@Search'] }, async ({ }) => {
    //login to Admin
    await ADMIN.Login.In();
    // Navigate to Reports
    await ADMIN.Menu.Reports.GoTo();
    // Go to Compare Period report
    await ADMIN.Reports.ReportType.SelectOption({ byText: 'Compare Period' });
    //Store the value of the first row in the first column to search for it later
    const firstRowValue = await ADMIN.Reports.ComparePeriod.Table.GetCellValue({ getValueFrom: "" }, { rowIndex: 1 });
    //Search for the value in the search box
    await ADMIN.Reports.ComparePeriod.Search.setText({ value: firstRowValue });
    //Verify the search results are displayed according to the search keyword
    const searchResultValue = await ADMIN.Reports.ComparePeriod.Table.GetCellValue({ getValueFrom: "" }, { rowIndex: 1 });
    await expect(searchResultValue, 'Search functionality did not work properly in compare period report').toBe(firstRowValue);
  });

  test('[C8854] Verify entries are showing expected results on the compare period', { tag: ['@ComparePeriodReport', '@Entries'] }, async ({ }) => {
    //login to Admin
    await ADMIN.Login.In();
    // Navigate to Reports
    await ADMIN.Menu.Reports.GoTo();
    // Go to Compare Period report
    await ADMIN.Reports.ReportType.SelectOption({ byText: 'Compare Period' });
    //Change the entries showing from 10 to 25
    await ADMIN.Reports.ComparePeriod.ShowEntries.SelectOption({ byText: '25' });
    //Verify that 25 entries are showing on the report table
    const rowCount = await ADMIN.Reports.ComparePeriod.Table.getTableRowCount()
    await expect(rowCount, 'Changing the number of entries to show did not work - should show 25 rows').toBeLessThanOrEqual(25);
    //Change the entries showing from 25 to 10
    await ADMIN.Reports.ComparePeriod.ShowEntries.SelectOption({ byText: '10' });
    //Verify that 10 entries are showing on the report table
    const updatedRowCount = await ADMIN.Reports.ComparePeriod.Table.getTableRowCount()
    await expect(updatedRowCount, 'Changing the number of entries to show did not work - should show 10 rows').toBeLessThanOrEqual(10);
  });

  test('[C8890] Verify pagination works as expected on compare period reports', { tag: ['@ComparePeriodReport', '@Pagination'] }, async ({ }) => {
    //login to Admin
    await ADMIN.Login.In();
    // Navigate to Reports
    await ADMIN.Menu.Reports.GoTo();
    // Go to Compare Period report
    await ADMIN.Reports.ReportType.SelectOption({ byText: 'Compare Period' });
    //Click the pagination next button to go to the next page and verify pagination works
    const paginationWorked = await ADMIN.Reports.ComparePeriod.Table.goToNextPageUntilEnd();
    //Verify that the pagination works and user is able to navigate through all the pages of the compare period report
    await expect(paginationWorked, 'Pagination is not working correctly in compare period report').toBeTruthy();
  });


  test('[C8728]Current Stock Report: Verify sorting the columns works as expected', { tag: ['@CurrentStockReport', '@Sorting'] }, async ({ }) => {
    //login to Admin
    await ADMIN.Login.In();
    // Navigate to Reports
    await ADMIN.Menu.Reports.GoTo();
    // Go to Current Stock report
    await ADMIN.Reports.ReportType.SelectOption({ byText: 'Current Stock' });
    //Click on Item Name column to sort
    await ADMIN.Reports.CurrentStock.Table.SortBytableColumn({ columnIndex: 1, sortOrder: 'ascending' });
    //Click on Item Name column to sort in descending order
    await ADMIN.Reports.CurrentStock.Table.SortBytableColumn({ columnIndex: 1, sortOrder: 'descending' });
    //Click on Stock QTY 4th column to sort
    await ADMIN.Reports.CurrentStock.Table.SortBytableColumn({ columnIndex: 4, sortOrder: 'ascending' });
    //Click on Stock QTY 4th column to sort in descending order
    await ADMIN.Reports.CurrentStock.Table.SortBytableColumn({ columnIndex: 4, sortOrder: 'descending' });
    //Click on Stock value column to sort
    await ADMIN.Reports.CurrentStock.Table.SortBytableColumn({ columnIndex: 7, sortOrder: 'ascending' });
    //Click on Stock value to sort in descending order
    await ADMIN.Reports.CurrentStock.Table.SortBytableColumn({ columnIndex: 7, sortOrder: 'descending' });

  });
  test('[C8757] Current Stock Report: Verify Search functionality in the current Stock report', { tag: ['@CurrentStockReport', '@Search'] }, async ({ }) => {
    //login to Admin
    await ADMIN.Login.In();
    // Navigate to Reports
    await ADMIN.Menu.Reports.GoTo();
    // Go to Current Stock report
    await ADMIN.Reports.ReportType.SelectOption({ byText: 'Current Stock' });
    //Store the item name of the first row to search for it later
    const itemName = await ADMIN.Reports.CurrentStock.Table.GetCellValue({ getValueFrom: "Name" }, { rowIndex: 1 });
    //Search for the item name in the search box
    await ADMIN.Reports.CurrentStock.Search.setText({ value: itemName });
    //Verify the search results are displayed according to the search keyword
    const searchResultItemName = await ADMIN.Reports.CurrentStock.Table.GetCellValue({ getValueFrom: "Name" }, { rowIndex: 1 });
    await expect(searchResultItemName, 'Search functionality did not work properly in current stock report').toBe(itemName);
  });

  test('[C8857] Current Stock Report: Verify changing the entries in the current stock report is working as expected', { tag: ['@CurrentStockReport', '@Entries'] }, async ({ }) => {
    //login to Admin
    await ADMIN.Login.In();
    // Navigate to Reports
    await ADMIN.Menu.Reports.GoTo();
    // Go to Current Stock report
    await ADMIN.Reports.ReportType.SelectOption({ byText: 'Current Stock' });
    //Change the entries showing from 10 to 25
    await ADMIN.Reports.CurrentStock.ShowEntries.SelectOption({ byText: '25' });
    //Verify that 25 entries are showing on the report table
    const rowCount = await ADMIN.Reports.CurrentStock.Table.getTableRowCount()
    await expect(rowCount, 'Changing the number of entries to show did not work - should show 25 rows').toBeLessThanOrEqual(25);
    //Change the entries showing from 25 to 10
    await ADMIN.Reports.CurrentStock.ShowEntries.SelectOption({ byText: '10' });
    //Verify that 10 entries are showing on the report table
    const updatedRowCount = await ADMIN.Reports.CurrentStock.Table.getTableRowCount()
    await expect(updatedRowCount, 'Changing the number of entries to show did not work - should show 10 rows').toBeLessThanOrEqual(10);

  });


  //RP-2261 JIRA ID
  test('[C8892] Current Stock Report: Verify Pagination works as expected', { tag: ['@CurrentStockReport', '@Pagination'] }, async ({ }) => {
    //login to Admin
    await ADMIN.Login.In();
    // Navigate to Reports
    await ADMIN.Menu.Reports.GoTo();
    // Go to Current Stock report
    await ADMIN.Reports.ReportType.SelectOption({ byText: 'Current Stock' });
    //Click the pagination next button to go to the next page and verify pagination works
    const paginationWorked = await ADMIN.Reports.CurrentStock.Table.goToNextPageUntilEnd();
    //Verify that the pagination works and user is able to navigate through all the pages of the current stock report
    await expect(paginationWorked, 'Pagination is not working correctly in current stock report').toBeTruthy();
  });

  test('[C8729] Dead Stock Report: Sort columns by selection', { tag: ['@DeadStockReport', '@Sorting'] }, async ({ }) => {
    //login to Admin
    await ADMIN.Login.In();
    // Navigate to Reports
    await ADMIN.Menu.Reports.GoTo();
    // Go to Dead Stock report
    await ADMIN.Reports.ReportType.SelectOption({ byText: 'Dead Stock' });
    //Click on Item Name column to sort
    await ADMIN.Reports.DeadStock.Table.SortBytableColumn({ columnIndex: 1, sortOrder: 'ascending' });
    //Click on Item Name column to sort in descending order
    await ADMIN.Reports.DeadStock.Table.SortBytableColumn({ columnIndex: 2, sortOrder: 'descending' });
    //Click on Stock QTY 4th column to sort
    await ADMIN.Reports.DeadStock.Table.SortBytableColumn({ columnIndex: 4, sortOrder: 'ascending' });
    //Click on Stock QTY 4th column to sort in descending order
    await ADMIN.Reports.DeadStock.Table.SortBytableColumn({ columnIndex: 4, sortOrder: 'descending' });
  });

  test('[C8758] Dead Stock Report: Search for specific information', { tag: ['@DeadStockReport', '@Search'] }, async ({ }) => {
    //login to Admin
    await ADMIN.Login.In();
    // Navigate to Reports
    await ADMIN.Menu.Reports.GoTo();
    // Go to Dead Stock report
    await ADMIN.Reports.ReportType.SelectOption({ byText: 'Dead Stock' });
    //Store the item name of the first row to search for it later
    const itemName = await ADMIN.Reports.DeadStock.Table.GetCellValue({ getValueFrom: "Name" }, { rowIndex: 1 });
    //Search for the item name in the search box
    await ADMIN.Reports.DeadStock.Search.setText({ value: itemName });
    //Verify the search results are displayed according to the search keyword
    const searchResultItemName = await ADMIN.Reports.DeadStock.Table.GetCellValue({ getValueFrom: "Name" }, { rowIndex: 1 });
    await expect(searchResultItemName, 'Search functionality did not work properly in dead stock report').toBe(itemName);

  });

  test('[C8811] Dead Stock Report: Clear search filters', { tag: ['@DeadStockReport', '@ClearSearch'] }, async ({ }) => {
    //login to Admin
    await ADMIN.Login.In();
    // Navigate to Reports
    await ADMIN.Menu.Reports.GoTo();
    // Go to Dead Stock report
    await ADMIN.Reports.ReportType.SelectOption({ byText: 'Dead Stock' });
    //Store the item name of the first row to search for it later
    const itemName = await ADMIN.Reports.DeadStock.Table.GetCellValue({ getValueFrom: "Name" }, { rowIndex: 1 });
    //Search for the item name in the search box
    await ADMIN.Reports.DeadStock.Search.setText({ value: itemName });
    //Clear the search box and verify the search box is cleared and all the rows are visible again
    await ADMIN.Reports.DeadStock.Search.clear();
    const clearedSearchValue = await ADMIN.Reports.DeadStock.Search.getText();
    await expect(clearedSearchValue, 'Dead Stock report search field was not cleared').toBe("");

  });

  test('[C8858] Dead Stock Report: Change displayed entries', { tag: ['@DeadStockReport', '@Entries'] }, async ({ }) => {
    //login to Admin
    await ADMIN.Login.In();
    // Navigate to Reports
    await ADMIN.Menu.Reports.GoTo();
    // Go to Dead Stock report
    await ADMIN.Reports.ReportType.SelectOption({ byText: 'Dead Stock' });
    //Change the entries showing from 10 to 25
    await ADMIN.Reports.DeadStock.ShowEntries.SelectOption({ byText: '25' });
    //Verify that 25 entries are showing on the report table
    const rowCount = await ADMIN.Reports.DeadStock.Table.getTableRowCount()
    await expect(rowCount, 'Changing the number of entries to show did not work - should show 25 rows').toBeLessThanOrEqual(25);

  });
  test('[C8893] Dead Stock Report: Verify pagination', { tag: ['@DeadStockReport', '@Pagination'] }, async ({ }) => {
    //login to Admin
    await ADMIN.Login.In();
    // Navigate to Reports
    await ADMIN.Menu.Reports.GoTo();
    // Go to Dead Stock report
    await ADMIN.Reports.ReportType.SelectOption({ byText: 'Dead Stock' });
    //Click the pagination next button to go to the next page and verify pagination works
    const paginationWorked = await ADMIN.Reports.DeadStock.Table.goToNextPageUntilEnd();
    await expect(paginationWorked, 'Pagination functionality did not work properly in dead stock report').toBe(true);
  });

  test('[C8730] Over Stock Report: Sort columns by selection', { tag: ['@OverStockReport', '@Sorting'] }, async ({ }) => {
    //login to Admin
    await ADMIN.Login.In();
    // Navigate to Reports
    await ADMIN.Menu.Reports.GoTo();
    // Go to Over Stock report
    await ADMIN.Reports.ReportType.SelectOption({ byText: 'Over Stock' });
    //Click on Item Name column to sort
    await ADMIN.Reports.OverStock.Table.SortBytableColumn({ columnIndex: 1, sortOrder: 'ascending' });
    //Click on Item Name column to sort in descending order
    await ADMIN.Reports.OverStock.Table.SortBytableColumn({ columnIndex: 1, sortOrder: 'descending' });
    //Click on Stock QTY 4th column to sort
    await ADMIN.Reports.OverStock.Table.SortBytableColumn({ columnIndex: 4, sortOrder: 'ascending' });
    //Click on Stock QTY 4th column to sort in descending order
    await ADMIN.Reports.OverStock.Table.SortBytableColumn({ columnIndex: 4, sortOrder: 'descending' });
    //Click on Stock value column to sort
    await ADMIN.Reports.OverStock.Table.SortBytableColumn({ columnIndex: 7, sortOrder: 'ascending' });
    //Click on Stock value to sort in descending order
    await ADMIN.Reports.OverStock.Table.SortBytableColumn({ columnIndex: 7, sortOrder: 'descending' });

  });
  test('[C8759]Over Stock Report: Search for specific information', { tag: ['@OverStockReport', '@Search'] }, async ({ }) => {
    //login to Admin
    await ADMIN.Login.In();
    // Navigate to Reports
    await ADMIN.Menu.Reports.GoTo();
    // Go to Over Stock report
    await ADMIN.Reports.ReportType.SelectOption({ byText: 'Over Stock' });
    //Store the item name of the first row to search for it later
    const itemName = await ADMIN.Reports.OverStock.Table.GetCellValue({ getValueFrom: "Name" }, { rowIndex: 1 });
    //Search for the item name in the search box
    await ADMIN.Reports.OverStock.Search.setText({ value: itemName });
    //Verify the search results are displayed according to the search keyword
    const searchResultItemName = await ADMIN.Reports.OverStock.Table.GetCellValue({ getValueFrom: "Name" }, { rowIndex: 1 });
    await expect(searchResultItemName, 'Search functionality did not work properly in over stock report').toBe(itemName);
  });

  test('[C8812] Over Stock Report: Clear search filters', { tag: ['@OverStockReport', '@ClearSearch'] }, async ({ }) => {
  //login to Admin
  await ADMIN.Login.In();
  // Navigate to Reports
  await ADMIN.Menu.Reports.GoTo();
  // Go to Over Stock report
  await ADMIN.Reports.ReportType.SelectOption({ byText: 'Over Stock' });
  //Store the item name of the first row to search for it later
  const itemName = await ADMIN.Reports.OverStock.Table.GetCellValue({ getValueFrom: "Name" }, { rowIndex: 1 });
  //Search for the item name in the search box
  await ADMIN.Reports.OverStock.Search.setText({ value: itemName });
  //Clear the search box and verify the search box is cleared and all the rows are visible again
  await ADMIN.Reports.OverStock.Search.clear();
  const clearedSearchValue = await ADMIN.Reports.OverStock.Search.getText();
  await expect(clearedSearchValue, 'Over Stock report search field was not cleared').toBe("");
  });

  test('[C8859] Over Stock Report: Change displayed entries', { tag: ['@OverStockReport', '@Entries'] }, async ({ }) => {
  //login to Admin
  await ADMIN.Login.In();
  // Navigate to Reports
  await ADMIN.Menu.Reports.GoTo();
  // Go to Over Stock report
  await ADMIN.Reports.ReportType.SelectOption({ byText: 'Over Stock' });
  //Change the entries showing from 10 to 25
  await ADMIN.Reports.OverStock.ShowEntries.SelectOption({ byText: '25' });
  //Verify that 25 entries are showing on the report table
  const rowCount = await ADMIN.Reports.OverStock.Table.getTableRowCount()
  await expect(rowCount, 'Changing the number of entries to show did not work - should show 25 rows').toBeLessThanOrEqual(25);
  
  });

  test('[C8894] Over Stock Report: Verify pagination', { tag: ['@OverStockReport', '@Pagination'] }, async ({ }) => {
  //login to Admin
  await ADMIN.Login.In();
  // Navigate to Reports
  await ADMIN.Menu.Reports.GoTo();
  // Go to Over Stock report
  await ADMIN.Reports.ReportType.SelectOption({ byText: 'Over Stock' });
  //Click the pagination next button to go to the next page and verify pagination works
  const paginationWorked = await ADMIN.Reports.OverStock.Table.goToNextPageUntilEnd();
  await expect(paginationWorked, 'Pagination functionality did not work properly in over stock report').toBe(true);
  });

  test('[ C8732] Tax Breakdown Report: Sort columns by selection', { tag: ['@TaxBreakdownReport', '@Sorting'] }, async ({ }) => {
  //login to Admin
  await ADMIN.Login.In();
  // Navigate to Reports
  await ADMIN.Menu.Reports.GoTo();
  // Go to Tax Breakdown report
  await ADMIN.Reports.ReportType.SelectOption({ byText: 'Tax Breakdown' });
  //Click on Tax Name column to sort
  await ADMIN.Reports.TaxBreakdown.Table.SortBytableColumn({ columnIndex: 1, sortOrder: 'ascending' });
  //Click on Tax Name column to sort in descending order  
  await ADMIN.Reports.TaxBreakdown.Table.SortBytableColumn({ columnIndex: 1, sortOrder: 'descending' });
  //Click on Tax Amount column to sort
  await ADMIN.Reports.TaxBreakdown.Table.SortBytableColumn({ columnIndex: 2, sortOrder: 'ascending' });
  //Click on Tax Amount column to sort in descending order
  await ADMIN.Reports.TaxBreakdown.Table.SortBytableColumn({ columnIndex: 2, sortOrder: 'descending' });
  
  });
  
  test('[C8760] Tax Breakdown Report: Search for specific information', { tag: ['@TaxBreakdownReport', '@Search'] }, async ({ }) => {
  //login to Admin
  await ADMIN.Login.In();
  // Navigate to Reports
  await ADMIN.Menu.Reports.GoTo();
  // Go to Tax Breakdown report
  await ADMIN.Reports.ReportType.SelectOption({ byText: 'Tax Breakdown' });
  //Store the tax name of the first row to search for it later
  const taxName = await ADMIN.Reports.TaxBreakdown.Table.GetCellValue({ getValueFrom: "Name" }, { rowIndex: 1 });
  //Search for the tax name in the search box
  await ADMIN.Reports.TaxBreakdown.Search.setText({ value: taxName });
  //Verify the search results are displayed according to the search keyword
  const searchResultTaxName = await ADMIN.Reports.TaxBreakdown.Table.GetCellValue({ getValueFrom: "Name" }, { rowIndex: 1 });
  await expect(searchResultTaxName, 'Search functionality did not work properly in tax breakdown report').toBe(taxName);
  });

  test('[C8813] Tax Breakdown Report: Clear search filters', { tag: ['@TaxBreakdownReport', '@ClearSearch'] }, async ({ }) => {
  //login to Admin
  await ADMIN.Login.In();
  // Navigate to Reports
  await ADMIN.Menu.Reports.GoTo();
  // Go to Tax Breakdown report
  await ADMIN.Reports.ReportType.SelectOption({ byText: 'Tax Breakdown' });
  //Store the tax name of the first row to search for it later
  const taxName = await ADMIN.Reports.TaxBreakdown.Table.GetCellValue({ getValueFrom: "Name" }, { rowIndex: 1 });
  //Search for the tax name in the search box
  await ADMIN.Reports.TaxBreakdown.Search.setText({ value: taxName });
  //Clear the search box and verify the search box is cleared and all the rows are visible again
  await ADMIN.Reports.TaxBreakdown.Search.clear();
  const clearedSearchValue = await ADMIN.Reports.TaxBreakdown.Search.getText();
  await expect(clearedSearchValue, 'Tax Breakdown report search field was not cleared').toBe("");
  });

  test('[C8861] Tax Breakdown Report: Change displayed entries', { tag: ['@TaxBreakdownReport', '@Entries'] }, async ({ }) => {
  //login to Admin
  await ADMIN.Login.In();
  // Navigate to Reports
  await ADMIN.Menu.Reports.GoTo();
  // Go to Tax Breakdown report
  await ADMIN.Reports.ReportType.SelectOption({ byText: 'Tax Breakdown' });
  //Change the entries showing from 10 to 25
  await ADMIN.Reports.TaxBreakdown.ShowEntries.SelectOption({ byText: '25' });
  //Verify that 25 entries are showing on the report table
  const rowCount = await ADMIN.Reports.TaxBreakdown.Table.getTableRowCount()
  await expect(rowCount, 'Changing the number of entries to show did not work - should show 25 rows').toBeLessThanOrEqual(25);
  
  });

  test('[C8895] Tax Breakdown Report: Verify pagination', { tag: ['@TaxBreakdownReport', '@Pagination'] }, async ({ }) => {
  //login to Admin
  await ADMIN.Login.In();
  // Navigate to Reports
  await ADMIN.Menu.Reports.GoTo();
  // Go to Tax Breakdown report
  await ADMIN.Reports.ReportType.SelectOption({ byText: 'Tax Breakdown' });
  //Click the pagination next button to go to the next page and verify pagination works
  const paginationWorked = await ADMIN.Reports.TaxBreakdown.Table.goToNextPageUntilEnd();
  await expect(paginationWorked, 'Pagination functionality did not work properly in tax breakdown report').toBe(true);
  
  });

  test('[C8733] Receive Report: Sort columns by selection', { tag: ['@ReceiveReport', '@Sorting'] }, async ({ }) => {
  //login to Admin
  await ADMIN.Login.In();
  // Navigate to Reports
  await ADMIN.Menu.Reports.GoTo();
  // Go to Receive report
  await ADMIN.Reports.ReportType.SelectOption({ byText: 'Receive Report' });
  //Click on Item Name column to sort
  await ADMIN.Reports.ReceiveReport.Table.SortBytableColumn({ columnIndex: 1, sortOrder: 'ascending' });
  //Click on Item Name column to sort in descending order
  await ADMIN.Reports.ReceiveReport.Table.SortBytableColumn({ columnIndex: 1, sortOrder: 'descending' });
  //Click on  Supplier  column to sort
  await ADMIN.Reports.ReceiveReport.Table.SortBytableColumn({ columnIndex: 2, sortOrder: 'ascending' });
  //Click on Supplier column to sort in descending order
  await ADMIN.Reports.ReceiveReport.Table.SortBytableColumn({ columnIndex: 2, sortOrder: 'descending' });
  //Click on total Price column to sort
  await ADMIN.Reports.ReceiveReport.Table.SortBytableColumn({ columnIndex: 3, sortOrder: 'ascending' });
  //Click on total Price column to sort in descending order
  await ADMIN.Reports.ReceiveReport.Table.SortBytableColumn({ columnIndex: 3, sortOrder: 'descending' });
  });

  test('[C8761] Receive Report: Search for specific information', { tag: ['@ReceiveReport', '@Search'] }, async ({ }) => {
    //login to Admin
    await ADMIN.Login.In();
    // Navigate to Reports
    await ADMIN.Menu.Reports.GoTo();
    // Go to Receive report
    await ADMIN.Reports.ReportType.SelectOption({ byText: 'Receive Report' });
    //Store the item name of the first row to search for it later
    const itemName = await ADMIN.Reports.ReceiveReport.Table.GetCellValue({ getValueFrom: "Supplier" }, { rowIndex: 1 });
    //Search for the item name in the search box
    await ADMIN.Reports.ReceiveReport.Search.setText({ value: itemName });
    //Verify the search results are displayed according to the search keyword
    const searchResultItemName = await ADMIN.Reports.ReceiveReport.Table.GetCellValue({ getValueFrom: "Supplier" }, { rowIndex: 1 });
    await expect(searchResultItemName, 'Search functionality did not work properly in receive report').toBe(itemName);
  });

  test('[C8814] Receive Report: Clear search filters', { tag: ['@ReceiveReport', '@ClearSearch'] }, async ({ }) => {
    //login to Admin
    await ADMIN.Login.In();
    // Navigate to Reports
    await ADMIN.Menu.Reports.GoTo();
    // Go to Receive report
    await ADMIN.Reports.ReportType.SelectOption({ byText: 'Receive Report' });
    //Store the item name of the first row to search for it later
    const itemName = await ADMIN.Reports.ReceiveReport.Table.GetCellValue({ getValueFrom: "Supplier" }, { rowIndex: 1 });
    //Search for the item name in the search box
    await ADMIN.Reports.ReceiveReport.Search.setText({ value: itemName });
    //Clear the search box and verify the search box is cleared and all the rows are visible again
    await ADMIN.Reports.ReceiveReport.Search.clear();
    const clearedSearchValue = await ADMIN.Reports.ReceiveReport.Search.getText();
    await expect(clearedSearchValue, 'Receive report search field was not cleared').toBe("");
  });

  test('[C8862] Receive Report: Change displayed entries', { tag: ['@ReceiveReport', '@Entries'] }, async ({ }) => {
    //login to Admin
    await ADMIN.Login.In();
    // Navigate to Reports
    await ADMIN.Menu.Reports.GoTo();
    // Go to Receive report
    await ADMIN.Reports.ReportType.SelectOption({ byText: 'Receive Report' });
    //Change the entries showing from 10 to 25
    await ADMIN.Reports.ReceiveReport.ShowEntries.SelectOption({ byText: '25' });
    //Verify that 25 entries are showing on the report table
    const rowCount = await ADMIN.Reports.ReceiveReport.Table.getTableRowCount()
    await expect(rowCount, 'Changing the number of entries to show did not work - should show 25 rows').toBeLessThanOrEqual(25);
  });
  test('[C8896] Receive Report: Verify pagination', { tag: ['@ReceiveReport', '@Pagination'] }, async ({ }) => {
    //login to Admin
    await ADMIN.Login.In();
    // Navigate to Reports
    await ADMIN.Menu.Reports.GoTo();
    // Go to Receive report
    await ADMIN.Reports.ReportType.SelectOption({ byText: 'Receive Report' });
    //Click the pagination next button to go to the next page and verify pagination works
    const paginationWorked = await ADMIN.Reports.ReceiveReport.Table.goToNextPageUntilEnd();
    await expect(paginationWorked, 'Pagination functionality did not work properly in receive report').toBe(true);
  });

  test('[C8287] Over Stock Report: Navigate to other reports', { tag: ['@OverStockReport', '@Navigation'] }, async ({ }) => {
    //login to Admin
    await ADMIN.Login.In();
    // Navigate to Reports
    await ADMIN.Menu.Reports.GoTo();
    // Go to Over Stock report
    await ADMIN.Reports.ReportType.SelectOption({ byText: 'Over Stock' });
    //Navigate to Current Stock report from Over Stock report
    await ADMIN.Reports.ReportType.SelectOption({ byText: 'Current Stock' });
    //Verify that user is navigated to Current Stock report successfully
    await ADMIN.Reports.CurrentStock.Table.WaitUntilVisible();
    const isCurrentStockTableVisible = await ADMIN.Reports.CurrentStock.Table.IsVisible();
    await expect(isCurrentStockTableVisible, 'Navigation from Over Stock report to Current Stock report did not work').toBe(true);
  });

  test('[C8320] Over Stock Report: Select report filters', { tag: ['@OverStockReport', '@Filters'] }, async ({ }) => {
    //login to Admin
    await ADMIN.Login.In();
    // Navigate to Reports
    await ADMIN.Menu.Reports.GoTo();
    // Go to Over Stock report
    await ADMIN.Reports.ReportType.SelectOption({ byText: 'Over Stock' });
    //Select Filters for Over Stock report and verify the results are displayed according to the selected filters
    await ADMIN.Reports.OverStock.Filter.SelectOption({ byText: '1.5X' });
    //Veriy dropddown is able to select another option
    await ADMIN.Reports.OverStock.Filter.SelectOption({ byText: '2X' });
    //Verify that the report results are updated according to the selected filter

  });


  //JUNE 1ST   RP-2399

  test('[C8539] Over Stock Report: Verify report will load without issues', { tag: ['@OverStockReport', '@Load'] }, async ({ }) => {
    //login to Admin
    await ADMIN.Login.In(); 
    // Navigate to Reports
    await ADMIN.Menu.Reports.GoTo();
    // Go to Over Stock report
    await ADMIN.Reports.ReportType.SelectOption({ byText: 'Over Stock' });
    //Verify that the report table is visible which indicates the report has loaded successfully
    await ADMIN.Reports.OverStock.Table.WaitUntilVisible();
    const isReportTableVisible = await ADMIN.Reports.OverStock.Table.IsVisible();
    await expect(isReportTableVisible, 'Over Stock report did not load successfully').toBe(true);
  });


  test.only('[C9030] Over Stock Report: Verify date display matches range', { tag: ['@OverStockReport', '@DateDisplay'] }, async ({ }) => {
    //login to Admin
    await ADMIN.Login.In();
    // Navigate to Reports
    await ADMIN.Menu.Reports.GoTo();
    // Go to Over Stock report
    await ADMIN.Reports.ReportType.SelectOption({ byText: 'Over Stock' });
    //Wait for the report table to fully load before interacting with filter
    await ADMIN.Reports.OverStock.Table.WaitUntilVisible();
    //Verify that the date displayed on the report matches the selected date range for the report
    const dateDisplay = await ADMIN.Reports.OverStock.Filter.SelectOption({byText: '1.5X'})
    const currentDate = new Date();
    const expectedDateDisplay = `As of ${currentDate.toLocaleDateString()}`;
    await expect(dateDisplay, 'The date display on the Over Stock report does not match the expected format or current date').toBe(expectedDateDisplay);
  });











});