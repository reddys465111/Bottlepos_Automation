import { Page } from "@playwright/test";
import { Legacy_BaseDialog } from "../../../base/legacy/legacy_BaseDialog";
import { Button } from "../../../objects/button";
import { Dropdown } from "../../../objects/dropdown";

export class Dialog_ReportAdvanceSearch extends Legacy_BaseDialog {
    public User: Dropdown;
    public Device: Dropdown;
    public itemtype: Dropdown;
    public Search: Button;
    public Cancel: Button;

    constructor(page: Page) {
        super(page, "Advance Search");
        this.User = new Dropdown(this._locator.locator('#userstafflistsselect'));
        this.Device = new Dropdown(this._locator.locator('#devicelistsselect'));
        this.itemtype = new Dropdown(this._locator.locator('#invitemtype'));
        this.Search = new Button(this._locator.locator('[title ="Search"]'));
        this.Cancel = new Button(this._locator.locator('[title ="Cancel"]'));
    }
}