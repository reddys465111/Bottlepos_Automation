import { ADMIN } from "../../../../src/section/ADMIN";
import { Initializer } from "../../../../src/utils";
import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
    await Initializer.Init(page, {Admin: true});

});

test.afterEach(async ({ page }, testInfo) => {
    await Initializer.Finalize(page, testInfo);
});

test.describe('Admin Section - Tax Items', { tag: ['@regression', '@taxitem','@nonparallelizable'] }, () => {
    
    test('[C8235] Add new Tax Items in admin portal', { tag: ['@add'] }, async ({}) => {
        const taxItem = 'TaxItem'+ new Date().getTime();
        const altName = 'TX'+ new Date().getTime();
        // 1). Login into Admin with admin credentials
        await ADMIN.Login.In();
        // 2). Navigate to Accounting Settings
        await ADMIN.Menu.Accounting_Settings.GoTo();

        // 3). Click on the Add Tax Item button
        await ADMIN.Settings.AccountingSettings.TaxItems.Add.Click();
        // 4). Add the tax item details
        await ADMIN.Dialog.AddTaxItem.Name.setText({value: taxItem});
        // 5). Add the alt name
        await ADMIN.Dialog.AddTaxItem.AltName.setText({value: altName});
        // 6). Select the type
        await ADMIN.Dialog.AddTaxItem.Type.selectOption({byText: "Standard"});
        // 7). Add the value
        await ADMIN.Dialog.AddTaxItem.Value.setText({value: "10"});
        // 8). Click on the Save button
        await ADMIN.Dialog.AddTaxItem.Save.Click();
        // 8). Sort the tax item table by ID
        await ADMIN.Settings.AccountingSettings.TaxItems.Table.SortByColumn({columnTitle: 'ID', sortOrder: 'descending'});
        // 9). Verify the tax item was added
        expect(await ADMIN.Settings.AccountingSettings.TaxItems.Table.RowExists({rowColumn: 'Name', rowValue: taxItem}), 'Tax Item was not added').toBeTruthy();
        // 10). Verify the tax item was added
        expect(await ADMIN.Settings.AccountingSettings.TaxItems.Table.GetCellValue({getValueFrom: 'Name'}, {rowIndex: 1}), 'Tax Item was not added').toBe(taxItem);

    });


    test('[C8232] Edit Tax Items in admin portal', { tag: ['@edit'] }, async ({}) => {
        const taxItem = 'TaxItem'+ new Date().getTime();
        const altName = 'TX'+ new Date().getTime();

        await Initializer.LoadScenario({
            Admin: {
                Settings: {
                    AccountingSettings: {
                        TaxItems: [
                            {Name: taxItem, AltName: altName, Type: "standard", Value: 10}
                        ]
                    }
                }
            }
        })
        // 1). Login into Admin with admin credentials
        await ADMIN.Login.In();
        // 2). Navigate to Accounting Settings
        await ADMIN.Menu.Accounting_Settings.GoTo();
        // 3). Sort the tax item table by ID
        await ADMIN.Settings.AccountingSettings.TaxItems.Table.SortByColumn({columnTitle: 'ID', sortOrder: 'descending'});
        // 4). Edit the tax item
        await ADMIN.Settings.AccountingSettings.TaxItems.Table.Edit({rowColumn: 'Name', rowValue: taxItem});
        // 5). Verify the edit tax item dialog is visible
        expect(await ADMIN.Dialog.EditTaxItem.IsVisible(), 'Edit Tax Item dialog is not visible').toBe(true);
        // 6). Add the alt name
        await ADMIN.Dialog.EditTaxItem.AltName.setText({value: altName});
        // 7). Select the type
        await ADMIN.Dialog.EditTaxItem.Type.selectOption({byText: "VAT"});
        // 8). Add the value
        await ADMIN.Dialog.EditTaxItem.Value.setText({value: "5"});
        // 9). Click on the Save button
        await ADMIN.Dialog.EditTaxItem.Update.Click();
        // 10). Verify the tax item was edited
        expect(await ADMIN.Settings.AccountingSettings.TaxItems.Table.RowExists({rowColumn: 'Name', rowValue: taxItem}), 'Tax Item was not edited').toBeTruthy();
        // 11). Verify the tax item was edited
        expect(await ADMIN.Settings.AccountingSettings.TaxItems.Table.GetCellValue({getValueFrom: 'Name'}, {rowIndex: 1}), 'Tax Item was not edited').toBe(taxItem);
        // 12). Verify the tax item was edited
        expect(await ADMIN.Settings.AccountingSettings.TaxItems.Table.GetCellValue({getValueFrom: 'Type'}, {rowIndex: 1}), 'Tax Item was not edited').toBe("Vat");
        // 13). Verify the tax item was edited
        expect(await ADMIN.Settings.AccountingSettings.TaxItems.Table.GetCellValue({getValueFrom: 'Value'}, {rowIndex: 1}), 'Tax Item was not edited').toBe("5%");
    });

    test('[C8233] Delete Tax Items in admin portal', { tag: ['@delete'] }, async ({}) => {
        const taxItem = 'TaxItem'+ new Date().getTime();
        const altName = 'TX'+ new Date().getTime();
        await Initializer.LoadScenario({
            Admin: {
                Settings: {
                    AccountingSettings: {
                        TaxItems: [
                            {Name: taxItem, AltName: altName, Type: "standard", Value: 11}
                        ]
                    }
                }
            }
        })
        // 1). Login into Admin with admin credentials
        await ADMIN.Login.In();
        // 2). Navigate to Accounting Settings
        await ADMIN.Menu.Accounting_Settings.GoTo();
        // 3). Sort the tax item table by ID
        await ADMIN.Settings.AccountingSettings.TaxItems.Table.SortByColumn({columnTitle: 'ID', sortOrder: 'descending'});
        // 4). Delete the tax item
        await ADMIN.Settings.AccountingSettings.TaxItems.Table.Delete({rowColumn: 'Name', rowValue: taxItem});
        // 5). Click on the Yes button
        await ADMIN.Dialog.Confirmation.Yes.Click();
        // 6). Verify the tax item was deleted
        expect(await ADMIN.Settings.AccountingSettings.TaxItems.Table.RowExists({rowColumn: 'Name', rowValue: taxItem}), 'Tax Item was not deleted').toBe(false);
    });

});