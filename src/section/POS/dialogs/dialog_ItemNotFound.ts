import { type Page } from "playwright";
import { Button } from "../../../objects/button";
import { BaseDialog } from "../../../base/baseDialog";

export class Dialog_itemnotfound extends BaseDialog {

    public OK : Button;
    public Browse : Button;
    public AddItem : Button;
    
    constructor(page: Page){ 
        
        super(page, 'Item Not Found');

        this.OK = new Button(this._locator.getByRole('button', { name: 'OK' }));
        this.Browse = new Button(this._locator.getByRole('button', { name: 'Browse' }));
        this.AddItem = new Button(this._locator.getByRole('button', { name: 'Add Item' }));
    }
}