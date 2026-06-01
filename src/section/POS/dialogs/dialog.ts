import { Page } from "@playwright/test";
import { LegacyDialog_Alert } from "./legacy/legacyDialog_Alert";
import { LegacyDialog_Error } from "./legacy/legacyDialog_Error";
import { LegacyDialog_AlertDeviceSetup } from "./legacy/legacyDialog_AlertDeviceSetup";
import { LegacyDialog_InitialDeviceSetup } from "./legacy/legacyDialog_InitialDeviceSetup";
import { LegacyDialog_PaxInitializationError } from "./legacy/legacyDialog_PaxInitalizationError";
import { Dialog_AgeVerification } from "./dialog_AgeVerification";
import { Dialog_Alert } from "./dialog_Alert";
import { Dialog_AlertDeviceSetup } from "./dialog_AlertDeviceSetup";
import { Dialog_Approved } from "./dialog_Approved";
import { Dialog_Checkout } from "./dialog_Checkout";
import { Dialog_CheckoutComplete } from "./dialog_CheckoutComplete";
import { Dialog_Confirmation } from "./dialog_Confirmation";
import { Dialog_CustomerDetails } from "./dialog_CustomerDetails";
import { Dialog_Customerinfo } from "./dialog_CustomerInfo";
import { Dialog_Customernotfound } from "./dialog_CustomerNotFound";
import { Dialog_Discount } from "./dialog_Discount";
import { Dialog_EditItem } from "./dialog_EditItem";
import { Dialog_Error } from "./dialog_Error";
import { Dialog_InitialDeviceSetup } from "./dialog_InitialDeviceSetup";
import { Dialog_Logout } from "./dialog_Logout";
import { Dialog_PaxInitializationError } from "./dialog_PaxInitalizationError";
import { Dialog_PrintConfirmation } from "./dialog_PrintConfirmation";
import { Dialog_RefundTransaction } from "./dialog_RefundTransaction";
import { Dialog_Success } from "./dialog_Success";
import { Dialog_TransactionDetail } from "./dialog_TransactionDetails";
import { Dialog_itemnotfound } from "./dialog_ItemNotFound";
import { Dialog_DeleteOrder } from "./dialog_DeleteOrder";
import { Dialog_VoidTransaction } from "./dialog_VoidTransaction"
import { Dialog_TransactionCancelled} from "./dialog_TransactionCancelled"
import { dialog_AddSupplier } from "./dialog_AddSupplier";
import { Dialog_Authorization } from "./dialog_Authorization";
import { LegacyDialog_Logout } from "./legacy/legacyDialog_Logout";
import { LegacyDialog_CancelOrder } from "./legacy/legacyDialog_CancelOrder";
import { LegacyDialog_VoidTransaction } from "./legacy/legacyDialog_VoidTransaction";
import { LegacyDialog_LoginError } from "./legacy/legacyDialog_LoginError";
import { Dialog_PointsRequired } from "./dialog_PointsRequired";
import { Dialog_Payout } from "./dialog_Payout";
import { Dialog_OthersButton } from "./dialog_Others";
import { Dialog_PartialApproval } from "./dialog_PartialApproval";
import { Dialog_ReloadData } from "./dialog_ReloadData";
import { Dialog_ActivateGiftcard } from "./dialog_ActivateGiftcard";
import { th } from "@faker-js/faker";
import { Dialog_GiftCardAdded } from "./dialog_GiftCardAdded";
import { Dialog_ScanGiftCard } from "./dialog_ScanGifcard";
import { Dialog_CheckGiftCardBalance } from "./dialog_CheckGiftCardBalance";
import { Dialog_GiftCardBalance } from "./dialog_GiftCardBalance";
import { Dialog_RedeemGiftCardAmount } from "./dialog_RedeemGiftCardAmount";
import { Dialog_ReportDialog } from "./dialog_ReportDialog";




export class Dialog {
    private _page: Page;
    public PaxInitializationError: Dialog_PaxInitializationError;
    public InitialDeviceSetup: Dialog_InitialDeviceSetup;
    public Error: Dialog_Error;
    public LoginError: LegacyDialog_LoginError;
    public Alert: Dialog_Alert;
    public AlertDeviceSetup: Dialog_AlertDeviceSetup;
    public CheckoutComplete: Dialog_CheckoutComplete;
    public Checkout: Dialog_Checkout;
    public EditItem: Dialog_EditItem;
    public Success: Dialog_Success;
    public AgeVerification: Dialog_AgeVerification;
    public TransactionDetails: Dialog_TransactionDetail;
    public RefundTransaction: Dialog_RefundTransaction;
    public Confirmation: Dialog_Confirmation;
    public PrintConfirmation: Dialog_PrintConfirmation;
    public ApplyDiscount: Dialog_Discount;
    public Authorization: Dialog_Authorization;
    public Logout: Dialog_Logout;
    public CustomerNotFound: Dialog_Customernotfound;
    public CustomerDetails: Dialog_CustomerDetails;
    public Customerinfo: Dialog_Customerinfo;
    public Approved: Dialog_Approved;
    public ItemNotFound: Dialog_itemnotfound;
    public CancelOrder : LegacyDialog_CancelOrder;
    public DeleteOrder : Dialog_DeleteOrder;
    public VoidTransaction : Dialog_VoidTransaction;
    public VoidTransactionAlert : Dialog_VoidTransaction;
    public TransactionCancelled: Dialog_TransactionCancelled;
    public AddItem: Dialog_EditItem;
    public PointsRequired: Dialog_PointsRequired;
    //* LEGACY DIALOGS *//
    public Legacy_Alert!: LegacyDialog_Alert;
    public Legacy_Error!: LegacyDialog_Error;
    public Legacy_AlertDeviceSetup!: LegacyDialog_AlertDeviceSetup;
    public Legacy_InitialDeviceSetup!: LegacyDialog_InitialDeviceSetup;
    public Legacy_PaxInitializationError!: LegacyDialog_PaxInitializationError;
    public Legacy_Logout!: LegacyDialog_Logout;
    public AddSupplier: dialog_AddSupplier;
    public Payout: Dialog_Payout;
    public OthersButton:Dialog_OthersButton;
    public PartialApproval: Dialog_PartialApproval;
    public ReloadData: Dialog_ReloadData;
    public ActivateGiftCard: Dialog_ActivateGiftcard;
    public GiftcardAdded: Dialog_GiftCardAdded;
    public ScanGiftCard: Dialog_ScanGiftCard;
    public CheckGiftCardBalance: Dialog_CheckGiftCardBalance;
    public GiftCardBalance: Dialog_GiftCardBalance;
    public RedeemGiftCardAmount: Dialog_RedeemGiftCardAmount;
    public ReportDialog: Dialog_ReportDialog;
    


    constructor(page: Page) { 
        this._page = page;
        this.InitialDeviceSetup = new Dialog_InitialDeviceSetup(this._page);
        this.PaxInitializationError = new Dialog_PaxInitializationError(this._page);
        this.Error = new Dialog_Error(this._page);
        this.LoginError = new LegacyDialog_LoginError(this._page);
        this.Alert = new Dialog_Alert(this._page);
        this.AlertDeviceSetup = new Dialog_AlertDeviceSetup(this._page);
        this.CheckoutComplete = new Dialog_CheckoutComplete(this._page);
        this.Checkout = new Dialog_Checkout(this._page);
        this.EditItem = new Dialog_EditItem(this._page);
        this.Success = new Dialog_Success(this._page);
        this.AgeVerification = new Dialog_AgeVerification(this._page);
        this.TransactionDetails = new Dialog_TransactionDetail(this._page);
        this.RefundTransaction = new Dialog_RefundTransaction(this._page);
        this.Confirmation = new Dialog_Confirmation(this._page);
        this.PrintConfirmation = new Dialog_PrintConfirmation(this._page);
        this.ApplyDiscount = new Dialog_Discount(this._page);
        this.Logout = new Dialog_Logout(this._page);
        this.CustomerNotFound = new Dialog_Customernotfound(this._page);
        this.CustomerDetails = new Dialog_CustomerDetails(this._page);
        this.Customerinfo = new Dialog_Customerinfo(this._page);
        this.Approved = new Dialog_Approved(this._page);
        this.ItemNotFound = new Dialog_itemnotfound(this._page);
        this.CancelOrder= new LegacyDialog_CancelOrder(this._page);
        this.DeleteOrder= new Dialog_DeleteOrder(this._page);
        this.VoidTransaction = new Dialog_VoidTransaction(this._page);
        this.VoidTransactionAlert = new Dialog_VoidTransaction(this._page);
        this.TransactionCancelled = new Dialog_TransactionCancelled(this._page);
        this.Authorization = new Dialog_Authorization(this._page);
        this.AddItem = new Dialog_EditItem(this._page);
        this.PointsRequired = new Dialog_PointsRequired(this._page);
        this.Payout = new Dialog_Payout(this._page);
        this.OthersButton = new Dialog_OthersButton(this._page);
        this.PartialApproval = new Dialog_PartialApproval(this._page);
        this.ReloadData = new Dialog_ReloadData(this._page);
        this.ActivateGiftCard = new Dialog_ActivateGiftcard(this._page);
        this.GiftcardAdded = new Dialog_GiftCardAdded(this._page);
        this.ScanGiftCard = new Dialog_ScanGiftCard(this._page);
        this.CheckGiftCardBalance = new Dialog_CheckGiftCardBalance(this._page);
        this.GiftCardBalance = new Dialog_GiftCardBalance(this._page);
        this.RedeemGiftCardAmount = new Dialog_RedeemGiftCardAmount(this._page);
        this.ReportDialog = new Dialog_ReportDialog(this._page);


        /* LEGACY DIALOGS */
        this.Legacy_Alert = new LegacyDialog_Alert(page);
        this.Legacy_Error = new LegacyDialog_Error(page);
        this.Legacy_AlertDeviceSetup = new LegacyDialog_AlertDeviceSetup(page);
        this.Legacy_InitialDeviceSetup = new LegacyDialog_InitialDeviceSetup(page);
        this.Legacy_PaxInitializationError = new LegacyDialog_PaxInitializationError(page);
        this.Legacy_Logout = new LegacyDialog_Logout(page);

        this.AddSupplier = new dialog_AddSupplier(this._page);

    }
}