import { EntityCategories } from "../../API/useCases/ADMIN/items/categories";
import { CATEGORYGROUPS } from "./data.categoryGroups";


export const CATEGORIES = {
    AGE: {
        Name: 'Category_Age',
        AgeVerification: '21',
        CategoryGroup: CATEGORYGROUPS.AGE,
        Tax: 'Tax'
    },
    NO_AGE: {
        Name: 'Category_NoAge',
        AgeVerification: '',
        CategoryGroup: CATEGORYGROUPS.NO_AGE,
        Tax: 'Tax'
    },
    LIQUOR :{
        Name: 'LIQUOR',
         AgeVerification: '',
         CategoryGroup: CATEGORYGROUPS.LIQUOR,
         Tax: 'Tax'
    },

    BEER :{
        Name: 'BEER',
         AgeVerification: '',
         CategoryGroup: CATEGORYGROUPS.BEER,
         Tax: 'Tax'
    },
    EBT_ELIGIBLE: {
        Name: 'EBT ELIGIBLE',
        CategoryGroup: CATEGORYGROUPS.EBT_ELIGIBLE,
        Tax: 'Tax'
    }

}
