import { type Page } from "@playwright/test";
import { Button } from "../../../objects/button";
import { LabelField } from "../../../objects/labelField";
import { TextField } from "../../../objects/textField";
import { Legacy_BaseDialog } from "../../../base/legacy/legacy_BaseDialog";

export class Dialog_TransactionDetail extends Legacy_BaseDialog {
    // Top section
    public Status: LabelField;
    public ID: LabelField;
    public Ref: LabelField;
    public TransactionDate: LabelField;
    public ProcessDate: LabelField;
    public User: LabelField;
    public Device: LabelField;
    public Location: LabelField;
    public Notes: TextField;

    // Totals
    public Subtotal: LabelField;
    public Tax: LabelField;
    public Discount: LabelField;
    public Deposit: LabelField;
    public AdditionalCharges: LabelField;
    public Delivery: LabelField;
    public Service: LabelField;
    public Tip: LabelField;
    public Rounding: LabelField;
    public TipsAmount: LabelField;
    public Total: LabelField;

    // Customer details
    public CustomerName: LabelField;
    public CustomerMobile: LabelField;
    public CustomerEmail: LabelField;
    public CustomerAddress: LabelField;
    public CustomerPostCode: LabelField;
    public CustomerDetails: Button;

    // Action buttons
    public Void: Button;

    public PrintReceipt: Button;
    public GenerateInvoice: Button;
    public DownloadCSV: Button;
    public EmailInvoice: Button;
    public History: Button;

    constructor(page: Page) {
        super(page, "Transaction Details");

        // Top Info
        this.Status = new LabelField(this._locator.locator("#transstat"));
        this.ID = new LabelField(this._locator.locator("#transid"));
        this.Ref = new LabelField(this._locator.locator("#transref"));
        this.TransactionDate = new LabelField(this._locator.locator("#transtime"));
        this.ProcessDate = new LabelField(this._locator.locator("#transptime"));
        this.User = new LabelField(this._locator.locator("#transuser"));
        this.Device = new LabelField(this._locator.locator("#transdev"));
        this.Location = new LabelField(this._locator.locator("#transloc"));
        this.Notes = new TextField(this._locator.locator("#transnotes"));

        // Totals
        this.Subtotal = new LabelField(this._locator.locator("#transsubtotal"));
        this.Tax = new LabelField(this._locator.locator("#transtax span"));
        this.Discount = new LabelField(this._locator.locator("#transdiscount"));
        this.Deposit = new LabelField(this._locator.locator("#transitemdeposit"));
        this.AdditionalCharges = new LabelField(this._locator.locator("#addnlchargesval"));
        this.Delivery = new LabelField(this._locator.locator("#transdelivery"));
        this.Service = new LabelField(this._locator.locator("#transservice"));
        this.Tip = new LabelField(this._locator.locator("#transtip"));
        this.Rounding = new LabelField(this._locator.locator("#transroundingval"));
        this.TipsAmount = new LabelField(this._locator.locator("#transtipsamount"));
        this.Total = new LabelField(this._locator.locator("#transtotal"));

        // Customer
        this.CustomerName = new LabelField(this._locator.locator("#tcustname"));
        this.CustomerMobile = new LabelField(this._locator.locator("#tcustmobile"));
        this.CustomerEmail = new LabelField(this._locator.locator("#tcustemail"));
        this.CustomerAddress = new LabelField(this._locator.locator("#tcustaddress"));
        this.CustomerPostCode = new LabelField(this._locator.locator("#tcustpostcode"));
        this.CustomerDetails = new Button(this._locator.locator("#transcustdtlbtn"));

        // Action buttons
        this.Void = new Button(this._locator.getByRole("button", { name: "Void" }));
        this.PrintReceipt = new Button(this._locator.getByRole("button", { name: "Print Receipt" }));
        this.GenerateInvoice = new Button(this._locator.getByRole("button", { name: "Generate Invoice" }));
        this.DownloadCSV = new Button(this._locator.getByRole("button", { name: "Download CSV" }));
        this.EmailInvoice = new Button(this._locator.getByRole("button", { name: "Email Invoice" }));
        this.History = new Button(this._locator.getByRole("button", { name: "History" }));

        // Example: after clicking Void, wait for dialog updates
        this.Void.SetAfterEvent(async () => {
            await this._page.waitForTimeout(1500);
        });
    }
}
