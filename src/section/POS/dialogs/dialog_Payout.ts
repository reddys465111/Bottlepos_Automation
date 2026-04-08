import { BaseDialog } from "../../../base/baseDialog";
import { Button } from "../../../objects/button";
import { TextField } from "../../../objects/textField";
import { Combobox } from "../../../objects/combobox";

import { type Page } from "@playwright/test";

export class Dialog_Payout extends BaseDialog {
  public Type: Combobox;
  public Date: TextField;
  public PaymentMode: Combobox;
  public CheckNumber: TextField;
  public Amount: TextField;
  public Memo: TextField;
  public Vendor: Combobox;
  public Category: Combobox;
  public Invoice: TextField;

  public Save: Button;
  public Cancel: Button;

  constructor(page: Page) {
    // keep the BaseDialog title for compatibility, then scope to the testid'd modal
    super(page, "Add Payout");

    // Combobox inputs (Downshift-style)
    this.Type = new Combobox(this._locator.getByTestId('payout-type'), page);
    this.PaymentMode = new Combobox(this._locator.getByTestId('payout-payment-mode'), page);
    this.Vendor = new Combobox(this._locator.getByTestId('payout-vendor'), page);
    this.Category = new Combobox(this._locator.getByTestId('payout-category'), page);
    this.Date = new TextField(this._locator.getByTestId('payout-date'));

    // Text / numeric fields
    this.CheckNumber = new TextField(this._locator.getByTestId('payout-check-number'));
    this.Amount = new TextField(this._locator.getByTestId('payout-amount'));
    this.Memo = new TextField(this._locator.getByTestId('payout-memo'));
    this.Invoice = new TextField(this._locator.getByTestId('payout-invoice'));

    // Buttons (use testids you added for exactness; fall back to role/name if you prefer)
    this.Save = new Button(this._locator.getByTestId('payout-save'));
    this.Cancel = new Button(this._locator.getByTestId('payout-cancel'));
  }
}


