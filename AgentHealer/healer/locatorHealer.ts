import { Page } from "@playwright/test";
import { findSelectorFix, saveSelectorFix } from "./selectorHealer";
import { askLLMForFix } from "../llm/askLLMForFix";

export async function healLocator(params: {
  page: Page;
  selector: string;
  error: string;
}) {
  const { page, selector, error } = params;

  // Try memory first
  const memoryFix = findSelectorFix(error, selector);
  if (memoryFix) {
    console.log("⚡ Using memory selector:", memoryFix);
    return memoryFix;
  }

  // Collect DOM
  const domSnapshot = await page.evaluate(() => {
    return document.body.innerHTML.slice(0, 15000);
  });

  if (!domSnapshot) {
    console.warn("⚠️ No DOM snapshot found");
    return null;
  }

  // 2️⃣ Ask LLM
  const healedSelector = await askLLMForFix({
    selector,
    error,
    url: page.url(),
    domSnapshot,
  });

  if (!healedSelector || healedSelector === "NO_STABLE_LOCATOR") {
    console.warn("🤖 LLM could not heal");
    return null;
  }

  // 3️⃣ Validate selector
  const locator = page.locator(healedSelector);

  try {
    await locator.first().waitFor({ timeout: 3000 });

    const visible = await locator.first().isVisible();

    if (!visible) {
      console.warn("⚠️ Selector found but not visible:", healedSelector);
      return null;
    }

    // 💾 Save success
    saveSelectorFix({
      error,
      selector,
      fixedSelector: healedSelector,
    });

  } catch {
    console.warn("❌ Selector not usable:", healedSelector);
    return null;
  }

  console.log("✅ Healed selector:", healedSelector);
  return healedSelector;
}