import { Page } from "@playwright/test";
import { BaseDialog } from "../../../base/baseDialog";
import { Button } from "../../../objects/button";
import { TextField } from "../../../objects/textField";
import { Dialog_AdvanceSearch } from "./dialog_AdvanceSearch";

export class Dialog_BulkUpdate extends BaseDialog {
    
    public AdvanceSearch : Button;
    public AdvanceUpdate : Button;
    public Name : TextField;
    public Save : Button;
    public Dialog_AdvanceSearch : Dialog_AdvanceSearch;

    
    constructor(page: Page){ 
        super(page, "Bulk Update");

        this.AdvanceSearch = new Button(this._locator.locator('[title="Advance Search"]'));
        this.AdvanceUpdate = new Button(this._locator.locator('[title="Advance Update"]'));
        this.Name = new TextField(this._locator.locator('#bulkname'));
        
        this.Save = new Button(this._locator.locator('[title ="Save"]'));


        this.Dialog_AdvanceSearch = new Dialog_AdvanceSearch(page);

    }

}