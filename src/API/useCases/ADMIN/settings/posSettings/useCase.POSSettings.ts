
import { posFetcher } from "../../../../pos.adapter";
import { EncodeData, EndPoint } from "../../../../utils";
import { EntityPOSSettings } from "./entity.POSSettings";
import { IPOSSettingsData, IPOSSettingsResponse } from "./interface.POSSettings";
import { POSSettingsPayload } from "./interface.POSSettingsPayload";
import { POSSettingsDefaultPayload } from "./data/data.POSSettingsDefaultPayload";


/**
 * Edit the pos settings with the provided settings
 * @param entitySettings new settings to be applied
 * @param interfaceSettings current settings
 * @returns 
 */
export const POSSettings_Edit = async (entitySettings: EntityPOSSettings, interfaceSettings: IPOSSettingsData): Promise<IPOSSettingsResponse> => {
    let payload: POSSettingsPayload = {...POSSettingsDefaultPayload};

    payload.apply_discount = entitySettings.SaleOptions?.AllowCashierToApplyDiscount ?? interfaceSettings.apply_discount ?? false;
    payload.allow_refund = entitySettings.SaleOptions?.AllowCashierToRefundAndVoid ?? interfaceSettings.allow_refund ?? false;
    payload.allow_remove_items = entitySettings.SaleOptions?.AllowCashierToRemoveItems ?? interfaceSettings.allow_remove_items ?? false;
    payload.negative_items = entitySettings.SaleOptions?.AllowNegativeItemPrices ?? interfaceSettings.negative_items ?? false;
    payload.hide_void_option = entitySettings.SaleOptions?.HideVoidOption ?? interfaceSettings.hide_void_option ?? false;
    const allowChangingStoredItemTax = entitySettings.SaleOptions?.AllowChangingStoredItemTax == 'Yes' ? 'always' : 'no';
    payload.taxedit = allowChangingStoredItemTax ?? interfaceSettings.taxedit;
    
    const allowChangingStoredItemPrices = entitySettings.SaleOptions?.AllowChangingStoredItemPrices == 'Always' ? 'always' : 'blank';
    payload.priceedit = allowChangingStoredItemPrices ?? interfaceSettings.priceedit;

    // Cash rounding
     const CashRounding = entitySettings.SaleOptions?.CashRounding == '0' ? '5' : '10';
    payload.cashrounding = CashRounding ?? interfaceSettings.cashrounding;
    
    const doNotSaleBelowCost = entitySettings.SaleOptions?.DoNotSaleBelowCost == 'Alert' ? 'alert' : (entitySettings.SaleOptions?.DoNotSaleBelowCost == 'Not Allowed' ? 'not_allowed' : 'none');
    payload.sale_below_cost = doNotSaleBelowCost ?? interfaceSettings.sale_below_cost;
    // other options
    payload.enable_suspendrecall_buttons = entitySettings.OtherOPtions?.EnableSuspendRecallButtons ?? interfaceSettings.enable_suspendrecall_buttons;

    if (payload.other_options?.alcohol_cutoff_age) {
        payload.other_options.alcohol_cutoff_age = entitySettings.OtherOPtions?.AlcoholCutOffAge?.toString() ?? payload.other_options?.alcohol_cutoff_age;
    }
    if (payload.other_options?.tobacco_cutoff_age) {
        payload.other_options.tobacco_cutoff_age = entitySettings.OtherOPtions?.TobaccoCutOffAge?.toString() ?? payload.other_options?.tobacco_cutoff_age;
    }

    const result = await posFetcher.post<IPOSSettingsResponse>({url: EndPoint.POSSettings.Edit, data: EncodeData(payload)});

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