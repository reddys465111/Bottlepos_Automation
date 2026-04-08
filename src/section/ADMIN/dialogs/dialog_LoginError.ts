
import { type Locator, type Page } from "@playwright/test";
import { Legacy_BaseDialog } from "../../../base/legacy/legacy_BaseDialog";
import { Button } from "../../../objects/button";
export class Dialog_LoginError extends Legacy_BaseDialog{

    public Ok: Button;
    constructor(page: Page){ 
        super(page, 'Login Error');
        this.Ok = new Button(this._locator.getByRole('button', {name: 'Ok'}));
    }

}