
import { type Locator, type Page } from "@playwright/test";
import { Legacy_BaseDialog } from "../../../base/legacy/legacy_BaseDialog";
import { Button } from "../../../objects/button";

export class Dialog_Error extends Legacy_BaseDialog{

    public Ok: Button;
    constructor(page: Page){ 
        super(page, 'Error');
        this.Ok = new Button(this._locator.locator('button[title=Ok]'));
    }

}