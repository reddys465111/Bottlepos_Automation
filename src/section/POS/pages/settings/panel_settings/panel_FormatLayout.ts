import { Locator } from "@playwright/test";
import { BasePanel } from "../../../../../base/basePanel";
import { Dropdown } from "../../../../../objects/dropdown";
import { NumberField } from "../../../../../objects/numberField";
import { Checkbox } from "../../../../../objects/checkbox";
import { TextField } from "../../../../../objects/textField";

export class Panel_FormatLayout extends BasePanel {

    public ESCPReceiptMode!: Dropdown;

    public TextFields: {
        Language: Dropdown,
        Orientation: Dropdown,
        Alternate:{
            Charset: Dropdown,
            Codepage: NumberField,
        },
        OverrideCurrencyChar: Checkbox,
        CurrencyCodePage: NumberField,
        CurrencyCodes: TextField,
        SheetWith: NumberField

    }
    public BitmapFields:{
        ReceiptTemplate: Dropdown,
        InvoiceTemplate: Dropdown,
        PrintInvoicesByDefault: Checkbox,
    }
    constructor(locator: Locator){
        super(locator);

        this.TextFields= {
           
            Language: new Dropdown(this._locator.locator('select#rec_language')),
            Orientation: new Dropdown(this._locator.locator('select#rec_orientation')),
            Alternate: {
                Charset: new Dropdown(this._locator.locator('select#alt_charset')),
                Codepage: new NumberField(this._locator.locator('input#alt_codepage'))
            },
            OverrideCurrencyChar: new Checkbox(this._locator.locator('input#currency_override')),
            CurrencyCodePage: new NumberField(this._locator.locator('input#currency_codepage')),
            CurrencyCodes: new TextField(this._locator.locator('input#currency_codes')),
            SheetWith: new NumberField(this._locator.locator('input#sheet_width'))

        };
        this.BitmapFields = {
            ReceiptTemplate: new Dropdown(this._locator.locator('select#rectemplate')),

            InvoiceTemplate: new Dropdown(this._locator.locator('select#invtemplate')),
            PrintInvoicesByDefault: new Checkbox(this._locator.locator('input#printinv')),
        }
    
    }

}