import { type Locator } from "@playwright/test";
import { BaseObject } from "../base/baseObject";
 
export class Dropdown extends BaseObject{
    public Name: string = '';
    constructor(locator: Locator){
       
        super(locator);
    }
 
    /**
     * Select an option by its index or by its text
     * @param option: contains 2 parameter, byIndex and byText
     * @example .SelectOption({byText: "option1");
     * .SelectOption({byIndex: 1});
     */
    public async SelectOption(option: { byIndex?: number; byText?: string }): Promise<void> {
  try {
    // 1 Ensure dropdown exists in DOM (handles re-render)
    await this._locator.waitFor({ state: 'attached', timeout: 10000 });
 
    // 2 Ensure dropdown is visible & enabled
    await this._locator.waitFor({ state: 'visible', timeout: 10000 });
 
    // 3 Ensure options are loaded (critical for DataTables)
    await this._locator.locator('option').first().waitFor({ state: 'attached', timeout: 10000 });
 
    // 4 Perform selection
    if (option.byIndex !== undefined) {
      await this._locator.selectOption({ index: option.byIndex - 1 });
    } else if (option.byText) {
      await this._locator.selectOption({ label: option.byText.trim() });
    } else {
      await this._locator.selectOption({ index: 0 });
    }
 
    // 5 Verify selection (prevents fake-pass)
    const selected = await this.GetSelectedOption();
    if (!selected) {
      throw new Error('Selection did not persist');
    }
 
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    throw new Error(
      `Dropdown.SelectOption failed for locator ${this._locator}: ${message}`
    );
  }
}
 
 
     public async GetSelectedOption(): Promise<string> {
        const value = await this._locator.inputValue();
        const option = await this._locator.locator(`option[value="${value}"]`).textContent();
        return option?.trim() ?? '';
    }
 
}
 