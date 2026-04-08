import fs from "fs";
import path from "path";

export function generateTestFile(content?: string) {
  try {
    const defaultContent = `
import { test, expect } from '@playwright/test';

test('agent generated test', async ({ page }) => {
  await page.goto('https://example.com');
  await expect(page).toHaveTitle(/Example/);
});
`;

    // ✅ Use default if content is empty or invalid
    const testContent =
      content && content.trim().length > 10
        ? content
        : defaultContent;

    const testsDir = path.join(process.cwd(), "tests");

    // ✅ Ensure directory exists
    if (!fs.existsSync(testsDir)) {
      fs.mkdirSync(testsDir, { recursive: true });
    }

    // ✅ Better filename (readable + unique)
    const timestamp = Date.now();
    const fileName = `agent-test-${timestamp}.spec.ts`;

    const filePath = path.join(testsDir, fileName);

    // ✅ Write file
    fs.writeFileSync(filePath, testContent, "utf-8");

    console.log(`✅ Agent created test: ${filePath}`);

    return filePath;

  } catch (err) {
    console.error("❌ Failed to generate test file:", err);
    return null;
  }
}