import { expect, test } from "@playwright/test";
import { ADMIN } from "../../../../src/section/ADMIN";
import { Initializer } from "../../../../src/utils";
 
test.beforeEach(async ({ page }) => {
    await Initializer.Init(page, {Admin: true});
 
});
 
test.afterEach(async ({ page }, testInfo) => {
    await Initializer.Finalize(page, testInfo);
});
 
test.describe("ADMIN - Bottle Deposit", {tag: ['@admin', '@bottleDeposit','@nonparallelizable']}, () => {    
   
    test('[C8236] Verify Bottle Deposit table Edit/Delete functionality',{ tag: ['@bottle', '@deposit', '@reports'] },async () => {
        // --- Step 1: Create a unique Bottle Deposit entry ---
        const bottleDeposit = `${Math.floor(Math.random() * 1000).toString().padStart(3, "0")}PK`;
        console.log(`Creating Bottle Deposit item: "${bottleDeposit}"`);
 
        await Initializer.LoadScenario({
            Admin: {
                Settings: {
                AccountingSettings: {
                    BottleDeposit: [{ Name: bottleDeposit, Amount: 1 }],
                },
                },
            },
        });
 
        // --- Step 2: Login to Admin ---
        await ADMIN.Login.In();
 
        // --- Step 3: Navigate to Accounting Settings ---
        await ADMIN.Menu.Accounting_Settings.GoTo();
 
        // --- Step 4: Search for the Bottle Deposit ---
        await ADMIN.Settings.AccountingSettings.BottleDeposit.Search.setText({ value: bottleDeposit });
 
        // --- Step 5: Verify Delete icon is available ---
        const hasDelete = await ADMIN.Settings.AccountingSettings.BottleDeposit.Table.IsDeleteAvailable({
        rowColumn: "Name",
        rowValue: bottleDeposit,
        });
        expect(
        hasDelete,
        `Error: Delete icon should be visible in Bottle Deposit table for row "${bottleDeposit}"`
        ).toBeTruthy();
 
        // --- Step 6: Verify Edit icon is available ---
        const hasEdit = await ADMIN.Settings.AccountingSettings.BottleDeposit.Table.IsEditAvailable({
        rowColumn: "Name",
        rowValue: bottleDeposit,
        });
        expect(
        hasEdit,
        `Error: Edit icon should be visible in Bottle Deposit table for row "${bottleDeposit}"`
        ).toBeTruthy();
    });
 
   
    test("[C8238] Verify Bottle Deposit Delete functionality", async () => {
        // --- Step 1: Prepare test data ---
 
        // Create a unique Bottle Deposit entry so we can safely delete it
        const bottleDeposit = `${Math.floor(Math.random() * 1000).toString().padStart(3, "0")}PK`;
 
        await Initializer.LoadScenario({
            Admin: {
                Settings: {
                    AccountingSettings: {
                        BottleDeposit: [{ Name: bottleDeposit, Amount: 1 }],
                    },
                },
            },
        });
 
        // --- Step 2: Login and Navigate ---
        await ADMIN.Login.In();
        await ADMIN.Menu.Accounting_Settings.GoTo();
 
        // Verify the Bottle Deposit table is not empty before proceeding
        expect(await ADMIN.Settings.AccountingSettings.BottleDeposit.Table.IsNotEmpty(),
        "Error: Bottle Deposit table should not be empty"
        ).toBeTruthy();
 
        // --- Step 3: Sort Table (to bring new record on top) ---
        await ADMIN.Settings.AccountingSettings.BottleDeposit.Table.SortByColumn({
            columnTitle: "Id",
            sortOrder: "descending",
        });
 
        // --- Step 4: Delete the Bottle Deposit ---
        await ADMIN.Settings.AccountingSettings.BottleDeposit.Table.Delete({
            rowColumn: "Name",
            rowValue: bottleDeposit,
        });
 
        // Confirm deletion in the confirmation dialog
        await ADMIN.Dialog.Confirmation.Yes.Click();
        await ADMIN.Refresh.Click();
 
        // --- Step 5: Sort Table (to bring new record on top) ---
        await ADMIN.Settings.AccountingSettings.BottleDeposit.Table.SortByColumn({
            columnTitle: "Id",
            sortOrder: "descending",
        });
 
        // --- Step 6: Validate Deletion ---
        const stillExists = await ADMIN.Settings.AccountingSettings.BottleDeposit.Table.RowExists({
            rowColumn: "Name",
            rowValue: bottleDeposit,
        });
 
        // Final assertion → row should no longer exist
        expect(stillExists,`Error: Bottle Deposit "${bottleDeposit}" was not deleted`
        ).toBeFalsy();
    });
 
 
    test("[C8239] Verify Bottle Deposit Table sorting", async () => {
        await ADMIN.Login.In();
        await ADMIN.Menu.Accounting_Settings.GoTo();

        const table = ADMIN.Settings.AccountingSettings.BottleDeposit.Table;

        expect(
            await table.IsNotEmpty(),
            "Error: Bottle Deposit table should not be empty"
        ).toBeTruthy();

        const sortableColumns: ("Id" | "Name")[] = ["Id", "Name"];

        for (const col of sortableColumns) {
            await table.SortByColumn({ columnTitle: col, sortOrder: "descending" });
            const firstDesc = await table.GetCellValue({ getValueFrom: col }, { rowIndex: 1 });

            await table.SortByColumn({ columnTitle: col, sortOrder: "ascending" });
            const firstAsc = await table.GetCellValue({ getValueFrom: col }, { rowIndex: 1 });

            expect(
            firstAsc,
            `Error: Ascending sort did not change first row value for column ${col}`
            ).not.toEqual(firstDesc);
        }
    });


    test("[C8240] Verify Bottle Deposit Table search", async () => {
        const searchTerm = `${Math.floor(Math.random() * 1000).toString().padStart(3, "0")}PK`;
     
        await Initializer.LoadScenario({
        Admin: {
            Settings: {
            AccountingSettings: {
                BottleDeposit: [{ Name: searchTerm, Amount: 1 }],
            },
            },
        },
        });
 
        // --- Step 1: Login and Navigate ---
        await ADMIN.Login.In();
        await ADMIN.Menu.Accounting_Settings.GoTo();
 
        // Verify table is not empty before searching
        expect(await ADMIN.Settings.AccountingSettings.BottleDeposit.Table.IsNotEmpty(),
        "Error: Bottle Deposit table should not be empty"
        ).toBeTruthy();
 
        // --- Step 2: Search for a known deposit ---
      
        await ADMIN.Settings.AccountingSettings.BottleDeposit.Search.setText({ value: searchTerm });
 
        // Verify only matching row(s) are shown
        const searchFound = await ADMIN.Settings.AccountingSettings.BottleDeposit.Table.RowExists({
            rowColumn: "Name",
            rowValue: searchTerm,
        });
        expect(searchFound,`Error: Bottle Deposit "${searchTerm}" not found after search`).toBeTruthy();
 
        // Optionally validate the first row is exactly our search term
        const firstRowName = await ADMIN.Settings.AccountingSettings.BottleDeposit.Table.GetCellValue(
            { getValueFrom: "Name" },
            { rowIndex: 1 }
        );
        expect(firstRowName,`Error: Expected first search result to be "${searchTerm}", but got "${firstRowName}"`
        ).toEqual(searchTerm);
 
        // --- Step 3: Clear the search ---
        await ADMIN.Settings.AccountingSettings.BottleDeposit.Search.clear();
 
        // Verify the table resets and shows multiple rows again
        expect(await ADMIN.Settings.AccountingSettings.BottleDeposit.Table.IsNotEmpty(),
        "Error: Table did not reset after clearing search"
        ).toBeTruthy();
    });
 
 
    
    test("[C8241] Verify Bottle Deposit Table pagination", async () => {
        // --- Step 1: Login and Navigate ---
        await ADMIN.Login.In();
        await ADMIN.Menu.Accounting_Settings.GoTo();
 
        // Verify table is not empty before testing pagination
        expect(await ADMIN.Settings.AccountingSettings.BottleDeposit.Table.IsNotEmpty(),
        "Error: Bottle Deposit table should not be empty"
        ).toBeTruthy();
 
        // --- Step 2: Verify pagination controls are visible ---
        const pagination = ADMIN.Settings.AccountingSettings.BottleDeposit.Table.Pagination;
        expect(await pagination.IsVisible(),"Error: Pagination controls not visible").toBeTruthy();
 
        // --- Step 3: Navigate to Page 2 ---
        await pagination.ClickPage(2);
        const page2 = await pagination.GetCurrentPage();
        expect(page2,`Error: Expected to be on page 2, but current page is ${page2}`).toBe(2);
 
        // --- Step 4: Navigate back to Page 1 using Previous ---
        await pagination.ClickPrevious();
        const page1 = await pagination.GetCurrentPage();
        expect(page1,`Error: Expected to be on page 1 after clicking Previous, but current page is ${page1}`).toBe(1);
 
        // --- Step 5: Navigate forward to Page 2 using Next ---
        await pagination.ClickNext();
        const page2Again = await pagination.GetCurrentPage();
        expect(page2Again,`Error: Expected to be on page 2 after clicking Next, but current page is ${page2Again}`).toBe(2);
 
    });
 
    test("[C8243] Verify Add Bottle Deposit functionality in Admin portal", { tag: ['@admin', '@bottleDeposit', '@add'] }, async () => {
        const bottleDeposit = "Bottle Deposit" + new Date().getTime();
 
        // --- Step 1: Login into Admin with admin credentials ---
        await ADMIN.Login.In();
 
        // --- Step 2: Navigate to Accounting Settings ---
        await ADMIN.Menu.Accounting_Settings.GoTo();
 
        // --- Step 3: Open Add Bottle Deposit dialog ---
        await ADMIN.Settings.AccountingSettings.BottleDeposit.Add.Click();
        await ADMIN.Dialog.AddBottleDeposit.Name.setText({ value: bottleDeposit });
        await ADMIN.Dialog.AddBottleDeposit.Amount.setText({ value: "1" });
 
        // --- Step 4: Save the new Bottle Deposit ---
        await ADMIN.Dialog.AddBottleDeposit.Save.Click();
 
        // --- Step 5: Sort table by Id (descending) to bring the new entry on top ---
        await ADMIN.Settings.AccountingSettings.BottleDeposit.Table.SortByColumn({
            columnTitle: "Id",
            sortOrder: "descending",
        });
 
        // --- Step 6: Verify Bottle Deposit was added successfully ---
        const exists = await ADMIN.Settings.AccountingSettings.BottleDeposit.Table.RowExists({
            rowColumn: "Name",
            rowValue: bottleDeposit,
        });
        expect(exists, `Error: Bottle Deposit "${bottleDeposit}" was not added`).toBe(true);
 
        const topRowValue = await ADMIN.Settings.AccountingSettings.BottleDeposit.Table.GetCellValue(
            { getValueFrom: "Name" },
            { rowIndex: 1 }
        );
        expect(topRowValue, `Error: Expected top row to be "${bottleDeposit}", but got "${topRowValue}"`).toBe(bottleDeposit);
    });
 
 
    test("[C8237] Verify Edit Bottle Deposit functionality in Admin portal", { tag: ['@admin', '@bottleDeposit', '@edit'] }, async () => {
        // Create a unique Bottle Deposit entry so we can safely delete it
        const bottleDeposit = `${Math.floor(Math.random() * 1000).toString().padStart(3, "0")}PK`;
 
        await Initializer.LoadScenario({
            Admin: {
                Settings: {
                    AccountingSettings: {
                        BottleDeposit: [{ Name: bottleDeposit, Amount: 1 }],
                    },
                },
            },
        });
 
    
        // --- Step 2: Login into Admin with admin credentials ---
        await ADMIN.Login.In();
 
        // --- Step 3: Navigate to Accounting Settings ---
        await ADMIN.Menu.Accounting_Settings.GoTo();
          console.log(`Bootle deposit Item adding to search field "${bottleDeposit}"`);
 
        // --- Step 4: Search for the Bottle Deposit ---
        await ADMIN.Settings.AccountingSettings.BottleDeposit.Search.setText({ value: bottleDeposit });
 
        const existsBeforeEdit = await ADMIN.Settings.AccountingSettings.BottleDeposit.Table.RowExists({
            rowColumn: "Name",
            rowValue: bottleDeposit,
        });
        expect(existsBeforeEdit, `Error: Bottle Deposit "${bottleDeposit}" was not found before edit`).toBe(true);
 
        // --- Step 5: Edit the Bottle Deposit ---
        await ADMIN.Settings.AccountingSettings.BottleDeposit.Table.Edit({
            rowColumn: "Name",
            rowValue: bottleDeposit,
        });
 
        await ADMIN.Dialog.EditBottleDeposit.Amount.setText({ value: "2" });
        await ADMIN.Dialog.EditBottleDeposit.Update.Click();
 
        // --- Step 6: Verify the Bottle Deposit was updated ---
        const existsAfterEdit = await ADMIN.Settings.AccountingSettings.BottleDeposit.Table.RowExists({
            rowColumn: "Name",
            rowValue: bottleDeposit,
        });
        expect(existsAfterEdit, `Error: Bottle Deposit "${bottleDeposit}" was not found after edit`).toBe(true);
 
        const updatedAmount = await ADMIN.Settings.AccountingSettings.BottleDeposit.Table.GetCellValue(
            { getValueFrom: "Amount" },
            { rowIndex: 1 }
        );
        expect(updatedAmount, `Error: Expected Amount=2 for "${bottleDeposit}", but got "${updatedAmount}"`).toBe("2");
    });
 
 
    test("[C8261] Verify Bottle Deposit Return Amount field accepts input", { tag: ['@admin', '@bottleDeposit', '@regression'] }, async () => {
        const returnAmount = "-0.10"; // test value to enter
 
        // --- Step 1: Login into Admin with admin credentials ---
        await ADMIN.Login.In();
 
        // --- Step 2: Navigate to Accounting Settings ---
        await ADMIN.Menu.Accounting_Settings.GoTo();
 
        // --- Step 3: Locate the Bottle Deposit Return Amount field and enter value ---
        await ADMIN.Settings.AccountingSettings.BottleDeposit.ReturnAmount.setText({ value: returnAmount });
 
        const enteredValue = await ADMIN.Settings.AccountingSettings.BottleDeposit.ReturnAmount.getText();
        expect(enteredValue, `Error: Expected Return Amount field to have value "${returnAmount}", but got "${enteredValue}"`).toBe(returnAmount);
 
        // --- Step 4: Save changes ---
        await ADMIN.Settings.AccountingSettings.Save.Click();
 
        // --- Step 5: Verify success dialog appears ---
        expect(await ADMIN.Dialog.Success.IsVisible(), "Error: Success dialog was not shown after saving Bottle Deposit Return Amount").toBeTruthy();
 
        await ADMIN.Dialog.Success.Ok.Click();
    });
 
 
    
 
});
 