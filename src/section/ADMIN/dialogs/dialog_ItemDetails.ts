import { Page } from '@playwright/test';
import { TextField } from '../../../objects/textField';
import { Button } from '../../../objects/button';
import { Legacy_BaseDialog } from '../../../base/legacy/legacy_BaseDialog';

export class Dialog_ItemDetails extends Legacy_BaseDialog {
  public ReceivedCases: TextField;
  public UnitsPerCase: TextField;
  public ReceivedBottles: TextField;
  public TotalCost: TextField;
  public CostPerBottle: TextField;
  public Price: TextField;
  public Margin: TextField;
  public Markup: TextField;
  public Save: Button;
  public Cancel: Button;

  constructor(page: Page) {
    super(page, 'Items Details');
    const locator = page.locator('#addnewitemtoreceivedialog');

    this.ReceivedCases = new TextField(locator.locator('#additemcases'));
    this.UnitsPerCase = new TextField(locator.locator('#additemunitpercase'));
    this.ReceivedBottles = new TextField(locator.locator('#additemtotalbottles'));
    this.TotalCost = new TextField(locator.locator('#additemtotalcost'));
    this.CostPerBottle = new TextField(locator.locator('#additemcostperbottle'));
    this.Price = new TextField(locator.locator('#additempriceperbottle'));
    this.Margin = new TextField(locator.locator('#additemmarginperbottle'));
    this.Markup = new TextField(locator.locator('#additemmarkupperbottle'));
    this.Save = new Button(page.locator('#itemsdetailsbox'));
    this.Cancel = new Button(page.locator('.submissionbtn[title="Cancel"]'));
  }

  
}
