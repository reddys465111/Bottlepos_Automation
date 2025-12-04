import { type Locator, type Page } from "@playwright/test";
import { BaseObject } from "../base/baseObject";

/**
 * Combobox helper for input[role="combobox"] + listbox implementations (Downshift, react-autosuggest, etc.)
 * - Use SelectOption({ byText }) or SelectOption({ byIndex })
 * - Works when the listbox is rendered in a portal (searches page-level listboxes)
 */
export class Combobox extends BaseObject {
  private _page: Page;

  constructor(locator: Locator, page: Page) {
    super(locator);
    this._page = page;
  }

  /**
   * Select an option by visible text or by index
   * @param option { byIndex?: number, byText?: string }
   */
  public async SelectOption(option: { byIndex?: number; byText?: string }): Promise<void> {
    // open combobox (click input)
    try {
      await this._locator.click();
    } catch {
      // fallback in case input is not directly clickable
      await this._locator.evaluate((el: HTMLElement) => el.click());
    }

    // Helper: try to click an option inside visible listboxes (role=listbox OR ul[role="listbox"])
   const clickOptionInListboxes = async (predicate: string | number): Promise<boolean> => {
    return await this._page.evaluate((pred: string | number) => {
        const isIndex = typeof pred === "number";
        const wanted = isIndex ? pred : ("" + pred).trim().toLowerCase();
        const boxes = Array.from(document.querySelectorAll('ul[role="listbox"], [role="listbox"]'));
        const visibleBoxes = boxes.filter(b => {
        const s = window.getComputedStyle(b);
        return s.visibility !== "hidden" && s.display !== "none" && b.getClientRects().length > 0;
        });

        if (visibleBoxes.length === 0) return false;

        if (isIndex) {
        let count = 0;
        for (const box of visibleBoxes) {
            const opts = Array.from(box.querySelectorAll('[role="option"], li, div'));
            for (const o of opts) {
            if (count === (pred as number)) {
                (o as HTMLElement).click();
                return true;
            }
            count++;
            }
        }
        return false;
        } else {
        for (const box of visibleBoxes) {
            const opts = Array.from(box.querySelectorAll('[role="option"], li, div'))
            .filter(n => (n.textContent || "").trim().length > 0);
            for (const opt of opts) {
            const txt = (opt.textContent || "").trim().toLowerCase();
            if (txt === wanted) {
                (opt as HTMLElement).click();
                return true;
            }
            }
        }
        return false;
        }
    }, predicate);
    };


    // If byIndex provided
    if (option.byIndex !== undefined) {
      const clicked = await clickOptionInListboxes(option.byIndex);
      if (!clicked) {
        // fallback: try pressing ArrowDown index times and Enter
        for (let i = 0; i <= option.byIndex; i++) {
          await this._locator.press("ArrowDown");
          await this._page.waitForTimeout(100);
        }
        await this._locator.press("Enter");
      }
      return;
    }

    // If byText provided
    if (option.byText) {
      const text = option.byText;
      const clicked = await clickOptionInListboxes(text);
      if (clicked) return;

      // fallback: search page for matching text nodes inside common listbox containers and click them
      const fallbackClicked = await this._page.locator(`ul[role="listbox"] >> text=${text}`).first().count()
        .then(c => c > 0)
        .catch(() => false);

      if (fallbackClicked) {
        await this._page.locator(`ul[role="listbox"] >> text=${text}`).first().click();
        return;
      }

      // last resort: type the text then keyboard-select
      await this._locator.fill(text);
      await this._locator.press("ArrowDown");
      await this._locator.press("Enter");
      return;
    }

    // Default: press ArrowDown then Enter to pick first
    await this._locator.press("ArrowDown");
    await this._locator.press("Enter");
  }
}

