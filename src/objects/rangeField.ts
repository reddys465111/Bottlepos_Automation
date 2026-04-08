import { Locator } from "@playwright/test";
import { BaseObject } from "../base/baseObject";

export class RangeField extends BaseObject{
    private _label: string;
    // public From: NumberField;
    // public To: NumberField;

    constructor(locator: Locator, label: string){
        super (locator);
        this._label = label;
        // this.From = new NumberField(this._locator.locator(`//td[./*[contains(text(),'${label}')]] /following-sibling::td[1] /input[contains(@id, 'from')])`));
        // this.To = new NumberField(this._locator.locator(`//td[./*[contains(text(),'${label}')]] /following-sibling::td[1] /input[contains(@id, 'to')])`));

        // this.From = new NumberField(this._locator.locator(`td:has-text('${label}') ~ [id$='from']`));
        // this.To = new NumberField(this._locator.locator(`td:has-text('${label}') ~ [id$='to']`));

    }

    public async SetRange(options: {from: number, to: number}): Promise<void>
    { 
        await this._locator.locator(`//td[./*[contains(text(),'${this._label}')]] /following-sibling::td[1] /input[contains(@id, 'from')])`).fill(options.from.toString());
        await this._locator.locator(`//td`)
        await this._locator.locator(`//td[./*[contains(text(),'${this._label}')]] /following-sibling::td[1] /input[contains(@id, 'to')])`).fill(options.to.toString());

    }
}