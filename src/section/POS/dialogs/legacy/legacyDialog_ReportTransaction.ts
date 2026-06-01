import { type Page,expect } from "@playwright/test";
import { Legacy_BaseDialog } from "../../../../base/legacy/legacy_BaseDialog";
import { Button } from "../../../../objects/button";
import { Legacy_BaseTable } from "../../../../base/legacy/legacy_BaseTable";
import { TextField } from "../../../../objects/textField";

export type Columns_TransactionReport =
  | "Ref"
  | "Time"
  | "User"
  | "Total"
  | "Details";


export class LegacyDialog_ReportTransaction extends Legacy_BaseDialog {

    public Details : Button;
    public Close : Button;
    public Search: TextField;
    public next : Button;
    public TransactionTable: Legacy_BaseTable<Columns_TransactionReport>;

    constructor(page: Page){ 
        super(page);

        this.Details = new Button(this._locator.getByRole('button', {name: "   Details"}));
        this.Close = new Button(this._locator.locator('button.ui-dialog-titlebar-close'));
        this.Search = new TextField(this._locator.locator('input[aria-controls="transaction_datatable"]'));
        this.next = new Button(this._locator.locator('#transaction_datatable_next a'));
 
        this.TransactionTable = new Legacy_BaseTable<Columns_TransactionReport>(
            page.locator('#transaction_datatable')
        );

        this.Details.SetAfterEvent(async () => {
            await this._page.waitForTimeout(2500);
        });
    }
    /**
 * Wait until dialog and table are fully loaded
 */
public async WaitForLoaded(): Promise<void> {
    await expect(this._locator).toBeVisible();
    await expect(this._locator.locator('#transaction_datatable')).toBeVisible();
    await expect(this._locator.locator('#transaction_datatable tbody tr').first()).toBeVisible();
}

/**
 * Navigate through all pages until last page
 */
public async goToNextPageUntilEnd(): Promise<boolean> {
    let pageVisited = 0;
    const nextButton = this._locator.locator('#transaction_datatable_next');

    while (pageVisited < 50 && await this.IsVisible()) {
        if (await nextButton.getAttribute('class')?.then(c => c?.includes('disabled'))) break;

        await nextButton.locator('a').click();
        await this.WaitForLoaded();
        pageVisited++;
    }

    return pageVisited > 0;
}
}
