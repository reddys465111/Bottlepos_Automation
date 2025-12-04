import { Page } from "@playwright/test";
import { BaseDialog } from "../../../base/baseDialog";
import { BaseTable } from "../../../base/baseTable";
import { Button } from "../../../objects/button";
import { Checkbox } from "../../../objects/checkbox";
import { Dropdown } from "../../../objects/dropdown";

import { TextField } from "../../../objects/textField";
import { Table_MultipackStockcode } from "./components/table_MultipackStockcode";
import { table_MultipackQty } from "./components/table_MultipackQty";


export type Columns_EditItemPromotions = "Id" | "Name" | "Status";

export class Dialog_EditItem extends BaseDialog{

    public General: {
        MultipackStockcode: Table_MultipackStockcode;
        MultipackQty: table_MultipackQty;
        Name: TextField;
        Size: Dropdown;
        VendorItemNo: TextField;
        Category: Dropdown;
        Supplier: Dropdown;
        Sku: TextField;
        UnitsPerCase: TextField;
        CaseCostTotal: TextField;
        Tax: Dropdown;
        ReorderPoint: TextField;
        ReorderValue: TextField;
        Rank: Dropdown;
        PrintLabel: Checkbox;
       
    }

    public Promotions: {
        Table: BaseTable<Columns_EditItemPromotions>;
    }

    public Options: {
        DoNotAutoUpdate: Checkbox;
        DoNotTrackInventory: Checkbox;
        AddToShortCutKeys: Checkbox;
        CloseOutItem: Checkbox;
        DoNotApplyManualDiscount: Checkbox;
        ExcludeFromPromotions: Checkbox;
        ExcludeFromReports: Checkbox;
        DoNotShowToWebsite: Checkbox;
        HideInventory: Checkbox;
        EBTEligible: Checkbox;
        DefaultQty: TextField;
        MinPrice: TextField;
        RemindDate: TextField;
        VendorItemName: TextField;
        Notes: TextField;
        Tags: TextField;
        ItemType: Dropdown;
        BottleDeposit:Dropdown;
        ItemShortcutName: TextField;
        ItemSortNo: TextField;
    }
    public Update: Button;
    public Cancel: Button;
    public Create: Button;

    constructor(page: Page, dialogName?: string){
        super(page, dialogName || 'Edit Item');
        this.General = {
            MultipackQty : new table_MultipackQty(this._locator),
            MultipackStockcode : new Table_MultipackStockcode(this._locator),
            Name : new TextField(this._locator.getByLabel('Name')),
            Size : new Dropdown(this._locator.getByLabel('Size')),
            VendorItemNo : new TextField(this._locator.getByLabel('Vendor Item No')),
            Category : new Dropdown(this._locator.getByLabel('Category')),
            Supplier : new Dropdown(this._locator.getByLabel('Supplier')),
            Sku : new TextField(this._locator.getByLabel('SKU')),
            UnitsPerCase : new TextField(this._locator.getByLabel('Units Per Case')),
            CaseCostTotal : new TextField(this._locator.getByLabel('Case Cost Total')),
            Tax : new Dropdown(this._locator.getByLabel('Tax')),
            ReorderPoint : new TextField(this._locator.getByLabel('Reorder Point')),
            ReorderValue : new TextField(this._locator.getByLabel('Reorder Value')),
            Rank : new Dropdown(this._locator.getByLabel('Rank')),
            PrintLabel : new Checkbox(this._locator.getByLabel('Print Label')),
           
        }

        this.Options = {
            DoNotAutoUpdate : new Checkbox(this._locator.getByLabel('Do Not Auto Update')),
            DoNotTrackInventory : new Checkbox(this._locator.getByLabel('Do Not Track Inventory')),
            AddToShortCutKeys : new Checkbox(this._locator.getByLabel('Add to Shortcut Keys')),
            CloseOutItem : new Checkbox(this._locator.getByLabel('Close Out Item')),
            DoNotApplyManualDiscount : new Checkbox(this._locator.getByLabel('Do Not Apply Manual Discount')),
            ExcludeFromReports : new Checkbox(this._locator.getByLabel('Exclude from Reports')),
            DoNotShowToWebsite : new Checkbox(this._locator.getByLabel('Do Not Show to Website')),
            HideInventory : new Checkbox(this._locator.getByLabel('Hide Inventory')),
            EBTEligible : new Checkbox(this._locator.getByLabel('EBT Eligible')),
            ExcludeFromPromotions : new Checkbox(this._locator.getByLabel('Exclude from Promotions')),
            DefaultQty : new TextField(this._locator.getByLabel('Default Qty')),
            MinPrice : new TextField(this._locator.getByLabel('Min Price')),
            RemindDate : new TextField(this._locator.getByLabel('Remind Date')),
            VendorItemName : new TextField(this._locator.getByLabel('Vendor Item Name')),
            Notes : new TextField(this._locator.getByLabel('Notes')),
            Tags : new TextField(this._locator.getByLabel('Tags')),
            ItemType : new Dropdown(this._locator.getByLabel('Item Type')),
            BottleDeposit: new Dropdown(this._locator.getByTestId('bottledeposit-input')),
            ItemShortcutName : new TextField(this._locator.getByLabel('Item Shortcut Name')),
            ItemSortNo : new TextField(this._locator.getByLabel('Item Sort No')),
        }

        this.Update = new Button(this._locator.getByRole('button', { name: 'Update' }));
        this.Cancel = new Button(this._locator.getByRole('button', { name: 'Cancel' }));
        this.Create = new Button(this._locator.getByRole('button', { name: 'Create' }));

        this.Promotions = {
            Table: new BaseTable<Columns_EditItemPromotions>(this._locator.getByTestId('promotions-table')),
        }

        this.Create.SetAfterEvent(async () => {
            await this._page.waitForTimeout(1500);
        });

        this.Update.SetAfterEvent(async () => {
            await this._page.waitForTimeout(1500);
        });

    }
    public async ClickTab(tabName: string) {
        const tabButton = this._locator.locator('button', { hasText: tabName }).first();
        await tabButton.waitFor({ state: 'visible' });

        await tabButton.click();
    }
}