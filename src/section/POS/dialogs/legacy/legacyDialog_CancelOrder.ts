import { type Page } from "playwright";
import { Legacy_BaseDialog } from "../../../../base/legacy/legacy_BaseDialog";
import { Button } from "../../../../objects/button";


export class LegacyDialog_CancelOrder extends Legacy_BaseDialog {

    public Yes : Button;
    public No : Button;
    
    constructor(page: Page){ 
        super(page, page.locator('//dialog[.//*[text()="Cancel Order"]]'));

        this.Yes = new Button(this._locator.locator('button').filter({ hasText: 'Yes' }));
        this.No = new Button(this._locator.locator('button').filter({ hasText: 'No' }));
    }
}