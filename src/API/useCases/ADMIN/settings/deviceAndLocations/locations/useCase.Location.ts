import { GetCurrentDate } from "../../../../../../utils";
import { posFetcher } from "../../../../../pos.adapter";
import { EndPoint, EncodeData } from "../../../../../utils";
import { EntityLocationData } from "./entity.Location";
import { ILocationResponse, ILocationData } from "./interface.Location";

export const Location_Add = async(device: EntityLocationData): Promise<ILocationResponse<ILocationData>> => {
    let addDevice : ILocationData = {
        name: device.Name,
        disabled: device.Disabled == true ? "1" : "0",
        dt: GetCurrentDate(true),
    }
    const response = await posFetcher.post<ILocationResponse<ILocationData>>({url: EndPoint.Locations.Add, data: EncodeData(addDevice) });
    return response.data;
}


export const Location_Edit = async(device: EntityLocationData, oldDevice: ILocationData): Promise<ILocationResponse<ILocationData>> => {
    oldDevice.disabled = device.Disabled==true?  "1" : "0";
    const response = await posFetcher.post<ILocationResponse<ILocationData>>({url: EndPoint.Locations.Edit, data: EncodeData(oldDevice) });
    return response.data;
}

export const Location_Delete = async(device: ILocationData) : Promise<ILocationResponse<ILocationData>> => {
    const response = await posFetcher.post<ILocationResponse<ILocationData>>({url: EndPoint.Locations.Delete, data: EncodeData(device)});    
    return response.data;
}

export const Location_Get  = async(name: string) : Promise<ILocationData | undefined>  => {
    const search = `draw=100&search%5Bvalue%5D=${name}`

    const response = await posFetcher.post<ILocationResponse<ILocationData[]>>({url: EndPoint.Locations.Get, data: search});
    const listLocations = response.data.data;
    let location: ILocationData | undefined = undefined;
    if(listLocations && listLocations.length > 0){
        location = listLocations[0]; 
    }
    return location;
}