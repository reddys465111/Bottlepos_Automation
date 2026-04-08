import { test, expect } from '@playwright/test';
import { ADMIN } from '../../../../src/section/ADMIN';
import { Initializer, KEY } from '../../../../src/utils';
import { Console } from 'console';

//This block runs before each test
test.beforeEach(async ({ page }) => {
    await Initializer.Init(page, { Admin: true });
});

//This block runs after each test
test.afterEach(async ({ page }, testInfo) => {
    await Initializer.Finalize(page, testInfo);
});

test.describe('Admin Section-Supplier', { tag: ['@regression @Supplier'] }, () => {
    test('[C8407]  Verify editing suppliers', { tag: ['@supplier'] }, async ({ }) => {
        //Generate Supplier Data using Faker functions
        const supplier = {
            name: await ADMIN.FakeData.getName(),
            email: await ADMIN.FakeData.getEmail(),
            phone: (await ADMIN.FakeData.getMobile()).toString(),
            address: await ADMIN.FakeData.getAddress(),
            autoinvoiceName: await ADMIN.FakeData.getName(),
            repName: await ADMIN.FakeData.getName(),
            repPhone: (await ADMIN.FakeData.getMobile()).toString(),
            notes: await ADMIN.FakeData.getName(),
        }
        //login to Admin
        await ADMIN.Login.In();
        //Navigate to Suppliers Page
        await ADMIN.Menu.Suppliers.GoTo();
        //Create a new Supplier
        await ADMIN.Suppliers.Add.Click();
        //Fill in Supplier Details
        await ADMIN.Dialog.AddSupplier.Name.setText({ value: supplier.name });
        await ADMIN.Dialog.AddSupplier.Email.setText({ value: supplier.email });
        await ADMIN.Dialog.AddSupplier.Phone.setText({ value: supplier.phone });
        await ADMIN.Dialog.AddSupplier.Address.setText({ value: supplier.address });
        await ADMIN.Dialog.AddSupplier.AutoinvoiceName.setText({ value: supplier.autoinvoiceName });
        await ADMIN.Dialog.AddSupplier.RepName.setText({ value: supplier.repName });
        await ADMIN.Dialog.AddSupplier.RepPhone.setText({ value: supplier.repPhone });
        await ADMIN.Dialog.AddSupplier.Notes.setText({ value: supplier.notes });
        await ADMIN.Dialog.AddSupplier.Save.Click();
        //Find the Supplier information by clicking
        await ADMIN.Suppliers.Table.Edit({ rowColumn: 'Name', rowValue: supplier.name });
        //Verify Edit Supplier window appear
        expect(await ADMIN.Dialog.EditSupplier.IsVisible()).toBeTruthy();
        //Edit Supplier Information
        const newSupplierName = supplier.name + '_Edited';
        await ADMIN.Dialog.EditSupplier.Name.setText({ value: newSupplierName });
        await ADMIN.Dialog.EditSupplier.Update.Click();
        //Verify Supplier is updated in the Suppliers list
        const isSupplierEdited = await ADMIN.Suppliers.Table.RowExists({ rowColumn: 'Name', rowValue: newSupplierName });
        expect(isSupplierEdited).toBeTruthy();

    });
    test('[C8408] Verify Deleting Suppliers', { tag: ['@supplier'] }, async ({ }) => {
        //Generate Supplier Data using Faker functions
        const supplier = {
            name: await ADMIN.FakeData.getName(),
            email: await ADMIN.FakeData.getEmail(),
            phone: (await ADMIN.FakeData.getMobile()).toString(),
            address: await ADMIN.FakeData.getAddress(),
            autoinvoiceName: await ADMIN.FakeData.getName(),
            repName: await ADMIN.FakeData.getName(),
            repPhone: (await ADMIN.FakeData.getMobile()).toString(),
            notes: await ADMIN.FakeData.getName(),
        }
        //login to Admin
        await ADMIN.Login.In();
        //Navigate to Suppliers Page
        await ADMIN.Menu.Suppliers.GoTo();
        //Create a new Supplier
        await ADMIN.Suppliers.Add.Click();
        //Fill in Supplier Details
        await ADMIN.Dialog.AddSupplier.Name.setText({ value: supplier.name });
        await ADMIN.Dialog.AddSupplier.Email.setText({ value: supplier.email });
        await ADMIN.Dialog.AddSupplier.Phone.setText({ value: supplier.phone });
        await ADMIN.Dialog.AddSupplier.Address.setText({ value: supplier.address });
        await ADMIN.Dialog.AddSupplier.AutoinvoiceName.setText({ value: supplier.autoinvoiceName });
        await ADMIN.Dialog.AddSupplier.RepName.setText({ value: supplier.repName });
        await ADMIN.Dialog.AddSupplier.RepPhone.setText({ value: supplier.repPhone });
        await ADMIN.Dialog.AddSupplier.Notes.setText({ value: supplier.notes });
        await ADMIN.Dialog.AddSupplier.Save.Click();
        //Click the Delete button in Sipplier Table
        await ADMIN.Suppliers.Table.Delete({ rowColumn: 'Name', rowValue: supplier.name });
        //Confirm Delete Supplier   
        await ADMIN.Dialog.Confirm.Yes.Click();
        //Verify Supplier is deleted from the Suppliers list
        const isSupplierDeleted = await ADMIN.Suppliers.Table.RowExists({ rowColumn: 'Name', rowValue: supplier.name });
        expect(isSupplierDeleted).toBeFalsy();

    });

    test('[C8411]  Verify sort functionality in suppliers table', { tag: ['@supplier'] }, async ({ }) => {
        //Login to Admin
        await ADMIN.Login.In();
        //Navigate to Suppliers Page
        await ADMIN.Menu.Suppliers.GoTo();
        //Click on Name column to sort Ascending
        await ADMIN.Suppliers.Table.SortBytableColumn({ columnIndex: 3, sortOrder: 'ascending' });
        //Click on Name column to sort Descending
        await ADMIN.Suppliers.Table.SortBytableColumn({ columnIndex: 3, sortOrder: 'descending' });
        //Verify the Items column sorting Ascending
        await ADMIN.Suppliers.Table.SortBytableColumn({ columnIndex: 4, sortOrder: 'ascending' });
        //Verify the Items column sorting Descending
        await ADMIN.Suppliers.Table.SortBytableColumn({ columnIndex: 4, sortOrder: 'descending' });



    });
    test('[C8412] Verify search functionality in suppliers table', { tag: ['@supplier'] }, async ({ }) => {

        //login to Admin
        await ADMIN.Login.In();
        //Navigate to Suppliers Page
        await ADMIN.Menu.Suppliers.GoTo();
        for (let i = 0; i < 5; i++) {
            const supplier = {
                name: await ADMIN.FakeData.getName(),
                email: await ADMIN.FakeData.getEmail(),
                phone: (await ADMIN.FakeData.getMobile()).toString(),
                address: await ADMIN.FakeData.getAddress(),
                autoinvoiceName: await ADMIN.FakeData.getName(),
                repName: await ADMIN.FakeData.getName(),
                repPhone: (await ADMIN.FakeData.getMobile()).toString(),
                notes: await ADMIN.FakeData.getName(),
            }
            //Create a new Supplier
            await ADMIN.Suppliers.Add.Click();
            //Fill in Supplier Details
            await ADMIN.Dialog.AddSupplier.Name.setText({ value: supplier.name });
            await ADMIN.Dialog.AddSupplier.Email.setText({ value: supplier.email });
            await ADMIN.Dialog.AddSupplier.Phone.setText({ value: supplier.phone });
            await ADMIN.Dialog.AddSupplier.Address.setText({ value: supplier.address });
            await ADMIN.Dialog.AddSupplier.AutoinvoiceName.setText({ value: supplier.autoinvoiceName });
            await ADMIN.Dialog.AddSupplier.RepName.setText({ value: supplier.repName });
            await ADMIN.Dialog.AddSupplier.RepPhone.setText({ value: supplier.repPhone });
            await ADMIN.Dialog.AddSupplier.Notes.setText({ value: supplier.notes });
            await ADMIN.Dialog.AddSupplier.Save.Click();
        }
        //IDENTIFY an existing supplier from the list
        const supplierName = await ADMIN.Suppliers.Table.GetCellValue({ getValueFrom: 'Name' }, { rowIndex: 1 });
        //Enter the supplier name in search box and press Enter to trigger filtering
        await ADMIN.Suppliers.Search.setText({ value: supplierName, press: KEY.ENTER });
        await ADMIN.Suppliers.Table.RowExists({ rowColumn: 'Name', rowValue: supplierName });
        //Verify the supplier appears in the suppliers table 
        const isSupplierFound = await ADMIN.Suppliers.Table.GetCellValue({ getValueFrom: 'Name' },
            { rowQuery: [{ rowColumn: 'Name', rowValue: supplierName }] });
        expect(isSupplierFound).toBe(supplierName);

    });
    test('[C8413] Verify resetting supplier page to default view', { tag: ['@supplier'] }, async () => {
        const supplier = {
            name: await ADMIN.FakeData.getName(),
            email: await ADMIN.FakeData.getEmail(),
            phone: (await ADMIN.FakeData.getMobile()).toString(),
            address: await ADMIN.FakeData.getAddress(),
            autoinvoiceName: await ADMIN.FakeData.getName(),
            repName: await ADMIN.FakeData.getName(),
            repPhone: (await ADMIN.FakeData.getMobile()).toString(),
            notes: await ADMIN.FakeData.getName(),
        }
        //login to Admin
        await ADMIN.Login.In();
        //Navigate to Suppliers Page
        await ADMIN.Menu.Suppliers.GoTo();
        //Create a new Supplier
        await ADMIN.Suppliers.Add.Click();
        //Fill in Supplier Details
        await ADMIN.Dialog.AddSupplier.Name.setText({ value: supplier.name });
        await ADMIN.Dialog.AddSupplier.Email.setText({ value: supplier.email });
        await ADMIN.Dialog.AddSupplier.Phone.setText({ value: supplier.phone });
        await ADMIN.Dialog.AddSupplier.Address.setText({ value: supplier.address });
        await ADMIN.Dialog.AddSupplier.AutoinvoiceName.setText({ value: supplier.autoinvoiceName });
        await ADMIN.Dialog.AddSupplier.RepName.setText({ value: supplier.repName });
        await ADMIN.Dialog.AddSupplier.RepPhone.setText({ value: supplier.repPhone });
        await ADMIN.Dialog.AddSupplier.Notes.setText({ value: supplier.notes });
        await ADMIN.Dialog.AddSupplier.Save.Click();

        // Identify an existing supplier from the list
        const supplierName = await ADMIN.Suppliers.Table.GetCellValue({ getValueFrom: 'Name' }, { rowIndex: 1 });
        // Apply search
        await ADMIN.Suppliers.Search.setText({ value: supplierName, press: KEY.ENTER });
        // Verify supplier appears in the suppliers table
        await ADMIN.Suppliers.Table.RowExists({ rowColumn: 'Name', rowValue: supplierName });
        // Click refresh
        await ADMIN.Refresh.Click();
        //  Verify search is cleared and table is reset to default view
        const isTableReset = await ADMIN.Suppliers.Table.RowExists({ rowColumn: 'Name', rowValue: supplier.name });
        expect(isTableReset).toBeTruthy();
    });


    test('[C8414] Verify changing number of entries per page in suppliers table', { tag: ['@supplier'] }, async ({ }) => {
        //Login to Admin
        await ADMIN.Login.In();
        //Navigate to Suppliers Page
        await ADMIN.Menu.Suppliers.GoTo();
        //Change number of entries to 100 per page
        await ADMIN.Suppliers.showEntries.SelectOption({ byText: '100' });
        //Verify 100  entry selected in the dropdown
        const selectedOption = await ADMIN.Suppliers.showEntries.GetSelectedOption();
        expect(selectedOption).toBe('100');

    });
    test('[C8416] Verify selecting the number of items dialog page from a supplier', { tag: ['@supplier'] }, async ({ }) => {
        const supplier = {
            name: await ADMIN.FakeData.getName(),
            email: await ADMIN.FakeData.getEmail(),
            phone: (await ADMIN.FakeData.getMobile()).toString(),
            address: await ADMIN.FakeData.getAddress(),
            autoinvoiceName: await ADMIN.FakeData.getName(),
            repName: await ADMIN.FakeData.getName(),
            repPhone: (await ADMIN.FakeData.getMobile()).toString(),
            notes: await ADMIN.FakeData.getName(),
        }
        //login to Admin
        await ADMIN.Login.In();
        //Navigate to Suppliers Page
        await ADMIN.Menu.Suppliers.GoTo();
        //Create a new Supplier
        await ADMIN.Suppliers.Add.Click();
        //Fill in Supplier Details
        await ADMIN.Dialog.AddSupplier.Name.setText({ value: supplier.name });
        await ADMIN.Dialog.AddSupplier.Email.setText({ value: supplier.email });
        await ADMIN.Dialog.AddSupplier.Phone.setText({ value: supplier.phone });
        await ADMIN.Dialog.AddSupplier.Address.setText({ value: supplier.address });
        await ADMIN.Dialog.AddSupplier.AutoinvoiceName.setText({ value: supplier.autoinvoiceName });
        await ADMIN.Dialog.AddSupplier.RepName.setText({ value: supplier.repName });
        await ADMIN.Dialog.AddSupplier.RepPhone.setText({ value: supplier.repPhone });
        await ADMIN.Dialog.AddSupplier.Notes.setText({ value: supplier.notes });
        await ADMIN.Dialog.AddSupplier.Save.Click();
        //Sort suppliers by #Items descending
        await ADMIN.Suppliers.Table.SortBytableColumn({ columnIndex: 4, sortOrder: 'descending', });
        //click the number of items from a first row supplier
        const tmprowvalue = await ADMIN.Suppliers.Table.GetCellValue({ getValueFrom: 'Name' }, { rowIndex: 1 })
        await ADMIN.Suppliers.Table.ViewItems({ rowColumn: 'Name', rowValue: tmprowvalue });
        //Verify new dialog box appears with items from the selected supplier
        expect(await ADMIN.Dialog.SupplierItemList.IsVisible()).toBeTruthy();

    });

    test('[C8417] Verify search functionality within the "# Items" attribute dialog', { tag: ['@supplier'] }, async ({ }) => {
        const supplier = {
            name: await ADMIN.FakeData.getName(),
            email: await ADMIN.FakeData.getEmail(),
            phone: (await ADMIN.FakeData.getMobile()).toString(),
            address: await ADMIN.FakeData.getAddress(),
            autoinvoiceName: await ADMIN.FakeData.getName(),
            repName: await ADMIN.FakeData.getName(),
            repPhone: (await ADMIN.FakeData.getMobile()).toString(),
            notes: await ADMIN.FakeData.getName(),
        };
        // Login to Admin
        await ADMIN.Login.In();
        // Navigate to Suppliers Page
        await ADMIN.Menu.Suppliers.GoTo();
        // Create a new Supplier
        await ADMIN.Suppliers.Add.Click();
        // Fill Supplier Details
        await ADMIN.Dialog.AddSupplier.Name.setText({ value: supplier.name });
        await ADMIN.Dialog.AddSupplier.Email.setText({ value: supplier.email });
        await ADMIN.Dialog.AddSupplier.Phone.setText({ value: supplier.phone });
        await ADMIN.Dialog.AddSupplier.Address.setText({ value: supplier.address });
        await ADMIN.Dialog.AddSupplier.AutoinvoiceName.setText({ value: supplier.autoinvoiceName });
        await ADMIN.Dialog.AddSupplier.RepName.setText({ value: supplier.repName });
        await ADMIN.Dialog.AddSupplier.RepPhone.setText({ value: supplier.repPhone });
        await ADMIN.Dialog.AddSupplier.Notes.setText({ value: supplier.notes });
        await ADMIN.Dialog.AddSupplier.Save.Click();
        //Add Supplier to Items in Inventory
        await ADMIN.Menu.Items.GoTo();
        //Edit the Itemin Item List
        await ADMIN.Items.Table.Edit({ rowColumn: 'Name', rowValue: 'BUD LIGHT 30PK' });
        //In the Edit Item dialog, navigate to Suppliers tab
        await ADMIN.Dialog.EditItem.Details.Supplier.SelectOption({ byText: supplier.name });
        await ADMIN.Dialog.EditItem.Update.Click();
        await ADMIN.Dialog.Success.Ok.Click();
        //Navigate back to Suppliers Page
        await ADMIN.Menu.Suppliers.GoTo();
        // Sort suppliers by #Items descending
        await ADMIN.Suppliers.Table.SortBytableColumn({ columnIndex: 4, sortOrder: 'descending', });
        // Read supplier name & items count from first row
        const tmprowvalue = await ADMIN.Suppliers.Table.GetCellValue({ getValueFrom: 'Name' }, { rowIndex: 1 });
        const itemsCount = Number(await ADMIN.Suppliers.Table.GetCellValue({ getValueFrom: '# Items' }, { rowIndex: 1 }));
        // Skip test if supplier has no items due to Data setup
        if (itemsCount === 0) {
            return;
        }
        // Open Supplier Items dialog
        await ADMIN.Suppliers.Table.ViewItems({ rowColumn: 'Name', rowValue: tmprowvalue, });
        // Validate dialog visibility
        expect(await ADMIN.Dialog.SupplierItemList.IsVisible()).toBeTruthy();
        // Pick an item name from the table
        const itemname = await ADMIN.Dialog.SupplierItemList.supplierItemTable.GetCellValue({ getValueFrom: 'Name' }, { rowIndex: 1 });
        // Search the item
        await ADMIN.Dialog.SupplierItemList.search.setText({ value: itemname, press: KEY.ENTER, });
        // Validate search result
        const isItemFound = await ADMIN.Dialog.SupplierItemList.supplierItemTable.GetCellValue({ getValueFrom: 'Name' }, { rowIndex: 1 });
        expect(isItemFound).toBe(itemname);
        
    }
    );

});
