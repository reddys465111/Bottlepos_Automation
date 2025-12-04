import { type Page } from "@playwright/test";
import { BaseDialog } from "../../../base/baseDialog";
import { Button } from "../../../objects/button";

export class Dialog_Error extends BaseDialog{

    public Ok: Button;
    
    constructor(page: Page){ 
        super(page, 'Error');
        this.Ok = new Button(this._locator.getByRole('button', {name: 'Ok'}));
    }
}