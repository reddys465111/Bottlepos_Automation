import { test, expect } from '@playwright/test';
import { ADMIN } from '../../../../src/section/ADMIN';
import { Initializer } from '../../../../src/utils';

//This block runs before each test
test.beforeEach(async ({ page }) => {
    await Initializer.Init(page, {Admin: true});
});

//This block runs after each test
test.afterEach(async ({ page }, testInfo) => {
    await Initializer.Finalize(page, testInfo);
});

test.describe('Admin Section', {tag: ['@smoke']}, () => {
    test('[C1422] Add new supplier in admin portal', { tag: ['@uncategorized'] },  async ({}) => {
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
        // 1). login using the valid credentials.
        await ADMIN.Login.In();
        // 2). Click on the item and click on the suppliers.
        await ADMIN.Menu.Suppliers.GoTo();
        // 3). Click on the add button.
        await ADMIN.Suppliers.Add.Click();
        // 4). Enter the details and click on the save button.
        await ADMIN.Dialog.AddSupplier.Name.setText({value: supplier.name});
        await ADMIN.Dialog.AddSupplier.Email.setText({value: supplier.email});
        await ADMIN.Dialog.AddSupplier.Phone.setText({value: supplier.phone});
        await ADMIN.Dialog.AddSupplier.Address.setText({value: supplier.address});
        await ADMIN.Dialog.AddSupplier.AutoinvoiceName.setText({value:  supplier.autoinvoiceName});
        await ADMIN.Dialog.AddSupplier.RepName.setText({value: supplier.repName});
        await ADMIN.Dialog.AddSupplier.RepPhone.setText({value: supplier.repPhone});
        await ADMIN.Dialog.AddSupplier.Notes.setText({value: supplier.notes}); 
        await ADMIN.Dialog.AddSupplier.Save.Click();
        // Sort the table by the ID column in descending order in order to get the new supplier at the top of the table
        await ADMIN.Suppliers.Table.SortByColumn({columnTitle: 'ID', sortOrder: 'descending'});
        // 5). Verify that the supplier was added successfully.
        const newSupplier = await ADMIN.Suppliers.Table.RowExists({rowColumn: 'Name', rowValue: supplier.name});
        expect(newSupplier, "the Supplier was not added").toBeTruthy();
    });

});
