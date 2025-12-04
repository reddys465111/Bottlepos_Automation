import { type Page } from "@playwright/test";
import { Button } from "../../../objects/button";
import { BaseDialog } from "../../../base/baseDialog";

export class Dialog_Alert extends BaseDialog {

    public Ok : Button;
    
    constructor(page: Page){ 
        super(page, 'Alert!');
        this.Ok = new Button(this._locator.locator('button[title=Ok]'));
    }
}