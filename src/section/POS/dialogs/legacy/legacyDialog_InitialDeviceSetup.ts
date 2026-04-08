import { Page } from "@playwright/test";
import { Dropdown } from "../../../../objects/dropdown";
import { Button } from "../../../../objects/button";
import { Legacy_BaseDialog } from "../../../../base/legacy/legacy_BaseDialog";
import { Loader } from "../../../../objects/loader";

export class LegacyDialog_InitialDeviceSetup extends Legacy_BaseDialog {

    public ExistingDevice: Dropdown;
    public ExistingLocation: Dropdown;
    public Register: Button;
    public Loader: Loader;
    constructor(page: Page) {
        super(page, 'Initial Device Setup');
        this._locator = this._page.locator('div[aria-describedby="setupdiv"]');
        this.ExistingDevice = new Dropdown(this._locator.locator('#posdevices'));
        this.ExistingLocation = new Dropdown(this._locator.locator('#poslocations'));
        this.Register = new Button(this._locator.locator('button[title=Register]'))
        this.Loader = new Loader(this._page);

        this.Register.SetAfterEvent(async () => {
            await this.Loader.waitForVisible();
            await this.Loader.waitForHidden(); 
        });
    }
}