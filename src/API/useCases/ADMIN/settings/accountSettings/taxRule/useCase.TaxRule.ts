import { posFetcher } from "../../../../../pos.adapter";
import { EncodeData, EndPoint } from "../../../../../utils";
import { IACRule, IAdminConfig } from "../../adminConfig";
import { Location_Get } from "../../deviceAndLocations/locations";
import { TaxItem_Get } from "../taxItems";
import { EntityTaxRule, ITaxRuleData, ITaxRuleResponse } from "./";



/**
 * Search the TaxRule by its Name 
 * @param taxRuleName name of the rule
 * @returns rule or undefined if not found
 */
export const TaxRule_Get = async(taxRuleName: string): Promise<ITaxRuleData|undefined> => {
    const ruleList = await TaxRules_List();
    let ruleFound : ITaxRuleData | undefined = undefined; 
    ruleList.forEach(rule => {
        if(rule.name == taxRuleName){
            ruleFound = rule;
        }
    });
    
    return ruleFound;
}

/**
 * Delete the TaxRule by its ID
 * @param taxRule to be deleted
 * @returns request response
 */
export const TaxRule_Delete = async(taxRule: ITaxRuleData): Promise<ITaxRuleResponse> => {
    const deleteResponse = await posFetcher.post<ITaxRuleResponse>({url: EndPoint.TaxRule.delete, data: EncodeData(taxRule)});
    return deleteResponse.data;
}

/**
 *  Get the list of current TaxRules 
 * */
export const TaxRules_List = async(): Promise<ITaxRuleData[]> => {
    const taxRuleGetResponse = (await posFetcher.get<IAdminConfig>({url: EndPoint.AdminConfig.Get}));
    let ruleList : ITaxRuleData[] = [];
    if(taxRuleGetResponse?.data?.data?.tax?.rules){
        ruleList = await ConvertRulestoList(taxRuleGetResponse?.data?.data?.tax?.rules as { [key: string]: ITaxRuleData });
    }
    return ruleList;
}


/**
 * Edit an existing TaxRule 
 * @param newTaxRule new data to be inserted
 * @param oldTaxRule taxRule to be update
 * @returns 
 */
export const TaxRule_Edit = async(newTaxRule: EntityTaxRule, oldTaxRule: ITaxRuleData): Promise<ITaxRuleData|undefined> => {
    
    const rules= await TaxRules_List();
    rules && (newTaxRule.DefaultTax && await DisableDefaultTax(rules));


    const taxRuleData : ITaxRuleData = {
        id: oldTaxRule.id,
        inclusive: newTaxRule.Inclusive ?? oldTaxRule.inclusive,
        isdefaulttax: newTaxRule.DefaultTax ?? oldTaxRule.isdefaulttax,
        mode: newTaxRule.MultiMode ?? oldTaxRule.mode,
        name: newTaxRule.Name ?? oldTaxRule.name,
        locations: await GetTaxRule_Locations(newTaxRule.ApplyAtLocations!) ,
        base: await GetTaxRule_BaseTaxes(newTaxRule.BaseTaxes)
    }

    const taxRuleResponse = (await posFetcher.post<ITaxRuleData>({url: EndPoint.TaxRule.Edit, data: EncodeData(taxRuleData)})).data;
    return taxRuleResponse;
}

export const TaxRule_Add = async(taxRule: EntityTaxRule): Promise<ITaxRuleData | undefined> => {
    
    const taxRuleData : ITaxRuleData = {
        name: taxRule.Name,
        isdefaulttax: taxRule.DefaultTax ?? false,
        base: await GetTaxRule_BaseTaxes(taxRule.BaseTaxes),
        locations: await GetTaxRule_Locations(taxRule.ApplyAtLocations!),
        inclusive: taxRule.Inclusive ?? true,
        mode: taxRule.MultiMode ?? 'single',
        posbutton:{
            button: taxRule.POSTaxButton ?? '',
            buttoncolor: taxRule.POSTaxButtonColor ?? "#ac725e",
        }
    }

    const response = await posFetcher.post<ITaxRuleResponse>( { url: EndPoint.TaxRule.Add, data: EncodeData(taxRuleData) } );
    return response.data.data;
}

const GetTaxRule_BaseTaxes = async(base: string[]|undefined): Promise<number[]>=>{
    let _base : number[] = [];

    if(base){
        for (let index = 0; index < base.length; index++) {
            const taxItem = await TaxItem_Get(base[index].split('(')[0].trim());
            if(taxItem){
                _base.push(Number(taxItem?.id))
            }
        }
    }

    return _base;
}

function addProperty( obj: {[key: string]: number[]}, key: string, value: number[] ) {
    return { ...obj, [key]: value };
}

const GetTaxRule_Locations = async( location: {location: string, tax: string[]}[] ): Promise<{[key: string]: number[]}> => {
    let _location : {[key: string]: number[]} = {}

    if(location){
        for (let i = 0; i < location.length; i++) {
            const loc = await Location_Get(location[i].location);
            const taxes = location[i].tax;
            let taxIds : number[] = [];

            for (let j = 0; j < taxes.length; j++) {
                const tax = await TaxItem_Get(location[i].tax[j].split('(')[0].trim());
                if(tax){
                    
                    taxIds.push(Number(tax?.id!));
                }else{
                    console.log(location[i].tax[j])
                }
            }
            _location = addProperty(_location, loc?.id!, taxIds)
        }
    }
    
    return _location;
}

/**Disable the current default Tax */
const DisableDefaultTax = async(rules: ITaxRuleData[]): Promise<void> => {
    rules.forEach( async rule => {
        if(rule.isdefaulttax){
            rule.isdefaulttax=false;
            const oldDefaultReponse = await posFetcher.post<ITaxRuleData>({url: EndPoint.TaxRule.Edit, data: EncodeData(rule)});
        }
    });
}

/** Convert the rules from AdminConfigRule format to an iterable array */
const ConvertRulestoList = async(ruleList: { [key: string]: ITaxRuleData } ): Promise<ITaxRuleData[]> => {
    let rules : ITaxRuleData[] = []
    for( const id in ruleList ){
        rules.push(ruleList[id]);
    }
    return rules;
}
