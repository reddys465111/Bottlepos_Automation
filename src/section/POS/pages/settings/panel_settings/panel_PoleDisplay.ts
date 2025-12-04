import { Locator } from "@playwright/test";
import { BasePanel } from "../../../../../base/basePanel";
import { Button } from "../../../../../objects/button";
import { Dropdown } from "../../../../../objects/dropdown";
import { TextField } from "../../../../../objects/textField";
import { NumberField } from "../../../../../objects/numberField";

export class Panel_PoleDisplay extends BasePanel {

    public Method: Dropdown;
    public Printer: Dropdown;
    public Refresh: Button;
    public Message: TextField;
    public No_LineOnPole: NumberField;
    public Characters_Per_Line: Button;

    constructor(locator: Locator){
        super(locator);

        this.Method = new Dropdown(this._locator.locator('select.polesetting_method'));
        this.Printer = new Dropdown(this._locator.locator('select.polesetting_type'));
        this.Refresh = new Button(this._locator.locator('select.polesetting_type ~button'));
        this.Message = new TextField(this._locator.locator('input.poledefaultmessage'));
        this.No_LineOnPole = new NumberField(this._locator.locator('input.poledisplayline'));
        this.Characters_Per_Line = new Button(this._locator.locator('input.polelinecharacters'));

    }

}