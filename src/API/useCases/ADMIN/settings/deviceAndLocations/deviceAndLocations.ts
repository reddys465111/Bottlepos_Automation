import { Device_Add, Device_Delete, Device_Edit, Device_Get, EntityDevicesData } from "./devices";
import { EntityLocationData, Location_Add, Location_Delete, Location_Edit, Location_Get } from "./locations";


export const DeviceAndLocation_LoadArgs = async (devices_locations?: { Locations?: EntityLocationData[], Devices?: EntityDevicesData[] }): Promise<void> => {
    if (devices_locations) {
        console.log('Loading Devices and Locations');
        // lOCATIONS
        devices_locations.Locations?.forEach(async location => {
            const loadLocation = await Location_Get(location.Name);
            if (loadLocation) {
                if (location.Delete) {
                    // Delete Bottle Deposit
                    await Location_Delete(loadLocation);
                } else {
                    // Edit Bottle Deposit
                    await Location_Edit(location, loadLocation);
                }
            } else {
                // Add new Bottle Deposit
                (location.Delete != true) && await Location_Add(location);
            }
        })

        //DEVICES 
        devices_locations.Devices?.forEach(async device => {
            const loadDevice = await Device_Get(device.Name);
            if (loadDevice) {
                if (device.Delete) {
                    await Device_Delete(loadDevice);
                } else {
                    await Device_Edit(device, loadDevice);
                }
            } else {
                (device.Delete != true) && await Device_Add(device)
            }
        })

    }

}