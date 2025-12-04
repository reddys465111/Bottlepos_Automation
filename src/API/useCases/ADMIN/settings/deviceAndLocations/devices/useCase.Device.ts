import { posFetcher } from "../../../../../pos.adapter";
import { EncodeData, EndPoint } from "../../../../../utils";
import { ILocationData } from "../locations/interface.Location";
import { Location_Get } from "../locations/useCase.Location";
import { EntityDevicesData } from "./"
import { IDeviceListResponse, IDeviceResponse, IDevicesData } from "./"


export const Device_Add = async (device: EntityDevicesData): Promise<IDevicesData | undefined> => {

    let location: ILocationData | undefined = await Location_Get(device.Location ?? '');
    const newDevice: IDevicesData = {
        name: device.Name,
        locationid: location?.id,
        type: device.DeviceType ?? 'general_register',
        pf_terminal_id: device.P5_TerminalID,
        ordertype: 'terminal',
        orderdisplay: true,
        pax_ip: device.PAX_IPAddress,
        pax_port: device.PAX_Port,
        datacap_port: device.DataCap_COMPort,
        datacap_secure_device: device.DataCap_DevicedsiEMVX,
        datacap_secure_device_pdcx: device.DataCap_DevicedsiPDCX,

        laneId: device.Tripos_LineID,

        pax_protocol: device.PAX_Protocol ?? null,
        pax_auto_ip: device.PAX_AutoIP == 'Yes' ? "1" : "0",
        pax_serial_no: device.PAX_SerialNumber,
        cameratype: device.Camera_Type ?? 'none',
        cameraipaddress: device.Camera_IP,
        cameraprotocol: device.Camera_Protocol ?? null,
        camerausername: device.Camera_UserName,
        camerapassword: device.Camera_Password
    }
    // console.log(newDevice);
    const response = await posFetcher.post<IDeviceResponse>({ url: EndPoint.Devices.Add, data: EncodeData(newDevice) });
    return response.data.data;
}


export const Device_Edit = async (device: EntityDevicesData, oldDevice: IDevicesData): Promise<IDevicesData | undefined> => {
    let location: ILocationData | undefined = device.Location ? await Location_Get(device.Location ?? '') : undefined;

    oldDevice.name = device.Name ?? oldDevice.name;
    oldDevice.locationid = location ? location.id : oldDevice.locationid;
    oldDevice.type = device.DeviceType ?? oldDevice.type ?? 'general_register';
    oldDevice.pf_terminal_id = device.P5_TerminalID ?? oldDevice.pf_terminal_id ?? '';
    oldDevice.ordertype = oldDevice.ordertype ?? 'terminal';
    oldDevice.orderdisplay = oldDevice.orderdisplay ?? true;

    oldDevice.pax_ip = device.PAX_IPAddress ?? oldDevice.pax_ip ?? '';
    oldDevice.pax_port = device.PAX_Port ?? oldDevice.pax_port ?? '';
    oldDevice.datacap_port = device.DataCap_COMPort ?? oldDevice.pax_port ?? '';
    oldDevice.datacap_secure_device = device.DataCap_DevicedsiEMVX ?? oldDevice.datacap_secure_device ?? '';
    oldDevice.datacap_secure_device_pdcx = device.DataCap_DevicedsiPDCX ?? oldDevice.datacap_secure_device_pdcx ?? '';

    oldDevice.laneId = device.Tripos_LineID ?? oldDevice.laneId ?? '';

    oldDevice.pax_protocol = device.PAX_Protocol ?? oldDevice.pax_protocol; //device.PAX_Protocol ?? oldDevice.pax_protocol ?? '',
    oldDevice.pax_auto_ip = device.PAX_AutoIP ? (device.PAX_AutoIP == 'Yes' ? "1" : "0") : oldDevice.pax_auto_ip ?? '0';

    oldDevice.pax_serial_no = device.PAX_SerialNumber ?? oldDevice.pax_serial_no ?? '';
    oldDevice.cameratype = device.Camera_Type ? device.Camera_Type : oldDevice.cameratype ?? '';
    oldDevice.cameraipaddress = device.Camera_IP ?? oldDevice.cameraipaddress ?? '';
    oldDevice.cameraprotocol = device.Camera_Protocol ?? oldDevice.cameraprotocol ?? null; // device.Camera_Protocol ?? oldDevice.cameraprotocol,
    oldDevice.camerausername = device.Camera_UserName ?? oldDevice.camerausername ?? '';
    oldDevice.camerapassword = device.Camera_Password ?? oldDevice.camerapassword ?? '';

    const response = await posFetcher.post<IDeviceResponse>({ url: EndPoint.Devices.Edit, data: EncodeData(oldDevice) });
    return response.data.data;
}

export const Device_Get = async (device: string): Promise<IDevicesData | undefined> => {
    const search = `draw=100&search%5Bvalue%5D=${device}`;

    const response = await posFetcher.post<IDeviceListResponse>({ url: EndPoint.Devices.Get, data: search });
    let listDevices: IDevicesData[] = [];
    if (response.data?.data) {
        Object.values(response.data.data).forEach(d => {
            listDevices.push(JSON.parse(d.data) as IDevicesData);
        });
    }
    return listDevices.length ? listDevices[0] : undefined;
}


export const Device_List = async (): Promise<IDevicesData[]> => {
    const search = `draw=100&search%5Bvalue%5D=`;
    const response = await posFetcher.post<IDeviceListResponse>({ url: EndPoint.Devices.Get, data: search });
    let listDevices: IDevicesData[] = [];
    response.data.data.forEach(d => {
        listDevices.push(JSON.parse(d.data) as IDevicesData);
    })
    return listDevices;
}


export const Device_Delete = async (device: IDevicesData): Promise<IDeviceResponse> => {
    const response = await posFetcher.post<IDeviceResponse>({ url: EndPoint.Devices.Delete, data: EncodeData(device) });
    return response.data;
}


export const Device_Disable = async (device: IDeviceResponse): Promise<IDeviceResponse> => {
    const response = await posFetcher.post<IDeviceResponse>({ url: EndPoint.Devices.Disable, data: EncodeData(device) });
    return response.data;
}