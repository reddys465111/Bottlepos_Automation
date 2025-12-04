import { Page } from "playwright";
import { Dialog_AddItem } from "../../../ADMIN/dialogs/dialog_AddItem";
import { dialog_AddSupplier } from "../dialog_AddSupplier";
import { Dialog_Confirmation } from "../dialog_Confirmation";
import { Dialog_EditItem } from "../dialog_EditItem";
import { Dialog_Logout } from "../dialog_Logout";
import { LegacyDialog_Alert } from "./legacyDialog_Alert";
import { LegacyDialog_AlertDeviceSetup } from "./legacyDialog_AlertDeviceSetup";
import { LegacyDialog_Error } from "./legacyDialog_Error";
import { LegacyDialog_InitialDeviceSetup } from "./legacyDialog_InitialDeviceSetup";
import { LegacyDialog_Logout } from "./legacyDialog_Logout";
import { LegacyDialog_PaxInitializationError } from "./legacyDialog_PaxInitalizationError";
import { LegacyDialog_Confirmation } from "./legacyDialog_Confirmation";
import { LegacyDialog_ReportTransaction } from "./legacyDialog_ReportTransaction";
import { Dialog_AddCustomer } from "../../../ADMIN/dialogs/dialog_AddCustomer";
import { LegacyDialog_LoginError } from "./legacyDialog_LoginError";

export class LegacyDialog {
    private _page: Page;
    
    public EditItem: Dialog_EditItem;
    // public Logout: Dialog_Logout;
    public AddItem: Dialog_AddItem;
    
    //* LEGACY DIALOGS *//
    public Confirmation: LegacyDialog_Confirmation;
    public Alert!: LegacyDialog_Alert;
    public Error!: LegacyDialog_Error;
    public LoginError: LegacyDialog_LoginError;
    public AlertDeviceSetup!: LegacyDialog_AlertDeviceSetup;
    public InitialDeviceSetup!: LegacyDialog_InitialDeviceSetup;
    public PaxInitializationError!: LegacyDialog_PaxInitializationError;
    public Logout!: LegacyDialog_Logout;
    public AddSupplier: dialog_AddSupplier;
    public AddCustomer: Dialog_AddCustomer;
    public ReportTransaction!: LegacyDialog_ReportTransaction;

    constructor(page: Page) { 
        this._page = page;
      
        this.EditItem = new Dialog_EditItem(this._page);
        this.Confirmation = new LegacyDialog_Confirmation(this._page);
       
        this.AddItem = new Dialog_AddItem(this._page);

        /* LEGACY DIALOGS */
        this.Alert = new LegacyDialog_Alert(page);
        this.Error = new LegacyDialog_Error(page);
        this.AlertDeviceSetup = new LegacyDialog_AlertDeviceSetup(page);
        this.InitialDeviceSetup = new LegacyDialog_InitialDeviceSetup(page);
        this.PaxInitializationError = new LegacyDialog_PaxInitializationError(page);
        this.Logout = new LegacyDialog_Logout(page);

        this.AddSupplier = new dialog_AddSupplier(this._page);
        this.AddCustomer = new Dialog_AddCustomer(page);
        this.ReportTransaction = new LegacyDialog_ReportTransaction(page);

        this.LoginError = new LegacyDialog_LoginError(page);
    }
}