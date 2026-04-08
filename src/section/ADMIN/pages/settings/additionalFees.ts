import { Locator, Page } from "playwright";
import { TextField } from "../../../../objects/textField";
import { AdditionalFees_Table } from "./additionalFeesTable";
import { Checkbox } from "../../../../objects/checkbox";
import { Button } from "../../../../objects/button";

export class AdditionalFees {   
    private _locator: Locator;
    public Search: TextField;
    public Table: AdditionalFees_Table;
    public Add: Button;
    public Enable: Checkbox;

    constructor(locator: Locator) {
        this._locator = locator;

        this.Search = new TextField(this._locator.locator("#addnl-charges-table_filter input[type='search']"));
        this.Table = new AdditionalFees_Table(this._locator.locator("#addnl-charges-table"));

        this.Add = new Button(this._locator.locator("#additinalchargesbtn"));
        this.Enable = new Checkbox(this._locator.locator("#enableadditionalcharges"));
    }
}