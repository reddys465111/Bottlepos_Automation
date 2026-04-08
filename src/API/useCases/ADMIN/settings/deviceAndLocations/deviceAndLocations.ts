import type { IDevicesData } from "./devices/interface.Device";
import type { DevicesGet, IDeviceAndLocationData, LocationsGet } from "./devices/interface.DeviceAndLocation";
import { Device_Add, Device_Delete, Device_Edit, Device_Get, DeviceAndLocation_Get, EntityDevicesData } from "./devices";
import type { ILocationData } from "./locations/interface.Location";
import { EntityLocationData, Location_Add, Location_Delete, Location_Edit, Location_Get } from "./locations";

function mapBundleLocationToILocationData(entry: LocationsGet): ILocationData {
    const dt =
        entry.dt instanceof Date
            ? entry.dt.toISOString().slice(0, 10)
            : typeof entry.dt === "string"
              ? entry.dt
              : "";
    return {
        id: entry.id !== undefined && entry.id !== null ? String(entry.id) : undefined,
        name: entry.name,
        dt,
        disabled: entry.disabled ?? "0",
    };
}

/** `locations/get` keys are often ids, not display names — match by `name`. */
function findLocationByNameInBundle(
    bundle: IDeviceAndLocationData | undefined,
    name: string
): ILocationData | undefined {
    const map = bundle?.["locations/get"];
    if (!map || typeof map !== "object") {
        return undefined;
    }
    for (const entry of Object.values(map)) {
        if (entry && typeof entry === "object" && "name" in entry && (entry as LocationsGet).name === name) {
            return mapBundleLocationToILocationData(entry as LocationsGet);
        }
    }
    return undefined;
}

function mapBundleDeviceToIDevicesData(entry: DevicesGet): IDevicesData {
    return {
        id: entry.id !== undefined && entry.id !== null ? String(entry.id) : undefined,
        name: entry.name,
        locationname: entry.locationname,
        locationid:
            entry.locationid !== undefined && entry.locationid !== null
                ? String(entry.locationid)
                : undefined,
        type: entry.type,
        pf_terminal_id: entry.pf_terminal_id,
        ordertype: entry.ordertype,
        orderdisplay: entry.orderdisplay,
        pax_ip: entry.pax_ip,
        pax_port: entry.pax_port,
        datacap_port: entry.datacap_port,
        datacap_secure_device: entry.datacap_secure_device,
        datacap_secure_device_pdcx: entry.datacap_secure_device_pdcx,
        laneId: entry.laneId,
        pax_protocol: entry.pax_protocol ?? null,
        pax_auto_ip: entry.pax_auto_ip,
        pax_serial_no: entry.pax_serial_no,
        cameratype: entry.cameratype,
        cameraipaddress: entry.cameraipaddress,
        cameraprotocol: entry.cameraprotocol ?? null,
        camerausername: entry.camerausername,
        camerapassword: entry.camerapassword,
    };
}

/** Match bundle row by register name and optional location (id or location display name). */
function findDeviceInBundle(
    bundle: IDeviceAndLocationData | undefined,
    entity: EntityDevicesData,
    resolvedLocationId: string | undefined,
    locationLabel: string | undefined
): IDevicesData | undefined {
    const map = bundle?.["devices/get"];
    if (!map || typeof map !== "object") {
        return undefined;
    }
    for (const entry of Object.values(map)) {
        if (!entry || typeof entry !== "object" || !("name" in entry)) {
            continue;
        }
        const dg = entry as DevicesGet;
        if (dg.name !== entity.Name) {
            continue;
        }
        if (!locationLabel) {
            return mapBundleDeviceToIDevicesData(dg);
        }
        if (resolvedLocationId != null && resolvedLocationId !== "") {
            if (String(dg.locationid) === String(resolvedLocationId)) {
                return mapBundleDeviceToIDevicesData(dg);
            }
        }
        if (dg.locationname === locationLabel) {
            return mapBundleDeviceToIDevicesData(dg);
        }
        if (String(dg.locationid) === locationLabel) {
            return mapBundleDeviceToIDevicesData(dg);
        }
    }
    return undefined;
}

async function resolveLocationIdForDeviceFilter(locationField: string | undefined): Promise<{
    resolvedLocationId: string | undefined;
    locationLabel: string | undefined;
}> {
    const label = locationField?.trim();
    if (!label) {
        return { resolvedLocationId: undefined, locationLabel: undefined };
    }
    if (/^\d+$/.test(label)) {
        return { resolvedLocationId: label, locationLabel: label };
    }
    const loc = await Location_Get(label);
    return {
        resolvedLocationId: loc?.id != null ? String(loc.id) : undefined,
        locationLabel: label,
    };
}

export const DeviceAndLocation_LoadArgs = async (devices_locations?: {
    Locations?: EntityLocationData[];
    Devices?: EntityDevicesData[];
}): Promise<void> => {
    if (!devices_locations) {
        return;
    }

    console.log("Loading Devices and Locations");

    if (devices_locations.Locations) {
        for (const location of devices_locations.Locations) {
            const fromList = await Location_Get(location.Name);
            const bundle = fromList ? undefined : await DeviceAndLocation_Get();
            const foundLocation = fromList ?? findLocationByNameInBundle(bundle, location.Name);

            console.log("location resolve", location.Name, { fromList: !!fromList, foundLocation: !!foundLocation });

            if (foundLocation) {
                if (location.Delete) {
                    await Location_Delete(foundLocation);
                } else {
                    await Location_Edit(location, foundLocation);
                }
            } else if (location.Delete !== true) {
                await Location_Add(location);
            }
        }
    }

    if (devices_locations.Devices) {
        for (const device of devices_locations.Devices) {
            const { resolvedLocationId, locationLabel } = await resolveLocationIdForDeviceFilter(device.Location);
            const filter =
                locationLabel === undefined
                    ? undefined
                    : resolvedLocationId != null && resolvedLocationId !== ""
                      ? { locationId: resolvedLocationId }
                      : { locationName: locationLabel };

            const fromList = await Device_Get(device.Name, filter);
            const bundle = fromList ? undefined : await DeviceAndLocation_Get();
            const foundDevice =
                fromList ?? findDeviceInBundle(bundle, device, resolvedLocationId, locationLabel);

            console.log("device resolve", device.Name, device.Location ?? "(any location)", {
                fromList: !!fromList,
                foundDevice: !!foundDevice,
            });

            if (foundDevice) {
                if (device.Delete) {
                    await Device_Delete(foundDevice);
                } else {
                    await Device_Edit(device, foundDevice);
                }
            } else if (device.Delete !== true) {
                await Device_Add(device);
            }
        }
    }
};
