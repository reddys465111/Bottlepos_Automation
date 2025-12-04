import { test, expect } from '@playwright/test';
import { POS } from '../../../../src/section/POS';
import { Initializer } from '../../../../src/utils';

//This block runs before each test
test.beforeEach(async ({ page }) => {
    await Initializer.Init(page);
});

//This block runs after each test
test.afterEach(async ({ page }, testInfo) => {
    await Initializer.Finalize(page, testInfo);
});

test.describe.skip('POS Section - Suspended Sales', () => {
   
});
