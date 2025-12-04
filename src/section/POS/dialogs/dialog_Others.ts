import { BaseDialog } from "../../../base/baseDialog";
import { Button } from "../../../objects/button";
import { Page } from "@playwright/test";

export class Dialog_OthersButton extends BaseDialog {

  public EBTSalebalance: Button;
  public EBTCashbalance: Button;
  public CloseButton: Button;

  constructor(page: Page) {
    super(page,'Others');

    // Match nested text inside button
    this.EBTSalebalance = new Button(
      this._locator.locator('button:has-text("Check EBT Sale Balance")')
    );

    this.EBTCashbalance = new Button(
      this._locator.locator('button:has-text("Check EBT Cash Balance")')
    );

    this.CloseButton = new Button(
      this._locator.locator('button:has-text("Close")')
    );
  }
}
