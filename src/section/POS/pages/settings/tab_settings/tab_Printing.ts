import { Locator } from "@playwright/test";
import { BaseObject } from "../../../../../base/baseObject";
import { Button } from "../../../../../objects/button";
import { Dropdown } from "../../../../../objects/dropdown";
import { TextField } from "../../../../../objects/textField";
import { Panel_CashCutterPageFeed } from "../panel_settings/panel_CashdrawCutterPageFeed";
import { Panel_Connection } from "../panel_settings/panel_Connection";
import { Panel_FormatLayout } from "../panel_settings/panel_FormatLayout";
import { Panel_General } from "../panel_settings/panel_General";
import { Panel_LabelPrinterSettings } from "../panel_settings/panel_LabelPrinterSettings";
import { Panel_PoleDisplay } from "../panel_settings/panel_PoleDisplay";

export class Tab_Printing extends BaseObject{

    private _contentLocator: Locator;
    public General: Panel_General;
    public Connection: Panel_Connection;

    public CashDrawCutterPageFeed: Panel_CashCutterPageFeed;
    public FormatLayout: Panel_FormatLayout;
    public ReportPrinting: {
        Method: Dropdown;
        Type: Dropdown,
        Type_Format: Dropdown,
        Printer: Dropdown,
        Refresh: Button,
    }
    public LabelPrinterSettings: Panel_LabelPrinterSettings;
    public PoleDisplay: Panel_PoleDisplay;
    public PrintServiceOptions: {
        IP_Address: TextField,
        Port: TextField
    }
    constructor(locator: Locator){
        super(locator);
        this._contentLocator = this._locator.locator('.tab-pane.active.in');

        this.General = new Panel_General(this._contentLocator.locator('.panel', { has: this._contentLocator.locator('a:has-text("General")') }));
        this.Connection = new Panel_Connection(this._contentLocator.locator('.panel', { has: this._contentLocator.locator('a:has-text("Connection")') }));
        this.CashDrawCutterPageFeed = new Panel_CashCutterPageFeed(this._contentLocator.locator('.panel', { has: this._contentLocator.locator('a:has-text("Cashdraw, Cutter & Page Feed")') }));
        this.FormatLayout = new Panel_FormatLayout(this._contentLocator.locator('.panel', { has: this._contentLocator.locator('a:has-text("Format & Layout")') }));
        this.LabelPrinterSettings = new Panel_LabelPrinterSettings(this._contentLocator.locator('.panel', { has: this._contentLocator.locator('a:has-text("Label Printer Settings")') }));
        this.PoleDisplay = new Panel_PoleDisplay(this._contentLocator.locator('.panel', { has: this._contentLocator.locator('a:has-text("Pole Display")') }));
        
        this.ReportPrinting = {
            Method : new Dropdown(this._contentLocator.locator('#printsettings_reports select.psetting_method')),
            Printer : new Dropdown(this._contentLocator.locator('#printsettings_reports select.psetting_printer')),
            Refresh : new Button(this._contentLocator.locator('#printsettings_reports [title="Refresh"]')),
            Type : new Dropdown(this._locator.locator('#printsettings_reports select.psetting_electron_type')),
            Type_Format : new Dropdown(this._locator.locator('#printsettings_reports select.psetting_electron_format'))

        }
        this.PrintServiceOptions = {
            IP_Address: new TextField(this._contentLocator.locator('input#serviceip')),
            Port: new TextField(this._contentLocator.locator('input#serviceport'))
        }

    }


}