export interface EntityDevicesData {
    Delete?: boolean,
    Name: string;
    Location?: string;
    DeviceType?: 'general_register' | 'order_register';
    P5_TerminalID?: string;
    PAX_Protocol?: 'HTTP' | 'HTTPS';
    PAX_AutoIP?: 'Yes' | 'No';
    PAX_SerialNumber?: string;
    PAX_IPAddress?: string;
    PAX_Port?: string;
    Tripos_LineID?: string;
    DataCap_COMPort?: string;
    DataCap_DevicedsiEMVX?: string;
    DataCap_DevicedsiPDCX?: string;
    Camera_Type?: 'none' | 'reolink',
    Camera_IP?: string,
    Camera_Protocol?: 'HTTP' | 'HTTPS',
    Camera_UserName?: string,
    Camera_Password?: string
}
