import { type Page } from "@playwright/test";
import { Button } from "../../../objects/button";
import { BaseDialog } from "../../../base/baseDialog";

export class Dialog_Customernotfound extends BaseDialog {

    public CreateNewCustomer : Button

    constructor(page: Page) { 
        super(page, 'Customer Not Found');
        this.CreateNewCustomer = new Button(this._locator.getByRole('button', { name: 'Create New Customer' }));
    }
}