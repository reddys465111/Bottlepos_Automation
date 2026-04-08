import { Locator } from "@playwright/test";
import { BaseObject } from "../../../../../base/baseObject";
import { Button } from "../../../../../objects/button";
import { Checkbox } from "../../../../../objects/checkbox";
import { Dropdown } from "../../../../../objects/dropdown";
import { LabelField } from "../../../../../objects/labelField";

export class Tab_General extends BaseObject{

    public UseOnScreenKeypad: Checkbox;
    public ShowFixedKeypad: Checkbox;
    public AutoLaunchCustomerScreen: Checkbox;
    public ShowTotalOnCustomerScreen: Checkbox;
    public ShowPriceOnCustomerScreen: Checkbox;
    public ShowCustomerNumber: Checkbox;
    public ShowSaleNotes: Checkbox;
    public AlwaysShowShortcuts: Checkbox;
    public EnableWeborderNotifications: Checkbox;
    public HideTotalDetails: Checkbox;
    public TasklistNotificationSound: Dropdown;
    public SearchFontSize: Dropdown;
    public POSScreenFontSize: Dropdown;
    public CustomerScreenFontSize: Dropdown;
    public CustomerScreenZoom: Dropdown;

    public DeviceID: LabelField;
    public DeviceName: LabelField;
    public LocationName: LabelField;
    public RegistrationID: LabelField;
    public RegistrationUUID: LabelField;
    public RegistrationDT: LabelField;

    public BackupOfflineSales: Button;
    public ResetLocalConfig: Button;
    public ClearLocalData: Button;
    public RefreshRemoteData: Button;
    public RemoveDeviceRegistration: Button;
    public RetryFailedTransactions: Button;
    public RestartPaxMachine: Button;
    public CloseBatchPAXMachine: Button;
    constructor(locator: Locator){
        super(locator);

        this.UseOnScreenKeypad = new Checkbox(this._locator.getByLabel('Use On-Screen Keypad'));
        this.ShowFixedKeypad = new Checkbox(this._locator.getByLabel('Show Fixed Keypad'));
        this.AutoLaunchCustomerScreen = new Checkbox(this._locator.getByLabel('Auto Launch Customer Screen'));
        this.ShowTotalOnCustomerScreen = new Checkbox(this._locator.getByLabel('Show Total on Customer Screen'));
        this.ShowPriceOnCustomerScreen = new Checkbox(this._locator.getByLabel('Show Price on Customer Screen'));
        this.ShowCustomerNumber = new Checkbox(this._locator.getByLabel('Show Customer Number'));
        this.ShowSaleNotes = new Checkbox(this._locator.getByLabel('Show Sale Notes'));
        this.AlwaysShowShortcuts = new Checkbox(this._locator.getByLabel('Always Show Shortcuts'));
        this.EnableWeborderNotifications = new Checkbox(this._locator.getByLabel('Enable Weborder Notifications'));
        this.HideTotalDetails = new Checkbox(this._locator.getByLabel('Hide Total Details'));

        this.TasklistNotificationSound = new Dropdown(this._locator.getByLabel('Tasklist Notification Sound'));
        this.SearchFontSize = new Dropdown(this._locator.getByLabel('Search Font Size'));
        this.POSScreenFontSize = new Dropdown(this._locator.getByLabel('POS Screen Font Size'));
        this.CustomerScreenFontSize = new Dropdown(this._locator.getByLabel('Customer Screen Font Size'));
        this.CustomerScreenZoom = new Dropdown(this._locator.getByLabel('Customer Screen Zoom'));

        this.DeviceID = new LabelField(this._locator.getByLabel('.device_id'));
        this.DeviceName = new LabelField(this._locator.getByLabel('.device_name'));
        this.LocationName = new LabelField(this._locator.getByLabel('.location_name'));
        this.RegistrationID = new LabelField(this._locator.getByLabel('.devicereg_id'));
        this.RegistrationUUID = new LabelField(this._locator.getByLabel('.devicereg_uuid'));
        this.RegistrationDT = new LabelField(this._locator.getByLabel('.devicereg_dt'));

        this.BackupOfflineSales = new Button(this._locator.locator('#backup_btn'));
        this.ResetLocalConfig = new Button(this._locator.locator('[title="Reset Local Config"]'));
        this.ClearLocalData = new Button(this._locator.locator('[title="Clear Local Data"]'));
        this.RefreshRemoteData = new Button(this._locator.getByRole('button', { name: 'Refresh Remote Data' }));
        this.RemoveDeviceRegistration = new Button(this._locator.locator('[title="Remove Device Registration"]'));
        this.RetryFailedTransactions = new Button(this._locator.locator('[title="Retry Failed Transactions"]'));
        this.RestartPaxMachine = new Button(this._locator.locator('#resetpaxbtn'));
        this.CloseBatchPAXMachine = new Button(this._locator.locator('#closebatchpaxbtn'));
        
    }
}