import { Page } from "@playwright/test";
import { BaseDialog } from "../../../../../base/baseDialog";
import { Button } from "../../../../../objects/button";
import { Dropdown } from "../../../../../objects/dropdown";
import { TextField } from "../../../../../objects/textField";

export class Dialog_AdvanceSearch extends BaseDialog {
public User : Dropdown;
public Device : Dropdown;
public ItemType : Dropdown;
public Search : Button;
public Cancel : Button;
public Customer: TextField;
public Supplier: TextField;
public Category: TextField;



constructor(page: Page){ 
    super(page, "Advance Search");
    this.User = new Dropdown(this._locator.locator('#userstafflistsselect'));
    this.Device = new Dropdown(this._locator.locator('#devicelistsselect'));
    this.ItemType = new Dropdown(this._locator.locator('#invitemtype'));
    this.Search = new Button(this._locator.locator('[title ="Search"]'));
    this.Cancel = new Button(this._locator.locator('[title ="Cancel"]'));
    this.Customer = new TextField(this._locator.locator('#s2id_salescustomerselect'));
    this.Supplier = new TextField(this._locator.locator('#s2id_salessupplierselect'));
    this.Category = new TextField(this._locator.locator('#s2id_salescategoryselect'));
    }
}