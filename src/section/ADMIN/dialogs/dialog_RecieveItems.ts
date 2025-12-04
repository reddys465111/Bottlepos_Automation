import { Page } from "@playwright/test";

import { BaseDialog } from "../../../base/baseDialog";
import { Table_ReceiveItems } from "../tables/table_RecieveItems";
import { Button } from "../../../objects/button";
import { Dropdown } from "../../../objects/dropdown";
import { LabelField } from "../../../objects/labelField";
import { TextField } from "../../../objects/textField";

export class Dialog_ReceiveItems extends BaseDialog {

  public Supplier: Dropdown;
  public InvoiceNumber: TextField;
  public InvoiceTotal: TextField;
  public Total: TextField;
  public Margin: TextField;
  public Cases: TextField;
  public Bottles: TextField;
  public Product: TextField;
  public InvoiceDate: Dropdown;
  public DueDate: TextField;
  public VendorItemNo: TextField;
  public Note: TextField;
  public ColumnVisibility: Button;
  public Undo: Button;
  public Search: TextField;
  public Table_ReceiveItems: Table_ReceiveItems;
  public AddNewItem: Button;
  public Finalize: Button;
  public SaveForLater: Button;
  public Print: Button;
  public Cancel: Button;
  public Confidence: LabelField;
  public TotalItems: LabelField;

  constructor(page: Page) {
    super(page, "Receive Items");

    // Use the parent dialog container (contains both content & footer)
    const locator = page.locator("div[role='dialog']:has(#addreceivedialog)");

    // Content inside the dialog
    const content = locator.locator("#addreceivedialog");

    // Fields inside the content section
    this.Supplier = new Dropdown(content.locator("#newreceiveitemsupplier"));
    this.InvoiceNumber = new TextField(content.locator("#newreceiveitemnumber"));
    this.InvoiceTotal = new TextField(content.locator("#newreceiveitemtotal"));
    this.Total = new TextField(content.locator("#newreceiveitemstotal"));
    this.Margin = new TextField(content.locator("#newadditemsmargin"));
    this.Cases = new TextField(content.locator("#newadditemscases"));
    this.Bottles = new TextField(content.locator("#newadditemsbottles"));
    this.Product = new TextField(content.locator("#newreceiveitemproduct"));
    this.InvoiceDate = new Dropdown(content.locator("#newreceiveitemdate"));
    this.DueDate = new TextField(content.locator("#newreceiveitemduedate"));
    this.VendorItemNo = new TextField(content.locator("#newreceiveitemvendorproduct"));
    this.Note = new TextField(content.locator("#newreceivenote"));
    this.ColumnVisibility = new Button(content.locator(".dt-button.buttons-collection"));
    this.Undo = new Button(content.locator(".dt-button"));
    this.Search = new TextField(content.locator("input[aria-controls='receiveitemtabledetail']"));
    this.Table_ReceiveItems = new Table_ReceiveItems(content.locator("#receiveitemtabledetail"));

    // Action Buttons (footer section of the dialog)
    this.AddNewItem = new Button(content.locator("#addnewitemnew"));
    this.SaveForLater = new Button(locator.locator(".ui-dialog-buttonpane button[title='Save For Later']"));
    this.Finalize = new Button(locator.locator(".ui-dialog-buttonpane button[title='Finalize']"));
    this.Print = new Button(locator.locator(".ui-dialog-buttonpane button[title='Print']"));
    this.Cancel = new Button(locator.locator(".ui-dialog-buttonpane button[title='Cancel']"));

    // Labels
    this.Confidence = new LabelField(locator.locator("#forconfidencenew"));
    this.TotalItems = new LabelField(locator.locator("#itmtotalcount"));
  }

 async SelectProductFromSuggestion(productNameOrBarcode: string) {
      // Type barcode or product name
      await this.Product.setText({ value: productNameOrBarcode });
    
      // Wait briefly for suggestion to appear or barcode to trigger
      await this._page.waitForTimeout(800);
    
      const suggestionBox = this._page.locator('#suggesstion-box');
    
      // Try waiting for suggestions — if barcode auto-opens dialog, it may skip
      await suggestionBox.waitFor({ state: 'visible', timeout: 2000 }).catch(() => {});
    
      // Locate product <li> by text (name) or by barcode inside onclick attribute
      const productOption = suggestionBox.locator(
        `.dropreceive li:has-text("${productNameOrBarcode}"), .dropreceive li[onclick*="'${productNameOrBarcode}'"]`
      );
    
      // If visible (manual name search) → click
      if (await productOption.first().isVisible()) {
        await productOption.first().click();
      } else {
        // Barcode case — item auto-selected, no click needed
        console.log(`Barcode ${productNameOrBarcode} auto-triggered item selection.`);
      }
    
      // Wait for item detail dialog to appear
      await this._page
        .locator('[aria-describedby="addnewitemtoreceivedialog"]')
        .waitFor({ state: 'visible', timeout: 5000 });
  }
 
}
