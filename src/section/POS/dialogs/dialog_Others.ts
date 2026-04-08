import { BaseDialog } from "../../../base/baseDialog";
import { Button } from "../../../objects/button";
import { Page } from "@playwright/test";

export class Dialog_OthersButton extends BaseDialog {

  public EBTSalebalance: Button;
  public EBTCashbalance: Button;
  public ActivateGiftCardbutton: Button;
  public CheckGiftCardBalance: Button;
  public AddGiftCardBalance: Button;
  public CloseButton: Button;

  constructor(page: Page) {
  super(page, 'Others');


  this.EBTSalebalance = new Button(this._locator.getByRole('button', { name: 'Check EBT Sale Balance' }));

  this.EBTCashbalance = new Button(this._locator.getByRole('button', { name: 'Check EBT Cash Balance' }));

  this.ActivateGiftCardbutton = new Button(this._locator.getByRole('button', { name: 'Activate Gift Card', exact: true }));

  this.CheckGiftCardBalance = new Button(this._locator.getByRole('button', { name: 'Check Gift Card Balance', exact: true }));

  this.AddGiftCardBalance = new Button(this._locator.getByRole('button', { name: 'Add Gift Card Balance', exact: true }));

  this.CloseButton = new Button(this._locator.getByRole('button', { name: 'Close' })
  );
}

}
