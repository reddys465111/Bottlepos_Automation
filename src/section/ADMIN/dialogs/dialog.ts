import { Page } from "playwright";
import { Dialog_AddItem } from "./dialog_AddItem";
import { Dialog_Confirmation } from "./dialog_Confirmation";
import { Dialog_AddCustomer } from "./dialog_AddCustomer";
import { Dialog_AddSupplier } from "./dialog_AddSupplier";
import { Dialog_Alert } from "./dialog_Alert";
import { Dialog_Error } from "./dialog_Error";
import { Dialog_AddTaskList } from "./dialog_AddTaskList";
import { Dialog_Success } from "./dialog_Success";
import { Dialog_Logout } from "./dialog_Logout";
import { Dialog_AddTaxRule } from "./dialog_AddTaxRule";
import { LegacyDialog_ReportTransaction } from "../../POS/dialogs/legacy/legacyDialog_ReportTransaction";
import { Dialog_TransactionDetail } from "./Dialog_TransactionDetail";
import { Dialog_AddTaxItem } from "./dialog_AddTaxItem";
import { Dialog_AddBottleDeposit } from "./dialog_AddBottleDeposit";
import { Dialog_AddAdditionalFees } from "./dialog_AddAdditionalFees";
import { Dialog_DayReport } from "./dialog_DayReport";
import { Dialog_ReceiveItems } from "./dialog_RecieveItems";
import { Dialog_EditReceiveItems } from "./dialog_EditReceiveItems";
import { Dialog_ItemDetails } from "./dialog_ItemDetails";
import { Dialog_EditItem } from "./dialog_EditItem";
import { Dialog_HistoryReceiveItems } from "./dialog_HistoryReceiveItems";
import { Dialog_OrderItems } from "./dialog_OrderItems";
import { Dialog_OrderItemDetails } from "./dialog_OrderItemDetails";
import { LegacyDialog_Confirm } from "../../POS/dialogs/legacy/legacyDialog_Confirm";
import { LegacyDialog_EnterPassword } from "../../POS/dialogs/legacy/legacyDialog_EnterPassword";
import { dialog_EditOrderItem } from "./dialog_EditOrderItems";
import { Dialog_AdvanceSearch } from "./dialog_AdvanceSearch";
import { Dialog_OrderAdvanceSearch } from "./dialog_OrderAdvanceSearch";
import { Dialog_OrderStockHistory } from "./dialog_OrderStockHistory";
import { Dialog_ManageCustomerRewards } from "./dialog_ManageCustomerRewards";  
import { Dialog_AddReward } from "./dialog_AddReward";
import { Dialog_EditReward } from "./dialog_EditReward";
import { Dialog_ManageCustomerGroups } from "./dialog_ManageCustomerGroups";
import { Dialog_AddCustomerGroup } from "./dialog_AddCustomerGroup";
import { Dialog_EditCustomerGroup } from "./dialog_EditCustomerGroup";
import { Dialog_EditCustomer } from "./dialog_EditCustomer";
import { Dialog_CustomerHistory } from "./dialog_CustomerHistory";
import { Dialog_EditTaskList } from "./dialog_EditTaskList";
import { Dialog_TaskListHistory } from "./dialog_TaskListHistory";
import { Dialog_AddExpenseTypes } from "./dialog_AddExpenseType";
import { Dialog_EditExpenseType } from "./dialog_EditExpenseType";
import { dialog_AddExpenseVendor } from "./dialog_AddExpenseVendor";
import { Dialog_EditExpenseVendor } from "./dialog_EditExpenseVendor";
import { Dialog_ExpenseManageVendor } from "./dialog_ExpenseManageVendor";
import { Dialog_ExpenseManageTypes } from "./dialog_ExpenseManageTypes";
import { Dialog_ExpenseManageCategory } from "./dialog_ExpenseManageCategory";
import { Dialog_EditExpenseCategory } from "./dialog_EditExpenseCategory";
import { dialog_AddExpenseCategory } from "./dialog_AddExpenseCategory";
import { Dialog_AddExpense } from "./dialog_AddExpense";
import { Dialog_EditExpense } from "./dialog_EditExpense";
import { Dialog_InventoryEditStock } from "./dialog_InventoryEditStock";
import { Dialog_InventoryStockHistory } from "./dialog_InventoryStockHistory";
import { Dialog_InventoryTransferStock } from "./dialog_InventoryTransferStock";



export class Dialog {
    private _page: Page;
    
    public EditItem: Dialog_EditItem;
    public Logout: Dialog_Logout;
    public AddItem: Dialog_AddItem;
    public AddItemDetails : Dialog_ItemDetails;
    
    //* LEGACY DIALOGS *//
    public Confirmation: Dialog_Confirmation;
    public Alert!: Dialog_Alert;
    public Error!: Dialog_Error;

    public AddSupplier: Dialog_AddSupplier;
    public AddCustomer: Dialog_AddCustomer;
    public AddTaskList: Dialog_AddTaskList;
    public AddReciveItems!: Dialog_ReceiveItems;
    public EditReciveItems!: Dialog_EditReceiveItems;
    public EditorderItems!: dialog_EditOrderItem;
    public HistoryReciveItems!: Dialog_HistoryReceiveItems;
    public OrderItems: Dialog_OrderItems;
    public OrderItemDetails: Dialog_OrderItemDetails;
    public OrderStockHistory:Dialog_OrderStockHistory;
    
    public ReportTransaction: LegacyDialog_ReportTransaction;
    public Success: Dialog_Success;
    //* Settings Dialogs *//
    public AddTaxRule: Dialog_AddTaxRule;
    public TransactionDetails: Dialog_TransactionDetail;
    public EditTaxRule: Dialog_AddTaxRule;
    public AddTaxItem: Dialog_AddTaxItem;
    public EditTaxItem: Dialog_AddTaxItem;
    public AddBottleDeposit: Dialog_AddBottleDeposit;
    public AddAdditionalFees: Dialog_AddAdditionalFees;
    public EditAdditionalFees: Dialog_AddAdditionalFees;
    public EditBottleDeposit: Dialog_AddBottleDeposit;
    public DayReportConfirmation:Dialog_DayReport;
    public Confirm: LegacyDialog_Confirm;
    public EnterPassword: LegacyDialog_EnterPassword;
    public AdvanceSearch:Dialog_AdvanceSearch;
    public OrderAdvanceSearch:Dialog_OrderAdvanceSearch
    public ManageCustomerRewards: Dialog_ManageCustomerRewards ;
    public AddReward: Dialog_AddReward;
    public EditReward: Dialog_EditReward;
    public ManageCustomerGroups: Dialog_ManageCustomerGroups;
    public AddCustomerGroup: Dialog_AddCustomerGroup;
    public EditCustomerGroup: Dialog_EditCustomerGroup;
    public EditCustomer!:Dialog_EditCustomer;
    public CustomerHistory!:Dialog_CustomerHistory;
    public EditTaskList!:Dialog_EditTaskList;
    public TaskListHistory!:Dialog_TaskListHistory

    public ManageExpenseTypes!:Dialog_ExpenseManageTypes;
    public AddExpenseTypes!:Dialog_AddExpenseTypes;
    public EditExpenseType!:Dialog_EditExpenseType;
    public ManageVendor!:Dialog_ExpenseManageVendor;
    public ExpenseAddVendor!:dialog_AddExpenseVendor;
    public EditExpenseVendor!:Dialog_EditExpenseVendor;
    public ManageCategory!:Dialog_ExpenseManageCategory;
    public EditExpensecategory!:Dialog_EditExpenseCategory;
    public AddExpensecategory!:dialog_AddExpenseCategory
    public AddExpense!:Dialog_AddExpense;
    public EditExpense!:Dialog_EditExpense;
    public EditStock!:Dialog_InventoryEditStock;
    public InventoryStockHistory!:Dialog_InventoryStockHistory;
    public TransferStock!:Dialog_InventoryTransferStock;



    constructor(page: Page) { 
        this._page = page;
      
        this.EditItem = new Dialog_EditItem(this._page);
        this.Confirmation = new Dialog_Confirmation(this._page);
        this.AddTaxItem = new Dialog_AddTaxItem(this._page);
        this.EditTaxItem = new Dialog_AddTaxItem(this._page, "Edit Tax Item");
        this.AddAdditionalFees = new Dialog_AddAdditionalFees(this._page);
        this.EditAdditionalFees = new Dialog_AddAdditionalFees(this._page, "Edit Additional Fee");
        this.AddItem = new Dialog_AddItem(this._page);

        /* LEGACY DIALOGS */
        this.Alert = new Dialog_Alert(page);
        this.Error = new Dialog_Error(page);
        this.Logout = new Dialog_Logout(page);
        this.AddSupplier = new Dialog_AddSupplier(this._page);
        this.AddCustomer = new Dialog_AddCustomer(page);
        this.AddTaskList = new Dialog_AddTaskList(page);   
        this.AddReciveItems = new Dialog_ReceiveItems(page);
        this.EditReciveItems = new Dialog_EditReceiveItems(page);
        this.EditorderItems = new dialog_EditOrderItem(page);
        this.HistoryReciveItems = new Dialog_HistoryReceiveItems(page);
        this.OrderItems = new Dialog_OrderItems(page);
        this.OrderItemDetails = new Dialog_OrderItemDetails(page);
        this.AddItemDetails = new Dialog_ItemDetails(page);    
        this.AdvanceSearch=new Dialog_AdvanceSearch(page); 
        this.OrderAdvanceSearch=new Dialog_OrderAdvanceSearch(page); 
        this.OrderStockHistory=new Dialog_OrderStockHistory(page);
        /* SETTINGS DIALOGS */
        this.AddTaxRule = new Dialog_AddTaxRule(page);
        this.EditTaxRule = new Dialog_AddTaxRule(page, "Edit Tax Rule");

        this.AddBottleDeposit = new Dialog_AddBottleDeposit(page);
        this.EditBottleDeposit = new Dialog_AddBottleDeposit(page, "Edit Bottle Deposit");
        this.DayReportConfirmation = new Dialog_DayReport(page);
        

        this.AddTaskList = new Dialog_AddTaskList(page);  
        this.ReportTransaction = new LegacyDialog_ReportTransaction(page); 
        this.TransactionDetails = new Dialog_TransactionDetail(page);
        this.Success = new Dialog_Success(page);
        this.Confirm = new LegacyDialog_Confirm(page);
        this.EnterPassword = new LegacyDialog_EnterPassword(page);
        this.ManageCustomerRewards = new Dialog_ManageCustomerRewards(page);
        this.AddReward = new Dialog_AddReward(page);
        this.EditReward = new Dialog_EditReward(page);
        this.ManageCustomerGroups = new Dialog_ManageCustomerGroups(page);
        this.AddCustomerGroup = new Dialog_AddCustomerGroup(page);
        this.EditCustomerGroup = new Dialog_EditCustomerGroup(page);
        this.EditCustomer = new Dialog_EditCustomer(page);
        this.CustomerHistory = new Dialog_CustomerHistory(page);
        this.EditTaskList = new Dialog_EditTaskList(page);
        this.TaskListHistory = new Dialog_TaskListHistory(page);
        this.ManageExpenseTypes=new Dialog_ExpenseManageTypes(page);
        this.AddExpenseTypes=new Dialog_AddExpenseTypes(page);
        this.EditExpenseType=new Dialog_EditExpenseType(page);
        this.ManageVendor=new Dialog_ExpenseManageVendor(page);
        this.ExpenseAddVendor=new dialog_AddExpenseVendor(page);
        this.EditExpenseVendor=new Dialog_EditExpenseVendor(page)  
        this.ManageCategory=new Dialog_ExpenseManageCategory(page);
        this.EditExpensecategory=new Dialog_EditExpenseCategory(page);
        this.AddExpensecategory=new dialog_AddExpenseCategory(page);
        this.AddExpense=new Dialog_AddExpense(page);
        this.EditExpense=new Dialog_EditExpense(page);
        this.EditStock=new Dialog_InventoryEditStock(page);
        this.InventoryStockHistory=new Dialog_InventoryStockHistory(page);
        this.TransferStock=new Dialog_InventoryTransferStock(page);
     }
}
