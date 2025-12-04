
export interface IGeneralSettingsData {
    timezone?:                        string;
    sms_integration?:                 boolean;
    giftcardenable?:                  boolean;
    doordash_enabled?:                boolean;
    dateformat?:                      string;
    accntype?:                        string;
    card_type?:                       string;
    url?:                             string;
    accept?:                          string;
    content_type?:                    string;
    tp_application_id?:               string;
    tp_application_name?:             string;
    tp_application_version?:          string;
    tp_authorization?:                string;
    tp_express_acceptor_id?:          string;
    tp_express_account_id?:           string;
    tp_express_account_token?:        string;
    tp_allowDebit?:                   string;
    tp_isManualEntryAllowed?:         string;
    tp_thresholdAmount?:              string;
    tp_promptForSignature?:           string;
    tp_confirmOriginalAmount?:        string;
    tp_ebtsales?:                     boolean;
    tp_ebtcash?:                      boolean;
    mobiletp_ebtsales?:               boolean;
    mobiletp_ebtcash?:                boolean;
    giftcard_email?:                  string;
    giftcard_password?:               string;
    giftcard_confirmpassword?:        string;
    ""?:                              string;
    giftcard_loginemail?:             string;
    giftcard_loginpassword?:          string;
    bizname?:                         string;
    biznumber?:                       string;
    custnumber?:                      string;
    bizemail?:                        string;
    bizaddress?:                      string;
    bizsuburb?:                       string;
    bizstate?:                        string;
    bizpostcode?:                     string;
    bizcountry?:                      string;
    bizlogo?:                         string;
    bizlogofile?:                     string;
    bizicon?:                         string;
    apptypelogo?:                     string;
    billing_account?:                 string;
    recurly_inactive_access?:         string;
    sms_provider?:                    string;
    email_host?:                      string;
    email_port?:                      string;
    email_tls?:                       boolean;
    email_user?:                      string;
    email_pass?:                      string;
    gcontact?:                        number;
    gcontactcode?:                    string;
    reportfromtime?:                  string;
    reporttotime?:                    string;
    use_upc_10?:                      boolean;
    allow_duplicate_code?:            boolean;
    include_nontax?:                  boolean;
    show_other_loc_item?:             boolean;
    hide_summary_report_zero_amount?: boolean;
    allow_import_csv?:                boolean;
    scanner_speed?:                   string;
    form_type?:                       string;
    store_name?:                      string;
    store_address?:                   string;
    apartment_suite?:                 string;
    city?:                            string;
    state?:                           string;
    zip_code?:                        string;
    contact_email?:                   string;
    "monday-hours-from"?:             string;
    "monday-hours-to"?:               string;
    "tuesday-hours-from"?:            string;
    "tuesday-hours-to"?:              string;
    "wednesday-hours-from"?:          string;
    "wednesday-hours-to"?:            string;
    "thursday-hours-from"?:           string;
    "thursday-hours-to"?:             string;
    "friday-hours-from"?:             string;
    "friday-hours-to"?:               string;
    "saturday-hours-from"?:           string;
    "saturday-hours-to"?:             string;
    "sunday-hours-from"?:             string;
    "sunday-hours-to"?:               string;
    "doordash-markup"?:               string;
    rounding_cent?:                   boolean;
    submitDoordashForm?:              string;
    loguser?:                         string;
    logpass?:                         string;
    loginbutton?:                     string;
    newcustpass?:                     string;
    newcustname?:                     string;
    newcustmobile?:                   string;
    newcustdob?:                      string;
    newcustemail?:                    string;
    newcustaddress?:                  string;
    newcustpostcode?:                 string;
    newcustpoints?:                   string;
    newcustpromotionoptin?:           boolean;
    newcusthouseeligible?:            boolean;
    texas_wholsale_checkbox?:         boolean;
    custtabclicenseno?:               string;
    custtabctaxpayerid?:              string;
    newcustmaxlimit?:                 string;
    contid?:                          string;
    contcustid?:                      string;
    contname?:                        string;
    contposition?:                    string;
    contemail?:                       string;
    contphone?:                       string;
    contmobile?:                      string;
    contrecinv?:                      boolean;
    transitemid?:                     string;
    transitemsitemid?:                string;
    transitemtaxval?:                 string;
    transitempriceval?:               string;
    stitemsearch?:                    string;
    transitemqty?:                    string;
    transitemname?:                   string;
    transitemaltname?:                string;
    transitemdesc?:                   string;
    transitemcost?:                   string;
    transitemunit?:                   string;
    transitemtaxid?:                  null;
    transpayid?:                      string;
    transpaydt?:                      string;
    transpaymethod?:                  string;
    transpayamount?:                  string;
    additionaltendor?:                any[];
    tendersettings?:                  IGSTendersettings;
    loyaltysettings?:                 IGSLoyaltysettings;
    paxsettings?:                     IGSPaxsettings;
    triposdirect?:                    IGSTriposdirect;
    datacap?:                         IGSDatacap;
    payfac?:                          IGSPayfac;
    giftcards?:                       IGSGiftcards;
    inventorysettings?:               IGSInventorysettings;
    currencyformat?:                  string;
    altlabels?:                       IGSAltlabels;
    autosettings?:                    IGSAutosettings;
    itemsalerepcol?:                  { [key: string]: boolean };
    report_default_time?:             IGSReportDefaultTime;
    twilio?:                          IGSTwilio;
}

export interface IGSAltlabels {
    cash:               string;
    credit:             string;
    eftpos:             string;
    cheque:             string;
    deposit:            string;
    tendered:           string;
    change:             string;
    "transaction-ref":  string;
    "transaction-id":   string;
    "sale-time":        string;
    subtotal:           string;
    total:              string;
    item:               string;
    items:              string;
    refund:             string;
    "void-transaction": string;
}

export interface IGSAutosettings {
}

export interface IGSDatacap {
    datacapurl:                                 string;
    datacapmerchant:                            string;
    datacapsequenceno:                          string;
    datacapxmlip:                               string;
    datacapxmlport:                             string;
    datacapaccountno:                           string;
    datacapcustomtip:                           boolean;
    data_cap_custom_one_tip:                    string;
    data_cap_custom_two_tip:                    string;
    data_cap_custom_three_tip:                  string;
    data_cap_custom_four_tip:                   string;
    datacap_batchclosetoggle:                   boolean;
    datacap_debitsales:                         boolean;
    mobiledatacap_debitsales:                   boolean;
    datacap_giftcard:                           boolean;
    mobiledatacap_giftcard:                     boolean;
    datacap_giftcard_item_id:                   string;
    datacap_ebtsales:                           boolean;
    mobiledatacap_ebtsales:                     boolean;
    datacap_ebtcash:                            boolean;
    mobiledatacap_ebtcash:                      boolean;
    datacap_allow_manual_entry:                 boolean;
    datacap_support_offline_sale:               boolean;
    datacap_offline_max_transactions:           string;
    datacap_offline_transaction_purchase_limit: string;
}

export interface IGSGiftcards {
    giftcard_itemid:     string;
    giftcard_expiration: string;
}

export interface IGSInventorysettings {
    evaluationperiod: string;
}

export interface IGSLoyaltysettings {
    loyaltystatus:    boolean;
    pointdollarratio: string;
}

export interface IGSPaxsettings {
    pax_application_name?:    string;
    pax_application_version?: string;
    pax_timeout?:             string;
    pax_promptForSignature?:  string;
    pax_fraudprevention?:     string;
    pax_fraud_manual?:        boolean;
    pax_fraud_swipe?:         boolean;
    pax_fraud_chipfallback?:  boolean;
    pax_fraud_scanner?:       boolean;
    pax_fraud_contactless?:   boolean;
    pax_fraud_chip?:          boolean;
    pax_fraudwarningamt?:     string;
    pax_prompt_for_tips?:     boolean;
    pax_custom_tips?:         boolean;
    pax_custom_one_tip?:      string;
    pax_custom_two_tip?:      string;
    pax_custom_three_tip?:    string;
    pax_batchclosetoggle?:    boolean;
    pax_giftcard?:            boolean;
    mobilepax_giftcard?:      boolean;
    pax_giftcard_item_id?:    string;
    pax_debitsales?:          boolean;
    mobilepax_debitsales?:    boolean;
    pax_ebtsales?:            boolean;
    mobilepax_ebtsales?:      boolean;
    pax_ebtcash?:             boolean;
    mobilepax_ebtcash?:       boolean;
    pax_troubleshoot?:        boolean;
    pax_surcharge?:           boolean;
}

export interface IGSPayfac {
    pf_accountid?:            string;
    pf_apiurl?:               string;
    pf_card_not_present?:     boolean;
    pf_ebt_card_not_present?: boolean;
    pf_timeout?:              string;
    pf_max_refund_amount?:    string;
    pf_fraudprevention?:      string;
    pf_fraud_manual?:         boolean;
    pf_fraud_swipe?:          boolean;
    pf_fraud_chipfallback?:   boolean;
    pf_fraud_scanner?:        boolean;
    pf_fraud_contactless?:    boolean;
    pf_fraud_chip?:           boolean;
    pf_fraudwarningamt?:      string;
    pf_prompt_for_tips?:      boolean;
    pf_payfac_custom_tips?:   boolean;
    pf_custom_one_tip?:       string;
    pf_custom_two_tip?:       string;
    pf_custom_three_tip?:     string;
    pf_ebtsales?:             boolean;
    pf_ebtsales_mobile?:      boolean;
    pf_ebtcash?:              boolean;
    pf_ebtcash_mobile?:       boolean;
    pf_giftcard?:             boolean;
    mobilepf_giftcard?:       boolean;
    pf_giftcard_item_id?:     string;
    pf_debitsales?:           boolean;
    mobilepf_debitsales?:     boolean;
}

export interface IGSReportDefaultTime {
    stime?: string;
    etime?: string;
}

export interface IGSTendersettings {
    tendersidecard?:       boolean;
    tendercheck?:          boolean;
    mobiletendersidecard?: boolean;
    mobiletendercheck?:    boolean;
    tendermoreamountcard?: boolean;
}

export interface IGSTriposdirect {
    tD_url:                       string;
    tD_accept:                    string;
    tD_content_type:              string;
    tD_tp_application_id:         string;
    tD_tp_application_name:       string;
    tD_tp_application_version:    string;
    tD_developerKey:              string;
    tD_developerSecret:           string;
    tD_tp_thresholdAmount:        string;
    tD_tp_promptForSignature:     string;
    tripos_direct_ebtsales:       boolean;
    tripos_direct_ebtcash:        boolean;
    mobiletripos_direct_ebtsales: boolean;
    mobiletripos_direct_ebtcash:  boolean;
}

export interface IGSTwilio {
    twilio_sid?:        string;
    twilio_number?:     string;
    twilio_serviceid?:  string;
    twilio_auth_token?: string;
}
