import { Page } from "@playwright/test";
import { Button } from "../../../objects/button";
import { Legacy_BaseDialog } from "../../../base/legacy/legacy_BaseDialog";
import { TextField } from "../../../objects/textField";


export class Dialog_OrderStockHistory extends Legacy_BaseDialog {

  public close: Button

  public Detail: {
    Search: TextField;
    Click: () => Promise<void>;
  }

  public Stats: {
    Click: () => Promise<void>;

  }
  public Purchase: {
    Click: () => Promise<void>;

  }
  public ItemSales: {
    Click: () => Promise<void>;

  }

  constructor(page: Page) {
    super(page, "Stock History");
    const locator = page.locator("#stockhistdialog")
    this.close = new Button(this._locator.locator('button[title=Close]'));

    this.Detail = {
      Search: new TextField(this._locator.locator('#input[aria-controls="newstockhistorytable"]')),
      Click: async () => {
        await this._locator.getByRole('link', { name: 'Detail' }).click();
        
      }
    }
    this.Stats = {
      Click: async () => {
        await this._locator.getByRole('link', { name: 'Stats' }).click();
      }
    }
    this.Purchase = {
      Click: async () => {
        await this._locator.getByRole('link', { name: 'Purchase' }).click();
      }
    }
    this.ItemSales = {
      Click: async () => {
        await this._locator.getByRole('link', { name: 'Item Sales' }).click();
      }
    }
    
    

  }
  public async ExpectTabActive(tabId: string): Promise<void> {
    const activeTab = this._locator.locator(`li.active a[href="#${tabId}"]`);
    await activeTab.waitFor({ state: "visible" });
}

   

}