export interface IDeviceAndLocationResponse {
    errorCode: string;
    error:     string;
    data:      IDeviceAndLocationData;
}

export interface IDeviceAndLocationData {
    "devices/get":     { [key: string]: DevicesGet };
    "locations/get":   { [key: string]: LocationsGet };
    "carddevices/get": any[];
}

export interface DevicesGet {
    id:                          number | string;
    name:                        string;
    locationname:                string;
    locationid:                  number | string;
    type?:                       string;
    pf_terminal_id?:             string;
    ordertype?:                  string;
    orderdisplay?:               boolean;
    pax_ip?:                     string;
    pax_port?:                   string;
    datacap_port?:               string;
    datacap_secure_device?:      string;
    datacap_secure_device_pdcx?: string;
    laneId?:                     string;
    pax_protocol?:               string;
    pax_auto_ip?:                string;
    pax_serial_no?:              string;
    cameratype?:                 string;
    cameraipaddress?:            string;
    cameraprotocol?:             null;
    camerausername?:             string;
    camerapassword?:             string;
    disabled?:                   string;
    kitchenid?:                  null;
}

export interface LocationsGet {
    id:        number | string;
    name:      string;
    dt?:       Date;
    disabled?: string;
}
