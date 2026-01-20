import { type Locator } from "@playwright/test";
import { BaseObject } from "../base/baseObject";

export class LabelField extends BaseObject{
    constructor(locator: Locator){
        super(locator);
    }
    
    /**
     * @returns {string} return the content of the textfield 
     */
    public async getText(): Promise<string> {
        try {
            // If no matching element exists, return empty string quickly
            if ((await this._locator.count()) === 0) return '';

            // Try to read text content with a short timeout to avoid long test hangs
            const text = await this._locator.textContent({ timeout: 3000 }).catch(() => null);
            const raw = (text ?? '').trim();

            // Return the trimmed text as-is. Preserve any leading negative sign
            // so refund amounts (e.g. "-$30.24") are returned unchanged.

            return raw;
        } catch {
            return '';
        }
    }

    public async getTextContent(): Promise<string> {
        try {
            if ((await this._locator.count()) === 0) return '';
            const text = await this._locator.textContent({ timeout: 3000 }).catch(() => null);
            return (text ?? '').trim();
        } catch {
            return '';
        }
    }

    public async getValue(): Promise<string> {
        return (await this._locator.inputValue() ?? '').trim();
    }

    public async getInnerText(): Promise<string> {
        return (await this._locator.innerText() ?? '').trim();
    }

    public async getAllInnerTexts(): Promise<string[]> {
      
        const elements = await this._locator.all();
        

        const texts = await Promise.all(
            elements.map(async el => {
                const raw = await el.innerText();
                
                return (raw ?? "").trim();
            })
        );

        return texts;
    }

    
}