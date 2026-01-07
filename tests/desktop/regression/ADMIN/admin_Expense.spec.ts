import { expect, test } from "@playwright/test";
import { Initializer } from "../../../../src/utils/initializer";
import { ADMIN } from "../../../../src/section/ADMIN";

test.beforeEach(async ({ page }) => {
    await Initializer.Init(page, { Admin: true });

});

test.afterEach(async ({ page }, testInfo) => {
    await Initializer.Finalize(page, testInfo);
});
test.describe("ADMIN - Account Expense Test Cases", { tag: ['@admin', '@expense', '@Regression'] }, () => {

    test('[C8332]Verify Adding Expenses Types on the back office', { tag: ['@admin'] }, async ({ }) => {
        //Step 1: Login to the Back Office
        await ADMIN.Login.In();
        //Step 2: Navigate to Expense Types Page
        await ADMIN.Menu.Expense.GoTo();
        //Step 3: Click on Manage Expense Types
        await ADMIN.Expense.ManageExpensesTypes.Click();
        //Step 4 : Verify  Manage Expense Types Page is displayed
        await expect(ADMIN.Expense.ManageExpensesTypes.IsVisible()).toBeTruthy();
        //Step 5 : Click on New Expense Type Button
        await ADMIN.Dialog.ManageExpenseTypes.Add.Click();
        //Step 6 : Add new Expense Type details and Save
        const initexpense = await ADMIN.FakeData.getName();
        await ADMIN.Dialog.AddExpenseTypes.Name.setText({ value: initexpense });
        await ADMIN.Dialog.AddExpenseTypes.Save.Click();
        //Step 7:Saerch the added Expense Type
        await ADMIN.Dialog.ManageExpenseTypes.Search.setText({ value: initexpense });
        //Step 7 : Verify new Expense Type is added in the list
        expect(await ADMIN.Dialog.ManageExpenseTypes.ManageExpenseTypesTable.IsNotEmpty()).toBeTruthy();

    });

    test('[C8333] Verify edit Expenses Types on the back office ', { tag: ['@admin'] }, async ({ }) => {
        //Step 1: Login to the Back Office
        await ADMIN.Login.In();
        //Step 2: Navigate to Expense Types Page
        await ADMIN.Menu.Expense.GoTo();
        //Step 3: Click on Manage Expense Types
        await ADMIN.Expense.ManageExpensesTypes.Click();
        //Step 4 : Verify  Manage Expense Types Page is displayed
        await expect(ADMIN.Expense.ManageExpensesTypes.IsVisible()).toBeTruthy();
        //Step 5 : Click on New Expense Type Button
        await ADMIN.Dialog.ManageExpenseTypes.Add.Click();
        //Step 6 : Add new Expense Type details and Save
        const initExpene = await ADMIN.FakeData.getName();
        await ADMIN.Dialog.AddExpenseTypes.Name.setText({ value: initExpene });
        await ADMIN.Dialog.AddExpenseTypes.Save.Click();
        //Step :7 Search the added expense Type
        await ADMIN.Dialog.ManageExpenseTypes.Search.setText({ value: initExpene });
        //Step 8: Edit the Resulted Expense Type
        await ADMIN.Dialog.ManageExpenseTypes.ManageExpenseTypesTable.Edit();
        const Updatename = await ADMIN.FakeData.getName();
        //Step 9 : Update the Name
        await ADMIN.Dialog.EditExpenseType.Name.setText({ value: Updatename })
        await ADMIN.Dialog.EditExpenseType.Update.Click();
        //Clear Search textbox
        await ADMIN.Dialog.ManageExpenseTypes.Search.clear();
        //Re-Search with Updated name
        await ADMIN.Dialog.ManageExpenseTypes.Search.setText({ value: Updatename });
        //Step 9: Verify the Updated Name is displayed in the Search Result
        expect(await ADMIN.Dialog.ManageExpenseTypes.ManageExpenseTypesTable.IsNotEmpty()).toBeTruthy();
        //Step 10: Save the Latest Modifed Type

    });

    test('[C8334] Verify Delete Expenses Types on the back office ', { tag: ['@admin'] }, async ({ page }) => {
        //Step 1: Login to the Back Office
        await ADMIN.Login.In();
        //Step 2: Navigate to Expense Types Page
        await ADMIN.Menu.Expense.GoTo();
        //Step 3: Click on Manage Expense Types
        await ADMIN.Expense.ManageExpensesTypes.Click();
        //Step 4 : Verify  Manage Expense Types Page is displayed
        await expect(ADMIN.Expense.ManageExpensesTypes.IsVisible()).toBeTruthy();
        //Step 5 : Click on New Expense Type Button
        await ADMIN.Dialog.ManageExpenseTypes.Add.Click();
        //Step 6 : Add new Expense Type details and Save
        const initExpene = await ADMIN.FakeData.getName();
        await ADMIN.Dialog.AddExpenseTypes.Name.setText({ value: initExpene });
        await ADMIN.Dialog.AddExpenseTypes.Save.Click();
        //Step 7: Search the added expense Type
        await ADMIN.Dialog.ManageExpenseTypes.Search.setText({ value: initExpene });
        //Step 8: Delete the Expense Type (POM handles confirmation)
        await ADMIN.Dialog.ManageExpenseTypes.ManageExpenseTypesTable.Delete();
        //Step 10: Clear search and search again for the deleted record
        await ADMIN.Dialog.ManageExpenseTypes.Search.clear();
        await ADMIN.Dialog.ManageExpenseTypes.Search.setText({ value: initExpene });
        //Verify Searched results - record should be deleted
        expect(await ADMIN.Dialog.ManageExpenseTypes.ManageExpenseTypesTable.IsRecordDeleted()).toBeTruthy();
    });
    test('[C8335] Expense: Verify sort Expense types on the back office ', { tag: ['@admin'] }, async ({ }) => {
        //Step 1 : Login to Back office
        await ADMIN.Login.In();
        //Step 2: Navigate to Expense Type
        await ADMIN.Menu.Expense.GoTo();
        //Step 3: Click on Manage Expense Types
        await ADMIN.Expense.ManageExpensesTypes.Click();
        //Step 4: Click the Cloumn Header to Sort the Expense Types by Name in Ascending Order
        await ADMIN.Dialog.ManageExpenseTypes.ManageExpenseTypesTable.SortBytableColumn({ columnIndex: 2, sortOrder: 'ascending' });
        //Step 5: Click the Cloumn Header to Sort the Expense Types by Name in descending Order
        await ADMIN.Dialog.ManageExpenseTypes.ManageExpenseTypesTable.SortBytableColumn({ columnIndex: 2, sortOrder: 'descending' });
        //Step 4: Click the Cloumn Header to Sort the Expense Types by ID in Ascending Order
        await ADMIN.Dialog.ManageExpenseTypes.ManageExpenseTypesTable.SortBytableColumn({ columnIndex: 1, sortOrder: 'ascending' });
        //Step 4: Click the Cloumn Header to Sort the Expense Types by ID in descending Order
        await ADMIN.Dialog.ManageExpenseTypes.ManageExpenseTypesTable.SortBytableColumn({ columnIndex: 1, sortOrder: 'descending' });

    });
    test('[C8337] Verify Adding a Vendor on the back office ', { tag: ['@admin'] }, async ({ }) => {
        //Step 1: Login to Back Office
        await ADMIN.Login.In()
        //Step 2: Navigate to Expense Page
        await ADMIN.Menu.Expense.GoTo();
        //Step 3: Click on Vendors button
        await ADMIN.Expense.ManageVendor.Click();
        //Step 4: Click on Add Button
        await ADMIN.Dialog.ManageVendor.Add.Click();
        //Step 5: Add Vendor Deatils and Click on Save Button
        const Vendorname = await ADMIN.FakeData.getName();
        await ADMIN.Dialog.ExpenseAddVendor.Name.setText({ value: Vendorname });
        await ADMIN.Dialog.ExpenseAddVendor.Save.Click();
        //Step 6: Search the Added vendor
        await ADMIN.Dialog.ManageVendor.Search.setText({ value: Vendorname });
        //Step 7: verify added vendor exist in the Table
        expect(await ADMIN.Dialog.ManageVendor.Table_ExpenseVendor.IsNotEmpty()).toBeTruthy();
    });
    test('[C8338]  Verify editing a Vendor on the back office ', { tag: ['@admin'] }, async ({ }) => {
        //Step 1: Login to the Back Office
        await ADMIN.Login.In();
        //Step 2: Navigate to Expense Types Page
        await ADMIN.Menu.Expense.GoTo();
        //Step 3: Click on Manage Expense Types
        await ADMIN.Expense.ManageVendor.Click();
        //Step 4 : Verify  Manage Expense Types Page is displayed
        await expect(ADMIN.Expense.ManageVendor.IsVisible()).toBeTruthy();
        //Step 5 : Click on New Expense Type Button
        await ADMIN.Dialog.ManageVendor.Add.Click();
        //Step 6 : Add new Expense Type details and Save
        const initExpene = await ADMIN.FakeData.getName();
        await ADMIN.Dialog.ExpenseAddVendor.Name.setText({ value: initExpene });
        await ADMIN.Dialog.ExpenseAddVendor.Save.Click();
        //Step :7 Search the added expense Type
        await ADMIN.Dialog.ManageVendor.Search.setText({ value: initExpene });
        //Step 8: Edit the Resulted Expense Type
        await ADMIN.Dialog.ManageVendor.Table_ExpenseVendor.Edit();
        const Updatename = await ADMIN.FakeData.getName();
        //Step 9 : Update the Name
        await ADMIN.Dialog.EditExpenseVendor.Name.setText({ value: Updatename })
        await ADMIN.Dialog.EditExpenseVendor.Update.Click();
        //Clear Search textbox
        await ADMIN.Dialog.ManageVendor.Search.clear();
        //Re-Search with Updated name
        await ADMIN.Dialog.ManageVendor.Search.setText({ value: Updatename });
        //Verify Searched results
        expect(await ADMIN.Dialog.ManageExpenseTypes.ManageExpenseTypesTable.IsNotEmpty()).toBeTruthy();
    });
    test('[C8339] Verify Deleting a vendor on the back office ', { tag: ['@admin'] }, async ({ }) => {
        //Step 1: Login to the Back Office
        await ADMIN.Login.In();
        //Step 2: Navigate to Expense Types Page
        await ADMIN.Menu.Expense.GoTo();
        //Step 3: Click on Manage Expense Types
        await ADMIN.Expense.ManageVendor.Click();
        //Step 4 : Verify  Manage Expense Types Page is displayed
        await expect(ADMIN.Expense.ManageVendor.IsVisible()).toBeTruthy();
        //Step 5 : Click on New Expense Type Button
        await ADMIN.Dialog.ManageVendor.Add.Click();
        //Step 6 : Add new Expense Type details and Save
        const initExpene = await ADMIN.FakeData.getName();
        await ADMIN.Dialog.ExpenseAddVendor.Name.setText({ value: initExpene });
        await ADMIN.Dialog.ExpenseAddVendor.Save.Click();
        //Step :7 Search the added expense Type
        await ADMIN.Dialog.ManageVendor.Search.setText({ value: initExpene });
        //Step 8: Delete the Expense Type
        await ADMIN.Dialog.ManageVendor.Table_ExpenseVendor.Delete();
        await ADMIN.Dialog.ManageVendor.Search.clear();
        //sTEP 10: Search Deleted Record
        await ADMIN.Dialog.ManageVendor.Search.setText({ value: initExpene });
        //Verify Searched results
        expect(await ADMIN.Dialog.ManageVendor.Table_ExpenseVendor.IsRecordDeleted()).toBeTruthy();
    });

    test('[C8340] Verify sorting Vendors on the back office ', { tag: ['@admin'] }, async ({ }) => {
        //Step 1 : Login to Back office
        await ADMIN.Login.In();
        //Step 2: Navigate to Expense Type
        await ADMIN.Menu.Expense.GoTo();
        //Step 3: Click on Manage Expense Types
        await ADMIN.Expense.ManageVendor.Click();
        //Step 4: Click the Cloumn Header to Sort the Expense Types by Name in Ascending Order
        await ADMIN.Dialog.ManageVendor.Table_ExpenseVendor.SortBytableColumn({ columnIndex: 2, sortOrder: 'ascending' });
        //Step 5: Click the Cloumn Header to Sort the Expense Types by Name in descending Order
        await ADMIN.Dialog.ManageVendor.Table_ExpenseVendor.SortBytableColumn({ columnIndex: 2, sortOrder: 'descending' });
        //Step 4: Click the Cloumn Header to Sort the Expense Types by ID in Ascending Order
        await ADMIN.Dialog.ManageVendor.Table_ExpenseVendor.SortBytableColumn({ columnIndex: 1, sortOrder: 'ascending' });
        //Step 4: Click the Cloumn Header to Sort the Expense Types by ID in descending Order
        await ADMIN.Dialog.ManageVendor.Table_ExpenseVendor.SortBytableColumn({ columnIndex: 1, sortOrder: 'descending' });

    });
    test('[C8341] Verify view more Vendors on the back office', { tag: ['@admin'] }, async ({ }) => {

        //Step 1 : Login to Back office
        await ADMIN.Login.In();
        //Step 2: Navigate to Expense Type
        await ADMIN.Menu.Expense.GoTo();
        //Step 3: Click on Manage Expense Types
        await ADMIN.Expense.ManageVendor.Click();
        //Step 3: verify default show entries as 10
        expect(await ADMIN.Dialog.ManageVendor.ShowEntries.GetSelectedOption()).toBe('10');
        //Step 4: Click on View More button
        await ADMIN.Dialog.ManageVendor.ShowEntries.SelectOption({ byIndex: 4 });
        //Step 5:  verify show entires page increased to 100
        expect(await ADMIN.Dialog.ManageVendor.ShowEntries.GetSelectedOption()).toBe('100');

    });
    test('[C8342] Verify Adding a new Category on the back office', { tag: ['@admin'] }, async ({ }) => {
        //Step 1: Login to Back Office
        await ADMIN.Login.In()
        //Step 2: Navigate to Expense Page
        await ADMIN.Menu.Expense.GoTo();
        //Step 3: Click on Vendors button
        await ADMIN.Expense.ManageCategory.Click();
        //Step 4: Click on Add Button
        await ADMIN.Dialog.ManageCategory.Add.Click();
        //Step 5: Add Vendor Deatils and Click on Save Button
        const categoryname = await ADMIN.FakeData.getName();
        await ADMIN.Dialog.AddExpensecategory.Name.setText({ value: categoryname });
        await ADMIN.Dialog.AddExpensecategory.Save.Click();
        //Step 6: Search the Added vendor
        await ADMIN.Dialog.ManageCategory.Search.setText({ value: categoryname });
        //Step 7: verify added vendor exist in the Table
        expect(await ADMIN.Dialog.ManageCategory.ExpenseManageCategoryTable.IsNotEmpty()).toBeTruthy();
    });

    test('[C8343]   Verify Editing a Category on the back office  ', { tag: ['@admin'] }, async ({ }) => {
        //Step 1: Login to the Back Office
        await ADMIN.Login.In();
        //Step 2: Navigate to Expense Types Page
        await ADMIN.Menu.Expense.GoTo();
        //Step 3: Click on Manage Expense Types
        await ADMIN.Expense.ManageCategory.Click();
        //Step 4 : Verify  Manage Expense Types Page is displayed
        await expect(ADMIN.Expense.ManageCategory.IsVisible()).toBeTruthy();
        //Step 5 : Click on New Expense Type Button
        await ADMIN.Dialog.ManageCategory.Add.Click();
        //Step 6 : Add new Expense Type details and Save
        const initcategory = await ADMIN.FakeData.getName();
        await ADMIN.Dialog.AddExpensecategory.Name.setText({ value: initcategory });
        await ADMIN.Dialog.AddExpensecategory.Save.Click();
        //Step :7 Search the added expense Type
        await ADMIN.Dialog.ManageCategory.Search.setText({ value: initcategory });
        //Step 8: Edit the Resulted Expense Type
        await ADMIN.Dialog.ManageCategory.ExpenseManageCategoryTable.Edit();
        const Updatename = await ADMIN.FakeData.getName();
        //Step 9 : Update the Name
        await ADMIN.Dialog.EditExpensecategory.Name.setText({ value: Updatename })
        await ADMIN.Dialog.EditExpensecategory.Update.Click();
        //Clear Search textbox
        await ADMIN.Dialog.ManageCategory.Search.clear();
        //Re-Search with Updated name
        await ADMIN.Dialog.ManageCategory.Search.setText({ value: Updatename });
        //Verify Searched results
        expect(await ADMIN.Dialog.ManageCategory.ExpenseManageCategoryTable.IsNotEmpty()).toBeTruthy();
    });
    test('[C8344] Verify deleteing a Category on the back office  ', { tag: ['@admin'] }, async ({ }) => {
        //Step 1: Login to the Back Office
        await ADMIN.Login.In();
        //Step 2: Navigate to Expense Types Page
        await ADMIN.Menu.Expense.GoTo();
        //Step 3: Click on Manage Expense Types
        await ADMIN.Expense.ManageCategory.Click();
        //Step 4 : Verify  Manage Expense Types Page is displayed
        await expect(ADMIN.Expense.ManageCategory.IsVisible()).toBeTruthy();
        //Step 5 : Click on New Expense Type Button
        await ADMIN.Dialog.ManageCategory.Add.Click();
        //Step 6 : Add new Expense Type details and Save
        const initcategory = await ADMIN.FakeData.getName();
        await ADMIN.Dialog.AddExpensecategory.Name.setText({ value: initcategory });
        await ADMIN.Dialog.AddExpensecategory.Save.Click();
        //Step :7 Search the added expense Type
        await ADMIN.Dialog.ManageCategory.Search.setText({ value: initcategory });
        // //Step 8: Delete the Expense Type
        await ADMIN.Dialog.ManageCategory.ExpenseManageCategoryTable.Delete();
        //Step 9: Confirm the Delete
        //await ADMIN.Dialog.Confirm.Yes.Click();
        await ADMIN.Dialog.ManageCategory.Search.clear();
        //sTEP 10: Search Deleted Record
        await ADMIN.Dialog.ManageCategory.Search.setText({ value: initcategory });
        //Verify Searched results
        expect(await ADMIN.Dialog.ManageCategory.ExpenseManageCategoryTable.IsRecordDeleted()).toBeTruthy();
    });

    test('[C8345] Verify sorting category on the back office ', { tag: ['@admin'] }, async ({ }) => {
        //Step 1 : Login to Back office
        await ADMIN.Login.In();
        //Step 2: Navigate to Expense Type
        await ADMIN.Menu.Expense.GoTo();
        //Step 3: Click on Manage Expense Types
        await ADMIN.Expense.ManageCategory.Click();
        //Step 4: Click the Cloumn Header to Sort the Expense Types by Name in Ascending Order
        await ADMIN.Dialog.ManageCategory.ExpenseManageCategoryTable.SortBytableColumn({ columnIndex: 2, sortOrder: 'ascending' });
        //Step 5: Click the Cloumn Header to Sort the Expense Types by Name in descending Order
        await ADMIN.Dialog.ManageCategory.ExpenseManageCategoryTable.SortBytableColumn({ columnIndex: 2, sortOrder: 'descending' });
        //Step 4: Click the Cloumn Header to Sort the Expense Types by ID in Ascending Order
        await ADMIN.Dialog.ManageCategory.ExpenseManageCategoryTable.SortBytableColumn({ columnIndex: 1, sortOrder: 'ascending' });
        //Step 4: Click the Cloumn Header to Sort the Expense Types by ID in descending Order
        await ADMIN.Dialog.ManageCategory.ExpenseManageCategoryTable.SortBytableColumn({ columnIndex: 1, sortOrder: 'descending' });
    });

    test('[C8346] Verify view more Category on the back office', { tag: ['@admin'] }, async ({ }) => {

        //Step 1 : Login to Back office
        await ADMIN.Login.In();
        //Step 2: Navigate to Expense Type
        await ADMIN.Menu.Expense.GoTo();
        //Step 3: Click on Manage Expense Types
        await ADMIN.Expense.ManageCategory.Click();
        //Step 3: verify default show entries as 10
        expect(await ADMIN.Dialog.ManageCategory.ShowEntries.GetSelectedOption()).toBe('10');
        //Step 4: Click on View More button
        await ADMIN.Dialog.ManageCategory.ShowEntries.SelectOption({ byIndex: 4 });
        //Step 5:  verify show entires page increased to 100
        expect(await ADMIN.Dialog.ManageCategory.ShowEntries.GetSelectedOption()).toBe('100');

    });
    test('[C8347] Add an Expense on the back office and verify recording a business expense ', { tag: ['@admin'] }, async ({ }) => {
        //Step 1: Login to Back Office
        await ADMIN.Login.In()
        //Step 2: Navigate to Expense Page
        await ADMIN.Menu.Expense.GoTo();
        //Step 3: Click on Add Expense Button
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
        //Step 7: Verify the added Expense is displayed in the Expense List
        await ADMIN.Expense.Search.setText({ value: categoryname });
        expect(await ADMIN.Expense.ExpenseTable.IsNotEmpty()).toBeTruthy();

    });
    test('[C8348] Edit an Expense on the back office and verify updating a business expense ', { tag: ['@admin'] }, async ({ }) => {
        await ADMIN.Login.In()
        //Step 2: Navigate to Expense Page
        await ADMIN.Menu.Expense.GoTo();
        //Step 3: Click on Add Expense Button
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
        //Step 7: Verify the added Expense is displayed in the Expense List
        expect(await ADMIN.Expense.ExpenseTable.IsNotEmpty()).toBeTruthy();
        //Step 8: Edit the added Expense
        await ADMIN.Expense.ExpenseTable.Edit({ rowColumn: 'Category', rowValue: categoryname });
        //Step 9: Update the previous Amount in Edit Expense Dialog
        const updateexpenseamount = await ADMIN.FakeData.getItemPrice();
        await ADMIN.Dialog.EditExpense.Amount.setText({ value: updateexpenseamount });
        await ADMIN.Dialog.EditExpense.Update.Click();
        //step 10: Search with Expense category name
        await ADMIN.Expense.Search.setText({ value: categoryname });
        //Step 10: Verify the updated Expense  amount in table
        const amount = await ADMIN.Expense.ExpenseTable.GetCellValue({ getValueFrom: 'Amount' }, {
            rowQuery: [{ rowColumn: 'Category', rowValue: categoryname, },],
        });
        expect(amount.replace(/[^0-9.]/g, '')).toEqual(updateexpenseamount);

    });

}); 