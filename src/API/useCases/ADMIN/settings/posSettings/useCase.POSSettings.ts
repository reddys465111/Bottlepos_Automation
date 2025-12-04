
import { posFetcher } from "../../../../pos.adapter";
import { EncodeData, EndPoint } from "../../../../utils";
import { DefaultTemplate, EntityPOSSettings } from "./entity.POSSettings";
import { IPOSSettingsData, IPOSSettingsResponse } from "./interface.POSSettings";

/**
 * Edit the pos settings with the provided settings
 * @param entitySettings new settings to be applied
 * @param interfaceSettings current settings
 * @returns 
 */
export const POSSettings_Edit = async (entitySettings: EntityPOSSettings, interfaceSettings: IPOSSettingsData): Promise<IPOSSettingsResponse> => {
    interfaceSettings.rectemplate = entitySettings.Receipt?.DefaultTemplate ?? (interfaceSettings.rectemplate as DefaultTemplate);
    interfaceSettings.recline2 = entitySettings.Receipt?.HeaderLine2 ?? interfaceSettings.recline2;
    interfaceSettings.recline3 = entitySettings.Receipt?.HeaderLine3 ?? interfaceSettings.recline3;

    interfaceSettings.apply_discount = entitySettings.SaleOptions?.AllowCashierToApplyDiscount ?? interfaceSettings.apply_discount;
    interfaceSettings.allow_refund = entitySettings.SaleOptions?.AllowCashierToRefundAndVoid ?? interfaceSettings.allow_refund;
    interfaceSettings.allow_remove_items = entitySettings.SaleOptions?.AllowCashierToRemoveItems ?? interfaceSettings.allow_remove_items;
    interfaceSettings.negative_items = entitySettings.SaleOptions?.AllowNegativeItemPrices ?? interfaceSettings.negative_items;
    interfaceSettings.hide_void_option = entitySettings.SaleOptions?.HideVoidOption ?? interfaceSettings.hide_void_option;
    const allowChangingStoredItemTax = entitySettings.SaleOptions?.AllowChangingStoredItemTax == 'Yes' ? 'always' : 'no';
    interfaceSettings.taxedit = allowChangingStoredItemTax ?? interfaceSettings.taxedit;
    
    const allowChangingStoredItemPrices = entitySettings.SaleOptions?.AllowChangingStoredItemPrices == 'Always' ? 'always' : 'blank';
    interfaceSettings.priceedit = allowChangingStoredItemPrices ?? interfaceSettings.priceedit;

    const doNotSaleBelowCost = entitySettings.SaleOptions?.DoNotSaleBelowCost == 'Alert' ? 'alert' : (entitySettings.SaleOptions?.DoNotSaleBelowCost == 'Not Allowed' ? 'not_allowed' : 'none');
    interfaceSettings.sale_below_cost = doNotSaleBelowCost ?? interfaceSettings.sale_below_cost;
    // other options
    interfaceSettings.enable_suspendrecall_buttons = entitySettings.OtherOPtions?.EnableSuspendRecallButtons ?? interfaceSettings.enable_suspendrecall_buttons;

    if (interfaceSettings.other_options?.alcohol_cutoff_age) {
        interfaceSettings.other_options.alcohol_cutoff_age = entitySettings.OtherOPtions?.AlcoholCutOffAge?.toString() ?? interfaceSettings.other_options?.alcohol_cutoff_age;
    }
    if (interfaceSettings.other_options?.tobacco_cutoff_age) {
        interfaceSettings.other_options.tobacco_cutoff_age = entitySettings.OtherOPtions?.TobaccoCutOffAge?.toString() ?? interfaceSettings.other_options?.tobacco_cutoff_age;
    }

    const result = await posFetcher.post<IPOSSettingsResponse>({url: EndPoint.POSSettings.Edit, data: EncodeData(interfaceSettings)});

    return result.data;
}

/**
 * Get the current configuration of the POS Settings
 * @returns 
 */
export const POSSettings_Get = async(): Promise<IPOSSettingsData> => {
    const response = await posFetcher.get<IPOSSettingsResponse>({url: EndPoint.POSSettings.Get});
    return response.data.data;
}

/**
 * Update the POS Settings with the provided settings
 * @param settings 
 */
export const POSSettings_LoadArgs = async(settings: EntityPOSSettings): Promise<void> => {
    if (settings) {
        console.log('Loading POS Settings');
    }
    const currentSettings = await POSSettings_Get();

    const updatedSettings = await POSSettings_Edit(settings, currentSettings);
}