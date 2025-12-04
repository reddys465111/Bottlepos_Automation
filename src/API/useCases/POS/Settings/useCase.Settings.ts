import { posFetcher } from "../../../pos.adapter";
import { EncodeData, EndPoint } from "../../../utils";
import { EntityPOSGeneral } from "./entity.Settings";
import { IPOSSettings } from "./interface.Settings";
import { IPOSSettingsResponse } from "./interface.SettingsReponse";

export const POSGeneralSettings_Update = async (device_id: string, settings: EntityPOSGeneral) => {            
    if (settings) {
        console.log('Loading POS General Settings');
    }
    const newData: IPOSSettings = {
        device_id: device_id,
        keypad: settings.UseOnScreenKeypad,
        fixedkeypad: settings.ShowFixedKeypad,
        auto_launch_cus_screen: settings.AutoLaunchCustomerScreen,
        cus_screen_total_show: settings.ShowTotalOnCustomerScreen,
        cus_screen_price_show: settings.ShowPriceOnCustomerScreen,
        show_email_notes: settings.ShowCustomerNumber,
        show_sale_notes: settings.ShowSaleNotes,
        show_items_shortcuts: settings.AlwaysShowShortcuts,
        show_weborder_notifications: settings.EnableWeborderNotifications,
        hide_total_details: settings.HideTotalDetails,
        hide_advanced_options: true,
        selwebordernotify: settings.WeborderNotificationSound,
        seltasklistsound: settings.TasklistNotificationSound,
        browse_font: settings.SearchFontSize,
        pos_font: settings.POSFontSize,
        cs_font: settings.CustomerScreenFontSize,
        cs_zoom: settings.CustomerScreenZoom,
    }

    const response = await posFetcher.post<IPOSSettingsResponse>({url: EndPoint.POS.Settings.Update, data: EncodeData(newData)});
    return response;
}

export const POSGeneralSettings_Get = async (device_id: string) => {
    const response = await posFetcher.get<IPOSSettingsResponse>({url: EndPoint.POS.Settings.Get, data: EncodeData({device_id: device_id})});
    if(response.data.errorCode === 'OK') {
        return response.data.data;
    }
    return undefined;
}