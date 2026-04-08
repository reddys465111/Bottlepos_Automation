export interface POSSettingsPayload {
    rectemplate?:                  string;
    recline2?:                     string;
    recline3?:                     string;
    recprintdesc?:                 boolean;
    recprintprice?:                boolean;
    print_report_font?:            string;
    drawercard?:                   boolean;
    cashreconcilation?:            boolean;
    printsignatureline?:           boolean;
    recprinttax?:                  boolean;
    recprintdetails?:              boolean;
    recprintcustname?:             boolean;
    recprintcustmobile?:           boolean;
    recprintcustaddress?:          boolean;
    recprintcustnotes?:            boolean;
    recprintcustqa?:               boolean;
    recprintsalenotes?:            boolean;
    reccurrency_codepage?:         string;
    recprintlogo?:                 boolean;
    reccurrency?:                  string;
    reclogo?:                      string;
    reclogofile?:                  string;
    recemaillogo?:                 string;
    emaillogofile?:                string;
    recfooter?:                    string;
    recqrcode?:                    string;
    possearch_show_tags?:          boolean;
    salerange?:                    string;
    saledevice?:                   string;
    priceedit?:                    string;
    taxedit?:                      string;
    cashrounding?:                 string;
    sale_below_cost?:              string;
    negative_items?:               boolean;
    allow_decimal_sale?:           boolean;
    apply_discount?:               boolean;
    allow_refund?:                 boolean;
    allow_remove_items?:           boolean;
    hide_void_option?:             boolean;
    hide_no_sale_button?:          boolean;
    must_enter_age?:               boolean;
    enable_line_discount?:         boolean;
    stack_discounts?:              boolean;
    discount_limit?:               boolean;
    discount_limit_type?:          string;
    discount_limit_amount?:        string;
    enable_lotto_buttons?:         boolean;
    enable_shortcut_draggable?:    boolean;
    enable_remote_label_print?:    boolean;
    disctype?:                     string;
    dayreportcatformat?:           string;
    registerreportshow?:           string;
    enable_suspendrecall_buttons?: boolean;
    print_label_price_change?:     boolean;
    disable_pos_add_manual_item?:  boolean;
    house_pay_item_id?:            string;
    lotto_payout_item_id?:         string;
    lotto_sale_item_id?:           string;
    online_payout_item_id?:        string;
    online_lottery_item_id?:       string;
    cusscreenwidth?:               string;
    cusscreenheight?:              string;
    showoncusscreen?:              string;
    slideimginput?:                string;
    enableautoplayslideshow?:      boolean;
    slideshowinterval?:            string;
    askfornumberheading1?:         string;
    askfornumberheading2?:         string;
    askfornumberimginput?:         string;
    [key:  string]:                any;
    itemslideimginput?:            string;
    showsmsemailpromotion?:        boolean;
    showoncusitemscreen?:          string;
    customerrating?:               boolean;
    customerreviewurl?:            string;
    s2id_autogen1?:                string;
    s2id_autogen1_search?:         string;
    itemsfixedimage?:              null;
    tvscreenpincode?:              string;
    tvslideimginput?:              string;
    tvslideshowinterval?:          string;
    tvscreenvideoplaytime?:        string;
    fixedslideimage?:              null;
    slideshowimgs?:                any[];
    itemslideshowimgs?:            any[];
    tvslideshowimgs?:              any[];
    tvslidevideos?:                any[];
    askfornumberimage?:            string;
    shortcut_keys?:                ShortcutKeys;
    recptCustomer?:                RecptCustomer;
    qrprint?:                      boolean;
    other_options?:                OtherOptions;
    pos_search?:                   PosSearch;
}

export interface OtherOptions {
    tobacco_cutoff_age?: string;
    alcohol_cutoff_age?: string;
}

export interface PosSearch {
    possearch_show_tags?: boolean;
}

export interface RecptCustomer {
    recprintcustomer?: boolean;
    recprintname?:     boolean;
    recprintmobile?:   boolean;
    recprintaddress?:  boolean;
}

export interface ShortcutKeys {
}
