import { expect, test } from "@playwright/test";
import { Initializer } from "../../../../src/utils/initializer";
import { ADMIN } from "../../../../src/section/ADMIN";
import { TAXITEMS, TAXRULES } from "../../../../src/utils/data/data.taxes";

test.beforeEach(async ({ page }) => {
    await Initializer.Init(page, {Admin: true});

});

test.afterEach(async ({ page }, testInfo) => {
    await Initializer.Finalize(page, testInfo);
});

test.describe("ADMIN - Additional Fees", {tag: ['@admin', '@additionalfees','@nonparallelizable']}, () => {
    test("[C8251] Create a new additional fee", { tag: ['@add'] }, async ({}) => {
        const additionalFee = 'AddFee'+ new Date().getTime();
        // 1). Login into Admin with admin credentials
        await ADMIN.Login.In();
        // 2). Navigate to Accounting Settings
        await ADMIN.Menu.Accounting_Settings.GoTo();
        // 3). Click on the Add Additional Fee button
        await ADMIN.Settings.AccountingSettings.AdditionalFees.Add.Click();
        // 4). Add the additional fee details
        await ADMIN.Dialog.AddAdditionalFees.Name.setText({value: additionalFee});
        await ADMIN.Dialog.AddAdditionalFees.Type.selectOption({byText: "Percentage"});
        await ADMIN.Dialog.AddAdditionalFees.Value.setText({value: "10"});
        await ADMIN.Dialog.AddAdditionalFees.Taxable.Check();
        // 5). Click on the Save button
        await ADMIN.Dialog.AddAdditionalFees.Save.Click();

        // 6). Verify the additional fee was added
        await ADMIN.Settings.AccountingSettings.AdditionalFees.Table.SortByColumn({columnTitle: 'Id', sortOrder: 'descending'});
        expect(await ADMIN.Settings.AccountingSettings.AdditionalFees.Table.RowExists({rowColumn: 'Name', rowValue: additionalFee}), 'Additional fee was not added').toBe(true);

    });

    test("[C8245] Verify Additional Fees edit functionality", { tag: ['@edit'] }, async ({}) => {
        const additionalFee = 'EditFee'+ new Date().getTime();
        await Initializer.LoadScenario({
            Admin: {
                Settings: {
                    AccountingSettings: {
                        AdditionalFees: [
                            {
                                Name: additionalFee,
                                Type: "percentage",
                                Value: 5,
                                Taxable: true
                            }
                        ]
                    }
                }
            }
        })
        // 1). Login into Admin with admin credentials
        await ADMIN.Login.In();
        // 2). Navigate to Accounting Settings
        await ADMIN.Menu.Accounting_Settings.GoTo();
        // 3). Sort the additional fee table by ID
        await ADMIN.Settings.AccountingSettings.AdditionalFees.Table.SortByColumn({columnTitle: 'Id', sortOrder: 'descending'});
        // 4). Edit the additional fee
        await ADMIN.Settings.AccountingSettings.AdditionalFees.Table.Edit({rowColumn: 'Name', rowValue: additionalFee});
        // 5). Verify the edit additional fee dialog is visible
        expect(await ADMIN.Dialog.EditAdditionalFees.IsVisible(), 'Edit Additional Fee dialog is not visible').toBe(true);
        // 6). Add the value
        await ADMIN.Dialog.EditAdditionalFees.Value.setText({value: "15"});
        // 7). Click on the Save button
        await ADMIN.Dialog.EditAdditionalFees.Update.Click();
        // 8). Verify the additional fee was edited
        expect(await ADMIN.Settings.AccountingSettings.AdditionalFees.Table.RowExists({rowColumn: 'Name', rowValue: additionalFee}), 'Additional fee was not edited').toBe(true);
        // 9). Verify the additional fee was edited
        expect(await ADMIN.Settings.AccountingSettings.AdditionalFees.Table.GetCellValue({getValueFrom: 'Value'}, {rowIndex: 1}), 'Additional fee was not edited').toBe("15");
    });

    test("[C8246] Verify Additional Fees delete functionality", { tag: ['@delete'] }, async ({}) => {
        const additionalFee = 'DeleteFee'+ new Date().getTime();
        await Initializer.LoadScenario({
            Admin: {
                Settings: {
                    AccountingSettings: {
                        // MultiExclisiveTax is a tax rule (defined in TAXRULES), not a tax item.
                        TaxRules: [
                            TAXRULES['MultiExclisiveTax'],
                        ],
                        AdditionalFees: [{Name: additionalFee, Type: "percentage", Value: 5, Taxable: true}]
                    }
                }
            }
        })
        // 1). Login into Admin with admin credentials
        await ADMIN.Login.In();
        // 2). Navigate to Accounting Settings
        await ADMIN.Menu.Accounting_Settings.GoTo();
        // 3). Sort the additional fee table by ID
        await ADMIN.Settings.AccountingSettings.AdditionalFees.Search.setText({value: additionalFee});
        // 4). Delete the additional fee
        await ADMIN.Settings.AccountingSettings.AdditionalFees.Table.Delete({rowColumn: 'Name', rowValue: additionalFee});
        // 5). Click on the Yes button
        await ADMIN.Dialog.Confirmation.Yes.Click();
        // 6). Verify the additional fee was deleted
        expect(await ADMIN.Settings.AccountingSettings.AdditionalFees.Table.RowExists({rowColumn: 'Name', rowValue: additionalFee}), 'Additional fee was not deleted').toBe(false);
    });
});
