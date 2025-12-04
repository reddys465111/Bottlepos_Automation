import { type Page } from "playwright";
import { BaseDialog } from "../../../base/baseDialog";
import { Button } from "../../../objects/button";

export class Dialog_Approved extends BaseDialog {
    
    public Yes: Button;
    public No: Button;

    constructor(page: Page){
        super(page, 'Approved');
        this.Yes = new Button(this._locator.getByRole('button', { name: 'Yes' }));
        this.No = new Button(this._locator.getByRole('button', { name: 'No' }));
    }
}