import { Page } from "@playwright/test";
import { Button } from "../../../objects/button";
import { Legacy_BaseDialog } from "../../../base/legacy/legacy_BaseDialog";

export class Dialog_Success extends Legacy_BaseDialog  {
    public Ok: Button;

    constructor(page: Page) {
        super(page, page.locator('[aria-describedby="ok-dialog-box"]'));
        this.Ok = new Button(this._locator.getByRole('button', { name: 'OK' }));
    }
}