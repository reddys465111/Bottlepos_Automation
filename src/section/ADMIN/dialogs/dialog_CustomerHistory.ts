import { Locator, Page } from "@playwright/test";
import { Button } from "../../../objects/button";
import { Legacy_BaseDialog } from "../../../base/legacy/legacy_BaseDialog";
import { TextField } from "../../../objects/textField";
import { table_CustomerTransaction } from "../pages/customers/tables/table_CustomerTranscation";
import { table_CustomerItemHistory } from "../pages/customers/tables/table_CustomerItemHistory";



export class Dialog_CustomerHistory extends Legacy_BaseDialog {

  public close: Button


  public Stats: {
    Click: () => Promise<void>;
  }

  public PointDetails: {
    Search: TextField;
    Click: () => Promise<void>;

  }
  public Transactions: {
    table: table_CustomerTransaction;
    Click: () => Promise<void>;

  }
  public ItemHistory: {
    itemsoldtable: table_CustomerItemHistory;
    
    
    Click: () => Promise<void>;

  }


  constructor(page: Page) {
    super(page, "Customer History");
    const locator = page.locator("#stockhistdialog")
    this.close = new Button(this._locator.locator('button[title=Close]'));

    this.Stats = {
      
      Click: async () => {
        await this._locator.getByRole('link', { name: 'Stats' }).click();
        
      }
    }
    this.PointDetails = {
      Click: async () => {
        await this._locator.getByRole('link', { name: 'Point Details' }).click();
      },
      Search: new TextField(this._locator.locator('#input[aria-controls="newstockhistorytable"]'))
    }
    this.Transactions = {
      Click: async () => {
        await this._locator.getByRole('link', { name: 'Transactions' }).click();
      },
       table: new table_CustomerTransaction(this._locator.locator('#newtransactionhistorytable'))
    }
    this.ItemHistory = {
      Click: async () => {
        await this._locator.getByRole('link', { name: ' Items History' }).click();
      },
      itemsoldtable: new table_CustomerItemHistory(this._locator.locator('#itemhistorytable'))
    }
    
    

  }
  public async ExpectTabActive(tabId: string): Promise<void> {
    const activeTab = this._locator.locator(`li.active a[href="#${tabId}"]`);
    await activeTab.waitFor({ state: "visible" });
}

   

}