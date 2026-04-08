import { Locator, Page } from "@playwright/test";
import { BaseTable } from "../../../base/baseTable";
import { RowQuery } from "../../../base/baseTable";



export type titles = 'ID' | 'Name' | 'Options';

export class Table_ManageExpenseTypes extends BaseTable<titles> {
    private _page: Page | null;

    constructor(locator: Locator, page?: Page) {
        super(locator);
        this._page = page || null;
    }

    /**
     *  @param 
     */
    public async Edit(...rowQuery: RowQuery<titles>[]): Promise<void> {
        await this.WaitUntilVisible();
        let rowLocator: Locator;
        if (rowQuery && rowQuery.length > 0) {
            //  Edit specific row
            rowLocator = await this.GetRow(...rowQuery);
        } else {
            //  Edit latest row (fallback)
            rowLocator = this._locator.locator('tbody tr:last-child');
        }
        await rowLocator.waitFor({ state: 'visible', timeout: 2500 });
        await rowLocator.locator('.action-buttons a:nth-of-type(1)').click();
    }
    /**
     * @param 
     */
    // Method to Delete Expense Type
    public async Delete(...rowQuery: RowQuery<titles>[]): Promise<void> {
        await this.WaitUntilVisible();
        let rowLocator: Locator;
        if (rowQuery && rowQuery.length > 0) {
            // Delete specific row
            rowLocator = await this.GetRow(...rowQuery);
        } else {
            // Prefer deleting the currently filtered row (if search is applied)
            rowLocator = this._locator.locator('tbody tr:last-child');
            if (this._page) {
                try {
                    const searchInput = this._page.locator('#manageexpensetypetable_filter input[type="search"]');
                    const searchVal = (await searchInput.inputValue().catch(() => '')).trim();
                    if (searchVal) {
                        // try to find the row by Name column matching the search value
                        try {
                            rowLocator = await this.GetRow({ rowColumn: 'Name', rowValue: searchVal });
                        } catch {
                            // fallback to last-child
                            rowLocator = this._locator.locator('tbody tr:last-child');
                        }
                    }
                } catch {
                    // ignore and fallback
                }
            }
        }
        await rowLocator.waitFor({ state: 'visible', timeout: 2500 });

        // Prepare to handle a native JS confirm dialog (if used) before clicking
        if (this._page) {
            this._page.once('dialog', async dialog => {
                try {
                    await dialog.accept();
                } catch {
                    // ignore
                }
            });
        }

        // Delete button = second action icon
        await rowLocator.locator('.action-buttons a:nth-of-type(2)').click();

        // If we have the page, handle confirmation UI dialog fallback and wait for table refresh here
        if (this._page) {
            const confirmationDialog = this._page.locator(`.ui-dialog:has(.ui-dialog-title:has-text("Confirm"))`);
            // Wait for confirmation dialog and click Yes (if a custom dialog is used)
            try {
                await confirmationDialog.waitFor({ state: 'visible', timeout: 7000 });
                const yes = confirmationDialog.getByRole('button', { name: 'Yes' });
                await yes.click();
                // Wait for dialog to disappear
                await confirmationDialog.waitFor({ state: 'hidden', timeout: 8000 }).catch(() => { });
            } catch {
                // If the dialog never appears (native confirm accepted), continue
            }

            // Poll for table update: either empty message appears or target row count becomes zero
            const deadline = Date.now() + 15000;
            while (Date.now() < deadline) {
                const deleted = await this.IsRecordDeleted(1000).catch(() => false);
                if (deleted) return;
                await this._page.waitForTimeout(500);
            }
        }
    }

        // Method to verify if record is deleted in table 
    public async IsRecordDeleted(timeout = 10000): Promise<boolean> {
        // Wait for the table to finish any pending updates
        await this.WaitUntilVisible();
        // This handles the table refresh after search
        const bodyRows = this._locator.locator('tbody tr');
        try {
            await bodyRows.first().waitFor({ state: 'visible', timeout: 3000 }).catch(() => {
                // Rows might not load if table is empty
            });
        } catch {
            // Table might be empty, continue to check
        }

        // Check for the "No matching records found" message
        const emptyRow = this._locator.locator(
            'tbody td.dataTables_empty',
            { hasText: /No matching records found|No data available/i }
        );

        try {
            await emptyRow.waitFor({ state: 'visible', timeout });
            return true;
        } catch {
            // Also check if tbody has no rows at all
            const rows = this._locator.locator('tbody tr:not(.dataTables_empty)');
            const rowCount = await rows.count();
            return rowCount === 0;
        }
    }

}
