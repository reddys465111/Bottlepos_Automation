export interface PayfacAuth {
    errorCode: string;
    error:     string;
    data:      PayfacAuthData;
}

export interface PayfacAuthData {
    data:    PayfacAuthPayload;
    timeout: number;
}

export interface PayfacAuthPayload {
    payment_id?:              string;
    date_created?:            string;
    external_transaction_id: string;
    merchant_reference?:      null;
    status?:                  string;
    amount?:                  string;
    amount_authorized?:       string;
    amount_captured?:         string;
    amount_capturable?:       number;
    amount_refunded?:         string;
    amount_refundable?:       number;
    tip_amount?:              number;
    donation_amount?:         number;
    currency?:                string;
    card_present?:            boolean;
    payment_method_id?:       null;
    notes?:                   null;
    authorization_code?:      null;
    processor?:               string;
    funding_source?:          null;
    last_error?:              string;
    last_error_code?:         string;
    request_id?:              number;
    updated_at?:              number;
}
