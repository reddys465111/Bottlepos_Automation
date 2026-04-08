import { BaseDialog } from "../../../base/baseDialog";
import { Dropdown } from "../../../objects/dropdown";
import { Button } from "../../../objects/button";
import { Locator, Page } from "@playwright/test";

export class Dialog_InitialDeviceSetup extends BaseDialog {

    public ExistingDevice: Dropdown;
    public ExistingLocation: Dropdown;
    public Register: Button;
    
    constructor(page: Page) {
        super(page, 'Initial Device Setup');
        this.ExistingDevice = new Dropdown(this._locator.locator('#posdevices'));
        this.ExistingLocation = new Dropdown(this._locator.locator('#poslocations'));
        this.Register = new Button(this._locator.locator('button[title=Register]'))
    }
}