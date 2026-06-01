import { type Page } from "@playwright/test";
import { Button } from "../../../objects/button";
import { BaseDialog } from "../../../base/baseDialog";
import { Legacy_BaseDialog } from "../../../base/legacy/legacy_BaseDialog";

export class Dialog_ReportDialog extends BaseDialog {

    public Yes : Button;
    public No : Button;

    constructor(page: Page){ 
        super(page, 'Report Dialog');
        this.Yes = new Button(this._locator.getByRole('button', {name: "Yes"}));
        this.No = new Button(this._locator.getByRole('button', {name: "No"}));

        this.Yes.SetAfterEvent(async () => {
            await this._page.waitForTimeout(2500);
        });
    }
}