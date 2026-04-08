import { type Page } from "@playwright/test";
import { BaseDialog } from "../../../base/baseDialog";
import { Button } from "../../../objects/button";
import { LabelField } from "../../../objects/labelField";

export class Dialog_Error extends BaseDialog{

    public Ok: Button;
    public message: LabelField;
    
    constructor(page: Page){ 
        super(page, 'Error');
        this.Ok = new Button(this._locator.getByRole('button', {name: 'Ok'}));
        this.message = new LabelField(this._locator.getByTestId('simple-message-modal-message'));
    }
}