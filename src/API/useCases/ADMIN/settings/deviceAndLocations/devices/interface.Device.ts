export interface IDeviceResponse {
    data?: IDevicesData,
    error?: string,
    errorCode?: string,
}

export interface IDevicesData {
    name?:                       string;
    /** Present on many API payloads; used to disambiguate same register name at different locations */
    locationname?:               string;
    locationid?:                 string;
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
    pax_protocol?:               string|null;
    pax_auto_ip?:                string;
    pax_serial_no?:              string;
    cameratype?:                 string;
    cameraipaddress?:            string;
    cameraprotocol?:             string|null;
    camerausername?:             string;
    camerapassword?:             string;
    id?:                         string;
}


export interface IDeviceListResponse  {
    data:            IDeviceSearch[];
    objcount:        string;
    recordsTotal:    string;
    recordsFiltered: string;
    draw:            number;
}

export interface IDeviceSearch {
    id:           string;
    name:         string;
    locationid:   string;
    data:         string;
    dt:           Date;
    disabled:     string;
    type:         string;
    locationname: string;

    pf_terminal_id: string,
    ordertype: string,
    orderdisplay: boolean,
    pax_ip: string,
    pax_port: string,
    datacap_port: string,
    datacap_secure_device:string,
    datacap_secure_device_pdcx:string,
    laneId:string,
    pax_protocol:string,
    pax_auto_ip:string,
    pax_serial_no:string,
    cameratype:string,
    cameraipaddress:string,
    cameraprotocol:string,
    camerausername:string,
    camerapassword:string,
}
