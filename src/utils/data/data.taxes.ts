import { EntityAdditionalFees } from "../../API/useCases/ADMIN/settings/accountSettings/additionalFees/entity.AdditionalFees";
import { EntityTaxItem } from "../../API/useCases/ADMIN/settings/accountSettings/taxItems/entity.taxItem";
import { EntityTaxRule } from "../../API/useCases/ADMIN/settings/accountSettings/taxRule/entity.TaxRule";

export interface ITax<T> {
    [key: string]: T
}
export const TAXRULES: ITax<EntityTaxRule> = {
    'NewTaxRule': {
        Name: 'NewTaxRule',
        BaseTaxes: ['NewTaxItem'],
        ApplyAtLocations: [{location: 'Inventory', tax: ['NewTaxItem']}],
    },
    'MultiExclisiveTax': {
        Name: 'MultiExclisiveTax',
        Inclusive: false,
        DefaultTax: false,
        MultiMode: "multiple",
        BaseTaxes: ['Tax','NewTaxItem'],  
        POSTaxButton: "Button1",
        POSTaxButtonColor: "#ac725e",
    },

    'MultiInclusiveTax': {
        Name: 'MultiInclusiveTax',
        Inclusive: true,
        DefaultTax: false,
        MultiMode: "multiple",
        BaseTaxes: ['Tax','NewTaxItem'],  
        POSTaxButton: "Button1",
        POSTaxButtonColor: "#ac725e",
    },

    'InclusiveTax': {
        Name: 'InclusiveTax',
        Inclusive: true,
        DefaultTax: false,
        MultiMode: "single",
        BaseTaxes: ['Tax'],  
        POSTaxButton: "Button1",
        POSTaxButtonColor: "#ac725e",
    },

    'ExclusiveTax': {
        Name: 'ExclusiveTax',
        Inclusive: true,
        DefaultTax: false,
        MultiMode: "single",
        BaseTaxes: ['Tax'],  
        POSTaxButton: "Button1",
        POSTaxButtonColor: "#ac725e",
    }

}

export const TAXITEMS: ITax<EntityTaxItem> = {
    'Tax': {
        Name: 'Tax',
        Value: 8
    },
    'NewTaxItem': {
        Name: 'NewTaxItem',
        Value: 5.5
    },
   
}

export const ADDITIONAL_FEES: ITax<EntityAdditionalFees> = {
    'TAXABLE_ADDITIONAL_FEE': {
        Name: 'TAXABLE ADDITIONAL FEE',
        Value: 5,
        Type: 'percentage',
        Taxable: true
    }
}
