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
        return (await this._locator.textContent() ?? '').trim();
    }

    public async getTextContent(): Promise<string> {
        return (await this._locator.textContent() ?? '').trim();
    }

    public async getValue(): Promise<string> {
        return (await this._locator.inputValue() ?? '').trim();
    }

    public async getInnerText(): Promise<string> {
        return (await this._locator.innerText() ?? '').trim();
    }

    public async getAllInnerTexts(): Promise<string[]> {
        // wait until at least one span exists and is visible
        // await this._locator.first().waitFor({ state: "attached", timeout: 10000 });

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