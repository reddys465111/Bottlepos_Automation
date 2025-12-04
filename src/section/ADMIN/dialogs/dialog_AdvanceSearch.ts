import { type Locator, type Page } from "@playwright/test";
import { BaseDialog } from "../../../base/baseDialog";
import { Button } from "../../../objects/button";
import { Dropdown } from "../../../objects/dropdown";
import { NumberField } from "../../../objects/numberField";
import { TextField } from "../../../objects/textField";

export class Dialog_AdvanceSearch extends BaseDialog {

    public StockCode: TextField;
    public QtyOnHandFrom: NumberField;
    public QtyOnHandTo: NumberField;

    public ItemName: TextField;

    public PriceFrom: NumberField;
    public PriceTo: NumberField;

    public MarginFrom: NumberField;
    public MarginTo: NumberField;

    public CostFrom: NumberField;
    public CostTo: NumberField;

    public VendorItemNo: TextField;

    public Size: Dropdown;
    public Tax: Dropdown;
    public Category: Dropdown;
    public Supplier: Dropdown;

    public UnitsPerCase: TextField;
    public DefaultQty: TextField;
    public SKU: TextField;

    public ReorderPoint: TextField;
    public ReorderValue: TextField;
    public Rank: Dropdown;

    public RemindDate: TextField;
    public ItemType: Dropdown;
    public VendorName: TextField;

    public Promotion: Dropdown;
    public Tags: TextField;

    public MinPrice: NumberField;

    public Notes: TextField;

    public Search: Button;
    public Cancel: Button;

    constructor(page: Page) {
        super(page, "Advance Search");

        // --- Top row ---
        this.StockCode = new TextField(page.locator("#bulkadvancesearchitemcode"));
        this.QtyOnHandFrom = new NumberField(page.locator("#bulkadvsearchitemqtyonhandfrom"));
        this.QtyOnHandTo = new NumberField(page.locator("#bulkadvsearchitemqtyonhandto"));

        // --- Item name ---
        this.ItemName = new TextField(page.locator("#bulkadvsearchitemname"));

        // --- Pricing ---
        this.PriceFrom = new NumberField(page.locator("#bulkadvsearchitempricefrom"));
        this.PriceTo = new NumberField(page.locator("#bulkadvsearchitempriceto"));
        this.MarginFrom = new NumberField(page.locator("#bulkadvsearchitemmarginfrom"));
        this.MarginTo = new NumberField(page.locator("#bulkadvsearchitemmarginto"));

        // --- Cost & Vendor Item ---
        this.CostFrom = new NumberField(page.locator("#bulkadvsearchitemcostfrom"));
        this.CostTo = new NumberField(page.locator("#bulkadvsearchitemcostto"));
        this.VendorItemNo = new TextField(page.locator("#bulkadvsearchvendoritemno1"));

        // --- Dropdowns (Size, Tax, Category, Supplier) ---
        this.Size = new Dropdown(page.locator("#bulkadvsearchitemdesc"));
        this.Tax = new Dropdown(page.locator("#bulkadvsearchitemtax"));
        this.Category = new Dropdown(page.locator("#bulkadvsearchitemcategory"));
        this.Supplier = new Dropdown(page.locator("#bulkadvsearchitemsupplier"));

        // --- Additional fields ---
        this.UnitsPerCase = new TextField(page.locator("#bulkadvsearchunitspercase"));
        this.DefaultQty = new TextField(page.locator("#bulkadvsearchitemqty"));
        this.SKU = new TextField(page.locator("#bulkadvsearchitemaltname"));

        this.ReorderPoint = new TextField(page.locator("#bulkadvsearchitemreorderpoint"));
        this.ReorderValue = new TextField(page.locator("#bulkadvsearchitemreordervalue"));
        this.Rank = new Dropdown(page.locator("#bulkadvsearchitemrank"));

        this.RemindDate = new TextField(page.locator("#bulksearchitemreminddate"));
        this.ItemType = new Dropdown(page.locator("#bulkadvsearchitemtype"));
        this.VendorName = new TextField(page.locator("#bulksearchitemvendorname"));

        this.Promotion = new Dropdown(page.locator("#bulksearchitempromotion"));
        this.Tags = new TextField(page.locator("#bulksearchitemtags"));

        this.MinPrice = new NumberField(page.locator("#bulksearchitemminprice"));

        this.Notes = new TextField(page.locator("#bulksearchitemnotes"));

        // --- Buttons ---
        this.Search = new Button(page.locator('button[title="Search"]'));
        this.Cancel = new Button(page.locator('button[title="Cancel"]'));
    }
}
