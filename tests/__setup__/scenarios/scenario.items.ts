import { EntityItemsData } from "../../../src/API/useCases/ADMIN/items/items";
import { ITEMS, CATEGORIES } from "../../../src/utils";


export const ScenarioItems: EntityItemsData[] = [
    { // ITEM WITHOUT AGE VERIFICATION
        Name: ITEMS.NO_AGE_VERIFICATION.TITLE,
        Tax: 'Tax',
        ItemType: ITEMS.NO_AGE_VERIFICATION.ITEM_TYPE,
        StockCodes: [
            {
                Stockcode: ITEMS.NO_AGE_VERIFICATION.BARCODE,
                Cases: 1000,
                QtyOnHand: 1000,
            }
        ],
        Category: CATEGORIES.NO_AGE.Name,
        Options: {
            AddToShortCutKeys: {
                ItemShortCutName: ITEMS.NO_AGE_VERIFICATION.SHORTCUTNAME
            },
            MinPrice: ITEMS.NO_AGE_VERIFICATION.MIN_PRICE
        },
        Modifiers: [
            {
                Price: ITEMS.NO_AGE_VERIFICATION.PRICE,
                AvgCost: 8,
                Margin: 20,
                Markup: 25,
                Qty: 1,
                LatestCost: 0
            }
        ]
    },
    { // CROWN ITEM
        Name: ITEMS.CROWN.TITLE,
        ItemType: ITEMS.CROWN.ITEM_TYPE,
        StockCodes: [
            {
                Stockcode: ITEMS.CROWN.BARCODE,
                Cases: 100,
                QtyOnHand: 100
            },
        ],
        Size: '750ML',
        Tax: 'Tax',
        Category: CATEGORIES.AGE.Name,
        Options: {
            AddToShortCutKeys: {
                ItemShortCutName: ITEMS.CROWN.SHORTCUTNAME,
            }
        },
        Modifiers: [
            {
                Price: ITEMS.CROWN.PRICE,
                AvgCost: 20,
                Margin: 28.54,
                Markup: 40,
                Qty: 1,
                LatestCost: 0
            }
        ]
    },
    { // JACK ITEM
        Name: ITEMS.JACK.TITLE,
        Tax: 'Tax',
        ItemType: ITEMS.JACK.ITEM_TYPE,
        StockCodes: [
            {
                Stockcode: ITEMS.JACK.BARCODE,
                Cases: 1000,
                QtyOnHand: 1000,
            }
        ],
        Options: {
            AddToShortCutKeys: {
                ItemShortCutName: ITEMS.JACK.SHORTCUTNAME
            }
        },
        Category: CATEGORIES.NO_AGE.Name,
        Modifiers: [
            {
                Price: ITEMS.JACK.PRICE,
                AvgCost: 20,
                Margin: 23.05,
                Markup: 29.95,
                Qty: 1,
                LatestCost: 0
            }
        ]
    },
    { // ITEM WITH AGE VERIFICATION
        Name: ITEMS.AGE_VERIFICATION.TITLE,
        ItemType: ITEMS.AGE_VERIFICATION.ITEM_TYPE,
        StockCodes: [
            {
                Stockcode: ITEMS.AGE_VERIFICATION.BARCODE,
                Cases: 1000,
                QtyOnHand: 1000
            },
        ],
        Size: '750ML',
        Tax: 'Tax',
        Category: CATEGORIES.AGE.Name,
        Options: {
            AddToShortCutKeys: {
                ItemShortCutName: ITEMS.AGE_VERIFICATION.SHORTCUTNAME,
            }
        },
        Modifiers: [
            {
                Price: ITEMS.AGE_VERIFICATION.PRICE,
                AvgCost: 20,
                Margin: 28.54,
                Markup: 40,
                Qty: 1,
                LatestCost: 0
            }
        ]
    },
    { // BUD LIGHT 
        Name: ITEMS.BUDLIGHT.TITLE,
        ItemType: ITEMS.BUDLIGHT.ITEM_TYPE,
        Tax: 'Tax',
        StockCodes: [
            {
                Stockcode: ITEMS.BUDLIGHT.BARCODE,
                // Cases: 10,
                QtyOnHand: 100
            }
        ],
        Modifiers: [
            {
                Price: ITEMS.BUDLIGHT.PRICE,
                AvgCost: 10,
                Margin: 54.52,
                Markup: 119.90,
                LatestCost: 10,
                Qty: 1,
            }
        ],
        VendorItemNO:ITEMS.BUDLIGHT.VendorItemNO,
        UnitsPerCase: 10,
        Options: {
            AddToShortCutKeys: {
                ItemShortCutName: ITEMS.BUDLIGHT.SHORTCUTNAME,
            },
            MinPrice: ITEMS.BUDLIGHT.MIN_PRICE
        }
    },
    { // EDITABLE ITEM
        Name: ITEMS.EDITABLE_ITEM.TITLE,
        Tax: 'Tax',
        ItemType: ITEMS.EDITABLE_ITEM.ITEM_TYPE,
        StockCodes: [
            {
                Stockcode: ITEMS.EDITABLE_ITEM.BARCODE,
                // Cases: 10,
                QtyOnHand: 100
            }
        ],
        Modifiers: [
            {
                Price: ITEMS.EDITABLE_ITEM.PRICE,
                AvgCost: 10,
                Margin: 54.52,
                Markup: 119.90,
                LatestCost: 10,
                Qty: 1,
            }
        ],
        UnitsPerCase: 10,
        Options: {
            AddToShortCutKeys: {
                ItemShortCutName: ITEMS.EDITABLE_ITEM.SHORTCUTNAME,
            },
            MinPrice: ITEMS.EDITABLE_ITEM.MIN_PRICE
        }
    },
    { // NO DISCOUNT ITEM
        Name: ITEMS.NO_DISCOUNT.TITLE,
        ItemType: ITEMS.NO_DISCOUNT.ITEM_TYPE,
        StockCodes: [
            {
                Stockcode: ITEMS.NO_DISCOUNT.BARCODE,
                Cases: 1000,
                QtyOnHand: 1000
            }
        ],
        Modifiers: [
            {
                Qty: 1,
                Price: ITEMS.NO_DISCOUNT.PRICE,
                AvgCost: 0.0,
                Margin: 0.0,
                Markup: 0.0,
                LatestCost: 0.0
            }
        ],
        Options: {
            AddToShortCutKeys: { ItemShortCutName: ITEMS.NO_DISCOUNT.SHORTCUTNAME },
            DoNotApplyManualDiscount: true
        },
        Tax: 'Tax',
        Category: CATEGORIES.NO_AGE.Name
      
    },
    { // GIFT CARD
        Name: ITEMS.GIFTCARD.TITLE,
        Tax: 'NoTax',
        ItemType: ITEMS.GIFTCARD.ITEM_TYPE,
        StockCodes: [
            {
                Stockcode: ITEMS.GIFTCARD.BARCODE,
                Cases: 0.0,
                QtyOnHand: 0.0
            }
        ],
        Modifiers: [
            {
                Qty: 1,
                Price: ITEMS.GIFTCARD.PRICE,
                AvgCost: 0.0,
                Margin: 0.0,
                Markup: 0.0,
                LatestCost: 0.0
            }
        ],
        Options: {
            AddToShortCutKeys: { ItemShortCutName: ITEMS.GIFTCARD.SHORTCUTNAME },
            DoNotAutoUpdate: true,
            DoNotShowToWebstore: true,
            ItemType: ITEMS.GIFTCARD.ITEM_TYPE,

        }
    },
    { // LOTTERY
        Name: ITEMS.LOTTERY.TITLE,
        Tax: 'NoTax',
        ItemType: ITEMS.LOTTERY.ITEM_TYPE,
        StockCodes: [
            {
                Stockcode: ITEMS.LOTTERY.BARCODE,
                Cases: 0,
                QtyOnHand: 0
            }
        ],
        Modifiers: [
            {
                Qty: 1,
                Price: ITEMS.LOTTERY.PRICE,
                AvgCost: 0.0,
                Margin: 100,
                Markup: 0.0,
                LatestCost: 0.0
            }
        ],
        Options: {
            AddToShortCutKeys: { ItemShortCutName: ITEMS.LOTTERY.SHORTCUTNAME },
            DoNotApplyManualDiscount: true,
            ItemType: ITEMS.LOTTERY.ITEM_TYPE,
        }
    },
    { // LOTTO SALE
        Name: ITEMS.LOTTO_SALE.TITLE,
        Tax: 'NoTax',
        ItemType: ITEMS.LOTTO_SALE.ITEM_TYPE,
        StockCodes: [
            {
                Stockcode: ITEMS.LOTTO_SALE.BARCODE,
                Cases: 0,   
                QtyOnHand: 0
            }
        ],
        Modifiers: [
            {
                Qty: 1,
                Price: ITEMS.LOTTO_SALE.PRICE,
                AvgCost: 0.0,
                Margin: 100,
                Markup: 0.0,
                LatestCost: 0.0
            }
        ]
    },
    { // LOTTO PAYOUT
        Name: ITEMS.LOTTO_PAYOUT.TITLE,
        Tax: 'NoTax',
        ItemType: ITEMS.LOTTO_PAYOUT.ITEM_TYPE,
        StockCodes: [
            {
                Stockcode: ITEMS.LOTTO_PAYOUT.BARCODE,
                Cases: 0,
                QtyOnHand: 0
            }
        ],
        Modifiers: [
            {
                Qty: 1,
                Price: ITEMS.LOTTO_PAYOUT.PRICE,
                AvgCost: 0.0,
                Margin: 100,
                Markup: 0.0,
                LatestCost: 0.0
            }
        ]
    },
    { // ONLINE PAYOUT
        Name: ITEMS.ONLINE_PAYOUT.TITLE,
        Tax: 'NoTax',
        ItemType: ITEMS.ONLINE_PAYOUT.ITEM_TYPE,
        StockCodes: [
            {
                Stockcode: ITEMS.ONLINE_PAYOUT.BARCODE,
                Cases: 0,
                QtyOnHand: 0
            }
        ],
        Modifiers: [
            {
                Qty: 1,
                Price: ITEMS.ONLINE_PAYOUT.PRICE,
                AvgCost: 0.0,
                Margin: 100,
                Markup: 0.0,
                LatestCost: 0.0
            }
        ]
    },  
    { // RANK A ITEM
        Name: ITEMS.RankA.TITLE,
        ItemType: ITEMS.RankA.ITEM_TYPE,
        StockCodes: [
            {
                Stockcode: ITEMS.RankA.BARCODE,
                Cases: 1000,
                QtyOnHand: 1000
            }
        ],
        Modifiers: [
            {
                Price: ITEMS.RankA.PRICE,
                AvgCost: 10,
                Margin: 54.52,
                Markup: 119.90,
                LatestCost: 10,
                Qty: 1,
            }
        ],
        Tax: 'Tax',
        Category: CATEGORIES.NO_AGE.Name,
        Options: {
            AddToShortCutKeys: {
                ItemShortCutName: ITEMS.RankA.SHORTCUTNAME,
            }
        },
        Rank: ITEMS.RankA.RANK as "A" | "B" | "C" | "D"
    },
    { // RANK B ITEM
        Name: ITEMS.RankB.TITLE,
        ItemType: ITEMS.RankB.ITEM_TYPE,
        StockCodes: [
            {
                Stockcode: ITEMS.RankB.BARCODE,
                Cases: 1000,
                QtyOnHand: 1000
            }
        ],
        Modifiers: [
            {
                Price: ITEMS.RankB.PRICE,
                AvgCost: 10,
                Margin: 54.52,
                Markup: 119.90,
                LatestCost: 10,
                Qty: 1,
            }
        ],
        Tax: 'Tax',
        Category: CATEGORIES.NO_AGE.Name,
        Options: {
            AddToShortCutKeys: {
                ItemShortCutName: ITEMS.RankB.SHORTCUTNAME,
            }
        },
        Rank: ITEMS.RankB.RANK as "A" | "B" | "C" | "D"
    },
    { // RANK C ITEM
        Name: ITEMS.RankC.TITLE,
        ItemType: ITEMS.RankC.ITEM_TYPE,
        StockCodes: [
            {
                Stockcode: ITEMS.RankC.BARCODE,
                Cases: 1000,
                QtyOnHand: 1000 
            }
        ],
        Modifiers: [
            {
                Price: ITEMS.RankC.PRICE,
                AvgCost: 10,
                Margin: 54.52,
                Markup: 119.90,
                LatestCost: 10,
                Qty: 1,
            }
        ],
        Tax: 'Tax',
        Category: CATEGORIES.NO_AGE.Name,
        Options: {
            AddToShortCutKeys: {
                ItemShortCutName: ITEMS.RankC.SHORTCUTNAME,
            }
        },
        Rank: ITEMS.RankC.RANK as "A" | "B" | "C" | "D"
    },
    { // RANK D ITEM
        Name: ITEMS.RankD.TITLE,
        ItemType: ITEMS.RankD.ITEM_TYPE,
        StockCodes: [
            {
                Stockcode: ITEMS.RankD.BARCODE,
                Cases: 1000,
                QtyOnHand: 1000
            }
        ],
        Modifiers: [
            {
                Price: ITEMS.RankD.PRICE,
                AvgCost: 10,
                Margin: 54.52,
                Markup: 119.90,
                LatestCost: 10,
                Qty: 1,
            }
        ],
        Tax: 'Tax',
        Category: CATEGORIES.NO_AGE.Name,
        Options: {
            AddToShortCutKeys: {
                ItemShortCutName: ITEMS.RankD.SHORTCUTNAME,
            }
        },
        Rank: ITEMS.RankD.RANK as "A" | "B" | "C" | "D"
    },
    { // COUPON 5$
        Name: ITEMS.COUPON_DOLLAR.TITLE,
        Tax: 'NoTax',
        ItemType: ITEMS.COUPON_DOLLAR.ITEM_TYPE,
        StockCodes: [
            {
                Stockcode: ITEMS.COUPON_DOLLAR.BARCODE,
                Cases: 0,
                QtyOnHand: 0
            }
        ],
        Modifiers: [
            {
                Qty: 1,
                Price: ITEMS.COUPON_DOLLAR.PRICE,
                AvgCost: 0.0,
                Margin: 100,
                Markup: 0.0,
                LatestCost: 0.0
            }
        ],
        Options: {
            AddToShortCutKeys: { ItemShortCutName: ITEMS.COUPON_DOLLAR.SHORTCUTNAME },
            DoNotApplyManualDiscount: true,
            ItemType: ITEMS.COUPON_DOLLAR.ITEM_TYPE
        }
    },
    { // COUPON 5%
        Name: ITEMS.COUPON_PERCENTAGE.TITLE,
        Tax: 'NoTax',
        ItemType: ITEMS.COUPON_PERCENTAGE.ITEM_TYPE,
        StockCodes: [
            {
                Stockcode: ITEMS.COUPON_PERCENTAGE.BARCODE,
                Cases: 0,
                QtyOnHand: 0
            }
        ],
        Modifiers: [
            {
                Qty: 1,
                Price: ITEMS.COUPON_PERCENTAGE.PRICE,
                AvgCost: 0.0,
                Margin: 100,
                Markup: 0.0,
                LatestCost: 0.0
            }
        ],
        Options: {
            AddToShortCutKeys: { ItemShortCutName: ITEMS.COUPON_PERCENTAGE.SHORTCUTNAME },
            DoNotApplyManualDiscount: true,
            ItemType: ITEMS.COUPON_PERCENTAGE.ITEM_TYPE
        }
    },
    { // LOYALTY ITEM
        Name: ITEMS.LOYALTY_ITEM.TITLE,
        Tax: 'Tax',
        ItemType: ITEMS.LOYALTY_ITEM.ITEM_TYPE,
        
        StockCodes: [
            {
                Stockcode: ITEMS.LOYALTY_ITEM.BARCODE,
                Cases: 0,
                QtyOnHand: 0
            }
        ],
        Modifiers: [
            {
                Qty: 1,
                Price: ITEMS.LOYALTY_ITEM.PRICE,
                AvgCost: 0.0,
                Margin: 100,
                Markup: 0.0,
                LatestCost: 0.0
            }
        ],
        Options: {
            AddToShortCutKeys: { ItemShortCutName: ITEMS.LOYALTY_ITEM.SHORTCUTNAME },
            DoNotApplyManualDiscount: true,
            ItemType: ITEMS.LOYALTY_ITEM.ITEM_TYPE,
            PointsRequired: ITEMS.LOYALTY_ITEM.POINTS_REQUIRED,
        }
    },
    { // INCLUSIVE TAX ITEM
        Name: ITEMS.INCLUSIVE_TAX.TITLE,
        Tax: 'Tax',
        ItemType: ITEMS.INCLUSIVE_TAX.ITEM_TYPE,
        StockCodes: [
            {
                Stockcode: ITEMS.INCLUSIVE_TAX.BARCODE,
                Cases: 0,
                QtyOnHand: 0
            }
        ],
        Modifiers: [
            {
                Qty: 1,
                Price: ITEMS.INCLUSIVE_TAX.PRICE,
                AvgCost: 0.0,
                Margin: 100,
                Markup: 0.0,
                LatestCost: 0.0
            }
        ]
    },
    { // EBT ITEM
        Name: ITEMS.EBT.TITLE,
        Tax: 'Tax',
        ItemType: ITEMS.EBT.ITEM_TYPE,
        
        StockCodes: [
            {
                Stockcode: ITEMS.EBT.BARCODE,
                Cases: 0,
                QtyOnHand: 0
            }
        ],
        Modifiers: [
            {
                Qty: 1,
                Price: ITEMS.EBT.PRICE,
                AvgCost: 0.0,
                Margin: 100,
                Markup: 0.0,
                LatestCost: 0.0
            }
        ],
        Options: {
            AddToShortCutKeys: { ItemShortCutName: ITEMS.EBT.SHORTCUTNAME },
            DoNotApplyManualDiscount: true,
            EBTEligible: ITEMS.EBT.OPTIONS.EBTEligible,
            ItemType: ITEMS.EBT.ITEM_TYPE,
        }
    },
    { // TAXABLE ADDITIONAL FEE ITEM
        Name: ITEMS.TAXABLE_ADDITIONAL_FEE.TITLE,
        Tax: 'Tax',
        ItemType: ITEMS.TAXABLE_ADDITIONAL_FEE.ITEM_TYPE,
        
        StockCodes: [
            {
                Stockcode: ITEMS.TAXABLE_ADDITIONAL_FEE.BARCODE,
                Cases: 0,
                QtyOnHand: 0
            }
        ],
        Modifiers: [
            {
                Qty: 1,
                Price: ITEMS.TAXABLE_ADDITIONAL_FEE.PRICE,
                AvgCost: 0.0,
                Margin: 100,
                Markup: 0.0,
                LatestCost: 0.0
            }
        ],
        Options: {
            AddToShortCutKeys: { ItemShortCutName: ITEMS.TAXABLE_ADDITIONAL_FEE.SHORTCUTNAME },
            DoNotApplyManualDiscount: true,
            AdditionalFees: ITEMS.TAXABLE_ADDITIONAL_FEE.OPTIONS.AdditionalFees,
            ItemType: ITEMS.TAXABLE_ADDITIONAL_FEE.ITEM_TYPE,
        }
    },
    { // EBT ELIGIBLE ITEM
        Name: ITEMS.EBT_ELIGIBLE_ITEM.TITLE,
        Tax: 'NoTax',
        ItemType: ITEMS.EBT_ELIGIBLE_ITEM.ITEM_TYPE,
        StockCodes: [
            {
                Stockcode: ITEMS.EBT_ELIGIBLE_ITEM.BARCODE,
                Cases: 0,
                QtyOnHand: 0
            }
        ],
        Modifiers: [
            {
                Qty: 1,
                Price: ITEMS.EBT_ELIGIBLE_ITEM.PRICE,
                AvgCost: 0.0,
                Margin: 100,
                Markup: 0.0,
                LatestCost: 0.0
            }
        ],
        Options: {
            AddToShortCutKeys: { ItemShortCutName: ITEMS.EBT_ELIGIBLE_ITEM.SHORTCUTNAME },
            DoNotApplyManualDiscount: true,
            EBTEligible: ITEMS.EBT_ELIGIBLE_ITEM.OPTIONS.EBTEligible,
            ItemType: ITEMS.EBT_ELIGIBLE_ITEM.ITEM_TYPE,
        }
    },
    { // EBT ELIGIBLE CATEGORY ITEM
        Name: ITEMS.EBT_ELIGIBLE_CATEGORY.TITLE,
        Tax: 'NoTax',
        ItemType: ITEMS.EBT_ELIGIBLE_CATEGORY.ITEM_TYPE,
        Category: ITEMS.EBT_ELIGIBLE_CATEGORY.CATEGORY,
        StockCodes: [
            {
                Stockcode: ITEMS.EBT_ELIGIBLE_CATEGORY.BARCODE,
                Cases: 0,
                QtyOnHand: 0
            }
        ],
        Modifiers: [
            {
                Qty: 1,
                Price: ITEMS.EBT_ELIGIBLE_CATEGORY.PRICE,
                AvgCost: 0.0,
                Margin: 100,
                Markup: 0.0,
                LatestCost: 0.0
            }
        ],
        Options: {
            AddToShortCutKeys: { ItemShortCutName: ITEMS.EBT_ELIGIBLE_CATEGORY.SHORTCUTNAME },
            DoNotApplyManualDiscount: true,
            EBTEligible: ITEMS.EBT_ELIGIBLE_CATEGORY.OPTIONS.EBTEligible,
            ItemType: ITEMS.EBT_ELIGIBLE_CATEGORY.ITEM_TYPE,
        }
    },
    { // ExcludeDualPruce Item in category.
        Name: ITEMS.ExcludecatfromDualPriceitem.TITLE,
        Tax: 'Tax',
        ItemType: ITEMS.ExcludecatfromDualPriceitem.ITEM_TYPE,
        StockCodes: [
            {
                Stockcode: ITEMS.ExcludecatfromDualPriceitem.BARCODE,
                Cases: 1000,
                QtyOnHand: 1000,
            }
        ],
        Options: {
            
            AddToShortCutKeys: {
                ItemShortCutName: ITEMS.ExcludecatfromDualPriceitem.SHORTCUTNAME
            }
        },
        Category: CATEGORIES.LIQUOR.Name,
        Modifiers: [
            {
                Price: ITEMS.ExcludecatfromDualPriceitem.PRICE,
                AvgCost: 5,
                Margin: 5,
                Markup: 5, 
                Qty: 1,
                LatestCost: 0
            }
        ]
    },
    { // ExcludeDualPruce Item in category.
        Name: ITEMS.EBT.TITLE,
        Tax: 'Tax',
        ItemType: ITEMS.EBT.ITEM_TYPE,
        StockCodes: [
            {
                Stockcode: ITEMS.EBT.BARCODE,
                Cases: 1000,
                QtyOnHand: 1000,
            }
        ],
        Options: {
            EBTEligible: true,
            AddToShortCutKeys: {
                ItemShortCutName: ITEMS.EBT.SHORTCUTNAME
            }
        },
        Category: CATEGORIES.BEER.Name,
        Modifiers: [
            {
                Price: ITEMS.EBT.PRICE,
                AvgCost: 5,
                Margin: 5,
                Markup: 5, 
                Qty: 1,
                LatestCost: 0
            }
        ]
    }
]