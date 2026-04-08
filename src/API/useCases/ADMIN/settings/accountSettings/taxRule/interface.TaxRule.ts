export interface ITaxRuleResponse {
    errorCode?: string;
    error?:     string;
    data?:      ITaxRuleData;
}


export interface ITaxRuleData {
    name?:         string;
    inclusive?:    boolean;
    isdefaulttax?: boolean;
    mode?:         string;
    base?:         number[];
    locations?:    { [key: string]: number[] };
    posbutton?:    ITaxRulePosbutton;
    id?:           string;
}

export interface ITaxRulePosbutton {
    button:      string;
    taxid?:       string;
    buttoncolor: string;
}
