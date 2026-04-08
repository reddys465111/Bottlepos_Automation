import { type Page } from "@playwright/test";
import { BaseDialog } from "../../../base/baseDialog";
import { Button } from "../../../objects/button";

export class Dialog_Success extends BaseDialog {
    
    public Close : Button;
    public PrintReceipt: Button;
    public Ok: Button;

    constructor(page: Page) { 
        super(page, 'Success');
        this.Close = new Button(this._locator.getByRole('button', { name: 'Close' }));
        this.PrintReceipt = new Button(this._locator.getByRole('button', { name: 'Print Receipt' }));
        this.Ok = new Button(this._locator.getByRole('button', { name: 'OK' }));
    }
}