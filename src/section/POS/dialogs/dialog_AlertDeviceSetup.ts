import { Page } from "playwright";
import { Button } from "../../../objects/button";
import { BaseDialog } from "../../../base/baseDialog";

export class Dialog_AlertDeviceSetup extends BaseDialog {

    public Ok : Button;
    
    constructor(page: Page){ 
        super(page, 'Alert!');
        this.Ok = new Button(this._locator.locator('button[title=Ok]'));
    }
}