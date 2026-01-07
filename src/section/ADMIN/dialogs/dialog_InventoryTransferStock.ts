import { type Locator, type Page } from "@playwright/test";
import { Button } from "../../../objects/button";
import { TextField } from "../../../objects/textField";
import { Legacy_BaseDialog } from "../../../base/legacy/legacy_BaseDialog";
import { Dropdown } from "../../../objects/dropdown";


export class Dialog_InventoryTransferStock extends Legacy_BaseDialog {
    public TransferTo: Dropdown;
    public Qty: TextField;
    public Update: Button;
    public Cancel: Button;
   

    constructor(page: Page) {
        super(page, "Transfer Stock");
        this.TransferTo = new Dropdown(this._locator.locator('#tstocknewlocid'));
        this.Qty = new TextField(this._locator.locator('#tstockqty'));
        this.Update = new Button(this._locator.getByRole('button', { name: 'Update' }));
        this.Cancel = new Button(this._locator.getByRole('button', { name: 'Cancel' }));
    }
    // Get all locations from TransferTo dropdown
    async getAllTransferToLocations(): Promise<string[]> {
        return await this._locator
            .locator('#tstocknewlocid option')
            .allTextContents();
    }
}