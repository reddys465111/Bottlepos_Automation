import { type Locator, type Page } from "@playwright/test";
import { Button } from "../../../../objects/button";

export class Shortcuts{
    
    _page: Page;
    _locator: Locator;
    Categories : Button;
    constructor(page: Page){
        this._page = page;
        this._locator = page.getByTestId('shortcut-bar');
        this.Categories = new Button(this._locator.getByRole('button', {name: 'Categories'}));
    }
    
    /**
     * Click on the Item or Category by its name or index position
     * if no title or index is specified, the method will click on the first available element
     * @param option parameter contains 2 options: title and index,
     * @example await POS.Register.Shortcuts.Click({title: "Item Title"})
     * POS.Register.Shortcuts.Click({index: 2})
     */
    public async Click(option: {title?: string, index?: number}):Promise<void>{
        if(option.title){
            await this._locator.getByRole('button', { name: option.title }).click();
            return;
        }
        await this._locator.locator(`div[draggable]:nth-of-type(${option.index})`).click();
    }

    /**
     * Click on the Shortcuts button to open the box if the box is collapsed
     */
    public async Open(): Promise<void>{
        if(await this.isBoxClosed()){
            await this._page.getByRole('button', {name: 'Shortcuts'}).click();
        }
    }
    
    /**
     * Clikc on the shortcuts button to collapese the box if the box is expanded
     */
    public async Close(): Promise<void>{
        if(await this.isBoxOpen()){
            await this._page.getByRole('button', {name: 'Shortcuts'}).click();
        }
    }

    /**
     * Return true if the shortcuts box is collapsed false if not
     * @returns true if the shortcuts box is collapsed false if not
     */
    private async isBoxClosed(): Promise<boolean>{
        try{
            const attribute = await this._locator.getAttribute('aria-expanded', {timeout: 1000});
            return Boolean(attribute ?? false);
        } catch (e) { }   
        return true;
    }

    /**
     * Return true if the shortuts box is expanded, false if not
     * @returns true if the shortcuts box is expanded, false if not
     */
    private async isBoxOpen(): Promise<boolean> {
        try{
            const attribute = await this._locator.getAttribute('aria-expanded', {timeout: 1000});
            return Boolean(attribute ?? false);
        } catch (e) { }   
        return false;
    }

    public async SearchAndSelectItem(option: {title: string}): Promise<void>{
        await this.Open();
        await this._locator.getByRole('button', {name: option.title}).click();
    }

}