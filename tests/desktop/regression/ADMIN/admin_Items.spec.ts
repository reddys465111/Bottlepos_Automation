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

test.describe('Admin Section - Suppliers',{tag: ['@regression']}, () => {
    test('new Items in admin portal', { tag: ['@uncategorized'] },  async ({}) => {
        const item = await ADMIN.FakeData.getItemName();
         // 1). login using the valid credentials.
        await ADMIN.Login.In();
         // 2). Click on the item and click on the suppliers.
        await ADMIN.Menu.Items.GoTo();
        await ADMIN.Items.Add.Click();
        await ADMIN.Dialog.AddItem.Details.MultipackStockcode.GenerateBarcode({row: 1});
        await ADMIN.Dialog.AddItem.Details.Name.setText({value: item.name});
        await ADMIN.Dialog.AddItem.Details.MultipackQty.EditPrice({row: 1, price: Number(await ADMIN.FakeData.getItemPrice())});
        await ADMIN.Dialog.AddItem.ClickTab('Options');
        await ADMIN.Dialog.AddItem.Options.AddToShortCutKeys.Click();
        await ADMIN.Dialog.AddItem.Options.ItemShortcutName.setText({value: item.shortName});
        await ADMIN.Dialog.AddItem.Save.Click();
        await ADMIN.Items.Table.SortByColumn({columnTitle: 'ID', sortOrder: 'descending'});
        // 3). Verify that the item was added successfully.
        const newItem = await ADMIN.Items.Table.RowExists({rowColumn: 'Name', rowValue: item.name});
        expect(newItem, "the Item was not added").toBeTruthy();
    });
});