import { Locator } from "@playwright/test";
import { BaseObject } from "../base/baseObject";

export class Select<T extends string> extends BaseObject {
    constructor(locator: Locator){
        super(locator);
    }

    public async selectOption(option: {byIndex?: number, byText?: T}): Promise<void>{
        if(option.byIndex){
            await this._locator.selectOption({index: option.byIndex});
        }
        else if(option.byText){
            await this._locator.selectOption(option.byText);
        }
    }
}