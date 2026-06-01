import { type Locator } from "@playwright/test";
import { BaseObject } from "../base/baseObject";

export class Dropdown extends BaseObject {
  public Name: string = '';
  constructor(locator: Locator) {

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
    const page = this._locator.page();

    await this._locator.waitFor({ state: 'visible', timeout: 15000 });
    await this._locator.scrollIntoViewIfNeeded();

    const tag = await this._locator.evaluate(el => el.tagName);

    if (tag === 'INPUT') {
  await this._locator.click();

  const ranges = page.locator('.ranges:visible').last();
  await ranges.waitFor({ state: 'visible', timeout: 9000 });

  if (!option.byText) {
    throw new Error('Date picker requires byText option');
  }

  await ranges.locator('li', { hasText: option.byText.trim() }).first().click();

  await page.waitForTimeout(300);
  return;
}

    await this._locator.locator('option').first().waitFor({ state: 'attached', timeout: 10000 });

    if (option.byIndex !== undefined) {
      await this._locator.selectOption({ index: option.byIndex - 1 });
    } else if (option.byText) {
      await this._locator.selectOption({ label: option.byText.trim() });
    } else {
      await this._locator.selectOption({ index: 0 });
    }

  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    throw new Error(
      `Dropdown.SelectOption failed for locator ${this._locator}: ${message}`
    );
  }
}

public async GetSelectedOption(): Promise<string> {

  const tag = await this._locator.evaluate(el => el.tagName);

  // INPUT controls
  if (tag === 'INPUT') {
    const page = this._locator.page();

    await this._locator.click();

    const picker = page.locator('.daterangepicker:visible').last();

    if (await picker.count() > 0) {
      const active = picker.locator('.ranges li.active').first();

      if (await active.count() > 0) {
        return (await active.innerText()).trim();
      }
    }

    const value = await this._locator.inputValue();
    return value?.trim() ?? '';
  }

  // SELECT controls
  const selectedText = await this._locator.evaluate((el) => {
    const select = el as HTMLSelectElement;
    return select.selectedOptions.length > 0
      ? select.selectedOptions[0].text.trim()
      : '';
  });

  return selectedText;
}
}
