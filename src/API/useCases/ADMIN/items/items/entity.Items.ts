export enum IItemType {
    'Inventory Item' = 'inventoryitem',
    "feeitem" = 'Fee Item',
    "Negative Item" = "negativeitem",
    "Lotto Sale" = "lotto_sale",
    "Lotto Payout" = "lotto_payout",
    "Deposit Return" = "depositreturn",
    "Gift Item" = "gift_item",
    "Online Lottery" = "online_lottery",
    "Online Payout" = "online_payout",
    "Manual Item" = "manual_item",
    "House Pay" = "housepay_item",
    "Coupon ($)" = "coupon_item",
    "Coupon (%)" = "perchantage",
}
export interface EntityItemsData {
    Delete?: "Delete",
    StockCodes: EntityItem_StockCodes[],
    Name: string,
    ReplaceName?: string,
    Modifiers: EntityItem_Modifiers[],
    Size?: string,
    VendorItemNO?: string,
    ItemType?: IItemType,
    Category?: string,
    Supplier?: string,
    UnitsPerCase?: number,
    CaseCostTotal?: number,
    Tax: string,
    SKU?: string,
    ReorderPoint?: number,
    ReorderValue?: number,
    Rank?: "" | "A" | "B" | "C" | "D",
    PromptForQty?: boolean,
    AddAnotherItem?: boolean,
    PrintLabel?: boolean,
    Options?: {
        AdditionalFees?: string[],
        DoNotAutoUpdate?: boolean,
        AddToShortCutKeys?: {
            ItemShortCutName: string,
            ItemSortNo?: string
        },
        DoNotApplyManualDiscount?: boolean,
        excludefrompromotion?: boolean,
        DoNotShowToWebstore?: boolean
        EBTEligible?: boolean,
        DoNotTrackInventory?: boolean,
        CloseOutItem?: boolean,
        ExcludeFromPromotions?: boolean,
        HideInventory?: boolean,
        DefaultQty?: number,
        MinPrice?: number,
        RemindDate?: string,
        VendorItemName?: string,
        Notes?: string,
        Tags?: string[],
        ItemType?: IItemType,
        PointsRequired?: number,
    }
}


export interface EntityItem_StockCodes {
    Stockcode: string,
    QtyOnHand?: number,
    Cases?: number
}

export interface EntityItem_Modifiers {
    Qty: number,
    Price: number,
    AvgCost?: number,
    Margin?: number,
    Markup?: number,
    LatestCost?: number,
    Propmt?: boolean
}