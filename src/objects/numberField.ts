import { type Locator } from "@playwright/test";
import { BaseObject } from "../base/baseObject";
import { KeyPad } from "./keyPad";
import { KEY } from "../utils";

export class NumberField extends BaseObject{
    public Keypad: KeyPad;
    constructor( locator: Locator){
        super(locator);
   
        this.Keypad = new KeyPad(locator.page());
    }

    /**
     * Insert a value to the field
     * @param option, have 2 parameters: value and press
     * value, is the expected 'number' to insert in the field
     * press, is an optional parameter to determine if is needed to press a key after inserting the value
     */
    public async SetValue(option: {value: number, press?: KEY}):Promise<void>{
        await this._locator.fill(option.value.toString());
        if(option.press){
            switch (option.press) {
                case 'Enter':
                    await this._locator.press('Enter')
                break;
            }

        }
    }

    /**
     * Get the displayed value from the field
     * @returns {string} return the content of the textfield 
     */
    public async GetValue(): Promise<string>{

        return await this._locator.inputValue();
    }
}