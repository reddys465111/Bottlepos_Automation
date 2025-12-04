import { Page } from '@playwright/test';
import { TextField } from '../../../objects/textField';
import { Button } from '../../../objects/button';
import { Legacy_BaseDialog } from '../../../base/legacy/legacy_BaseDialog';
import { LabelField } from '../../../objects/labelField';

export class Dialog_OrderItemDetails extends Legacy_BaseDialog {
public ReorderCase: TextField;
public UnitPerCase: TextField;
public ReorderBottles: TextField;
public TotalCost: TextField;
public CostPerBottle: TextField;
public price: TextField;
public NoofDaysSupply: LabelField;
public Save: Button;
public Cancel: Button;
public readName: LabelField;
public QTYonHandCase: LabelField;
public QTYonHandBottles: LabelField;

constructor(page: Page) {
    super(page, 'Items Details');
    const locator = page.locator('#addnewitemtoreceivedialog');
    this.ReorderCase = new TextField(locator.locator('#additemcases'));
    this.UnitPerCase = new TextField(locator.locator('#additemunitpercase'));
    this.ReorderBottles = new TextField(locator.locator('#additemtotalbottles'));
    this.TotalCost = new TextField(locator.locator('#additemtotalcost'));
    this.CostPerBottle = new TextField(locator.locator('#additemcostperbottle'));
    this.price = new TextField(locator.locator('#additemprice'));
    this.NoofDaysSupply = new LabelField(locator.locator('#additemdayssupply'));
    this.readName = new LabelField(locator.locator('#newadditemname'));
    this.QTYonHandCase = new LabelField(locator.locator('#additemqtycase'));
    this.QTYonHandBottles = new LabelField(locator.locator('#additemqtybottle'));
    this.Save = new Button(page.locator('#save-item-details'));
    this.Cancel = new Button(page.locator('button[title="Cancel"]'));

}
}