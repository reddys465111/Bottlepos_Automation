import { type Page } from "@playwright/test";
import { Button } from "../../../objects/button";
import { BaseDialog } from "../../../base/baseDialog";
import { LabelField } from "../../../objects/labelField";

export class Dialog_CheckoutComplete extends BaseDialog {

    public Yes : Button;
    public No : Button;
    public Change : LabelField;

    constructor(page: Page){ 
        super(page, 'Checkout Complete');
        this.Yes = new Button(
        this._locator.getByRole('button', { name: 'Yes' }),
        {
          afterEvent: async () => {
            await this.Yes._locator.page().waitForTimeout(3000);
          }
        }
      );
        this.No = new Button(
        this._locator.getByRole('button', { name: 'No' }),
        {
          afterEvent: async () => {
            await this.No._locator.page().waitForTimeout(3000);
          }
        }
      );

        this.Change = new LabelField(this._locator.getByText('Change: $'));
    }
}