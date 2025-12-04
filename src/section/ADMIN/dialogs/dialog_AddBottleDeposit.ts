import { Page } from "@playwright/test";
import { Locator } from "@playwright/test";
import { Legacy_BaseDialog } from "../../../base/legacy/legacy_BaseDialog";
import { Button } from "../../../objects/button";
import { TextField } from "../../../objects/textField";

export class Dialog_AddBottleDeposit extends Legacy_BaseDialog {
    public Name: TextField;
    public Amount: TextField;
    public Save: Button;
    public Cancel: Button;
    public Update: Button;

    constructor(page: Page, title?: string) {
        super(page, title || "Add Bottle Deposit");
        this.Name = new TextField(this._locator.locator("#bottledepositname"));
        this.Amount = new TextField(this._locator.locator("#bottledepositamount"));
        this.Save = new Button(this._locator.getByRole("button", {name: "Save"}));
        this.Cancel = new Button(this._locator.getByRole("button", {name: "Cancel"}));
        this.Update = new Button(this._locator.getByRole("button", {name: "Update"}));
    }
}