import { type Page } from "@playwright/test";
import { Legacy_BaseDialog } from "../../../base/legacy/legacy_BaseDialog";
import { Button } from "../../../objects/button";

export class Dialog_Confirmation extends Legacy_BaseDialog {

    public Yes : Button;
    public No : Button;

    constructor(page: Page){ 
        super(page, 'Confirmation');
        this.Yes = new Button(this._locator.getByRole('button', {name: "Yes"}));
        this.No = new Button(this._locator.getByRole('button', {name: "No"}));

        this.Yes.SetAfterEvent(async () => {
            await this._page.waitForTimeout(2500);
        });
    }
     public async acceptIfExists(): Promise<void> {
  if (await this._locator.isVisible().catch(() => false)) {
    await this.Yes.Click();
  }
}
}