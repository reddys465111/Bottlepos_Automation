import { Page } from "@playwright/test";
import { Legacy_MultipackQty } from "./dialog_Components/legacy_MultipackQty";
import { Legacy_MultipackStockcode } from "./dialog_Components/legacy_MultipackStockcode";
import { Legacy_BaseDialog } from "../../../base/legacy/legacy_BaseDialog";
import { Button } from "../../../objects/button";
import { Checkbox } from "../../../objects/checkbox";
import { Dropdown } from "../../../objects/dropdown";
import { TextField } from "../../../objects/textField";


export type Columns_EditItemPromotions = "Id" | "Name" | "Status";

export class Dialog_AddItem extends Legacy_BaseDialog{

    public Details: {
        MultipackStockcode: Legacy_MultipackStockcode;
        MultipackQty: Legacy_MultipackQty;
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
        Click: () => Promise<void>;
       
    }

    // public Promotions: {
    //     Table: BaseTable<Columns_EditItemPromotions>;
    // }

    public Options: {
        DoNotAutoUpdate: Checkbox;
        DoNotTrackInventory: Checkbox;
        AddToShortCutKeys: Checkbox;
        CloseOutItem: Checkbox;
        DoNotApplyManualDiscount: Checkbox;
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
        ItemShortcutName: TextField;
        ItemSortNo: TextField;
        Click: () => Promise<void>;
    }
    public Save: Button;
    public CreateUpdate: Button;
    public Update: Button;
    public Cancel: Button;

    constructor(page: Page){
        super(page, page.locator('[aria-describedby="adddialog"]'));
        this.Details = {
            MultipackQty : new Legacy_MultipackQty(this._locator.locator('.itemvarianttable')),
            MultipackStockcode : new Legacy_MultipackStockcode(this._locator),
            Name : new TextField(this._locator.locator('#newitemname')),
            Size : new Dropdown(this._locator.locator('#newitemdesc')),
            VendorItemNo : new TextField(this._locator.locator('#vendoritemno1')),
            Category : new Dropdown(this._locator.locator('#newitemcategory')),
            Supplier : new Dropdown(this._locator.locator('#newitemsupplier')),
            Sku : new TextField(this._locator.locator('#newitemaltname')),
            UnitsPerCase : new TextField(this._locator.locator('#newunitspercase')),
            CaseCostTotal : new TextField(this._locator.locator('#newcasecosttotal')),
            Tax : new Dropdown(this._locator.locator('#newitemtax')),
            ReorderPoint : new TextField(this._locator.locator('#newitemreorderpoint')),
            ReorderValue : new TextField(this._locator.locator('#newitemreordervalue')),
            Rank : new Dropdown(this._locator.locator('#newitemrank')),
            PrintLabel : new Checkbox(this._locator.locator('#printlabel')),
            Click: async () => {
                await this._locator.getByRole('link', { name: 'Details' }).click();
            }
        }

        this.Options = {
            DoNotAutoUpdate : new Checkbox(this._locator.locator('#donotauto1')),
            DoNotTrackInventory : new Checkbox(this._locator.locator('#donottrackinv1')),
            AddToShortCutKeys : new Checkbox(this._locator.locator('#shortcut_keys1')),
            CloseOutItem : new Checkbox(this._locator.locator('#newcloseoutitem')),
            DoNotApplyManualDiscount : new Checkbox(this._locator.locator('#newdonotdiscountitem')),
            ExcludeFromReports : new Checkbox(this._locator.locator('#newexcludefrompromotion')),
            DoNotShowToWebsite : new Checkbox(this._locator.locator('#newshowtowebstoreitem')),
            HideInventory : new Checkbox(this._locator.locator('#newshowhideinventory')),
            EBTEligible : new Checkbox(this._locator.locator('newebtenable')),

            DefaultQty : new TextField(this._locator.locator('#newitemqty')),
            MinPrice : new TextField(this._locator.locator('#newitemminprice')),
            RemindDate : new TextField(this._locator.locator('#newitemreminddate')),
            VendorItemName : new TextField(this._locator.locator('#newitemvendorname')),
            Notes : new TextField(this._locator.locator('#newitemnotes')),
            Tags : new TextField(this._locator.locator('#newitemtags')),
            ItemType : new Dropdown(this._locator.locator('#newinvitemtype')),
            ItemShortcutName : new TextField(this._locator.locator('#newitemshortcutname')),
            ItemSortNo : new TextField(this._locator.locator('#newitemsortno')),
            Click: async () => {
                await this._locator.getByRole('link', { name: 'Options' }).click();
            }
        }

        this.CreateUpdate = new Button(this._locator.getByRole('button', { name: 'Create & Update' }));
        this.CreateUpdate.SetAfterEvent(async () => {
            await this._page.waitForTimeout(2000);
        });

        this.Update = new Button(this._locator.getByRole('button', { name: 'Update' }));
        this.Update.SetAfterEvent(async () => {
            await this._page.waitForTimeout(2000);
        });
        this.Save = new Button(this._locator.getByRole('button', { name: 'Save' }));
        this.Save.SetAfterEvent(async () => {
            await this._page.waitForTimeout(2000);
        });
        this.Cancel = new Button(this._locator.getByRole('button', { name: 'Cancel' }));
    }

    public async ClickTab(tabName: string) {
        await this._locator.getByRole('link', { name: tabName }).click();
    }
}