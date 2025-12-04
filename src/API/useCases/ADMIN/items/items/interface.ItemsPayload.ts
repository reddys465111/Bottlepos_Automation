export interface ItemPayloadData {
    code:                 string;
    codes:                ItemPayloadCode[];
    id?:                   string;
    qty:                  string;
    name:                 string;
    alt_name:             string;
    description:          string;
    taxid:                string;
    unitspercase:         string;
    casecosttotal:        string;
    cost:                 string;
    lastcost:             string;
    price:                string;
    webprice:             string;
    margin:               string;
    markup:               string;
    supplierid:           string;
    categoryid:           string;
    minprice:             string;
    reorder_value:        string;
    reorder_point:        string;
    itemrank:             string;
    itemdeposit?:          any;
    vendoritemno:         string;
    autoupdate:           boolean;
    promptforqty:         boolean;
    donottrackinventory:  boolean;
    notes:                string;
    itemtype:             string;
    reminddate:           string;
    closeout:             boolean;
    donotdiscountitem:    boolean;
    excludefrompromotion: boolean;
    showtoweb:            number;
    showhideinventory:    number;
    allowebt:             number;
    vendorname:           string;
    itemtags:             string[];
    shortcutkeys:         boolean;
    shortcutname:         string;
    itemsortno:           string;
    color_code:           string;
    itemviewonprompt:     boolean;
    additionalcharges:    string[];
    pointsmultiplier:     string;
    pointsvalue:          string;
    type:                 string;
    percenttype:          string;
    // stock_codes:          ItemPayloadStockCode[];
    custom_image:         any[];
    merge_ids:            string;
    modifiers:            ItemPayloadModifier[];
    additionalPrice:      string[];
}

export interface ItemPayloadModifier {
    type:         string;
    qty:          string;
    minqty:       string;
    maxqty:       string;
    name:         string;
    price:        string;
    cost:         string;
    lastcost:     string;
    margin:       string;
    markup:       string;
    viewonprompt: boolean;
}

export interface ItemPayloadStockCode {
    id?:         string;
    code:       string;
    stocklevel: string;
    stored_itemid?: string,
    upcfull:    string;
}

export interface ItemPayloadCode {
    amount: string,
    code: String,
    locationid: string,
    upcfull: string
}