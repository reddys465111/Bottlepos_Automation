import { Page } from "@playwright/test";
import { Button } from "../../../objects/button";
import { Legacy_BaseDialog } from "../../../base/legacy/legacy_BaseDialog";
 
/**
 * Represents the "Edit Receive Items" dialog (triggered when editing a non-finalized invoice).
 * It has a different footer container than the Add Receive Items dialog.
 */
export class Dialog_HistoryReceiveItems extends Legacy_BaseDialog {
 
  public close: Button
 
  constructor(page: Page) {
    super(page, "Received Items");
 
   
    const locator = page.locator("#stockreceivedialog")
    this.close = new Button(this._locator.locator('button[title=Close]'));
 
 
  }
 
}