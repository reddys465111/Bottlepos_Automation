import { type Page } from "@playwright/test";
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
    public TransactionTable: Legacy_BaseTable<Columns_TransactionReport>;

    constructor(page: Page){ 
        super(page);

        this.Details = new Button(this._locator.getByRole('button', {name: "Details"}));
        this.Close = new Button(this._locator.locator('.ui-dialog-buttonpane button[title="Close"]'));
        this.Search = new TextField(this._locator.locator('input[aria-controls="transaction_datatable"]'));

        this.TransactionTable = new Legacy_BaseTable<Columns_TransactionReport>(
            page.locator('#transaction_datatable')
        );

        this.Details.SetAfterEvent(async () => {
            await this._page.waitForTimeout(2500);
        });
    }
}
