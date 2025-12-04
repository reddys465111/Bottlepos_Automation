export interface IPromotionResponseList {
    errorCode: string;
    error:     string;
    data:      { [key: string]: IPromotionData };
}

export interface IPromotionData {
    name:                    string;
    type:                    null | string;
    sdate:                   string;
    edate:                   string;
    promotax:                string;
    promotionType:           string;
    promotionStatus:         number;
    scandatapromotion:       number;
    webstoreenablepromotion: number;
    promotionforall:         number;
    promotionforallitems:    number;
    allowallcustomers:       number;
    promoappytype:           string;
    couponstatus:            boolean;
    couponcode:              string;
    selweekdays:             PromotionSelweekdays;
    catModifiersIds:         string[];
    sizeModifiersIds:        PromotionSizeModifiersID[];
    tagsModifiers:           string[];
    modifiers:               PromotionModifier[];
    modifiersIds:            string[];
    custModifiersIds:        any[];
    custGroupsModifiersIds:  any[];
    id?:                      string;
}

export interface PromotionModifier {
    qty:                  string;
    price:                string;
    type:                 string;
    status:               number;
    scandatapromotion:    number;
    sdate:                string;
    edate:                string;
    promotax:             string;
    promotionforallitems: number;
    name:                 string;
}

export interface PromotionSelweekdays {
    repeat_sun?: boolean;
    repeat_mon?: boolean;
    repeat_tue?: boolean;
    repeat_wed?: boolean;
    repeat_thu?: boolean;
    repeat_fri?: boolean;
    repeat_sat?: boolean;
}

export interface PromotionSizeModifiersID {
    id:       string;
    name:     string;
    ordernum: string;
}
