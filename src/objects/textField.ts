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
     * @example .setText({value: "text_value"});
     * .setText({value: "text_value", press: KEY.ENTER});
     * .setText({value: "text_value", sequential: true});
     */
    public async setText(option: {value: string, press?: KEY, sequential?: boolean}):Promise<void>{
        // Ensure page is open before interacting
        try {
            const page = this._locator.page();
            if (page && page.isClosed()) {
                throw new Error();
            }
        } catch (err) {
            throw err;
        }

        // Clear the field first using the class helper (uses fill(""))
        try {
            await this.clear();
        } catch (err) {
            // Surface a clearer message when page/context is closed
            if ((err as Error).message.includes('browser has been closed')) {
                throw new Error('');
            }
            throw err;
        }

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
        const page = this._locator.page();
        if (page && page.isClosed()) {
            throw new Error();
        }
        await this._locator.fill(""); // reliably clears input
    }
   


    /**
     * Returns the text value from the field
     * @returns {string} return the content of the textfield 
     */
    public async getText(): Promise<string>{
        const page = this._locator.page();
        if (page && page.isClosed()) {
            throw new Error();
        }
        return await this._locator.inputValue();
    }
}