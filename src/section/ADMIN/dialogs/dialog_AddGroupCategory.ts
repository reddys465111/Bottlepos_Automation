import { Page } from "@playwright/test";
import { BaseDialog } from "../../../base/baseDialog";
import { Button } from "../../../objects/button";
import { Checkbox } from "../../../objects/checkbox";
import { TextField } from "../../../objects/textField";


export class Dialog_AddGroupCategory extends BaseDialog {
    
    public Name : TextField;
    public DoNotShowToWebstore: Checkbox; 
    public Save : Button;
    public Cancel : Button;

    
    constructor(page: Page){ 
        super(page, "Add Group Category");
        
        this.Name = new TextField(this._locator.locator('#grpcategoryname'));
        this.DoNotShowToWebstore = new Checkbox(this._locator.locator('#grpcataddtoweb'));
        this.Save = new Button(this._locator.locator('[title="Save"]'));
        this.Cancel = new Button(this._locator.locator('[title="Cancel"]'));

    }

}