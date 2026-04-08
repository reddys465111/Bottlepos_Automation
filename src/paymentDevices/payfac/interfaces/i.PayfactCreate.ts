import { IData } from "../../../API/utils/iData";


export interface PayfacCreate {
    data:   payfacData;
    device: payfacDevice;
}

export interface payfacData extends IData{
    payment_id:              string;
    status:                  string;
    external_transaction_id: string;
    request_id:              number;
}

export interface payfacDevice {
    terminal_id:  string;
    card_present: string;
}
