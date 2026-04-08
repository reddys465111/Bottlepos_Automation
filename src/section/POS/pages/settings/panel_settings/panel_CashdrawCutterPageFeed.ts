import { Locator } from "@playwright/test";
import { BasePanel } from "../../../../../base/basePanel";
import { Button } from "../../../../../objects/button";
import { Checkbox } from "../../../../../objects/checkbox";
import { Dropdown } from "../../../../../objects/dropdown";
import { NumberField } from "../../../../../objects/numberField";

export class Panel_CashCutterPageFeed extends BasePanel {

    CashDrawConnected: Checkbox;
    CutterCommand: Dropdown;
    PageFeed: NumberField;
    Test: Button;
    constructor(locator: Locator){
        super(locator);

        this.CashDrawConnected = new Checkbox(this._locator.locator('input#cashdraw'));
        this.Test = new Button(this._locator.locator('[title="Test"]'));
        this.CutterCommand = new Dropdown(this._locator.locator('select.psetting_cutter'));
        this.PageFeed = new NumberField(this._locator.locator('input.psetting_feed'));
    }
}