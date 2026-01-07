import { Locator,Page } from "playwright";
import { Legacy_BaseDialog } from "../../../base/legacy/legacy_BaseDialog";
import { Button } from "../../../objects/button";
import { TextField } from "../../../objects/textField";


export class Dialog_InventoryEditStock extends Legacy_BaseDialog {
    public Quantity: TextField;
    public Update  : Button;
    public Cancel  : Button;

     constructor(page: Page) {
        super(page, "Edit Stock");
        this.Quantity = new TextField(this._locator.locator('#setstockqty'));
        this.Update = new Button(this._locator.locator('button[title="Update"]'));
        this.Cancel = new Button(this._locator.locator('button[title="Cancel"]'));
    }


}