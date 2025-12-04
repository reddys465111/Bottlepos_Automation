import { Locator } from "@playwright/test";
import { Button } from "../../../../objects/button";
import { TextField } from "../../../../objects/textField";
import { BottleDeposit_Table } from "./bottleDepositTable";
 
export class BottleDeposit {
 
    private _locator: Locator;
    public Add: Button;
    public Table: BottleDeposit_Table;
    public Search: TextField;
    public ReturnAmount:TextField;
 
    constructor(locator: Locator){
        this._locator = locator;
        this.Add = new Button(this._locator.locator("#bottledeposititembtn"));
        this.Table = new BottleDeposit_Table(this._locator);
        this.Search = new TextField(this._locator.locator("#item-deposit-table_filter input[type='search']"));
        this.ReturnAmount= new TextField(this._locator.locator("#itemdepositamount"));
    }
}
 