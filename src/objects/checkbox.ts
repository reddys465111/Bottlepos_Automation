import { type Locator } from "@playwright/test";
import { BaseObject } from "../base/baseObject";

export class Checkbox extends BaseObject {

    constructor(locator: Locator){
        super(locator)
    }

    /**
    * Checks the checkbox if it is not already checked
    */
    public async Check(): Promise<void>{
        if (!await this._locator.isChecked()) {
            await this._locator.click();
        }
    }

    /**
     * Unchecks the checkbox if it is checked
     */
    public async UnCheck(): Promise<void>{
        if (await this._locator.isChecked()) {
            await this._locator.click();
        }
    }

    /**
     * @returns True if the checkbox is checked
     */
    public async IsChecked(): Promise<boolean> {
        return await this._locator.isChecked();
    }
}