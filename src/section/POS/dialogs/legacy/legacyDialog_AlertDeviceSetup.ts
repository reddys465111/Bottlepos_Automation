
import { type Locator, type Page } from "@playwright/test";
import { Button } from "../../../../objects/button";
import { Legacy_BaseDialog } from "../../../../base/legacy/legacy_BaseDialog";


export class LegacyDialog_AlertDeviceSetup extends Legacy_BaseDialog {

    public Ok : Button;
    constructor(page: Page){ 
        super(page, 'Alert!');
        this.Ok = new Button(this._locator.locator('button[title=Ok]'));
    }
}