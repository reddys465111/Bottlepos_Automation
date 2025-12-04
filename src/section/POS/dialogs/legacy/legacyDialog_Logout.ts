import { type Page } from "@playwright/test";
import { Legacy_BaseDialog } from "../../../../base/legacy/legacy_BaseDialog";
import { Button } from "../../../../objects/button";

export class LegacyDialog_Logout extends Legacy_BaseDialog {

    public Yes : Button;
    public No: Button;

    constructor(page: Page) { 
        super(page, page.locator('[aria-describedby="confirm-dialog-box"]'));
        this.Yes = new Button(this._locator.getByRole('button', { name: 'Yes' }));
        this.No = new Button(this._locator.getByRole('button', { name: 'No' }));
    }
}
