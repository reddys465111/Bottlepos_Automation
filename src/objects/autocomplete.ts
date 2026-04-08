import {type Page, type Locator } from "@playwright/test";
import { BaseObject } from "../base/baseObject";


export class Autocomplete extends BaseObject{
    private _page: Page;
    constructor(page: Page, locator: Locator){
        super(locator);
        this._page = page;
    }

    /**
     * This is a compound object, this method will insert the text in 
     * the search field and then click in the first item that matches with the previous text
     * @param option contains 1 parameter: title
     * @example SearchAndSelect({title: "Title"});
     */
    public async SearchAndSelect(option: {title: string}): Promise<void> {
        await this._locator.fill(option.title);
        await this._page.locator('[role="listbox"]').getByText(option.title).click();
    }
}