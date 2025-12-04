import { Page } from "@playwright/test";
import { Dialog_AddCategory } from "./dailog_AddCategory";
import { Dialog_AddGroupCategory } from "./dialog_AddGroupCategory";
import { Dialog_AddItem } from "./dialog_AddItem";
import { Dialog_AdvanceSearch } from "./dialog_AdvanceSearch";
import { Dialog_BulkUpdate } from "./dialog_BulkUpdate";
import { Dialog_ManagePromotions } from "./dialog_ManagePromotions";
import { Dialog_ManageItemSizes } from "./dialog_ManageItemSizes";
import { Dialog_OrderItems } from "./dialog_OrderItems";
import { Dialog_ReceiveItems } from "./dialog_RecieveItems";
import { Dialog_TransferStock } from "./dialog_TransferStock";
import { Dialog_AddSupplier } from "./dialog_AddSupplier";


export class ItemsDialogs {
    private _page: Page;
    public AddCategory: Dialog_AddCategory;
    public AddSupplier: Dialog_AddSupplier;
    public AddGroupCategory: Dialog_AddGroupCategory;
    public AddItem: Dialog_AddItem;
    public AdvanceSearch: Dialog_AdvanceSearch;
    public BulkUpdate: Dialog_BulkUpdate;
    public ManageItemSizes: Dialog_ManageItemSizes;
    public ManagePromotions: Dialog_ManagePromotions;
    public OrderItems: Dialog_OrderItems;
    public ReceiveItems: Dialog_ReceiveItems;
    public TransferStock: Dialog_TransferStock;

    constructor(page: Page) {
        this._page = page;
        this.AddCategory = new Dialog_AddCategory(page);
        this.AddGroupCategory = new Dialog_AddGroupCategory(page);
        this.AddItem = new Dialog_AddItem(page);
        this.AdvanceSearch = new Dialog_AdvanceSearch(page);
        this.BulkUpdate = new Dialog_BulkUpdate(page);
        this.ManageItemSizes = new Dialog_ManageItemSizes(page);
        this.ManagePromotions = new Dialog_ManagePromotions(page);
        this.OrderItems = new Dialog_OrderItems(page);
        this.ReceiveItems = new Dialog_ReceiveItems(page);
        this.TransferStock = new Dialog_TransferStock(page);
        this.AddSupplier = new Dialog_AddSupplier(page);
    }
}