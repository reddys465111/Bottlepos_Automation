import { EntityDevicesData } from "../../API/useCases/ADMIN/settings/deviceAndLocations/devices/entity.Device";
import { EntityLocationData } from "../../API/useCases/ADMIN/settings/deviceAndLocations/locations";

export interface iDeviceLocation<T> {
    [key: string]: T
}
const DEVICES: iDeviceLocation<EntityDevicesData> = {
    'Register1': {
        Name: 'Device1',
        Location: 'Location1',
        DeviceType: 'general_register',
    }
}

export const LOCATIONS: iDeviceLocation<EntityLocationData> = {
    'Inventory': {
        Name: 'Inventory'   
    },
    'Admin Dash': {
        Name: 'Admin Dash'
    }
}
