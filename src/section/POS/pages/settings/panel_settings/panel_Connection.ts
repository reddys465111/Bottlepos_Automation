import { Locator } from "@playwright/test";
import { BasePanel } from "../../../../../base/basePanel";
import { Dropdown } from "../../../../../objects/dropdown";
import { Button } from "../../../../../objects/button";

export class Panel_Connection extends BasePanel {

    public Method!: Dropdown;
    public ElectronFields: {
        Type_Options: Dropdown,
        Type_Format: Dropdown,
        Printer: Dropdown,
        Refresh: Button,
        Test: Button,
        PrintQR: Button
    };
    public WebPrintESCPFields: {
        Type: Dropdown,
        Printer: Dropdown,
        Refresh: Button,
        Test: Button,
        PrintQR: Button
    };

    
    constructor(locator: Locator){
        super(locator);

        this.ElectronFields = {
            Printer: new Dropdown(this._locator.locator('.advprintoptions[style*="display: inline-block"] .psetting_printer')),
            Refresh: new Button(this._locator.locator('.advprintoptions[style*="display: inline-block"] .rawoptions  button')),
            Type_Options: new Dropdown(this._locator.locator('.psetting_electron_type')),
            Type_Format: new Dropdown(this._locator.locator('.psetting_electron_format')),
            Test: new Button(this._locator.locator('.printoptions[style*="display: inline-block"] button[title="Test"]')),
            PrintQR : new Button(this._locator.locator('.printoptions[style*="display: inline-block"] button[title="Print QR"]'))

        };
        this.WebPrintESCPFields = {
            Printer: new Dropdown(this._locator.locator('.advprintoptions[style*="display: inline-block"] .psetting_printer')),
            Refresh: new Button(this._locator.locator('.advprintoptions[style*="display: inline-block"] .rawoptions  button')),
            Test: new Button(this._locator.locator('.printoptions[style*="display: inline-block"] button[title="Test"]')),
            PrintQR : new Button(this._locator.locator('.printoptions[style*="display: inline-block"] button[title="Print QR"]')),
            Type: new Dropdown(this._locator.locator('.advprintoptions[style*="display: inline-block"] .psetting_type'))
        }
    }

}