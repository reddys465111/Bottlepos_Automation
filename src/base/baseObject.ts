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
 
public async Exists(timeout = 10000): Promise<boolean> {
    try {
        const page = this._locator.page();
 
        // Page safety
        if (!page || page.isClosed()) {
            return false;
        }
 
        // Wait until element is actually visible
        await this._locator.waitFor({ state: 'visible', timeout });
 
        return true;
    } catch {
        return false;
    }
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
    public async IsClickable(timeout: number = 5000): Promise<boolean>{
        try{
            return await this._locator.isEnabled({ timeout });
        } catch (err) {
            return false;
        }
    }
    /**
     * Perfom a click in the current object
     */
    public async Click(option?: {timeout?: number;beforeEvent?: Function | void;afterEvent?: Function | void;force?: boolean;optional?: boolean;}): Promise<void> {
    const before = option?.beforeEvent ?? this._beforeEvent;
    const after = option?.afterEvent ?? this._afterEvent;
 
    if (typeof before === 'function') {
        await before.call(this);
    }
 
    const page = this._locator.page();
    if (!page || page.isClosed()) {
        throw new Error('Click failed: target page/context is already closed');
    }
 
    const waitTimeout = option?.timeout ?? 10_000;
    // BEFORE trial click — ADD THIS BLOCK
    await this._locator.waitFor({ state: 'visible',timeout: waitTimeout});
 
    // ---------- ACTIONABILITY CHECK  ----------
    try {
        await this._locator.click({
            trial: true,
            timeout: waitTimeout
        });
    } catch (err) {
 
        if (page.isClosed()) {
            throw new Error('Click failed: page was closed while waiting for locator');
        }
 
        if (option?.optional) {
            return;
        }
 
        if (!option?.force) {
            throw new Error(
                `Click failed: locator not actionable after ${waitTimeout}ms`
            );
        }
    }
 
    // ---------- DOM STABILITY FALLBACK ----------
    try {
        await this._locator.scrollIntoViewIfNeeded();
    } catch {
       
    }
 
    // ---------- PAGE SAFETY ----------
    if (page.isClosed()) {
        throw new Error('Click failed: page was closed before click execution');
    }
 
    // ---------- FINAL CLICK ----------
    try {
        await this._locator.click({
            force: option?.force ?? false,
            timeout: option?.timeout
        });
    } catch (err) {
 
        if (option?.optional) {
            return;
        }
 
        throw new Error(`Click action failed: ${err}`);
    }
 
    if (typeof after === 'function') {
        await after.call(this);
    }
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
 