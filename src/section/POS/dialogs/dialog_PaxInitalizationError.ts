import { type Page } from "playwright";
import { Button } from "../../../objects/button";
import { BaseDialog } from "../../../base/baseDialog";

export class Dialog_PaxInitializationError extends BaseDialog{

    public Ok : Button;
    
    constructor(page: Page) { 
        super(page, 'Pax Initialization Error');
        this.Ok = new Button(this._locator.locator('button[title=Ok]'));
    }
}