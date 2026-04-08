import { test, expect } from '@playwright/test';
import { ADMIN } from '../../../../src/section/ADMIN';
import { Initializer } from '../../../../src/utils';

//This block runs before each test
test.beforeEach(async ({ page }) => {
    await Initializer.Init(page, {Admin: true});
});

//This block runs after each test
test.afterEach(async ({ page }, testInfo) => {
    await Initializer.Finalize(page, testInfo);
});

test.describe("TestRail Admin Test Cases", { tag: ['@uncategorized', '@regression'] }, () => {

    test('[C1415] Verify if the user can logout from the Admin app', { tag: ['@logout'] }, async ({}) => {
        //Login the Admin Console
        await ADMIN.Login.In();
        //Perform Logout functiom
        await ADMIN.Logout.Click();
        //Confirm Logout by accept Yes
        await ADMIN.Dialog.Logout.Yes.Click();
        //Verify the user is logged out
        expect(await ADMIN.Login.FormVisible(), 'Error: Login form should be visible').toBeTruthy();
    });

    // test('[C4027] Verify Item Shortcut Name auto-populates when adding a new item', { tag: [ '@shortcut', '@item'] }, async ({}) => {
    //     //Login the Admim Application
    //     await ADMIN.Login.In();
    //     //Goto Items menu 
    //     await ADMIN.Menu.Items.GoTo();
    //     //Add New item
    //     await ADMIN.Items.Add.Click();
    //     await ADMIN.Dialog.AddItem.Details.MultipackStockcode.GenerateBarcode({ row: 1 });
    //     const item = await ADMIN.FakeData.getItemName();
    //     await ADMIN.Dialog.AddItem.Details.Name.setText({ value: item.name });
    //     await ADMIN.Dialog.AddItem.Details.MultipackQty.EditPrice({ row: 1, price: Number(await ADMIN.FakeData.getItemPrice()) });
    //     await ADMIN.Dialog.AddItem.ClickTab('Options');
    //     await ADMIN.Dialog.AddItem.Options.AddToShortCutKeys.Check();
    //     const shortcutText = await ADMIN.Dialog.AddItem.Options.ItemShortcutName.getText();
    //     expect(shortcutText.toString(), 'Error:Shortcut text should contain ' + item.name).toContain(item.name);
    // });

    test('[C4026] Verify Add to Shortcut Keys checkbox resets for each new item added', { tag: ['@shortcut', '@reset'] }, async ({}) => {
        const item = await ADMIN.FakeData.getItemName();
        //Login the POS application
        await ADMIN.Login.In();
        //Add a new item and check the "Add to Shortcut Keys" checkbox
        await ADMIN.Menu.Items.GoTo();
        await ADMIN.Items.Add.Click();
        await ADMIN.Dialog.AddItem.Details.MultipackStockcode.GenerateBarcode({ row: 1 });
        await ADMIN.Dialog.AddItem.Details.Name.setText({ value: item.name });
        await ADMIN.Dialog.AddItem.Details.MultipackQty.EditPrice({ row: 1, price: Number(await ADMIN.FakeData.getItemPrice()) });
        await ADMIN.Dialog.AddItem.ClickTab('Options');
        await ADMIN.Dialog.AddItem.Options.AddToShortCutKeys.Check();
        await ADMIN.Dialog.AddItem.Options.ItemShortcutName.setText({ value: item.name });
        
        await ADMIN.Dialog.AddItem.Save.Click();
        //Proceed to add another new item.
        await ADMIN.Items.Add.Click();
        await ADMIN.Dialog.AddItem.ClickTab('Details');
        await ADMIN.Dialog.AddItem.Details.MultipackStockcode.GenerateBarcode({ row: 1 });
        await ADMIN.Dialog.AddItem.Details.Name.setText({ value: item.name });
        await ADMIN.Dialog.AddItem.Details.MultipackQty.EditPrice({ row: 1, price: Number(await ADMIN.FakeData.getItemPrice()) });
        await ADMIN.Dialog.AddItem.ClickTab('Options');
        expect(await ADMIN.Dialog.AddItem.Options.AddToShortCutKeys.IsChecked(), 'Error: Add to Shortcut Keys checkbox should be unchecked').toBe(false);
    });

});