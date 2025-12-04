import { expect, test } from "@playwright/test";
import { ADMIN } from "../../../../src/section/ADMIN";
import { Initializer } from "../../../../src/utils";
import { TAXITEMS, TAXRULES } from "../../../../src/utils/data/data.taxes";
import { LOCATIONS } from "../../../../src/utils/data/data.device";

test.beforeEach(async ({ page }) => {
    await Initializer.Init(page, {Admin: true});

});

test.afterEach(async ({ page }, testInfo) => {
    await Initializer.Finalize(page, testInfo);
});


test.describe("ADMIN - Accounting Settings - Tax Rules", {tag: ['@admin', '@taxrule','@nonparallelizable']}, () => {

    test("[C8229] Create a new tax rule", { tag: ['@add'] }, async ({ page }) => {
        const taxRuleName = "Test TaxRule "+ new Date().getTime();
        const baseTax= TAXITEMS['NewTaxItem'];
        const NewTaxItem = baseTax.Name + " (" + baseTax.Value + "%)";
        // 1). Login into Admin with admin credentials
        await ADMIN.Login.In();
        // 2). Navigate to Accounting Settings
        await ADMIN.Menu.Accounting_Settings.GoTo();
        // 3). Click on the Add Tax Rule button
        await ADMIN.Settings.AccountingSettings.TaxRules.Add.Click();
        // 4). Verify the Add Tax Rule dialog is visible
        expect(await ADMIN.Dialog.AddTaxRule.IsVisible(), `Add Tax Rule dialog is not visible`).toBe(true);

        // 5). Add the tax rule details
        await ADMIN.Dialog.AddTaxRule.Name.setText({value: taxRuleName});
        await ADMIN.Dialog.AddTaxRule.MultiMode.selectOption({ byText: "Single"});
        await ADMIN.Dialog.AddTaxRule.POSTaxButton.selectOption({ byText: "Button 1"});

        // 6). Add the base tax
        await ADMIN.Dialog.AddTaxRule.AddBaseTax.Click();
        await ADMIN.Dialog.AddTaxRule.AddBaseTax.Click();
        expect(await ADMIN.Dialog.AddTaxRule.BaseTaxesTable.rowCount(), `Base tax table row count is not 2`).toBe(2);
        // 7). Select the base tax
        await ADMIN.Dialog.AddTaxRule.BaseTaxesTable.selectTax({rowIndex: 1, tax: NewTaxItem});
        expect(await ADMIN.Dialog.AddTaxRule.BaseTaxesTable.rowExists({taxTitle: NewTaxItem}), `Base tax table row exists is not true`).toBe(true);
        // 8). Delete the base tax
        await ADMIN.Dialog.AddTaxRule.BaseTaxesTable.deleteTax({rowIndex: 1});
        // 9). Verify the base tax table row count is 1
        expect(await ADMIN.Dialog.AddTaxRule.BaseTaxesTable.rowCount(), `Base tax table row count is not 1`).toBe(1);
        // 10). Add the rule
        await ADMIN.Dialog.AddTaxRule.AddRule.Click();
        await ADMIN.Dialog.AddTaxRule.AddRule.Click();
        expect(await ADMIN.Dialog.AddTaxRule.LocationsTable.rowCount(), `Locations table row count is not 2`).toBe(2);
        // 11). Select the location
        await ADMIN.Dialog.AddTaxRule.LocationsTable.selectLocation({rowIndex: 1, location: "Inventory"});
        await ADMIN.Dialog.AddTaxRule.LocationsTable.selectTax({rowIndex: 1, tax: NewTaxItem});
        expect(await ADMIN.Dialog.AddTaxRule.LocationsTable.rowExists({taxLocation: "Inventory", taxTitle: NewTaxItem}), `Locations table row exists is not true`).toBe(true);
        // 12). Delete the location
        await ADMIN.Dialog.AddTaxRule.LocationsTable.deleteTax({rowIndex: 1});
        // 13). Verify the locations table row count is 1
        expect(await ADMIN.Dialog.AddTaxRule.LocationsTable.rowCount(), `Locations table row count is not 1`).toBe(1);
        // 14). Save the tax rule
        await ADMIN.Dialog.AddTaxRule.Save.Click();
        // 15). Verify the tax rule is added
        await ADMIN.Settings.AccountingSettings.TaxRules.Table.SortByColumn({columnTitle: 'ID', sortOrder: 'descending'});
        expect(await ADMIN.Settings.AccountingSettings.TaxRules.Table.RowExists({rowColumn: 'Name', rowValue: taxRuleName}), `Tax Rule ${taxRuleName} was not added`).toBe(true);
        expect((await ADMIN.Settings.AccountingSettings.TaxRules.Table.GetTaxByIndex({rowIndex: 1})).Name, `Tax Rule "${taxRuleName}" was not added`).toBe(taxRuleName);
    });

    // Edit tax rule is failing due to an UI bug
    // no dialog is visible when the edit button is clicked
    test.skip("[C8230] Edit an existing tax rule", { tag: ['@bug','@taxrule', '@edit'] }, async ({ page }) => {
        const taxRuleName = "Test TaxRule "+ new Date().getTime();
        console.log(taxRuleName);
        const baseTax1= TAXITEMS['NewTaxItem'];
        const baseTax2= TAXITEMS['Tax'];

        // 1). Add a new tax rule to the database
        await Initializer.LoadScenario({
            Admin: {
                Settings: {
                    AccountingSettings: {
                        TaxRules: [
                            {
                                Name: taxRuleName,
                                BaseTaxes: [`${baseTax1.Name} (${baseTax1.Value}%)`],
                                ApplyAtLocations: [{location: LOCATIONS['Inventory'].Name, tax: [`${baseTax1.Name} (${baseTax1.Value}%)`]}]
                            }
                        ]
                    }
                }
            }
        })
        
        // 2). Login into Admin with admin credentials
        await ADMIN.Login.In();
        // 3). Navigate to Accounting Settings
        await ADMIN.Menu.Accounting_Settings.GoTo();
        // 4). Sort the tax rule table by ID
        await ADMIN.Settings.AccountingSettings.TaxRules.Table.SortByColumn({columnTitle: 'ID', sortOrder: 'descending'});
        // 5). Edit the tax rule
        await ADMIN.Settings.AccountingSettings.TaxRules.Table.Edit({rowColumn: 'Name', rowValue: taxRuleName});
        // 6). Verify the edit tax rule dialog is visible
        expect(await ADMIN.Dialog.EditTaxRule.IsVisible(), `Edit Tax Rule dialog is not visible`).toBe(true);
        await ADMIN.Dialog.EditTaxRule.Inclusive.UnCheck();
        // 7). Select the multiple mode
        await ADMIN.Dialog.EditTaxRule.MultiMode.selectOption({ byText: "Multiple"});
        // 8). Select the button 2
        await ADMIN.Dialog.EditTaxRule.POSTaxButton.selectOption({ byText: "Button 2"});
        // 9) Select the base tax
        await ADMIN.Dialog.EditTaxRule.BaseTaxesTable.selectTax({rowIndex: 1, tax: `${baseTax2.Name} (${baseTax2.Value}%)`});
        // 10). Select the location
        await ADMIN.Dialog.EditTaxRule.LocationsTable.selectLocation({rowIndex: 1, location: LOCATIONS['Admin Dash'].Name});
        // 11). Select the tax
        await ADMIN.Dialog.EditTaxRule.LocationsTable.selectTax({rowIndex: 1, tax: `${baseTax2.Name} (${baseTax2.Value}%)`});
        // 12). Save the tax rule
        await ADMIN.Dialog.EditTaxRule.Update.Click();
        
        // 13). Get the tax rule data
        const rowDataUpdated = await ADMIN.Settings.AccountingSettings.TaxRules.Table.GetRowByQuery({rowColumn: 'Name', rowValue: taxRuleName});

        // 14). Verify the tax rule data
        expect(rowDataUpdated['Price Inclusive'], `Price Inclusive is not true`).toContain("Exclusive");
        expect(rowDataUpdated['Mode'], `Mode is not single`).toBe("Multi");
        expect(rowDataUpdated['Name'], `Tax Rule "${taxRuleName}" was not updated`).toBe(taxRuleName);

        // 15). Edit the tax rule
        await ADMIN.Settings.AccountingSettings.TaxRules.Table.Edit({rowColumn: 'Name', rowValue: taxRuleName});
        // 16). Verify the edit tax rule dialog is visible
        expect(await ADMIN.Dialog.EditTaxRule.IsVisible(), `Edit Tax Rule dialog is not visible`).toBe(true);

        // 17). Verify the base tax table row exists
        expect(await ADMIN.Dialog.EditTaxRule.BaseTaxesTable.rowExists({taxTitle: `${baseTax2.Name} (${baseTax2.Value}%)`}), `Base tax table row exists is not true`).toBe(true);
        // 18). Verify the locations table row exists
        expect(await ADMIN.Dialog.EditTaxRule.LocationsTable.rowExists({taxLocation: "Inventory", taxTitle: `${baseTax2.Name} (${baseTax2.Value}%)`}), `Locations table row exists is not true`).toBe(true);
    });

    test("[C8226] Verify tax rule is deleted", { tag: ['@delete'] }, async ({ page }) => {
        const taxRuleName = "Delete TaxRule "+ new Date().getTime();
        const baseTax1= TAXITEMS['NewTaxItem'];
        
        // 1). Add a new tax rule to the database
        await Initializer.LoadScenario({
            Admin: {
                Settings: {
                    AccountingSettings: {
                        TaxRules: [
                            {
                                Name: taxRuleName,
                                BaseTaxes: [`${baseTax1.Name} (${baseTax1.Value}%)`],
                                ApplyAtLocations: [{location: LOCATIONS['Inventory'].Name, tax: [`${baseTax1.Name} (${baseTax1.Value}%)`]}]
                            }
                        ]
                    }
                }
            }
        });

        // 2). Login into Admin with admin credentials
        await ADMIN.Login.In();
        // 3). Navigate to Accounting Settings
        await ADMIN.Menu.Accounting_Settings.GoTo();
        // 4). Sort the tax rule table by ID
        await ADMIN.Settings.AccountingSettings.TaxRules.Table.SortByColumn({columnTitle: 'ID', sortOrder: 'descending'});
        // 5). Delete the tax rule
        await ADMIN.Settings.AccountingSettings.TaxRules.Table.Delete({rowColumn: 'Name', rowValue: taxRuleName});
        // 6). Click on the Yes button
        await ADMIN.Dialog.Confirmation.Yes.Click();
        // 7). Verify the tax rule is deleted
        expect(await ADMIN.Settings.AccountingSettings.TaxRules.Table.RowExists({rowColumn: 'Name', rowValue: taxRuleName}), `Tax Rule ${taxRuleName} was not deleted`).toBe(false);
    });
});
