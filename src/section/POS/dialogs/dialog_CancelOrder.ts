import { type Page } from "playwright";
import { Button } from "../../../objects/button";
import { BaseDialog } from "../../../base/baseDialog";

export class Dialog_CancelOrder extends BaseDialog {

    public Yes : Button;
    public No : Button;
    
    constructor(page: Page){ 
        super(page, 'Cancel Order');

        this.Yes = new Button(this._locator.getByRole('button', { name: 'Yes' }));
        this.No = new Button(this._locator.getByRole('button', { name: 'No' }));
    }
}