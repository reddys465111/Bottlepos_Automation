import { type Page } from "@playwright/test";
import { Button } from "../../../objects/button";
import { BaseDialog } from "../../../base/baseDialog";
import { Legacy_Login } from "../legacy_Login";

export class Dialog_Logout extends BaseDialog {

    public Yes : Button;
    public No: Button;
    constructor(page: Page) { 
        super(page, 'Logout');
        this.Yes = new Button(this._locator.getByRole('button', { name: 'Yes' }));
        this.No = new Button(this._locator.getByRole('button', { name: 'No' }));

        this.Yes.SetAfterEvent(async () => {
            await this.WaitForHidden();
        });
    }
}