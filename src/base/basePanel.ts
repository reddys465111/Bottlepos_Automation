import { Locator } from "@playwright/test";
import { BaseObject } from "./baseObject";

export class BasePanel extends BaseObject {
    private _headerLocator: Locator;
    private _bodyLocator: Locator;
    constructor(locator: Locator){
        super(locator);
        this._headerLocator = this._locator.locator('.panel-heading');
        this._bodyLocator = this._locator.locator('.panel-collapse');

    }

    public async Expand(): Promise<void> {
        const status = await this._locator.getAttribute('class') ?? '';

        if(status?.includes('collapse')){
            await this._headerLocator.locator('a').click();
        }

    }

    public async Collapse(): Promise<void>{
        const status = await this._locator.getAttribute('class') ?? '';

        if(status?.includes('in')){
            await this._headerLocator.locator('a').click();
        }
        
    }

}