import { type Locator } from "@playwright/test";
import { BaseObject } from "../base/baseObject";

export class Dropdown extends BaseObject{
    public Name: string = '';
    constructor(locator: Locator){
        
        super(locator);
    }

    /**
     * Select an option by its index or by its text
     * @param option: contains 2 parameter, byIndex and byText
     * @example .SelectOption({byText: "option1");
     * .SelectOption({byIndex: 1});
     */
    public async SelectOption(option: {byIndex?: number, byText?: string}): Promise<void>{
        if(option.byIndex){
           await this._locator.selectOption({ index: option.byIndex - 1 });
 
        }
        else if(option.byText){
              const optionLabel = option.byText.trim();
            await this._locator.selectOption(optionLabel);
        }else {
            await this._locator.click();
            await this._locator.locator('option:nth-of-type(1)').click();
        }
    }

     public async GetSelectedOption(): Promise<string> {
        const value = await this._locator.inputValue(); 
        const option = await this._locator.locator(`option[value="${value}"]`).textContent();
        return option?.trim() ?? '';
    }

}