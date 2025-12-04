import { Locator } from "@playwright/test";
import { BasePanel } from "../../../../../base/basePanel";
import { Button } from "../../../../../objects/button";
import { Checkbox } from "../../../../../objects/checkbox";
import { Dropdown } from "../../../../../objects/dropdown";

export class Panel_LabelPrinterSettings extends BasePanel {

    public LabelPrintingEnabled: Checkbox;
    public Method: Dropdown;
    public Template: Dropdown;
    public Type: Dropdown;
    public Printer: Dropdown;
    public Refresh: Button;
    constructor(locator: Locator){
        super(locator);
        this. LabelPrintingEnabled = new Checkbox(this._locator.locator('.psetting_label_enabled'));
        this.Method = new Dropdown(this._locator.locator('.psetting_method'));
        this.Template = new Dropdown(this._locator.locator('.psetting_template'));
        this.Type = new Dropdown(this._locator.locator('.psetting_type'));
        this.Printer = new Dropdown(this._locator.locator('.psetting_printer'));
        this.Refresh = new Button(this._locator.locator('button'));
    }
}