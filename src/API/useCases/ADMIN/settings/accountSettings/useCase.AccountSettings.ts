import { posFetcher } from "../../../../pos.adapter";
import { EncodeData, EndPoint } from "../../../../utils";
import { EntityAccountSettings, NonCashAdj_DualPrincingType } from "./entity.AccountSettings";
import { IAccountSettings, IAccountSettingsResponse } from "./interface.AccountSettings";

import { AdditionalFees_Add, AdditionalFees_Delete, AdditionalFees_Edit, AdditionalFees_Get } from "./additionalFees/useCase.AdditionalFees";
import { BottleDeposit_Add, BottleDeposit_Delete, BottleDeposit_Edit, BottleDeposit_Get } from "./bottleDeposits/useCase.BottleDeposit";
import { TaxItem_Add, TaxItem_Delete, TaxItem_Edit, TaxItem_Get } from './taxItems'
import { TaxRule_Get, TaxRule_Delete, TaxRule_Edit, TaxRule_Add } from "./taxRule";
import { AccountingSettingsDefaultPayload } from "./data/data.AccountingSettingsDefaultPayload";
import { AccountingSettingsPayload } from "./interface.AccountingSettingsPayload";


export const AccountingSettings_Edit = async(entityAccountSettings: EntityAccountSettings): Promise<IAccountSettings> => {
    // const response = await posFetcher.get<IAccountSettingsResponse>({url: EndPoint.AccountingSettings.Get });

    // let output: IAccountSettings = response.data.data;
    let output: AccountingSettingsPayload = AccountingSettingsDefaultPayload;
    if(!entityAccountSettings.SetDefault)
    {
        const tax = entityAccountSettings.TaxButton ? await TaxRule_Get(entityAccountSettings.TaxButton) : undefined;
        const defaultTax = entityAccountSettings.DefaultEBTTax ? await TaxRule_Get(entityAccountSettings.DefaultEBTTax) : undefined;
        
        if(output.ebt_button){
            output.ebt_button.ebt_taxid = tax?.id ?? output.ebt_button?.ebt_taxid;
            output.ebt_button.ebtlabel = entityAccountSettings.TaxLabel ?? output.ebt_button.ebtlabel
            output.ebt_button.etbenable = entityAccountSettings.TaxButton_Enable ?? output.ebt_button.etbenable;
        }

        output.defaultebttax = {
            ebt_taxid: entityAccountSettings.DefaultEBTTax ? defaultTax?.id ?? output.defaultebttax?.ebt_taxid : output.defaultebttax?.ebt_taxid,
            ebtenable: entityAccountSettings.DefaultEBTTax_Enable ?? output.defaultebttax?.ebtenable,
        }
        output.additionalchargesenable = entityAccountSettings.AdditionalFees_Enable ?? output.additionalchargesenable;

        output.itemdeposit = entityAccountSettings.BottleDeposit_Enable ?? output.itemdeposit;
        output.itemdepositlabel = entityAccountSettings.BottleDeposit_Label ?? output.itemdepositlabel;
        output.itemdeposittaxable = entityAccountSettings.BottleDeposit_Taxable ?? output.itemdeposittaxable;
        output.itemdepositamount = entityAccountSettings.BottleDeposit_ReturnAmount ?? output.itemdepositamount;

        let noncashadjusmentValue = false;
        let dualdebitValue = false;
        let enabledualpricingbuttonValue = false;
        let percentageDualValue = entityAccountSettings.NonCashAdj_DualPricing?.Percentage ?? output.noncashadjustment?.noncashadjustmentpercentdual;
        let percentageValue = entityAccountSettings.NonCashAdj_DualPricing?.Percentage ?? output.noncashadjustment?.noncashadjustmentpercent;

        if(entityAccountSettings.NonCashAdj_DualPricing?.Type === NonCashAdj_DualPrincingType.DualPricing){
            noncashadjusmentValue = false;
            dualdebitValue = true;
            enabledualpricingbuttonValue = true;

        }

        if(entityAccountSettings.NonCashAdj_DualPricing?.Type === NonCashAdj_DualPrincingType.NonCashAdj){
            noncashadjusmentValue = true;
            dualdebitValue = false;
            enabledualpricingbuttonValue = false;
        }
        
        if(entityAccountSettings.NonCashAdj_DualPricing?.Type === NonCashAdj_DualPrincingType.Select){
            noncashadjusmentValue = false;
            dualdebitValue = false;
            enabledualpricingbuttonValue = false;
        }
        // Ensure percentageDual gets a value if only Percentage is provided
        output.noncashadjustment = {
            ...output.noncashadjustment,
            noncashadjustmentenable: noncashadjusmentValue,
            dualdebit: dualdebitValue,
            enabledualpricingbutton: enabledualpricingbuttonValue,
            
            noncashadjustmentenableebt: entityAccountSettings.NonCashAdj_DualPricing?.EBT ?? output.noncashadjustment?.noncashadjustmentenableebt ?? false,
            noncashadjustmentenablegift: entityAccountSettings.NonCashAdj_DualPricing?.GifCard ??output.noncashadjustment?.noncashadjustmentenablegift ?? false,
            noncashadjustmentenablesidecard: entityAccountSettings.NonCashAdj_DualPricing?.SideCard ?? output.noncashadjustment?.noncashadjustmentenablesidecard ?? false,
            noncashadjustmentpercent:  entityAccountSettings.NonCashAdj_DualPricing?.Percentage ?? output.noncashadjustment?.noncashadjustmentpercent,

            noncashadjustmentminimum: entityAccountSettings.NonCashAdj_DualPricing?.Minimum ?? output.noncashadjustment?.noncashadjustmentminimum ,
            noncashadjustmentlabel: entityAccountSettings.NonCashAdj_DualPricing?.Label ?? output.noncashadjustment?.noncashadjustmentlabel ?? 'Non Cash Adj.',
            noncashadjustmenttext: entityAccountSettings.NonCashAdj_DualPricing?.CustomerScreenText ?? output.noncashadjustment?.noncashadjustmenttext ?? 'Get ${{amount}} discount by paying with Cash. Cash Payment Total ${{totalamount}}',
        
            noncashadjustmentcashasgrand: entityAccountSettings.NonCashAdj_DualPricing?.ShowCashTotalAsGrandTotalOnCustomerScreen ?? output.noncashadjustment?.noncashadjustmentcashasgrand ?? false,
            showdualcashtocashbtn: entityAccountSettings.NonCashAdj_DualPricing?.ShowCashRegularPriceOnPayButton ?? output.noncashadjustment?.showdualcashtocashbtn ?? false,
            noncashexcludebutton: entityAccountSettings.NonCashAdj_DualPricing?.ShowExcludeNonCashButton ?? output.noncashadjustment?.noncashexcludebutton ?? false,
            dualnoncashexcludebutton: entityAccountSettings.NonCashAdj_DualPricing?.ShowExcludeRegularPriceButton?? output.noncashadjustment?.dualnoncashexcludebutton ?? false,
            roundtocentbutton: entityAccountSettings.NonCashAdj_DualPricing?.RountTo9thCent ?? output.noncashadjustment?.roundtocentbutton ?? false,
        }
        if(entityAccountSettings.NonCashAdj_DualPricing?.Type === NonCashAdj_DualPrincingType.DualPricing){
            
            output.noncashadjustment.noncashadjustmentpercentdual = Number(percentageDualValue);
        }
        if(entityAccountSettings.NonCashAdj_DualPricing?.Type === NonCashAdj_DualPrincingType.NonCashAdj){
            output.noncashadjustment.noncashadjustmentpercent = percentageValue;
        }

        output.showcashnoncashtocashbtn = entityAccountSettings.NonCashAdj_DualPricing?.ShowCashNonCashOnPayButton ?? (noncashadjusmentValue ? true : false);
        output.default_starting_cash = entityAccountSettings.DefaultStartingCash ?? output.default_starting_cash;
    }
    const write = await posFetcher.post<IAccountSettingsResponse>({url: EndPoint.AccountingSettings.Edit, data: EncodeData(output)});
    return write.data.data;

}


export const AccountingSettings_LoadArgs = async(args: EntityAccountSettings): Promise<void> => {
    if (args) {
        console.log('Loading Accounting Settings');
    }
    // Process TaxItem lists
    args.TaxItems?.forEach( async tItem => { 
        const taxItem = await TaxItem_Get(tItem.Name);
        if(taxItem) {
            //if the item has enabled the Delete property then delete the tax 
            if(tItem.Delete){
                // Delete Tax Items
                try {
                    await TaxItem_Delete(taxItem);
                } catch (error) {
                    console.log('Error trying to delete a taxItem', error);
                }

            // if the item doesn't have enabled the delete property then edit the tax item
            }else{ 
                // Edit Tax Items
                try {
                    await TaxItem_Edit(tItem, taxItem);
                } catch (error) {
                    console.log('Error trying to edit a taxItem', error);
                }

            }
        }else{// Add new Tax Item
            try {
                tItem.Delete!=true && await TaxItem_Add(tItem);
                
            } catch (error) {
                console.log('Error trying to add a taxItem', error);
            }
        }
    });

    args.BottleDeposit?.forEach(async bDeposit=>{
        const itemDeposit = await BottleDeposit_Get(bDeposit.Name);
        if(itemDeposit){
            if(bDeposit.Delete){
                // Delete Bottle Deposit
                try {
                    await BottleDeposit_Delete(itemDeposit);
                } catch (error) {
                    console.log('Error trying to delete a bottle deposit', error);
                }
            }else{
                // Edit Bottle Deposit
                try {
                    await BottleDeposit_Edit(bDeposit, itemDeposit);
                } catch (error) {
                    console.log('Error trying to edit a bottle deposit', error);
                }
            }
        }else{
            // Add new Bottle Deposit
            try {
                (bDeposit.Delete!=true) && await BottleDeposit_Add(bDeposit);
            } catch (error) {
                console.log('Error trying to add a bottle deposit', error);
            }
        }
    });
    
    //Process Additional fees
    args.AdditionalFees?.forEach(async value => {
        const fee = await AdditionalFees_Get(value.Name);
        if(fee){
            // Delete Additional fee
            if(value.Delete){
                try {
                    await AdditionalFees_Delete(fee);
                } catch (error) {
                    console.log('Error trying to delete an additional fee', error);
                }
            }else{
                // Edit Additional Fee
                try {
                    await AdditionalFees_Edit(value, fee);
                } catch (error) {
                    console.log('Error trying to edit an additional fee', error);
                }
            }
        }else{
            // Add new Additional Fee
            try {
                if(value.Delete!=true){
                    await AdditionalFees_Add(value);
                }
            } catch (error) {
                console.log('Error trying to add an additional fee', error);
            }
        }
    })

    //Process taxRule lists
    args.TaxRules?.forEach(async rule => {
        const taxRule = await TaxRule_Get(rule.Name);
        if(taxRule){
            if(rule.Delete){
                // Delete rule
                try {
                    await TaxRule_Delete(taxRule);
                } catch (error) {
                    console.log('Error trying to delete a taxRule', error);
                }
            }else{
                // Edit Rule
                try {
                    await TaxRule_Edit(rule, taxRule);
                } catch (error) {
                    console.log('Error trying to edit a taxRule', error);
                }
            }
        }else{
            // Add new Rules
            try {
                if(rule.Delete!=true){
                    await TaxRule_Add(rule);
                } 
            } catch (error) {
                console.log('Error trying to add a taxRule', error);
            }
        }
    });

    await AccountingSettings_Edit(args);
}