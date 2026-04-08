import { Page } from "@playwright/test";
import { BaseDialog } from "../../../base/baseDialog";
import { Button } from "../../../objects/button";


export class Dialog_ManagePromotions extends BaseDialog {
    
    public Add : Button;
    public Close : Button;
    
    constructor(page: Page) { 
        super(page, "Manage Promotions"); 
        this.Add = new Button(this._locator.locator('[title ="Add"]'));
        this.Close = new Button(this._locator.locator('[title ="Close"]'));
    }
}