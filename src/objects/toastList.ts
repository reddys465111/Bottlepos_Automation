import { Locator, Page } from "@playwright/test";
import { BaseObject } from "../base/baseObject";
enum Props{
    First='First',
    Last='Last',
}

type ToastProps = {
    position?: Props,
    index? : number,
}
export class ToastList {
    _page : Page;

    constructor(page: Page){
        this._page = page;
    }

    /**
     * 
     * @param getBy get the toast by index,or by position = first or last
     * @returns 
     */
    public async Get(getBy: ToastProps): Promise<Toast> {
        return new Toast(this._page.locator('.jq-toast-wrap'));
    }


    
}

export class Toast extends BaseObject{

    constructor(locator: Locator){
        super(locator);
    }

    /**
     * Get the toast title 
     * @returns Toast title text
     */
    public async GetTitle(): Promise<string> {
        return await this._locator.locator('.close-jq-toast-single').innerText();
    }

    /**
     * Get the toast content text
     * @returns Toast content text
     */
    public async GetTextContent(): Promise<string> {
        return await this._locator.innerText();
    }

    /**
     * Close the toast alert
     */
    public async Close(): Promise<void>{
        return await this._locator.locator('.close-jq-toast-single').click();
    }
}