import {type Locator} from "@playwright/test"
import { BaseObject } from "../base/baseObject";
import { KEY } from "../utils";

export class TextField extends BaseObject{

    constructor(locator: Locator){
        super(locator);
    }

    /**
     * Insert a text value into the textfield
     * @param options: contains 3 parameters: value, press, and sequential.
     * value is the text requested to be inserted in the textfield
     * press, is an optional parameter to determine if is needed to press a key after inserting the value
     * sequential, is an optional parameter to determine if text should be typed character by character (true) or filled instantly (false, default)
     * @example .setText({value: "text_value"});
     * .setText({value: "text_value", press: KEY.ENTER});
     * .setText({value: "text_value", sequential: true});
     */
    public async setText(option: {value: string, press?: KEY, sequential?: boolean}):Promise<void>{
        // Clear the field first
        await this._locator.clear();
        
        // Choose between sequential typing or fill based on parameter
        if (option.sequential) {
            // Type text character by character
            await this._locator.pressSequentially(option.value, {delay: 100});
        } else {
            // Use fill for instant text input (default behavior)
            await this._locator.fill(option.value);
        }
        
        if(option.press){
            switch (option.press) {
                case 'Enter':
                    await this._locator.press('Enter');
                break;
            }
        }
    }

    public async clear(): Promise<void> {
        await this._locator.fill(""); // reliably clears input
    }
   


    /**
     * Returns the text value from the field
     * @returns {string} return the content of the textfield 
     */
    public async getText(): Promise<string>{

        return await this._locator.inputValue();
    }
}