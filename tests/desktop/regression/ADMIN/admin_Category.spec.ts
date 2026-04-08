import { test, expect } from '@playwright/test';
import { ADMIN } from '../../../../src/section/ADMIN';
import { Initializer } from '../../../../src/utils';

//This block runs before each test
test.beforeEach(async ({ page }) => {
    await Initializer.Init(page, { Admin: true });
});
//This block runs after each test
test.afterEach(async ({ page }, testInfo) => {
    await Initializer.Finalize(page, testInfo);
});


test.describe('Admin Section - category', { tag: ['@regression', '@category', '@Admin'] }, () => {

    test('[C1698] Create a new category', { tag: ['@regression', '@category', '@Admin'] }, async ({  }) => {
        //Step 1 : Login to Admin Console
        await ADMIN.Login.In();
        
        //Step 2: Navigate to Category Section
        await ADMIN.Menu.Categories.GoTo();
        //Step 3: Click on Add Button
        await ADMIN.Category.Add.Click();
        //Step 4: Verify  Add category dialog is opened
        expect(await ADMIN.Dialog.Addcategory.IsVisible()).toBeTruthy();
        //Step 5 :cretae Category Group in Add Category Dialog
        const CategoryGroup = await ADMIN.FakeData.getName();
        await ADMIN.Dialog.Addcategory.CategoryGroup.Add.Click();
        //Step 6: Fill the details in Add Group Category Dialog
        await ADMIN.Dialog.AddGroupCategory.Name.setText({ value: CategoryGroup });
        //Step 7: Save the Category Group
        await ADMIN.Dialog.AddGroupCategory.Save.Click();
        //Step 8: Select the created Category Group in Add Category Dialog
        await ADMIN.Dialog.Addcategory.CategoryGroup.Select.SelectOption({ byText: CategoryGroup });
        //Step 9: Fill the all category details
        const categoryName = await ADMIN.FakeData.getName();
        await ADMIN.Dialog.Addcategory.Name.setText({ value: categoryName });
        await ADMIN.Dialog.Addcategory.DefaultMargin.setText({ value: '10' });
        await ADMIN.Dialog.Addcategory.AllowEBT.Check();
        await ADMIN.Dialog.Addcategory.DoNotDiscount.Check();
        await ADMIN.Dialog.Addcategory.ExcludeLoyaltyReward.Check();
        //Step 10: Save the Category
        await ADMIN.Dialog.Addcategory.Save.Click();
        await  ADMIN.Category.ShowEntries.SelectOption({ byText: '200' });
        // Step 12: Verify the Category is created in Category List
        const isCategoryExist = await ADMIN.Category.Table.RowExists({ rowColumn: 'Name', rowValue: categoryName });
        expect(isCategoryExist, `Category: ${categoryName} is not created successfully`).toBeTruthy();
    });
    test('[C1699] Group related catogories under a common heading', { tag: ['@regression', '@category', '@Admin'] }, async ({  }) => {
        //Step 1: Login to Admin Console
        await ADMIN.Login.In();
        //Step 2: Navigate to Category Section
        await ADMIN.Menu.Categories.GoTo();
        //Step 3: Click on the Manage Category Group button
        await ADMIN.Category.ManageCategoryGroup.Click();
        //Step 4: 	A dialog titled Manage Category Group should appear
        expect(await ADMIN.Dialog.ManageGroupCategory.IsVisible()).toBeTruthy();
        //Step 5 : Click on Add button in Manage category Group dialog
        await ADMIN.Dialog.ManageGroupCategory.Add.Click();
        //Step : 6: Create new Add Group Category dialog should appear
        expect(await ADMIN.Dialog.AddGroupCategory.IsVisible()).toBeTruthy();
        //Step 7 :  Add  the name of the Category Group
        const newCategoryGroupName = await ADMIN.FakeData.getName();
        await ADMIN.Dialog.AddGroupCategory.Name.setText({ value: newCategoryGroupName });
        //Step 8 : Save the Category Group
        await ADMIN.Dialog.AddGroupCategory.Save.Click();
        await ADMIN.Dialog.ManageGroupCategory.Search.setText({ value: newCategoryGroupName });
        //Step 9 : The new category group should be saved and added to the  table
        const isCategoryGroupExist = await ADMIN.Dialog.ManageGroupCategory.Table.RowExists({ rowColumn: 'Name', rowValue: newCategoryGroupName });
        expect(isCategoryGroupExist, `Category Group: ${newCategoryGroupName} is not created successfully`).toBeTruthy();

    });

    test('[C8402]Verify deleting a category', { tag: ['@regression', '@category', '@Admin'] }, async ({  }) => {
        await ADMIN.Login.In();
        //Step 2: Navigate to Category Section
        await ADMIN.Menu.Categories.GoTo();
        //Step 3: Click on Add Button
        await ADMIN.Category.Add.Click();
        //Step 4: Verify  Add category dialog is opened
        expect(await ADMIN.Dialog.Addcategory.IsVisible()).toBeTruthy();
        //Step 5 :cretae Category Group in Add Category Dialog
        const CategoryGroup = await ADMIN.FakeData.getName();
        await ADMIN.Dialog.Addcategory.CategoryGroup.Add.Click();
        //Step 6: Fill the details in Add Group Category Dialog
        await ADMIN.Dialog.AddGroupCategory.Name.setText({ value: CategoryGroup });
        //Step 7: Save the Category Group
        await ADMIN.Dialog.AddGroupCategory.Save.Click();
        //Step 8: Select the created Category Group in Add Category Dialog
        await ADMIN.Dialog.Addcategory.CategoryGroup.Select.SelectOption({ byText: CategoryGroup });
        //Step 9: Fill the all category details
        const categoryName = await ADMIN.FakeData.getName();
        await ADMIN.Dialog.Addcategory.Name.setText({ value: categoryName });
        await ADMIN.Dialog.Addcategory.DefaultMargin.setText({ value: '10' });
        await ADMIN.Dialog.Addcategory.AllowEBT.Check();
        await ADMIN.Dialog.Addcategory.DoNotDiscount.Check();
        await ADMIN.Dialog.Addcategory.ExcludeLoyaltyReward.Check();
        //Step 10: Save the Category
        await ADMIN.Dialog.Addcategory.Save.Click();
        await ADMIN.Category.ShowEntries.SelectOption({ byText: '200' });
        // Step 4: Verify the Category is created in Category List
        let isCategoryExist = await ADMIN.Category.Table.RowExists({ rowColumn: 'Name', rowValue: categoryName });
        expect(isCategoryExist, `Category: ${categoryName} is not created successfully`).toBeTruthy();
        //Step 5: Delete the created category
        await ADMIN.Category.Table.Delete({ rowColumn: 'Name', rowValue: categoryName });
        await ADMIN.Dialog.Confirm.Yes.Click();
    
        // Step 6: Verify the Category is deleted from Category List
        isCategoryExist = await ADMIN.Category.Table.RowExists({ rowColumn: 'Name', rowValue: categoryName });
        expect(isCategoryExist, `Category: ${categoryName} is not deleted successfully`).toBeFalsy();
    });

    test('[C8403] Verify Search functionality in category list', { tag: ['@regression', '@category', '@Admin'] }, async ({  }) => {
        //Step 1: login to Admin Console
        await ADMIN.Login.In();
        //STEP 2: Navigate to Category Section
        await ADMIN.Menu.Categories.GoTo();
        //Step 3: identify a category to search using 1st row from the category table
        const categoryName = await ADMIN.Category.Table.GetCellValue({ getValueFrom: 'Name' }, { rowIndex: 2 });
        //Step 4 : Enter the category name in Search box
        await ADMIN.Category.Search.setText({ value: categoryName });
        //Step 5: Verify the category is displayed in the category list
        const isCategoryExist = await ADMIN.Category.Table.RowExists({ rowColumn: 'Name', rowValue: categoryName });
        expect(isCategoryExist, `Category: ${categoryName} is not found using search functionality`).toBeTruthy();

    });
    test('[C8404]  Verify entries per page on categories table', { tag: ['@regression', '@category', '@Admin'] }, async ({  }) => {
        //Step 1: Login to  Admin Console
        await ADMIN.Login.In();
        //Step 2: Navigate to Caetgory Section
        await ADMIN.Menu.Categories.GoTo();
        //Step 3 :Select the Entries per Page dropdown
        const entriesOption = 100;
        await ADMIN.Category.ShowEntries.SelectOption({byText: entriesOption.toString()});
        //Step 4: Verify the number of entries displayed in the category table
        const totalRows = await ADMIN.Category.Table.getTableRowCount();
        expect(totalRows).toBeLessThanOrEqual(entriesOption);
    });

    test('[C8405] Verify Sorting functionality on categories table', { tag: ['@regression', '@category', '@Admin'] }, async ({  }) => {
        //Step 1: Login to Admin Console
        await ADMIN.Login.In();
        //Step 2: Navigate to category Section
        await ADMIN.Menu.Categories.GoTo();
        //Step 3: Click on the column header to sort the table by Name column in ascending order
        await ADMIN.Category.Table.SortBytableColumn({ columnIndex: 2, sortOrder: 'descending' });
        await ADMIN.Category.Table.SortBytableColumn({ columnIndex: 2, sortOrder: 'ascending' });
        await ADMIN.Category.Table.SortBytableColumn({ columnIndex: 3, sortOrder: 'descending' });
        await ADMIN.Category.Table.SortBytableColumn({ columnIndex: 4, sortOrder: 'descending' });
        await ADMIN.Category.Table.SortBytableColumn({ columnIndex: 3, sortOrder: 'ascending' });
        await ADMIN.Category.Table.SortBytableColumn({ columnIndex: 4, sortOrder: 'ascending' });

    });
    test('[C8406] Verify Revert categories page to its default view', { tag: ['@regression', '@category', '@Admin'] }, async ({  }) => {
        //Step 1: Login to Admin Console
        await ADMIN.Login.In();
        //Step 2: Navigate to Category Section
        await ADMIN.Menu.Categories.GoTo();
        //Step 3: Change the Entries per page to 100
        await ADMIN.Category.ShowEntries.SelectOption({ byText: '100' });
        //Step 4: Click on the Reset to Default button
        await ADMIN.Category.Referesh.Click();
        //Step 5: Verify the Entries per page is set to 10
        const selectedOption = await ADMIN.Category.ShowEntries.GetSelectedOption();
        expect(selectedOption).toBe('10');
       
    });
});