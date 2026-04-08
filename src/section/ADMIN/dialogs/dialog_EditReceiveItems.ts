import { Page } from "@playwright/test";

import { BaseDialog } from "../../../base/baseDialog";
import { Table_ReceiveItems } from "../tables/table_RecieveItems";
import { Button } from "../../../objects/button";
import { Dropdown } from "../../../objects/dropdown";
import { LabelField } from "../../../objects/labelField";
import { TextField } from "../../../objects/textField";

/**
 * Represents the "Edit Receive Items" dialog (triggered when editing a non-finalized invoice).
 * It has a different footer container than the Add Receive Items dialog.
 */
export class Dialog_EditReceiveItems extends BaseDialog {
  // Form fields
  public Supplier: Dropdown;
  public InvoiceNumber: TextField;
  public InvoiceTotal: TextField;
  public Total: TextField;
  public Margin: TextField;
  public Cases: TextField;
  public Bottles: TextField;
  public Product: TextField;
  public InvoiceDate: TextField;
  public DueDate: TextField;
  public VendorItemNo: TextField;
  public Note: TextField;

  // Table & functional buttons
  public Table_EditReceiveItems: Table_ReceiveItems;
  public AddNewItem: Button;

  // Footer actions
  public Print: Button;
  public SaveForLater: Button;
  public Finalize: Button;
  public Cancel: Button;
  public ViewRawData: Button;

  // Footer labels
  public Confidence: LabelField;
  public TotalItems: LabelField;

  constructor(page: Page) {
    super(page, "Edit Receive Items");

    // Root container for the edit dialog
    const locator = page.locator("div[role='dialog'].editblock");

    // Content section
    const content = locator.locator("#additemtoreceivedialog");

    // Footer section (different DOM node)
    const footer = locator.locator(".ui-dialog-buttonpane.forconfidence.forcount");

    // Content fields
    this.Supplier = new Dropdown(content.locator("#additemsupplier"));
    this.InvoiceNumber = new TextField(content.locator("#additemmnumber"));
    this.InvoiceTotal = new TextField(content.locator("#additeminvoicetotal"));
    this.Total = new TextField(content.locator("#additemstotal"));
    this.Margin = new TextField(content.locator("#additemsmargin"));
    this.Cases = new TextField(content.locator("#additemscases"));
    this.Bottles = new TextField(content.locator("#additemsbottles"));
    this.Product = new TextField(content.locator("#additemproduct"));
    this.InvoiceDate = new TextField(content.locator("#additemdate"));
    this.DueDate = new TextField(content.locator("#additemduedate"));
    this.VendorItemNo = new TextField(content.locator("#additemvendorproduct"));
    this.Note = new TextField(content.locator("#addreceivenote"));

    // Table
    this.Table_EditReceiveItems = new Table_ReceiveItems(content.locator("#editreceiveitemtabledetail"));

    // Functional buttons
    this.AddNewItem = new Button(content.locator("#addnewitemedit"));

    // Footer buttons (scoped to footer locator)
    this.Print = new Button(footer.locator("button[title='Print']"));
    this.SaveForLater = new Button(footer.locator("button.editbtnsaveforlater"));
    this.Finalize = new Button(footer.locator("button.finalfinalizebtn"));
    this.Cancel = new Button(footer.locator("button[title='Cancel']"));
    this.ViewRawData = new Button(footer.locator(".viewrawdata"));

    // Footer labels
    this.Confidence = new LabelField(footer.locator("#forconfidencenew"));
    this.TotalItems = new LabelField(footer.locator("#itmtotalcount"));
  }

  /**
   * Waits until the Edit Receive dialog is fully loaded and ready.
   */
  public async WaitUntilReady(): Promise<void> {
    await this._page.waitForSelector("#additemtoreceivedialog", { state: "visible", timeout: 15000 });
    await this.InvoiceTotal._locator.waitFor({ state: "visible", timeout: 10000 });
    await this._page.waitForTimeout(500);
  }

  /**
   * Updates invoice total and saves for later.
   */
  public async UpdateInvoiceTotalAndSave(value: string): Promise<void> {
    await this.WaitUntilReady();
    await this.InvoiceTotal.setText({ value });
    await this.SaveForLater.Click();
    await this._page.waitForSelector("#receiveitemstable", { state: "visible", timeout: 15000 });
    await this._page.waitForTimeout(500);
  }
}
