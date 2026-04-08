import { posFetcher } from "../../../pos.adapter";
import { EncodeData, EndPoint } from "../../../utils";
import { generalSettingsDefaultPayload } from "./data/data.GeneralSettingsDefaultPayload";
import { EntityPOSGeneral } from "./entity.Settings";
import { IPOSSettings } from "./interface.Settings";
import { ISettingsGetResponse, ISettingsGetResponseData } from "./interface.SettingsGetResponse";
import { ISettingsPayload } from "./interface.SettingsPayload";
import { IPOSSettingsResponse } from "./interface.SettingsReponse";

export const POSGeneralSettings_Update = async (device_id: string, settings: EntityPOSGeneral) => {            
    if (settings) {
        console.log('Loading POS General Settings');
    }
    // const loadSettings = await POSGeneralSettings_Get(device_id);
    const loadSettings: ISettingsGetResponseData = generalSettingsDefaultPayload;

    let payload:  ISettingsGetResponseData = {...loadSettings!}

    payload.keypad = settings?.UseOnScreenKeypad ?? loadSettings?.keypad ?? false;
    payload.fixedkeypad = settings?.ShowFixedKeypad ?? loadSettings?.fixedkeypad ?? false;

    const response = await posFetcher.post<IPOSSettingsResponse>({url: EndPoint.POS.Settings.Update, data: EncodeData(payload)});
    return response;
}

export const POSGeneralSettings_Get = async (device_id: string): Promise<ISettingsGetResponseData | undefined> => {
    const response = await posFetcher.post<ISettingsGetResponse>({url: EndPoint.POS.Settings.Get, data: EncodeData({deviceid: device_id})});
    if(response.data.errorCode === 'OK') {
        return response.data.data;
    }
    return undefined;
}