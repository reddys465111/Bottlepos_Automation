import { IItemType } from "../../API/useCases/ADMIN/items/items";
import { CATEGORIES } from "./data.category";

export const ITEMS = { 
    NO_AGE_VERIFICATION: {
        TITLE: 'ITEM NO AGE',
        SHORTCUTNAME: 'NO AGE',
        BARCODE: '9999988558',
        PRICE: 10,
        MIN_PRICE: 9,
        ITEM_TYPE: IItemType["Inventory Item"]
    },
    AGE_VERIFICATION: {
        TITLE: 'ITEM AGE',
        SHORTCUTNAME: 'AGE',
        BARCODE: '9999988120',
        PRICE: 20,
        MIN_PRICE: 18,
        ITEM_TYPE: IItemType["Inventory Item"]
    },
    NO_DISCOUNT: {
        TITLE: 'ITEM NO DISCOUNT',
        SHORTCUTNAME: 'NO DISCOUNT',
        BARCODE: '9999988337',
        PRICE: 5.5,
        MIN_PRICE: 4.99,
        ITEM_TYPE: IItemType["Inventory Item"]
    },
    ITEM_2: {
        TITLE: 'TEST 2',
        SHORTCUTNAME: 'TEST2',
        BARCODE: '9999954073',
        PRICE: 16,
        MIN_PRICE: 14.99,
        ITEM_TYPE: IItemType["Inventory Item"]
    },
    LOTTERY: {
        TITLE: 'ONLINE LOTTERY',
        BARCODE: 'O_LOTTERY',
        SHORTCUTNAME: 'LOTTERY',
        PRICE: 5,
        MIN_PRICE: 4.99,
        ITEM_TYPE: IItemType["Online Lottery"]
    },
    LOTTO_SALE: {
        TITLE: 'LOTTO SALE',
        BARCODE: 'L_SALE',
        SHORTCUTNAME: 'LOTTO SALE',
        PRICE: 5,
        MIN_PRICE: 4.99,
        ITEM_TYPE: IItemType["Lotto Sale"]
    },
    LOTTO_PAYOUT: {
        TITLE: 'LOTTO PAYOUT',
        BARCODE: 'L_PAYOUT',
        SHORTCUTNAME: 'LOTTO PAYOUT',
        PRICE: 5,
        MIN_PRICE: 4.99,
        ITEM_TYPE: IItemType["Lotto Payout"]
    },
    ONLINE_PAYOUT: {
        TITLE: 'ONLINE PAYOUT',
        BARCODE: 'O_PAYOUT',
        SHORTCUTNAME: 'ONLINE PAYOUT',
        PRICE: 5,
        MIN_PRICE: 4.99,
        ITEM_TYPE: IItemType["Online Payout"]
    },
    GIFTCARD: {
        TITLE: 'GIFT CARD',
        BARCODE: 'undefined',
        SHORTCUTNAME: 'GIFT CARD',
        PRICE: 0,
        MIN_PRICE: 0,
        ITEM_TYPE: IItemType["Gift Item"]
    },
    CROWN: {
        TITLE: 'CROWN ROYAL 750ML',
        SHORTCUTNAME: 'CROWN 750ML',
        BARCODE: '9999915129',
        PRICE: 28,
        MIN_PRICE: 24.99,
        ITEM_TYPE: IItemType["Inventory Item"]
    },
    BUDLIGHT: {
        TITLE: 'BUD LIGHT 30PK',
        SHORTCUTNAME: 'BUD 30PK',
        BARCODE: '9999934945',
        PRICE: 24.99,
        MIN_PRICE: 21.99,
        ITEM_TYPE: IItemType["Inventory Item"],
        VendorItemNO:'369258147'
    },
    JACK: {
        TITLE: 'JACK 750ML',
        SHORTCUTNAME: 'JACK 750ML',
        BARCODE: '9999961748',
        PRICE: 25.99,
        MIN_PRICE: 21.99,
        ITEM_TYPE: IItemType["Inventory Item"]
    },
    INCLUSIVE_TAX: {
        TITLE: 'INCLUSIVE TAX ITEM',
        SHORTCUTNAME: 'INCLUSIVE TAX',
        BARCODE: '9999988668',
        PRICE: 10,
        ITEM_TYPE: IItemType["Inventory Item"]
    },
    //This item is editable and has a price of 10
    //should be used to test the edit item functionality
    //and to not affect other items
    EDITABLE_ITEM: {
        TITLE: 'EDITABLE ITEM',
        SHORTCUTNAME: 'EDITABLE',
        BARCODE: '9997988778',
        PRICE: 10,
        MIN_PRICE: 9.99,
        ITEM_TYPE: IItemType["Inventory Item"]
    },
    RankA: {
        TITLE: 'RANK A ITEM',
        SHORTCUTNAME: 'RANK A',
        BARCODE: '9999988121',
        PRICE: 20,
        RANK: 'A',
        ITEM_TYPE: IItemType["Inventory Item"]
    },
    RankB: {
        TITLE: 'RANK B ITEM',
        SHORTCUTNAME: 'RANK B',
        BARCODE: '9999988122',
        PRICE: 20,
        RANK: 'B',
        ITEM_TYPE: IItemType["Inventory Item"]
    },
    RankC: {
        TITLE: 'RANK C ITEM',
        SHORTCUTNAME: 'RANK C',
        BARCODE: '9999988123',
        PRICE: 20,
        RANK: 'C',
        ITEM_TYPE: IItemType["Inventory Item"]
    },
    RankD: {  
        TITLE: 'RANK D ITEM',
        SHORTCUTNAME: 'RANK D',
        BARCODE: '9999988124',
        PRICE: 20,
        RANK: 'D',
        ITEM_TYPE: IItemType["Inventory Item"]
    },
    COUPON_DOLLAR: {
        TITLE: 'COUPON 5$',
        SHORTCUTNAME: 'CPN5$',
        BARCODE: 'CPND',
        PRICE: 5,
        ITEM_TYPE: IItemType["Coupon ($)"]
    },
    COUPON_PERCENTAGE: {
        TITLE: 'COUPON 5%',
        SHORTCUTNAME: 'CPN5%',
        BARCODE: 'CPNP',
        PRICE: 5,
        ITEM_TYPE: IItemType["Coupon (%)"]
    },
    LOYALTY_ITEM: {
        TITLE: 'LOYALTY ITEM',
        SHORTCUTNAME: 'LOYALTY ITEM',
        BARCODE: '9999988125',
        PRICE: 10,
        ITEM_TYPE: IItemType["Inventory Item"],
        POINTS_REQUIRED: 20
    },
    ExcludecatfromDualPriceitem: {
        TITLE: 'TITO 750ML',
        SHORTCUTNAME: 'TITO',
        BARCODE: '9999958166',
        PRICE: 15.99,
        Category: CATEGORIES.LIQUOR.Name,
        ITEM_TYPE: IItemType["Inventory Item"]
    },
    EBT: {
        TITLE: 'EBT ITEM',
        SHORTCUTNAME: 'EBT ITEM',
        BARCODE: '9999988126',
        PRICE: 10,
        ITEM_TYPE: IItemType["Inventory Item"],
        OPTIONS: {
            EBTEligible: true
        }
    },
    TAXABLE_ADDITIONAL_FEE: {
        TITLE: 'TAXABLE ADDITIONAL FEE ITEM',
        SHORTCUTNAME: 'TAXABLE AF ITEM',
        BARCODE: '9999988127',
        PRICE: 5,
        ITEM_TYPE: IItemType["Inventory Item"],
        OPTIONS: {
            AdditionalFees: ['TAXABLE ADDITIONAL FEE']
        }
    }, 
    EBT_ELIGIBLE_ITEM: {
        TITLE: 'EBT ELIGIBLE ITEM',
        SHORTCUTNAME: 'EBT ELIGIBLE ITEM',
        BARCODE: '9999988128',
        PRICE: 10,
        ITEM_TYPE: IItemType["Inventory Item"],
        OPTIONS: {
           EBTEligible: true
        }
    },
    EBT_ELIGIBLE_CATEGORY: {
        TITLE: 'EBT ELIGIBLE CATEGORY',
        SHORTCUTNAME: 'EBT ELIGIBLE CATEGORY',
        BARCODE: '9999988129',
        PRICE: 20,
        CATEGORY: CATEGORIES.EBT_ELIGIBLE.Name,
        ITEM_TYPE: IItemType["Inventory Item"],
        OPTIONS: {
            EBTEligible: false
        }
    }
}
