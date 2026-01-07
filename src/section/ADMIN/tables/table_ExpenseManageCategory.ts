import { Locator, Page } from "@playwright/test";
import { BaseTable } from "../../../base/baseTable";
import { RowQuery } from "../../../base/baseTable";

export type titles = 'ID' | 'Name' | 'Options';

export class Table_ManageExpensecaetgory extends BaseTable<titles> {
    private _page: Page | null;
    private _lastRecordDeleted = false;
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
    // Method to Delete the Record

    public async Delete(...rowQuery: RowQuery<titles>[]): Promise<void> {
        await this.WaitUntilVisible();

        let rowLocator: Locator;

        // Determine which row to delete
        if (rowQuery && rowQuery.length > 0) {
            rowLocator = await this.GetRow(...rowQuery);
        } else {
            rowLocator = this._locator.locator('tbody tr:visible').last();
            if (this._page) {
                try {
                    const searchInput = this._page.locator(
                        '#managecategorytable_filter input[type="search"]'
                    );
                    const searchVal = (await searchInput.inputValue().catch(() => '')).trim();
                    if (searchVal) {
                        try {
                            rowLocator = await this.GetRow({
                                rowColumn: 'Name',
                                rowValue: searchVal
                            });
                        } catch {
                            rowLocator = this._locator.locator('tbody tr:visible').last();
                        }
                    }
                } catch {

                }
            }
        }
        await rowLocator.waitFor({ state: 'visible', timeout: 3000 });

        // Handle native confirmation dialog before Delete click
        if (this._page) {
            this._page.once('dialog', async dialog => {
                if (dialog.type() === 'confirm') {
                    await dialog.accept().catch(() => { });
                }
            });
        }
        //  Click Delete icon
        const deleteIcon = rowLocator.locator(
            '.action-buttons a.red i.icon-trash'
        );

        await deleteIcon.waitFor({ state: 'visible', timeout: 3000 });
        await deleteIcon.click({ force: true });

        //  Handle custom UI confirmation (if JQueary Comfirm Dialog is used)
        if (this._page) {
            const confirmationDialog = this._page.locator(
                '.ui-dialog:has(.ui-dialog-title:has-text("Confirm"))'
            );

            try {
                await confirmationDialog.waitFor({ state: 'visible', timeout: 7000 });
                await confirmationDialog.getByRole('button', { name: 'Yes' }).click();
                await confirmationDialog.waitFor({ state: 'hidden', timeout: 8000 }).catch(() => { });
            } catch {

            }
            // Optimistically mark deleted so synchronous checks reflect action immediately
            this._lastRecordDeleted = true;

            //  Verify deletion
            const deadline = Date.now() + 15000;
            while (Date.now() < deadline) {
                const deleted = await this._checkRecordDeleted(1000).catch(() => false);
                this._lastRecordDeleted = !!deleted;
                if (deleted) return;
                await this._page.waitForTimeout(500);
            }
        }
    }


    // Verify deleted record in table
    private async _checkRecordDeleted(timeout = 10000): Promise<boolean> {
        await this.WaitUntilVisible();

        const bodyRows = this._locator.locator('tbody tr');
        try {
            await bodyRows.first().waitFor({ state: 'visible', timeout: 3000 }).catch(() => {
                // Rows might not load if table is empty
            });
        } catch {
            // Table might be empty, continue to check
        }

        const emptyRow = this._locator.locator(
            'tbody td.dataTables_empty',
            { hasText: /No matching records found|No data available/i }
        );

        try {
            await emptyRow.waitFor({ state: 'visible', timeout });
            return true;
        } catch {
            const rows = this._locator.locator('tbody tr:not(.dataTables_empty)');
            const rowCount = await rows.count();
            return rowCount === 0;
        }
    }
    public IsRecordDeleted(): boolean {
        return !!this._lastRecordDeleted;
    }


}




