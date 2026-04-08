import { Locator } from "@playwright/test";
import { Button } from "./button";
import { LabelField } from "./labelField";

export class InfoBox extends Button{
    public Qty: LabelField;
    public Total: LabelField;
    constructor(locator:Locator){
        super(locator)
        this.Qty= new LabelField(this._locator.locator('.infobox-data-number')),
        this.Total= new LabelField(this._locator.locator('.stat'))
    }


}