import { Locator, Page } from "@playwright/test";
import { BaseDialog } from "../../../base/baseDialog";
import { Table_TransferStock } from "../tables/table_TransferStock";
import { Button } from "../../../objects/button";
import { Dropdown } from "../../../objects/dropdown";
import { LabelField } from "../../../objects/labelField";
import { TextField } from "../../../objects/textField";

export class Dialog_TransferStock extends BaseDialog {

  public TransferFrom: Dropdown;
  public TransferTo: Dropdown;
  public InvoiceNumber: TextField;
  public InvoiceTotal: TextField;
  public Total: LabelField;;
  public Margin: LabelField;;
  public Cases: LabelField;;
  public Bottles: LabelField;;
  public Date: Dropdown;
  public Product: TextField;
  public Notes: TextField;
  public Paid: Button;
  public Table: Table_TransferStock;
  public Finalize: Button;
  public SaveForLater: Button;
  public Print: Button;
  public Cancel: Button;

  constructor(page: Page) {
    super(page, "Transfer Stock"); 

    this.TransferFrom = new Dropdown(this._locator.locator("#newtransferfromstore"));
    this.TransferTo = new Dropdown(this._locator.locator("#newtransferitemstore"));
    this.InvoiceNumber = new TextField(this._locator.locator("#newreceiveitemnumber"));
    this.InvoiceTotal = new TextField(this._locator.locator("#newreceiveitemtotal"));
    this.Total = new LabelField(this._locator.locator("#newreceiveitemstotal"));
    this.Margin = new LabelField(this._locator.locator("#newadditemsmargin"));
    this.Cases =new  LabelField(this._locator.locator("#newadditemscases"));
    this.Bottles = new LabelField(this._locator.locator("#newadditemsbottles"));
    this.Date = new Dropdown(this._locator.locator("#newreceiveitemdate"));
    this.Product = new TextField(this._locator.locator("#newreceiveitemproduct"));
    this.Notes = new TextField(this._locator.locator("#transfer_note"));
    this.Paid = new Button(this._locator.locator("#newchangepaid"));
    this.Table = new Table_TransferStock(this._locator.locator("table#receiveitemtabledetail"));
    this.Finalize = new Button(this._locator.locator(".[title='Finalize']"));
    this.SaveForLater = new Button(this._locator.locator("[title='Save For Later']"));
    this.Print = new Button(this._locator.locator("[title='Print']"));
    this.Cancel = new Button(this._locator.locator("[title='Cancel']"));
  }
}
