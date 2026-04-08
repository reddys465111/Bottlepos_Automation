import { EntityPromotions } from "../../../src/API/useCases/ADMIN/items/promotions";
import { ITEMS } from "../../../src/utils";

export const ScenarioPromotions: EntityPromotions[] = 
[
    {
        Name: 'Promotion 1: 4 For $100',
        BulkSale: [{ qty: 4, price: 100 }],
        AppliedType: {type: "default"},
        Items: [ITEMS.CROWN.TITLE],
    }
]
