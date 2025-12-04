import { Page, type Locator } from "@playwright/test";
import { BaseDialog } from "../../../base/baseDialog";
import { Button } from "../../../objects/button";
import { Dropdown } from "../../../objects/dropdown";
import { TextField } from "../../../objects/textField";

export class Dialog_AddReward extends BaseDialog {

    public Name: TextField;
    public Amount: TextField;
    public OfferType: Dropdown;
    public PointsNeeded: TextField;
    public Save: Button;
    public Cancel: Button;

    constructor(page: Page) {
        super(page, "Add Reward");
        this.Name = new TextField(this._locator.locator("#custoffername"));
        this.Amount = new TextField(this._locator.locator("#custoffervalue"));
        this.OfferType = new Dropdown(this._locator.locator("#custoffertype"));
        this.PointsNeeded = new TextField(this._locator.locator("#custofferpoints"));
        this.Save = new Button(this._locator.locator("button[title='Save']"));
        this.Cancel = new Button(this._locator.locator("button[title='Cancel']"));
    }

}