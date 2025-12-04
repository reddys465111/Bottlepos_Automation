import { test, expect } from '@playwright/test';
import { ADMIN } from '../../../../src/section/ADMIN';
import { CATEGORIES, Initializer, ITEMS } from '../../../../src/utils';
import { API } from '../../../../src/API/API';

//This block runs before each test
test.beforeEach(async ({ page }) => {
    await Initializer.Init(page, {Admin: true});
});

//This block runs after each test
test.afterEach(async ({ page }, testInfo) => {
    await Initializer.Finalize(page, testInfo);
});

test.describe('Admin Section - Items', { tag: ['@smoke', '@admin', '@items'] }, () => {
    test('[C1417] - Verify if the item can be added from the admin side', { tag: ['@new'] }, async ({}) => {
        // Login
        await ADMIN.Login.In();
        
        // Go to Items
        await ADMIN.Menu.Items.GoTo()
        await ADMIN.Items.Add.Click();
        
        // Generate item data
        const itemName = await ADMIN.FakeData.getItemName();
        const itemData = {
            name: itemName.name,
            shortcutName: itemName.shortName,
            barcode: (await ADMIN.FakeData.getItemBarcode()).toString(),
            price: '10.99',
            category: 'Beverages', // Default category
            tax: 'Standard Tax', // Default tax
            supplier: 'Default Supplier' // Default supplier
        };
        
        // Fill in item details
        await ADMIN.Dialog.AddItem.Details.MultipackStockcode.GenerateBarcode({ row: 1 });
        await ADMIN.Dialog.AddItem.Details.Name.setText({value: itemData.name});
        await ADMIN.Dialog.AddItem.Details.Sku.setText({value: itemData.barcode});
        await ADMIN.Dialog.AddItem.Details.CaseCostTotal.setText({value: itemData.price});
        await ADMIN.Dialog.AddItem.Options.Click();
        await ADMIN.Dialog.AddItem.Options.AddToShortCutKeys.Check();
        await ADMIN.Dialog.AddItem.Options.ItemShortcutName.setText({value: itemData.shortcutName});
        
 
        // Create the item
        await ADMIN.Dialog.AddItem.Save.Click();
        
        // Verify item was added to the table
        await ADMIN.Items.Table.SortByColumn({columnTitle: 'ID', sortOrder: 'descending'});
        expect(await ADMIN.Items.Table.RowExists({rowColumn: 'Name', rowValue: itemData.name}), 'Item was not added').toBe(true);
    });

    test('[C1420] - Verify if the added item can be deleted from the admin side', { tag: ['@delete'] }, async ({}) => {
        // Login
        await ADMIN.Login.In();
        
        // Go to Items
        await ADMIN.Menu.Items.GoTo();
        
        // Generate item data for deletion test
        const itemName = await ADMIN.FakeData.getItemName();
        const itemData = {
            name: itemName.name,
            shortcutName: itemName.shortName,
            barcode: (await ADMIN.FakeData.getItemBarcode()).toString(),
            price: '15.99'
        };
        
        // Add an item first (using the same logic as C1417)
        await ADMIN.Items.Add.Click();
        await ADMIN.Dialog.AddItem.Details.MultipackStockcode.GenerateBarcode({ row: 1 });
        await ADMIN.Dialog.AddItem.Details.Name.setText({value: itemData.name});
        await ADMIN.Dialog.AddItem.Details.Sku.setText({value: itemData.barcode});
        await ADMIN.Dialog.AddItem.Details.CaseCostTotal.setText({value: itemData.price});
        await ADMIN.Dialog.AddItem.Options.Click();
        await ADMIN.Dialog.AddItem.Options.AddToShortCutKeys.Check();
        await ADMIN.Dialog.AddItem.Options.ItemShortcutName.setText({value: itemData.shortcutName});
        await ADMIN.Dialog.AddItem.Save.Click();
        
        // Verify item was added
        await ADMIN.Items.Table.SortByColumn({columnTitle: 'ID', sortOrder: 'descending'});
        expect(await ADMIN.Items.Table.RowExists({rowColumn: 'Name', rowValue: itemData.name}), 'Item was not added for deletion test').toBe(true);
        
        // Delete the item
        await ADMIN.Items.Table.Delete({rowColumn: 'Name', rowValue: itemData.name});
        await ADMIN.Dialog.Confirmation.Yes.Click()
        
        // Verify item was deleted
        expect(await ADMIN.Items.Table.RowExists({rowColumn: 'Name', rowValue: itemData.name}), 'Item was not deleted').toBe(false);
    });

    test('[C1421] - Verify if a list of items can be deleted from the admin side', { tag: ['@bulk-delete'] }, async ({page}) => {
        // Login
        await ADMIN.Login.In();
        
        // Go to Items
        await ADMIN.Menu.Items.GoTo();
        
        const item1 = await ADMIN.FakeData.getItemName();
        const item2 = await ADMIN.FakeData.getItemName();
        const item3 = await ADMIN.FakeData.getItemName();
        // create 3 items using the API
        await Initializer.LoadScenario({Admin: {
            Items: {
                Items: [
                    { // ITEM 1
                        Name: item1.name,
                        Tax: 'Tax',
                        ItemType: ITEMS.NO_AGE_VERIFICATION.ITEM_TYPE,
                        StockCodes: [
                            {
                                Stockcode: item1.barcode,
                                Cases: 1000,
                                QtyOnHand: 1000,
                            }
                        ],
                        Category: CATEGORIES.NO_AGE.Name,
                        Options: {
                            AddToShortCutKeys: {
                                ItemShortCutName: item1.shortName
                            }
                        },
                        Modifiers: [
                            {
                                Price: 10,
                                AvgCost: 8,
                                Margin: 20,
                                Markup: 25,
                                Qty: 1,
                                LatestCost: 0
                            }
                        ]
                    },
                    { // ITEM 2
                        Name: item2.name,
                        Tax: 'Tax',
                        ItemType: ITEMS.NO_AGE_VERIFICATION.ITEM_TYPE,
                        StockCodes: [
                            {
                                Stockcode: item2.barcode,
                                Cases: 1000,
                                QtyOnHand: 1000,
                            }
                        ],
                        Category: CATEGORIES.NO_AGE.Name,
                        Options: {
                            AddToShortCutKeys: {
                                ItemShortCutName: item2.shortName
                            }
                        },
                        Modifiers: [
                            {
                                Price: 10,
                                AvgCost: 8,
                                Margin: 20,
                                Markup: 25,
                                Qty: 1,
                                LatestCost: 0
                            }
                        ]
                    },
                    { // ITEM 3
                        Name: item3.name,
                        Tax: 'Tax',
                        ItemType: ITEMS.NO_AGE_VERIFICATION.ITEM_TYPE,
                        StockCodes: [
                            {
                                Stockcode: item3.barcode,
                                Cases: 1000,
                                QtyOnHand: 1000,
                            }
                        ],
                        Category: CATEGORIES.NO_AGE.Name,
                        Options: {
                            AddToShortCutKeys: {
                                ItemShortCutName: item3.shortName
                            }
                        },
                        Modifiers: [
                            {
                                Price: 10,
                                AvgCost: 8,
                                Margin: 20,
                                Markup: 25,
                                Qty: 1,
                                LatestCost: 0
                            }
                        ]
                    },
                ]
            }
        }})
        
        // Verify all items were added
        await ADMIN.Items.Table.SortByColumn({columnTitle: 'ID', sortOrder: 'descending'});
        expect(await ADMIN.Items.Table.RowExists({rowColumn: 'Name', rowValue: item1.name}), `Item ${item1.name} was not added for bulk deletion test`).toBe(true);
        expect(await ADMIN.Items.Table.RowExists({rowColumn: 'Name', rowValue: item2.name}), `Item ${item2.name} was not added for bulk deletion test`).toBe(true);
        expect(await ADMIN.Items.Table.RowExists({rowColumn: 'Name', rowValue: item3.name}), `Item ${item3.name} was not added for bulk deletion test`).toBe(true);
    
        // Delete all items in the list
        await ADMIN.Items.Table.CheckItem({rowColumn: 'Name', rowValue: item1.name});
        await ADMIN.Items.Table.CheckItem({rowColumn: 'Name', rowValue: item2.name});
        await ADMIN.Items.Table.CheckItem({rowColumn: 'Name', rowValue: item3.name});
        await ADMIN.Items.Table.DeleteSelected(page);

        // Press Enter close the browser alert and confirm the deletion
        await ADMIN.PressEnter();
        await ADMIN.waitForTimeout(3000);

        // Verify all items were deleted
        expect(await ADMIN.Items.Table.RowExists({rowColumn: 'Name', rowValue: item1.name}), `Item ${item1.name} was not deleted`).toBe(false);
        expect(await ADMIN.Items.Table.RowExists({rowColumn: 'Name', rowValue: item2.name}), `Item ${item2.name} was not deleted`).toBe(false);
        expect(await ADMIN.Items.Table.RowExists({rowColumn: 'Name', rowValue: item3.name}), `Item ${item3.name} was not deleted`).toBe(false);

    });
});
