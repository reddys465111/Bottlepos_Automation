import { Page } from "@playwright/test";
import { Legacy_BaseDialog } from "../../../base/legacy/legacy_BaseDialog";
import { Button } from "../../../objects/button";
import { Dropdown } from "../../../objects/dropdown";
import { NumberField } from "../../../objects/numberField";
import { TextField } from "../../../objects/textField";


export class Dialog_AdvanceSearch extends Legacy_BaseDialog {
public ItemName : TextField;
public ItemCode : TextField;
public PaymentType : Dropdown;
public TransactionAmount : {
    From : NumberField,
    To : NumberField
}
public User : Dropdown;
public OrderType : Dropdown;
public Device : Dropdown;
public RefNumber : TextField;
public LastFourCard: TextField;
public DateRange : Dropdown; 
public Search : Button;
public Cancel : Button;
public Status : Dropdown;


constructor(page: Page){ 
    super(page, "Advance Search");
    this.ItemName = new TextField(this._locator.locator('#advance_search_item_name'));
    this.ItemCode = new TextField(this._locator.locator('#advance_search_item_code'));
    this.PaymentType = new Dropdown(this._locator.locator('#advance_search_payment_type'));
    this.TransactionAmount = {
        From: new NumberField(this._locator.locator('#transaction_amt_from')),
        To: new NumberField(this._locator.locator('#transaction_amt_to')),
    }
    this.User = new Dropdown(this._locator.locator('#advance_search_user'));
    this.OrderType = new Dropdown(this._locator.locator('#advance_search_ordertype'));
    this.Device = new Dropdown(this._locator.locator('#advance_search_device'));
    this.RefNumber = new TextField(this._locator.locator('#advance_search_ref_number'));
    this.LastFourCard = new TextField(this._locator.locator('#advance_search_last_card_no'));
    this.DateRange = new Dropdown(this._locator.locator('#advance_search_date_range'));
    this.Status = new Dropdown(this._locator.locator('#advance_search_status'));
    this.Search = new Button(this._locator.locator('[title ="Search"]'));
    this.Cancel = new Button(this._locator.locator('[title ="Cancel"]'));
  }
}