import { type Page } from "@playwright/test";
import { Button } from "../../../objects/button";
import { BaseDialog } from "../../../base/baseDialog";
import { Legacy_Login } from "../legacy_Login";
import { Legacy_BaseDialog } from "../../../base/legacy/legacy_BaseDialog";

export class Dialog_ReloadData extends Legacy_BaseDialog {

    public Yes : Button;
    public No: Button;
    constructor(page: Page) { 
        super(page, 'Reload Data');
        this.Yes = new Button(
        this._locator.getByRole('button', { name: 'Yes' }),
        {
          afterEvent: async () => {
            await this.Yes._locator.page().waitForTimeout(3000);
          }
        }
      );
        this.No = new Button(this._locator.getByRole('button', { name: 'No' }));

       
    }}