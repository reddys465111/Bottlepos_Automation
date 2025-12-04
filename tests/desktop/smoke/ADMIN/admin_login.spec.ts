import { test, expect } from '@playwright/test';
import { ADMIN } from '../../../../src/section/ADMIN';
import { Initializer } from '../../../../src/utils';
import { Dialog } from '../../../../src/section/POS/dialogs/dialog';
import { POS } from '../../../../src/section/POS';

//This block runs before each test
test.beforeEach(async ({ page }) => {
    await Initializer.Init(page, {Admin: true});
});

//This block runs after each test
test.afterEach(async ({ page }, testInfo) => {
    await Initializer.Finalize(page, testInfo);
});

test.describe('Admin Section - Login', { tag: ['@smoke', '@admin', '@login'] }, () => {
    

  
});
