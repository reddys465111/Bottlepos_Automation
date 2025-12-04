import { type Page } from "@playwright/test";
import { Button } from "../../../objects/button";
import { BaseDialog } from "../../../base/baseDialog";

export class Dialog_DeleteOrder extends BaseDialog {

    public Yes : Button;
    public No : Button; 

    constructor(page: Page){ 
        super(page, 'Delete Order');
        this.Yes = new Button(this._locator.getByRole('button', {name: "Yes"}));
        this.No = new Button(this._locator.getByRole('button', {name: "No"}));

        this.Yes.SetAfterEvent(async () => {
            await this._page.waitForTimeout(2500);
        });
    }
}