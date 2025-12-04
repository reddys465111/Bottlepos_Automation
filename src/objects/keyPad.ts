import { Locator, Page } from "@playwright/test";
import { BaseObject } from "../base/baseObject";
import { Button } from "./button";

export class KeyPad extends BaseObject{
    private _page: Page;
    public Enter: Button;
    public Clear: Button;
    public Cancel: Button;
    public MoveToEnd: Button;
    public MoveToStart: Button;
    constructor(page: Page) {
        super(page.locator('.keypad-popup'));
        this._page = page;
        this.Enter = new Button(this._locator.locator('.keypad-close'));
        this.Clear = new Button(this._locator.locator('.keypad-clear'));
        this.Cancel = new Button(this._locator.locator('.keypad-back'));
        this.MoveToStart = new Button(this._locator.locator('.keypad-start'));
        this.MoveToEnd = new Button(this._locator.locator('.keypad-end'));
    }

    /**
     * The method will enter all the digits presents in the value parameter
     * @param option contains 1 parameter: value = it can be any number or string related to a number field.
     * @example @example .EnterValue({value: "12.5"});
     * .EnterValue({value: "-15.5", press: KEY.ENTER});
     */
    public async EnterValue(option: {value: string}): Promise<void>{
        await this._locator.waitFor();
        for await (const digit of option.value) {
            await this._locator.locator(`.keypad-key:has-text('${digit}')`).click();
        }

    }

}
