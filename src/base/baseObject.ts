import { Locator } from "@playwright/test";

/**
 * Base class to share the common methods accross all the objects 
 */
export class BaseObject{

    private _beforeEvent: Function|void;
    private _afterEvent: Function|void;
    public _locator: Locator;
    constructor(locator: Locator, events?: {before?: Function , after?: Function}){
        this._locator = locator;
        this._beforeEvent = events?.before;
        this._afterEvent = events?.after;
    }

    public async SetBeforeEvent(beforeEvent: Function): Promise<BaseObject>{
        this._beforeEvent = beforeEvent;
        return this;
    }

    public async SetAfterEvent(afterEvent: Function): Promise<BaseObject>{
        this._afterEvent = afterEvent;
        return this;
    }

    /**
     * 
     * @returns True if the object/element is hidden
     */
    public async IsHidden(): Promise<Boolean>{
        return await this._locator.isHidden();
    }

    /**
     * 
     * @returns True if the object/element is visible
     */
    public async IsVisible(): Promise<Boolean>{
        return await this._locator.isVisible();
    }

    /**
     * 
     * @returns True if the object/element exists
     */
    public async Exists(): Promise<Boolean>{
        return await this._locator.count() > 0;
    }

    /**
     * 
     * @returns True if the object/element is Enabled
     */
    public async IsEnabled(): Promise<Boolean>{
        return await this._locator.isEnabled();
    }

    /**
     * @returns True if the object/element is Editable
     */
    public async IsEditable(): Promise<boolean>{
        return await this._locator.isEditable();
    }

    /**
     * @returns True if the object/element is clickable
     */
    public async IsClickable(): Promise<boolean>{
        return await this._locator.isEnabled();
    }
    /**
     * Perfom a click in the current object
     */
    // public async Click( option? : {timeout?: number, beforeEvent?: Function|void, afterEvent?: Function| void; force?: boolean} ) : Promise<void>{
    //     const before = option?.beforeEvent ?? this._beforeEvent ?? undefined;
    //     const after = option?.afterEvent ?? this._afterEvent ?? undefined;

    //     typeof before === 'function' && before && await before.call(this); 

    //     await this._locator.waitFor();
    //     await this._locator.hover();
    //     await this._locator.click({ force: option?.force ?? false, timeout: option?.timeout });

    //     typeof after === 'function' && after && await after.call(this);
    // }
    public async Click(option?: { timeout?: number, beforeEvent?: Function | void, afterEvent?: Function | void, force?: boolean }): Promise<void> {
    const before = option?.beforeEvent ?? this._beforeEvent ?? undefined;
    const after = option?.afterEvent ?? this._afterEvent ?? undefined;
    // Before event
    typeof before === 'function' && before && await before.call(this);
    // Wait for locator to appear
    await this._locator.waitFor();
    try {
        await this._locator.hover({ trial: true });
        await this._locator.hover();
    } catch {
        
    }
    const page = this._locator.page();
    if (page.isClosed()) {
        return; 
    }

    // Final click
    await this._locator.click({
        force: option?.force ?? false,
        timeout: option?.timeout
    });

    // After event
    typeof after === 'function' && after && await after.call(this);
}

     /**
     * Get the label of the current object
     * 
     * @returns The text of the current object
     */
     public async GetLabel(): Promise<string> {
        return (await this._locator.innerText());
    }
}