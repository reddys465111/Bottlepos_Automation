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

test.describe('Admin Section - Inventory', { tag: ['@regression', '@inventory', '@Admin'] }, () => {
    test('[C8365] Access the Inventory section to manage the Inventory', { tag: ['@'] }, async ({ }) => {
        //Step 1: Login the Admin Portal
        await ADMIN.Login.In();
        //Step 2: Navigate to Invenory Section
        await ADMIN.Menu.Inventory.GoTo();
        //Step 3 : verify that the Inventory page is displayed without Errors
        expect(await ADMIN.Inventory.Add.IsClickable(), "Add button is not clickable").toBeTruthy();
    });
    test('[C8367] Edit the quantity of an existing inventory item allows edit quantity on hand for an item', { tag: ['@Admin', '@inventory'] }, async ({ }) => {
        //Step 1: Login to the Admin portal
        await ADMIN.Login.In();
        // Step 2: Navigate to Inventory Section
        await ADMIN.Menu.Inventory.GoTo();
        //Step 3: Search for any exsiting item in the table
        const searchValue = '9999988126';
        await ADMIN.Inventory.Search.setText({ value: searchValue });
        //Step 3: Edit an Existing Inventory Item
        await ADMIN.Inventory.Table.Edit({ rowColumn: 'Stock Number', rowValue: '9999988126' })
        //Step 4: verify  Edit stock dialog is opened
        expect(await ADMIN.Dialog.EditStock.IsVisible(), "Edit Stock dialog is not visible").toBeTruthy();
        //Step 5: Update the Quantity value
        const qtyvalue = await ADMIN.FakeData.getItemPrice();
        await ADMIN.Dialog.EditStock.Quantity.setText({ value: qtyvalue });
        //Step 6 : Click On update button
        await ADMIN.Dialog.EditStock.Update.Click();
        //Step 7: Verify that the quantity is updated in the inventory table
        const quantity = await ADMIN.Inventory.Table.GetCellValue({ getValueFrom: 'Qty' }, { rowIndex: 1 });
        expect(Number(quantity)).toBe(Number(qtyvalue));

    });
    test('[C8368] Verify that the search  find the appropriate item(s) to manage inventory', { tag: ['@Admin', '@inventory'] }, async ({ }) => {
        // Step 1 : Login to the Admin Portal
        await ADMIN.Login.In();
        // Step 2: Navigate to Inventory Section
        await ADMIN.Menu.Inventory.GoTo();
        // Step 3: Search for any existing item in the table
        const searchValue = '9999988126';
        await ADMIN.Inventory.Search.setText({ value: searchValue });
        // Step 4: Verify that the appropriate item(s) is displayed in the table
        const stockNumber = await ADMIN.Inventory.Table.GetCellValue({ getValueFrom: 'Stock Number' }, { rowIndex: 1 });
        expect(stockNumber).toBe(searchValue);
    });

    test('[C8369] Verify the number of item entries shown per page display items as expected', { tag: ['@Admin', '@inventory'] }, async ({ }) => {
        //Step 1: Login to the Admin Portal
        await ADMIN.Login.In();
        //Step 2: navigate to Invenmory Section
        await ADMIN.Menu.Inventory.GoTo();
        //Step 3: Select the number of entries dropdown and choose 10 entries
        const selectentry = 10;
        await ADMIN.Inventory.ShowEntries.SelectOption({ byText: selectentry.toString() });
        //Step 4: Verify that the number of entries shown in the table corresponds to the selected number
        const rowCount = await ADMIN.Inventory.Table.getTableRowCount();
        expect(rowCount).toBeLessThanOrEqual(selectentry);
    });

    test('[C8370] Verify that Stock History display accurate item history & Stat Tab', { tag: ['@Admin', '@inventory'] }, async ({ }) => {
        //Step 1 : Login to Admin portal
        await ADMIN.Login.In();
        //Step 2: Navigate to Inventory page
        await ADMIN.Menu.Inventory.GoTo();
        //Step 3: Search for any exsiting item in the table
        const searchValue = '9999988126';
        await ADMIN.Inventory.Search.setText({ value: searchValue });
        //Step 3: Edit an Existing Inventory Item
        await ADMIN.Inventory.Table.ItemHistory({ rowColumn: 'Stock Number', rowValue: '9999988126' })
        //Step 4: Verify that the Stock History dialog is opened
        expect(await ADMIN.Dialog.InventoryStockHistory.IsVisible(), "Inventory Stock History dialog is not visible").toBeTruthy();
        //Step 5: Verify that the Detail tab is active by default
        await ADMIN.Dialog.InventoryStockHistory.ExpectTabActive('historydetail');
        //Step 6: Click on Stats tab
        await ADMIN.Dialog.InventoryStockHistory.Stats.Click();
        //Step 7: Verify that the Stats tab is active
        await ADMIN.Dialog.InventoryStockHistory.ExpectTabActive('historystats');
    });
    test('[C8372] Verify sorting the inventory list', { tag: ['@Admin', '@inventory'] }, async ({ }) => {
        //Step 1 : :Login to Admin Portal
        await ADMIN.Login.In();
        //Step 2: Navigate to Inventory page
        await ADMIN.Menu.Inventory.GoTo();
        //Step 3: Click on the Stock number column header to sort the inventory list
        await ADMIN.Inventory.Table.SortBytableColumn({ columnIndex: 3, sortOrder: 'descending' });
        //Step 4: Verify the name column header to sort Inventory list in ascending order
        await ADMIN.Inventory.Table.SortBytableColumn({ columnIndex: 2, sortOrder: 'descending' });
        //Step 5 : Verify the Supplier coulmn sort in Descending order
        await ADMIN.Inventory.Table.SortBytableColumn({ columnIndex: 4, sortOrder: 'descending' });
        //Step 6 : verify the Qty coulmn sort in Descending order
        await ADMIN.Inventory.Table.SortBytableColumn({ columnIndex: 6, sortOrder: 'descending' });

    });
    test('[C8373] Verify transfer stock to another location allows transfer stock to another location from inventory', { tag: ['@Admin', '@inventory'] }, async ({ }) => {
        //Step 1 : :Login to Admin Portal
        await ADMIN.Login.In();
        //Step 2: Navigate to Inventory page
        await ADMIN.Menu.Inventory.GoTo();
        //Step 3: Search for any exsiting item in the table
        const searchValue = '9999988126';
        await ADMIN.Inventory.Search.setText({ value: searchValue });
        //Step 4: Click on Transfer Stock action for an existing item
        await ADMIN.Inventory.Table.Transfer({ rowColumn: 'Stock Number', rowValue: '9999988126' })
        //Step 5: Verify that the Transfer Stock dialog is opened
        expect(await ADMIN.Dialog.TransferStock.IsVisible(), "Transfer Stock dialog is not visible").toBeTruthy();
        //Step 6: Select the location to transfer stock to
        await ADMIN.Dialog.TransferStock.TransferTo.SelectOption({ byText: 'Inventory' });
        //Step 7: Enter the quantity to transfer
        const transferQty = '5';
        await ADMIN.Dialog.TransferStock.Qty.setText({ value: transferQty });
        //Step 8 Click on Update Button
        await ADMIN.Dialog.TransferStock.Update.Click();
        expect(await ADMIN.Dialog.Error.IsVisible()).toBeTruthy();
    });

    test('[C8374] Verify that my locations show in Transfer Stock are displayed in the dropdown', { tag: ['@Admin', '@inventory'] }, async ({ }) => {
        //Step 1 : :Login to Admin Portal
        await ADMIN.Login.In();
        //Step 2: Navigate to Inventory page
        await ADMIN.Menu.Inventory.GoTo();
        //Step 3: Search for any exsiting item in the table
        const searchValue = '9999988126';
        await ADMIN.Inventory.Search.setText({ value: searchValue });
        //Step 4: Click on Transfer Stock action for an existing item
        await ADMIN.Inventory.Table.Transfer({ rowColumn: 'Stock Number', rowValue: '9999988126' })
        //Step 5: Verify that the Transfer Stock dialog is opened
        expect(await ADMIN.Dialog.TransferStock.IsVisible(), "Transfer Stock dialog is not visible").toBeTruthy();
        //Step 6:Verify that the locations are displayed Inventory location.
        expect(await ADMIN.Dialog.TransferStock.getAllTransferToLocations()).toContain('Inventory');

    });

    test('[C8376] Verify changing the QTY field of items being transferred from the Transfer Stock ', { tag: ['@Admin', '@inventory'] }, async ({ }) => {
        //Step 1 : :Login to Admin Portal
        await ADMIN.Login.In();
        //Step 2: Navigate to Inventory page
        await ADMIN.Menu.Inventory.GoTo();
        //Step 3: Search for any exsiting item in the table
        const searchValue = '9999988126';
        await ADMIN.Inventory.Search.setText({ value: searchValue });
        //Step 4: Click on Transfer Stock action for an existing item
        await ADMIN.Inventory.Table.Transfer({ rowColumn: 'Stock Number', rowValue: '9999988126' })
        //Step 5: Verify that the Transfer Stock dialog is opened
        expect(await ADMIN.Dialog.TransferStock.IsVisible(), "Transfer Stock dialog is not visible").toBeTruthy();
        //Step 6 : Update the Quantity value
        const transferQty = '3';
        await ADMIN.Dialog.TransferStock.Qty.setText({ value: transferQty });
        //Step 7: Click the Cancel button
        await ADMIN.Dialog.TransferStock.Cancel.Click();
        //Step8 : reopen the Transfer Stock dialog to verify that the quantity remains unchanged
        await ADMIN.Inventory.Table.Transfer({ rowColumn: 'Stock Number', rowValue: '9999988126' })
        //Step 9: Verify that the quantity remains unchanged
        const currentQty = await ADMIN.Dialog.TransferStock.Qty.getText();
        expect(currentQty).toBe(transferQty);
    });

    test('[C8377] Verify transfer an item from one location to another allows to manage inventory between locations', { tag: ['@Admin', '@inventory'] }, async ({ }) => {
        //Step 1 : :Login to Admin Portal
        await ADMIN.Login.In();
        //Step 2: Navigate to Inventory page
        await ADMIN.Menu.Inventory.GoTo();
        //Step 3: Search for any exsiting item in the table
        const searchValue = '9999988126';
        await ADMIN.Inventory.Search.setText({ value: searchValue });
        //Step 4: Click on Transfer Stock action for an existing item
        await ADMIN.Inventory.Table.Transfer({ rowColumn: 'Stock Number', rowValue: '9999988126' })
        //Step 5: Verify that the Transfer Stock dialog is opened
        expect(await ADMIN.Dialog.TransferStock.IsVisible(), "Transfer Stock dialog is not visible").toBeTruthy();
        //Step 6: Select the location to transfer stock to
        await ADMIN.Dialog.TransferStock.TransferTo.SelectOption({ byText: 'Inventory' });
        //Step 7 : Update the Quantity value
        const transferQty = '3';
        await ADMIN.Dialog.TransferStock.Qty.setText({ value: transferQty });
        //Step 8: Click the Update button
        await ADMIN.Dialog.TransferStock.Update.Click();
        //Step:9 Validate the Error dialog shows another location not exist
        expect(await ADMIN.Dialog.Error.IsVisible()).toBeTruthy();

    });

});