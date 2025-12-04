import { Locator } from "@playwright/test";
import { BasePanel } from "../../../../../base/basePanel";
import { Dropdown } from "../../../../../objects/dropdown";
import { TextField } from "../../../../../objects/textField";

export class Panel_General extends BasePanel {

    public Ask_ToPrint: Dropdown;
    public Auto_HideReceiptDialog: TextField;
    public Number_ReceiptsToPrint: Dropdown;

    constructor(locator: Locator){
        super(locator);
        
        this.Ask_ToPrint = new Dropdown(this._locator.locator('select#recask'));
        this.Auto_HideReceiptDialog = new TextField(this._locator.locator('input#dialogboxtime'));
        this.Number_ReceiptsToPrint = new Dropdown(this._locator.locator('select#receiptsprint'));
    }

}