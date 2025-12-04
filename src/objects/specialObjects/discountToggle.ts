import { Locator, Page } from "@playwright/test";
import { BaseObject } from "../../base/baseObject";
import { KEY } from "../../utils";
import { KeyPad } from "../keyPad";

export enum toggleOption{
    DOLLAR,
    PERCENTAGE
}

/**
 * this is a special toggle to handle the discount object in POS
 */
export class DiscountToggle extends BaseObject{

    _page: Page;
    constructor(page: Page, locator: Locator){
        super(locator);
        this._page = page;
    }

    public async UseKeypad(keypad: {value: string}): Promise<void>{
        const kpad = new KeyPad(this._page);
        const locator1 = this._locator.locator('#discountallinputs input[type=text][style*="display: block;"]')
        const active1 = await locator1.count()>0; 

        const locator2 = this._locator.locator('#discountallinputs input[type=text]:not([style*="display: none;"])')
        const active2 = await locator2.count()>0;

        const locatorActive = active2? locator2:locator1; 
        await locatorActive.click();
        await kpad.EnterValue({value: keypad.value.toString()});
        await kpad.Enter.Click()
    }

    /**
     * This method will fill the value into the field
     * @param value value to insert in the field
     * @param key optional if a Key need to be pressed after inserting the value
     */
    public async SetValue(option: {value: number, press?: KEY}): Promise<void> {
        const locator = this._locator.getByTestId('discount-input');
        await locator.clear();
        await locator.fill(option.value.toString());
        if(option.press){
            switch (option.press) {
                case 'Enter':
                    await locator.press('Enter');
                break;
                case 'Tab':
                    await locator.press('Tab');
                break;
            }
        }
    }

    /**
     * This method will click on the toggle if the conditions are met
     * if the toggle button is on the desired status, this method will not perform any action
     * if the toggle button is NOT in the desired state this method will perform the click action to change it to the desired one
     * @param option Dollar or Percentage
     */
    public async Toggle(option: {select: toggleOption}): Promise<void> {
        const locator = this._locator.getByTestId('discount-block');
        let dollarEnabled = await locator.getByTestId('discount-toggle').getAttribute('checked');
        switch (option.select) {
            case toggleOption.PERCENTAGE:{
                if(dollarEnabled){
                    await locator.locator('[style*=left]:not([type])', {hasText: '%'}).click();
                    await this._page.waitForTimeout(1000);
                }
            }
            break;
            case toggleOption.DOLLAR:{
                if(!dollarEnabled){
                    await locator.locator('[style*=right]:not([type])', {hasText: '$'}).click();
                    await this._page.waitForTimeout(1000);
                }
            }
            break;
        }
    }
    
    public async Remove(option: {row: number}): Promise<void> {
        const removeButton = this._page.getByTestId(`discount-${option.row - 1}-remove`);
        if (await removeButton.isVisible()) {
            await removeButton.click();
            await this._page.waitForTimeout(500); // allow UI to update
        }
    }
}