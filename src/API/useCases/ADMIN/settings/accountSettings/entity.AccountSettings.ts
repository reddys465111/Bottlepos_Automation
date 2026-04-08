
import { EntityAdditionalFees } from "./additionalFees/entity.AdditionalFees";
import { EntityBottleDeposit } from "./bottleDeposits/entity.BottleDeposit";
import { EntityTaxItem } from "./taxItems";
import { EntityTaxRule } from "./taxRule";



export enum NonCashAdj_DualPrincingType  {
    Select = 0,
    DualPricing = 1,
    NonCashAdj = 2, 
}

export enum Taxes  {
    Tax = '1',
    NoTax = '2',
}

export interface EntityAccountSettings {

    /** Specify default TaxRule by its name 
     * @example 
        TaxButton: 'NoTax',
    * */
    SetDefault?: boolean;
    TaxButton?: string;
    /**   "etbenable":false,  */
    TaxButton_Enable?: boolean 
    /**   "ebtlabel":"EBT Sale 33" */
    TaxLabel?: string; 
    // }

    // "defaultebttax":{
        /**  "ebt_taxid":"2" */
    DefaultEBTTax?: string 
    /**   "ebtenable":true, */
    DefaultEBTTax_Enable?: boolean,
    
    /**
     * @example
        TaxRules: [
                { 
                    Name: 'rule1', 
                    MultiMode: 'single', 
                    BaseTaxes: ['APPIItemTax'], 
                    ApplyAtLocations: [{location: 'Inventory', tax: ['APIItemTax', 'APIITemTax2']}]
                },
                {
                    Name: 'rule2', 
                    MultiMode: 'multiple', 
                }
            ],
     */
    TaxRules?: EntityTaxRule[],

    /**
    * @example 
        TaxItems: [
            {Name: 'APIItemTax', Value: 2},
            {Name: 'Tax', Value: 8}
        ]
    */
    TaxItems?: EntityTaxItem[],
    BottleDeposit?:  EntityBottleDeposit[],
    /**  "itemdeposit":true, */
    BottleDeposit_Enable?: boolean,
    /** "itemdepositlabel":"Bottle charges", */
    BottleDeposit_Label?: string, 
    /** "itemdeposittaxable":true, */
    BottleDeposit_Taxable?: boolean,
    /** "itemdepositamount":"-1.05", */
    BottleDeposit_ReturnAmount?: string

        /** additionalchargesenable */
    AdditionalFees?: EntityAdditionalFees[]
    
    AdditionalFees_Enable?: boolean,
    NonCashAdj_DualPricing?: {
        // "noncashadjustment":{
            /** "noncashadjustmentenable */
            Type?: NonCashAdj_DualPrincingType, //1
            /**  "dualdebit":true */
            Debit?: boolean,   
            /**  "noncashadjustmentenableebt":false,  //2  */
            EBT?: boolean,     
            /**  "noncashadjustmentenablegift":false,  //3 */
            GifCard?: boolean, 
            // "noncashadjustmentenablesidecard":false,  //4 */
            SideCard?: boolean, 

            /**  "noncashadjustmentpercent":"5",  //5 */
            Percentage?: string, 
            /**  "noncashadjustmentpercentdual":"5",  //5 */
            // percentageDual?: string,
            /**  "noncashadjustmentminimum":"1",  //6 */
            Minimum?: string, 
            /**  "noncashadjustmentlabel":"NC Adj", */
            Label?: string, 
            /**  "noncashadjustmenttext":"Get ${{amount}} discount by paying with Cash. Cash Payment Total ${{totalamount}}",  //8 */
            CustomerScreenText?: string, 
            
            /**  enabledualpricingbutton */
            EnableDualPricingButton?: boolean,
            /** "noncashadjustmentcashasgrand":false, */
            ShowCashTotalAsGrandTotalOnCustomerScreen?: boolean,  // 
            /** "showdualcashtocashbtn":false, */
            ShowCashRegularPriceOnPayButton?: boolean, // 
            /** "noncashexcludebutton": true */
            ShowExcludeNonCashButton?: boolean,  // 
            /** "dualnoncashexcludebutton":false */
            ShowExcludeRegularPriceButton?: boolean, 
            /**  "roundtocentbutton":true, */
            RountTo9thCent?: boolean   
        // },
        //this last one doesnt not belong to the group of "noncashadjusment"
        /** showcashnoncashtocashbtn: true   */
        ShowCashNonCashOnPayButton?: boolean, 
    },

    /** "default_starting_cash":"100", */
    DefaultStartingCash?: string,  


}