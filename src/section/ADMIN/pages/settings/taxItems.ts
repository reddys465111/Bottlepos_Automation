import { Locator } from "playwright";
import { TaxItems_Table } from "./taxItemTable";
import { Button } from "../../../../objects/button";

export class TaxItems {

    private _locator: Locator;
    public Table: TaxItems_Table;
    public Add: Button;

    constructor(locator: Locator){
        this._locator = locator;
        this.Table = new TaxItems_Table(this._locator.locator('#tax-item-table'));
        this.Add = new Button(this._locator.locator('#addtaxitembtn'));
    }
}