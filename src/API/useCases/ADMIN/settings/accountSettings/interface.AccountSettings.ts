export interface IAccountSettingsResponse {
    errorCode: string;
    error:     string;
    data:      IAccountSettings;
}

export interface IAccountSettings {
    rectemplate?:                  string;
    recline2?:                     string;
    recline3?:                     string;
    reclogo?:                      string;
    recprintlogo?:                 boolean;
    reccurrency?:                  string;
    reccurrency_codepage?:         string;
    recemaillogo?:                 string;
    recfooter?:                    string;
    recqrcode?:                    string;
    salerange?:                    string;
    saledevice?:                   string;
    priceedit?:                    string;
    cashrounding?:                 string;
    negative_items?:               boolean;
    shortcut_keys?:                ShortcutKeys;
    taxedit:                       string;
    other_options?:                OtherOptions;
    recprintprice?:                boolean;
    enable_lotto_buttons?:         boolean;
    lottoSettings?:                LottoSettings;
    drawercard?:                   boolean;
    apply_discount?:               boolean;
    item_options?:                 boolean;
    print_report_font?:            string;
    cashreconcilation?:            boolean;
    printsignatureline?:           boolean;
    slideshowimgs?:                string[];
    itemslideshowimgs?:            any[];
    slideshowinterval?:            string;
    cusscreenheight?:              string;
    cusscreenwidth?:               string;
    enableautoplayslideshow?:      boolean;
    askfornumberheading1?:         string;
    askfornumberheading2?:         string;
    showoncusscreen?:              string;
    askfornumberimage?:            string;
    showoncusitemscreen?:          string;
    must_enter_age?:               boolean;
    hide_no_sale_button?:          boolean;
    discount_limit?:               boolean;
    discount_limit_type?:          string;
    discount_limit_amount?:        string;
    disctype?:                     string;
    fixedslideimage?:              string;
    noncashadjustment?:            Noncashadjustment;
    itemdeposit?:                  boolean;
    itemdeposittaxable?:           boolean;
    itemdepositlabel?:             string;
    ebt_button?:                   EbtButton;
    sale_below_cost?:              string;
    allow_refund?:                 boolean;
    hide_void_option?:             boolean;
    recprinttax?:                  boolean;
    default_starting_cash?:        string;
    houseSaleSettings?:            HouseSaleSettings;
    enable_shortcut_draggable?:    boolean;
    enable_remote_label_print?:    boolean;
    dayreportcatformat?:           string;
    showcashnoncashtocashbtn?:     boolean;
    enable_suspendrecall_buttons?: boolean;
    allow_remove_items?:           boolean;
    defaultebttax?:                Defaultebttax;
    itemdepositamount?:            string;
    additionalchargesenable?:      boolean;
    print_label_price_change?:     boolean;
    showsmsemailpromotion?:        boolean;
    allow_decimal_sale?:           boolean;
    customerrating?:               boolean;
    customerreviewurl?:            string;
    tvslideshowimgs?:              string[];
    tvslidevideos?:                string[];
    tvscreenvideoplaytime?:        string;
    tvslideshowinterval?:          string;
    tvscreenpincode?:              string;
    registerreportshow?:           string;
    disable_pos_add_manual_item?:  boolean;
    qrprint?:                      boolean;
    recptCustomer?:                RecptCustomer;
    recprintdetails?:              boolean;
    recprintdesc?:                 boolean;
    recprintcustname?:             boolean;
    recprintcustmobile?:           boolean;
    recprintcustaddress?:          boolean;
    recprintcustqa?:               boolean;
    recprintcustnotes?:            boolean;
    pos_search?:                   PosSearch;
    recprintsalenotes?:            boolean;
}

export interface Defaultebttax {
    ebtenable?: boolean;
    ebt_taxid?: string;
}

export interface EbtButton {
    etbenable?: boolean;
    ebt_taxid?: string;
    ebtlabel?:  string;
}

export interface HouseSaleSettings {
    itemIds?: ItemIDS;
}

export interface ItemIDS {
    [key: string]: string;
}

export interface LottoSettings {
    catIds?:  IDS;
    itemIds?: IDS;
}

export interface IDS {
    lotto_sale?:     string;
    lotto_payout?:   string;
    online_lottery?: string;
    online_payout?:  string;
}

export interface Noncashadjustment {
    noncashadjustmentenable?:         boolean;
    noncashadjustmentenableebt?:      boolean;
    noncashadjustmentenablegift?:     boolean;
    noncashadjustmentenablesidecard?: boolean;
    noncashadjustmentcashasgrand?:    boolean;
    noncashadjustmentpercent?:        string;
    noncashadjustmentpercentdual?:    string;
    noncashadjustmentminimum?:        string;
    noncashadjustmenttext?:           string;
    noncashadjustmentlabel?:          string;
    noncashexcludebutton?:            boolean;
    showdualcashtocashbtn?:           boolean;
    dualnoncashexcludebutton?:        boolean;
    enabledualpricingbutton?:         boolean;
    roundtocentbutton?:               boolean;
    dualdebit?:                       boolean;
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
    [key: string]: string;
}