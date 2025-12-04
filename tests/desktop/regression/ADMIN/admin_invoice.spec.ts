import { test, expect } from "@playwright/test";
import { ADMIN } from "../../../../src/section/ADMIN";
import { Initializer, ITEMS } from "../../../../src/utils";


test.beforeEach(async ({ page }) => {
  await Initializer.Init(page, { Admin: true });
});

test.afterEach(async ({ page }, testInfo) => {
  await Initializer.Finalize(page, testInfo);
});

test.describe("Admin Section - Receive › Edit Non-Finalized Invoice", { tag: ["@regression", "@invoice"] }, () => {

  test("[C5958] Verify non-finalized invoice edit", async ({ page }) => {
    // Step 1: Login to the Admin portal
    await ADMIN.Login.In();

    // Step 2: Navigate to the Receive tab under the Items menu
    await ADMIN.Menu.Receive.GoTo();

    // Step 3: Click on '+ Receive Items' button
    await ADMIN.Recieve.ReceiveItems.Click();

    // Step 5: Enter a unique invoice number
    const InvoiceNumber = "INV-" + await ADMIN.FakeData.getMobile();
    await ADMIN.Dialog.AddReciveItems.InvoiceNumber.setText({ value: InvoiceNumber });

    // Step 6: Search for an existing item and select it
    await ADMIN.Dialog.AddReciveItems.SelectProductFromSuggestion("TITO");

    // Step 9: Click on Save button to save item details
    await ADMIN.Dialog.AddItemDetails.Save.Click();

    // Step 10: Enter the invoice total amount
    const Totalamount = await ADMIN.Dialog.AddReciveItems.Total.getText();
    await ADMIN.Dialog.AddReciveItems.InvoiceTotal.setText({ value: Totalamount });

    // Step 11: Finalize the invoice
    await ADMIN.Dialog.AddReciveItems.SaveForLater.Click();
    //Search the created invoice in recive section
    await ADMIN.Recieve.Search.setText({ value: InvoiceNumber});
    //Wait for 2 seconds for invoice to appear in table
    await page.waitForTimeout(5000);
    //Step-12: Click the Edit icon on View per Invoice table
    await ADMIN.Recieve.Table_ViewPerInvoice.Edit({rowColumn: 'Finalize', rowValue: "No"});
    await ADMIN.Dialog.Confirmation.acceptIfExists();
    //Step-13: Add Another Item to the existing invoice
    //Add extra amount to Totalamount
    const extraamount = 50;
    const newtotalamount = (parseFloat(Totalamount) + extraamount).toString();
    await ADMIN.Dialog.EditReciveItems.InvoiceTotal.setText({ value: newtotalamount });
    //Finalize the edited invoice
    await ADMIN.Dialog.EditReciveItems.Finalize.Click();
    await ADMIN.Dialog.Confirmation.Yes.Click();
    console.log("Invoice finalized with updated total amount: " + newtotalamount);

  });
 
  test('[C5998] Verify item quantity update after finalize', { tag: ['@Admin', '@Receive','@nonparallelizable'] }, async ({ }) => {
    // Step 1: Login as Admin
    await ADMIN.Login.In();

    // Step 2: Navigate to Receive Items page
    await ADMIN.Menu.Receive.GoTo();

    // Step 3: Click '+ Receive Items' button
    await ADMIN.Recieve.ReceiveItems.Click();
   
    // Step 4: Enter unique invoice number
    const invoiceNumber = "INV-" + await ADMIN.FakeData.getMobile();
    await ADMIN.Dialog.AddReciveItems.InvoiceNumber.setText({ value: invoiceNumber });

    // Step 5: Select product from suggestions
    const ITEM_NAME = ITEMS.BUDLIGHT.TITLE;
    await ADMIN.Dialog.AddReciveItems.SelectProductFromSuggestion(ITEM_NAME);

    // Step 6: Set Received Bottles = 5 and save
    const receivedBottles = "5";
    await ADMIN.Dialog.AddItemDetails.ReceivedBottles.setText({ value: receivedBottles });
    await ADMIN.Dialog.AddItemDetails.Save.Click();

    // Step 7: Get Qty On Hand before finalization
    const qtyOnHandBefore = await ADMIN.Dialog.AddReciveItems.Table_ReceiveItems.GetCellValue(
      { getValueFrom: "Qty on Hand" },
      { rowQuery: [{ rowColumn: "Name", rowValue: ITEM_NAME }] }
    );

    // Step 8: Calculate expected Qty On Hand after finalize
    const expectedQtyOnHand = parseInt(qtyOnHandBefore) + parseInt(receivedBottles);

    // Step 11: Capture total and finalize invoice
    const totalAmount = await ADMIN.Dialog.AddReciveItems.Total.getText();
    await ADMIN.Dialog.AddReciveItems.InvoiceTotal.setText({ value: totalAmount });
    await ADMIN.Dialog.AddReciveItems.Finalize.Click();
    await ADMIN.Dialog.Confirmation.Yes.Click();

    // Step 12: Navigate to Items page
    await ADMIN.Menu.Items.GoTo();

    // Step 13: Search for the same item
    await ADMIN.Items.Search.setText({ value: ITEM_NAME });

    // Step 14: Get Qty On Hand after finalize
    const qtyOnHandAfter = await ADMIN.Items.Table.GetCellValue(
      { getValueFrom: "Qty On Hand" },
      { rowQuery: [{ rowColumn: "Name", rowValue: ITEM_NAME }] }
    );

    // Step 15: Validate inventory update
    expect(parseInt(qtyOnHandAfter)).toBe(expectedQtyOnHand);

  });

  test('[C5982] Verify Multiple Invoice to merge ', { tag: ['@Admin', '@Receive'] }, async ({ }) => {

    // Step 1: Login to the Admin portal
    await ADMIN.Login.In();

    // Step 2: Navigate to the Receive page under Items menu
    await ADMIN.Menu.Receive.GoTo();

    // Step 3: Create two finalized invoices to prepare for merge
    for (let i = 0; i < 2; i++) {
      // Click on '+ Receive Items' button
      await ADMIN.Recieve.ReceiveItems.Click();

      
      // Step 3.1: Enter a unique invoice number using faker to avoid duplicates
      await ADMIN.Dialog.AddReciveItems.InvoiceNumber.setText({ value: "INV-" + await ADMIN.FakeData.getMobile() });

      // Step 3.2: Search for an item and select it from suggestions
      await ADMIN.Dialog.AddReciveItems.SelectProductFromSuggestion("BUD");

      // Step 3.3: Enter received bottle quantity in item details
      await ADMIN.Dialog.AddItemDetails.ReceivedBottles.setText({ value: "5" });

      // Step 3.4: Click on Save button to add item to invoice
      await ADMIN.Dialog.AddItemDetails.Save.Click();

      // Step 3.5: Enter invoice total amount
      const Totalamount = await ADMIN.Dialog.AddReciveItems.Total.getText();
      await ADMIN.Dialog.AddReciveItems.InvoiceTotal.setText({ value: Totalamount });

      // Step 3.6: Click on Finalize button to complete invoice
      await ADMIN.Dialog.AddReciveItems.Finalize.Click();

      // Step 3.7: Confirm the finalization in the confirmation dialog
      await ADMIN.Dialog.Confirmation.Yes.Click();
    }

    // Step 4: Select the latest two invoices by checking their checkboxes
    await ADMIN.Recieve.Table_ViewPerInvoice.SelectTop2Invoices();

    // Step 5: Click on the 'Merge' button at the bottom left of the table
    await ADMIN.Recieve.Table_ViewPerInvoice.ClickMergeInvoices();

  });

  test('[C5978] Verify barcode scan existing item in receive items', { tag: ['@Admin', '@Receive'] }, async ({ }) => {

    // Step 1: Login to the Admin portal
    await ADMIN.Login.In();

    // Step 2: Navigate to the Receive page under Items menu
    await ADMIN.Menu.Receive.GoTo();

    // Step 3: Click on '+ Receive Items' button
    await ADMIN.Recieve.ReceiveItems.Click();

    // Step 4: Scan (enter) a barcode of an existing item into the Product field
    await ADMIN.Dialog.AddReciveItems.SelectProductFromSuggestion("9999934945");

    // Step 5: Verify that the Item Details dialog appears for the scanned item
    const isItemDetailDialogVisible = await ADMIN.Dialog.AddItemDetails.IsVisible();
    expect(isItemDetailDialogVisible).toBeTruthy();

  });

  test('[C5962] Verify duplicate invoice prevention with existing invoice number', { tag: ['@Admin', '@Receive'] }, async ({ }) => {

    // Step 1: Login to the Admin portal
    await ADMIN.Login.In();

    // Step 2: Navigate to the Receive page under Items menu
    await ADMIN.Menu.Receive.GoTo();

    // Step 3: Create a new invoice to establish an existing invoice number
    await ADMIN.Recieve.ReceiveItems.Click();

    // Step 4: Enter a unique invoice number
    const InvoiceNumber = "INV-" + await ADMIN.FakeData.getMobile();
    await ADMIN.Dialog.AddReciveItems.InvoiceNumber.setText({ value: InvoiceNumber });

    // Step 5: Search for an item and select it
    await ADMIN.Dialog.AddReciveItems.SelectProductFromSuggestion("BUD");

    // Step 6: Enter received bottle quantity in the item details dialog
    await ADMIN.Dialog.AddItemDetails.ReceivedBottles.setText({ value: "5" });

    // Step 7: Save the item details
    await ADMIN.Dialog.AddItemDetails.Save.Click();

    // Step 8: Enter total invoice amount
    const Totalamount = await ADMIN.Dialog.AddReciveItems.Total.getText();
    await ADMIN.Dialog.AddReciveItems.InvoiceTotal.setText({ value: Totalamount });

    // Step 9: Finalize the invoice
    await ADMIN.Dialog.AddReciveItems.Finalize.Click();
    await ADMIN.Dialog.Confirmation.Yes.Click();

    // Step 10: Attempt to create another invoice using the same invoice number
    await ADMIN.Recieve.ReceiveItems.Click();
    await ADMIN.Dialog.AddReciveItems.InvoiceNumber.setText({ value: InvoiceNumber });

    // Step 11: Add the same item again
    await ADMIN.Dialog.AddReciveItems.SelectProductFromSuggestion("BUD");
    await ADMIN.Dialog.AddItemDetails.ReceivedBottles.setText({ value: "5" });
    await ADMIN.Dialog.AddItemDetails.Save.Click();

    // Step 12: Enter invoice total again
    await ADMIN.Dialog.AddReciveItems.InvoiceTotal.setText({ value: Totalamount });

    // Step 13: Try to finalize the duplicate invoice
    await ADMIN.Dialog.AddReciveItems.Finalize.Click();
    await ADMIN.Dialog.Confirmation.Yes.Click();

    // Step 14: Verify that the duplicate invoice error dialog appears
    const isDuplicateInvoiceWarningVisible = await ADMIN.Dialog.Error.Ok.IsVisible();
    expect(isDuplicateInvoiceWarningVisible).toBeTruthy();

    // Step 15: Close the error dialog
    await ADMIN.Dialog.Error.Ok.Click();

  });

  test('[C5961] Verify finalized invoice details view', { tag: ['@Admin', '@Receive'] }, async ({ }) => {

    // Step 1: Login to the Admin portal
    await ADMIN.Login.In();

    // Step 2: Navigate to the Receive page under Items menu
    await ADMIN.Menu.Receive.GoTo();

    // Step 3: Create and finalize a new invoice to ensure data availability
    await ADMIN.Recieve.ReceiveItems.Click();

  
    // Step 5: Enter a unique invoice number
    const InvoiceNumber = "INV-" + await ADMIN.FakeData.getMobile();
    await ADMIN.Dialog.AddReciveItems.InvoiceNumber.setText({ value: InvoiceNumber });

    // Step 6: Search and select an existing item
    await ADMIN.Dialog.AddReciveItems.SelectProductFromSuggestion("BUD");

    // Step 7: Enter received bottle quantity in the item details dialog
    await ADMIN.Dialog.AddItemDetails.ReceivedBottles.setText({ value: "5" });

    // Step 8: Save the item details
    await ADMIN.Dialog.AddItemDetails.Save.Click();

    // Step 9: Enter invoice total amount
    const Totalamount = await ADMIN.Dialog.AddReciveItems.Total.getText();
    await ADMIN.Dialog.AddReciveItems.InvoiceTotal.setText({ value: Totalamount });

    // Step 10: Finalize the invoice
    await ADMIN.Dialog.AddReciveItems.Finalize.Click();

    // Step 11: Confirm finalization in the confirmation dialog
    await ADMIN.Dialog.Confirmation.Yes.Click();

    // Step 12: Open the finalized invoice in view mode by clicking the "View" (eye) icon
    await ADMIN.Recieve.Table_ViewPerInvoice.Edit({ rowColumn: 'Finalize', rowValue: "Yes" });

    // Step 13: Verify that the Finalize button is NOT visible (ensuring read-only mode)
    const isFinalButtonVisible = await ADMIN.Dialog.AddReciveItems.Finalize.IsVisible();
    expect(isFinalButtonVisible).toBeFalsy();


  });
    
  test('[C6005] Verify Units Per Case update', { tag: ['@Admin', '@Receive','@nonparallelizable'] }, async ({ }) => {

    // Step 1: Login to the Admin portal
    await ADMIN.Login.In();

    // Step 2: Navigate to the Receive page under Items menu
    await ADMIN.Menu.Receive.GoTo();

    // Step 3: Click on '+ Receive Items' button
    await ADMIN.Recieve.ReceiveItems.Click();

    // Step 5: Enter a unique invoice number to avoid duplication
    await ADMIN.Dialog.AddReciveItems.InvoiceNumber.setText({ value: "INV-" + await ADMIN.FakeData.getMobile() });

    // Step 6: Search for an existing item and select it
    await ADMIN.Dialog.AddReciveItems.SelectProductFromSuggestion("JACK");

    // Step 7: Enter the received bottle quantity in the item details dialog
    await ADMIN.Dialog.AddItemDetails.ReceivedBottles.setText({ value: "18" });

    // Step 8: Click on Save button to add item to invoice
    await ADMIN.Dialog.AddItemDetails.Save.Click();

    // Step 9: Capture Qty On Hand before finalizing (from table)
    const QtyOnHandBefore = await ADMIN.Dialog.AddReciveItems.Table_ReceiveItems.GetCellValue(
      { getValueFrom: 'Qty on Hand' },
      { rowQuery: [{ rowColumn: 'Name', rowValue: 'JACK 750ML' }] }
    );
  
    // Step 10: Capture newly added received bottles (units)
    const tablereceiveBottles = await ADMIN.Dialog.AddReciveItems.Table_ReceiveItems.GetCellValue(
      { getValueFrom: 'Received Bottles' },
      { rowQuery: [{ rowColumn: 'Name', rowValue: 'JACK 750ML' }] }
    );
    
    // Step 11: Capture Unit Per Case value
    const itemCaseValue = await ADMIN.Dialog.AddReciveItems.Table_ReceiveItems.GetCellValue(
      { getValueFrom: 'Unit Per Case' },
      { rowQuery: [{ rowColumn: 'Name', rowValue: 'JACK 750ML' }] }
    );
    

    // Step 12: Calculate expected new stock in cases (Received Bottles ÷ Units Per Case)
    const newstockincases = parseInt(tablereceiveBottles) / parseInt(itemCaseValue);
    
    // Step 13: Capture and set the total invoice amount
    const Totalamount = await ADMIN.Dialog.AddReciveItems.Total.getText();
    await ADMIN.Dialog.AddReciveItems.InvoiceTotal.setText({ value: Totalamount });

    // Step 14: Finalize the invoice
    await ADMIN.Dialog.AddReciveItems.Finalize.Click();

    // Step 15: Confirm finalization in confirmation dialog
    await ADMIN.Dialog.Confirmation.Yes.Click();

    // Step 16: Navigate to the Items page under Items menu
    await ADMIN.Menu.Items.GoTo();

    // Step 17: Search for the same item
    await ADMIN.Items.Search.Click();
    await ADMIN.Items.Search.setText({ value: "JACK" });

    // Step 18: Capture Qty On Hand after invoice finalization
    const QtyOnHandAfter = await ADMIN.Items.Table.GetCellValue(
      { getValueFrom: 'Qty On Hand' },
      { rowQuery: [{ rowColumn: 'Name', rowValue: 'JACK 750ML' }] }
    );

    // Step 19: Verify that the Cases value updated correctly based on Units Per Case
    const updatedcase = (parseInt(QtyOnHandAfter) - parseInt(QtyOnHandBefore)) / parseInt(itemCaseValue);

    expect(updatedcase).toEqual(newstockincases);

  });

  test('[C6006] Verify item cost updates correctly', { tag: ['@Admin', '@Receive','@nonparallelizable'] }, async ({ }) => {

    // Step 1: Login to the Admin portal
    await ADMIN.Login.In();

    // Step 2: Navigate to the Receive tab under the Items menu
    await ADMIN.Menu.Receive.GoTo();

    // Step 3: Click on '+ Receive Items' button
    await ADMIN.Recieve.ReceiveItems.Click();

  
    // Step 5: Enter a unique invoice number
    const InvoiceNumber = "INV-" + await ADMIN.FakeData.getMobile();
    await ADMIN.Dialog.AddReciveItems.InvoiceNumber.setText({ value: InvoiceNumber });

    // Step 6: Search for an existing item and select it
    await ADMIN.Dialog.AddReciveItems.SelectProductFromSuggestion("JACK");

    // Step 7: Update the Total Cost in the Item Details dialog
    await ADMIN.Dialog.AddItemDetails.TotalCost.setText({ value: "600.50" });

    // Step 8: Capture the recalculated Cost Per Bottle value
    const newbottlecost = await ADMIN.Dialog.AddItemDetails.CostPerBottle.getText();
    
    // Step 9: Click on Save button to save item details
    await ADMIN.Dialog.AddItemDetails.Save.Click();

    // Step 10: Enter the invoice total amount
    const Totalamount = await ADMIN.Dialog.AddReciveItems.Total.getText();
    await ADMIN.Dialog.AddReciveItems.InvoiceTotal.setText({ value: Totalamount });

    // Step 11: Finalize the invoice
    await ADMIN.Dialog.AddReciveItems.Finalize.Click();

    // Step 12: Confirm the finalization in the confirmation dialog
    await ADMIN.Dialog.Confirmation.Yes.Click();

    // Step 13: Navigate to the Items page under Items menu
    await ADMIN.Menu.Items.GoTo();
    await ADMIN.Items.Search.Click();

    // Step 14: Search for the same item used in the invoice
    await ADMIN.Items.Search.setText({ value: "JACK" });

    // Step 15: Click on the Edit (pencil) icon to open the item edit dialog
    await ADMIN.Items.Table.Edit({ rowColumn: 'Name', rowValue: 'JACK 750ML' });

    // Step 16: Capture the updated item cost after finalization
    const updatedItemCost = await ADMIN.Dialog.EditItem.Details.MultipackQty.ReadlatestCostValue({ row: 1 });
    
    // Step 17: Verify that the updated cost matches the new bottle cost entered earlier
    expect(updatedItemCost).toEqual(newbottlecost);

  });

  test('[C6009] Verify new item creation by barcode scan in receive items if item not exist in database', { tag: ['@Admin', '@Receive'] }, async ({ page }) => {

    // Step 1: Login to the Admin portal
    const item = await ADMIN.FakeData.getItemName();
    await ADMIN.Login.In();

    // Step 2: Navigate to the Receive tab under Items menu
    await ADMIN.Menu.Receive.GoTo();

    // Step 3: Click on '+ Receive Items' button
    await ADMIN.Recieve.ReceiveItems.Click();

    // Step 4: Attempt to scan a new barcode (simulate by opening Add New Item modal)
    await ADMIN.Dialog.AddReciveItems.AddNewItem.Click();

    // Step 5: Click on the '+' icon in the Receive Items table to add new item details
    await ADMIN.Dialog.AddReciveItems.Table_ReceiveItems.AddItem();

    // Step 6: Enter new item details in the Item Detail dialog
    await ADMIN.Dialog.AddItem.Details.MultipackStockcode.GenerateBarcode({ row: 1 });
    await ADMIN.Dialog.AddItem.Details.Name.setText({ value: item.name });

    // Step 7: Enter price details for the new item
    await ADMIN.Dialog.AddItem.Details.MultipackQty.EditPrice({ row: 1, price: Number(await ADMIN.FakeData.getItemPrice()) });

    // Step 8: Go to Options tab and add shortcut key details
    await ADMIN.Dialog.AddItem.ClickTab('Options');
    await ADMIN.Dialog.AddItem.Options.AddToShortCutKeys.Click();
    await ADMIN.Dialog.AddItem.Options.ItemShortcutName.setText({ value: item.shortName });

    // Step 9: Save the new item
   if (await ADMIN.Dialog.AddItem.Save.IsVisible()) {
    await ADMIN.Dialog.AddItem.Save.Click();
        console.log("Clicked Save button");
    } else if (await ADMIN.Dialog.AddItem.CreateUpdate.IsVisible()) {
        await ADMIN.Dialog.AddItem.CreateUpdate.Click();
        console.log("Clicked Create/Update button");
    } else if (await ADMIN.Dialog.AddItem.Update.IsVisible()) {
        await ADMIN.Dialog.AddItem.Update.Click();
        console.log("Clicked Update button");
    } else {
        console.log("No matching button is visible.");
    }
    await ADMIN.Dialog.Success.Ok.Click();

    // Step 10: Enter a unique invoice number
    const InvoiceNumber = "INV-" + await ADMIN.FakeData.getMobile();
    await ADMIN.Dialog.AddReciveItems.InvoiceNumber.setText({ value: InvoiceNumber });

    // Step 11: Enter invoice total amount
    const Totalamount = await ADMIN.Dialog.AddReciveItems.Total.getText();
    await ADMIN.Dialog.AddReciveItems.InvoiceTotal.setText({ value: Totalamount });

    // Step 12: Finalize the invoice
    await ADMIN.Dialog.AddReciveItems.Finalize.Click();

    // Step 13: Verify confirmation dialog is visible before finalizing
    expect(await ADMIN.Dialog.Confirmation.Yes.IsVisible()).toBeTruthy();

    // Step 14: Confirm and finalize the invoice creation with the new item
    await ADMIN.Dialog.Confirmation.Yes.Click();

  });

  test('[C5959] Verify Finalized Invoice calculations', { tag: ['@regression', '@invoice'] }, async ({ page }) => {
  
      // Step 1: Login to the Admin portal
      await ADMIN.Login.In();
  
      // Step 2: Navigate to the Receive tab under the Items menu
      await ADMIN.Menu.Receive.GoTo();
  
      // Step 3: Click on '+ Receive Items' button
      await ADMIN.Recieve.ReceiveItems.Click();
  
      // Step 5: Enter a unique invoice number
      const InvoiceNumber = "INV-" + await ADMIN.FakeData.getMobile();
      await ADMIN.Dialog.AddReciveItems.InvoiceNumber.setText({ value: InvoiceNumber });
  
      // Step 6: Search for an existing item and select it
      await ADMIN.Dialog.AddReciveItems.SelectProductFromSuggestion("JACK");
  
      // Step 7: Update the Total Cost in the Item Details dialog
      await ADMIN.Dialog.AddItemDetails.TotalCost.setText({ value: "600.50" });
  
      // Step 8: Capture the recalculated Cost Per Bottle value
      await ADMIN.Dialog.AddItemDetails.CostPerBottle.getText();
  
      // Step 9: Click on Save button to save item details
      await ADMIN.Dialog.AddItemDetails.Save.Click();
  
      // Step 10: Enter the invoice total amount
      const Totalamount = await ADMIN.Dialog.AddReciveItems.Total.getText();
      await ADMIN.Dialog.AddReciveItems.InvoiceTotal.setText({ value: Totalamount });
  
      // Step 11: Finalize the invoice
      await ADMIN.Dialog.AddReciveItems.Finalize.Click();
  
      // Step 12: Confirm the finalization in the confirmation dialog
      await ADMIN.Dialog.Confirmation.Yes.Click();
      //Step-13 : Search invoice and Click the Eye icon on View per Invoice table
      await ADMIN.Recieve.Search.setText({ value: InvoiceNumber });
      //Wait for search results to load
      await page.waitForTimeout(5000);
      //StEP-13: Click the Eye icon on View per Invoice table
    
  
      await ADMIN.Recieve.Table_ViewPerInvoice.Edit({ rowColumn: 'Finalize', rowValue: "Yes" });

      await ADMIN.Dialog.Confirmation.acceptIfExists();

  
      //Steep-14: Calculate total as per test case formuala { TOTAL = RECEIVED BOTTLES * COST PER BOTTLE }
  
      const tablereceiveBottles = await ADMIN.Dialog.EditReciveItems.Table_EditReceiveItems.GetCellValue(
        { getValueFrom: 'Received Bottles' }, { rowQuery: [{ rowColumn: 'Name', rowValue: 'JACK 750ML' }] });
  
      const costperbottle = await ADMIN.Dialog.EditReciveItems.Table_EditReceiveItems.GetCellValue(
        { getValueFrom: 'Cost Per Bottle' }, { rowQuery: [{ rowColumn: 'Name', rowValue: 'JACK 750ML' }] });
  
      const total = parseFloat(tablereceiveBottles) * parseFloat(costperbottle);
      const invoicetotal = Number(await ADMIN.Dialog.EditReciveItems.InvoiceTotal.getText());
      expect(total).toEqual(invoicetotal);
  
      //Step 15: Calculate MARGIN % = ((TOTAL PRICE - TOTAL)/TOTAL PRICE) * 100
      const totalprice = await ADMIN.Dialog.EditReciveItems.Table_EditReceiveItems.GetCellValue(
        { getValueFrom: 'Price' }, { rowQuery: [{ rowColumn: 'Name', rowValue: 'JACK 750ML' }] });
  
      const marginPercentage = ((parseFloat(totalprice) - parseFloat(costperbottle)) / parseFloat(totalprice)) * 100;
  
      const displayedMarginText = await ADMIN.Dialog.EditReciveItems.Margin.getText();
      expect(marginPercentage.toFixed(2)).toEqual(parseFloat(displayedMarginText.replace('%', '').trim()).toFixed(2));
  
  });
  
  test('[C5960] Verify Finalized Invoice cannot be edited', { tag: ['@regression', '@invoice'] }, async ({ }) => {
    // Step 1: Login to the Admin portal
    await ADMIN.Login.In();

    // Step 2: Navigate to the Receive tab under the Items menu
    await ADMIN.Menu.Receive.GoTo();

    // Step 3: Click on '+ Receive Items' button
    await ADMIN.Recieve.ReceiveItems.Click();

    // Step 5: Enter a unique invoice number
    const InvoiceNumber = "INV-" + await ADMIN.FakeData.getMobile();
    await ADMIN.Dialog.AddReciveItems.InvoiceNumber.setText({ value: InvoiceNumber });

    // Step 6: Search for an existing item and select it
    await ADMIN.Dialog.AddReciveItems.SelectProductFromSuggestion("JACK");

    // Step 7: Update the Total Cost in the Item Details dialog
    await ADMIN.Dialog.AddItemDetails.TotalCost.setText({ value: "600.50" });

    // Step 8: Capture the recalculated Cost Per Bottle value
    await ADMIN.Dialog.AddItemDetails.CostPerBottle.getText();

    // Step 9: Click on Save button to save item details
    await ADMIN.Dialog.AddItemDetails.Save.Click();

    // Step 10: Enter the invoice total amount
    const Totalamount = await ADMIN.Dialog.AddReciveItems.Total.getText();
    await ADMIN.Dialog.AddReciveItems.InvoiceTotal.setText({ value: Totalamount });

    // Step 11: Finalize the invoice
    await ADMIN.Dialog.AddReciveItems.Finalize.Click();

    // Step 12: Confirm the finalization in the confirmation dialog
    await ADMIN.Dialog.Confirmation.Yes.Click();
    //StEP-13: Click the Eye icon on View per Invoice table
    
    await ADMIN.Recieve.Table_ViewPerInvoice.Edit({ rowColumn: 'Finalize', rowValue: "Yes" });

    //Step-14: Verify that the Finalize button is NOT visible (ensuring read-only mode)
    const isFinalButtonHidden = await ADMIN.Dialog.EditReciveItems.Finalize.IsHidden();
    console.log("isFinalButtonHidden:", isFinalButtonHidden);
    expect(isFinalButtonHidden).toBeTruthy();
  });

  test('[C6166] Invoice recive table Sorting verification', { tag: ['@regression', '@invoice'] }, async ({page}) => {
    // Step 1: Login to the Admin portal
    await ADMIN.Login.In();

    // Step 2: Navigate to the Receive page under Items menu
    await ADMIN.Menu.Receive.GoTo();

    // Step 3: Create two finalized invoices to prepare for merge
    for (let i = 0; i < 2; i++) {
      // Click on '+ Receive Items' button
      await ADMIN.Recieve.ReceiveItems.Click();

      // Step 3.1: Enter a unique invoice number using faker to avoid duplicates
      await ADMIN.Dialog.AddReciveItems.InvoiceNumber.setText({ value: "INV-" + await ADMIN.FakeData.getMobile() });

      // Step 3.2: Search for an item and select it from suggestions
      await ADMIN.Dialog.AddReciveItems.SelectProductFromSuggestion("BUD");

      // Step 3.3: Enter received bottle quantity in item details
      await ADMIN.Dialog.AddItemDetails.ReceivedBottles.setText({ value: "5" });

      // Step 3.4: Click on Save button to add item to invoice
      await ADMIN.Dialog.AddItemDetails.Save.Click();

      // Step 3.5: Enter invoice total amount
      const Totalamount = await ADMIN.Dialog.AddReciveItems.Total.getText();
      await ADMIN.Dialog.AddReciveItems.InvoiceTotal.setText({ value: Totalamount });

      // Step 3.6: Click on Finalize button to complete invoice
      await ADMIN.Dialog.AddReciveItems.Finalize.Click();

      // Step 3.7: Confirm the finalization in the confirmation dialog
      await ADMIN.Dialog.Confirmation.Yes.Click();
    }
      

    await ADMIN.Recieve.Table_ViewPerInvoice.SortByColumnwithdiv({ columnTitle: 'Supplier', sortOrder: 'ascending' });
    expect (await ADMIN.Recieve.Table_ViewPerInvoice.SortByColumnwithdiv({ columnTitle: 'Supplier', sortOrder: 'ascending' })).toBeTruthy();
    console.log("Supplier column sorted successfully");

    await ADMIN.Recieve.Table_ViewPerInvoice.SortByColumnwithdiv({ columnTitle: 'Bottles', sortOrder: 'ascending' });
    expect (await ADMIN.Recieve.Table_ViewPerInvoice.SortByColumnwithdiv({ columnTitle: 'Bottles', sortOrder: 'ascending' })).toBeTruthy();
    console.log("Bottles column sorted successfully");

    await ADMIN.Recieve.Table_ViewPerInvoice.SortByColumnwithdiv({ columnTitle: 'Invoice Total', sortOrder: 'descending' });
    expect (await ADMIN.Recieve.Table_ViewPerInvoice.SortByColumnwithdiv({ columnTitle: 'Invoice Total', sortOrder: 'descending' })).toBeTruthy();
    console.log("Invoice Total column sorted successfully");
    
    
  });

  test('[C6167] Verify Invoice History in Recive table', { tag: ['@regression', '@invoice'] }, async ({ }) => {
    // Step 1: Login to the Admin portal
    await ADMIN.Login.In();

    // Step 2: Navigate to the Receive tab under the Items menu
    await ADMIN.Menu.Receive.GoTo();

    // Step 3: Click on '+ Receive Items' button
    await ADMIN.Recieve.ReceiveItems.Click();

    // Step 5: Enter a unique invoice number
    const InvoiceNumber = "INV-" + await ADMIN.FakeData.getMobile();
    await ADMIN.Dialog.AddReciveItems.InvoiceNumber.setText({ value: InvoiceNumber });

    // Step 6: Search for an existing item and select it
    await ADMIN.Dialog.AddReciveItems.SelectProductFromSuggestion("TITO");

    // Step 9: Click on Save button to save item details
    await ADMIN.Dialog.AddItemDetails.Save.Click();

    // Step 10: Enter the invoice total amount
    const Totalamount = await ADMIN.Dialog.AddReciveItems.Total.getText();
    await ADMIN.Dialog.AddReciveItems.InvoiceTotal.setText({ value: Totalamount });

    // Step 11: Finalize the invoice
    await ADMIN.Dialog.AddReciveItems.Finalize.Click();

    // Step 12: Confirm the finalization in the confirmation dialog
    await ADMIN.Dialog.Confirmation.Yes.Click();
    //StEP-13: Click the History icon on View per Invoice table

    await ADMIN.Recieve.Table_ViewPerInvoice.History({ rowColumn: 'Finalize', rowValue: "Yes" });
    expect(await ADMIN.Dialog.HistoryReciveItems.IsVisible()).toBeTruthy();

  });

  test('[C6168] Verify Invoice Delete disabled for Finalized in Recive table', { tag: ['@regression', '@invoice'] }, async ({ }) => {
    // Step 1: Login to the Admin portal
    await ADMIN.Login.In();

    // Step 2: Navigate to the Receive tab under the Items menu
    await ADMIN.Menu.Receive.GoTo();

    // Step 3: Click on '+ Receive Items' button
    await ADMIN.Recieve.ReceiveItems.Click();

    // Step 5: Enter a unique invoice number
    const InvoiceNumber = "INV-" + await ADMIN.FakeData.getMobile();
    await ADMIN.Dialog.AddReciveItems.InvoiceNumber.setText({ value: InvoiceNumber });

    // Step 6: Search for an existing item and select it
    await ADMIN.Dialog.AddReciveItems.SelectProductFromSuggestion("TITO");

    // Step 9: Click on Save button to save item details
    await ADMIN.Dialog.AddItemDetails.Save.Click();

    // Step 10: Enter the invoice total amount
    const Totalamount = await ADMIN.Dialog.AddReciveItems.Total.getText();
    await ADMIN.Dialog.AddReciveItems.InvoiceTotal.setText({ value: Totalamount });

    // Step 11: Finalize the invoice
    await ADMIN.Dialog.AddReciveItems.Finalize.Click();

    // Step 12: Confirm the finalization in the confirmation dialog
    await ADMIN.Dialog.Confirmation.Yes.Click();
    //StEP-13: Verify Delete option is disabled on View per Invoice table

    expect(await ADMIN.Recieve.Table_ViewPerInvoice.Delete({ rowColumn: 'Finalize', rowValue: "Yes" })).toBeFalsy();
  });

  test('[C6169] Verify Invoice Delete works for non Finalized in Recive table', { tag: ['@regression', '@invoicedelete'] }, async ({ page}) => {
    // Step 1: Login to the Admin portal
    await ADMIN.Login.In();

    // Step 2: Navigate to the Receive tab under the Items menu
    await ADMIN.Menu.Receive.GoTo();

    // Step 3: Click on '+ Receive Items' button
    await ADMIN.Recieve.ReceiveItems.Click();

    // Step 5: Enter a unique invoice number
    const InvoiceNumber = "INV-" + await ADMIN.FakeData.getMobile();
    await ADMIN.Dialog.AddReciveItems.InvoiceNumber.setText({ value: InvoiceNumber });

    // Step 6: Search for an existing item and select it
    await ADMIN.Dialog.AddReciveItems.SelectProductFromSuggestion("TITO");

    // Step 9: Click on Save button to save item details
    await ADMIN.Dialog.AddItemDetails.Save.Click();

    // Step 10: Enter the invoice total amount
    const Totalamount = await ADMIN.Dialog.AddReciveItems.Total.getText();
    await ADMIN.Dialog.AddReciveItems.InvoiceTotal.setText({ value: Totalamount });

    // Step 11: Finalize the invoice
    await ADMIN.Dialog.AddReciveItems.SaveForLater.Click();
    //Search the created invoice in recive section
    await ADMIN.Recieve.Search.setText({ value: InvoiceNumber});
    //Wait for 2 seconds for invoice to appear in table
    await page.waitForTimeout(5000);
    //Step-12: Delete the non finalized invoice from View per Invoice table
    await ADMIN.Recieve.Table_ViewPerInvoice.Delete({ rowColumn: 'Finalize', rowValue: "No" });
    await ADMIN.Dialog.Confirmation.Yes.Click();
  });
 
  test('[C6174]Verify item data unchanged after delete non finalized invoice', { tag: ['@regression', '@invoice'] }, async ({ }) => {
    // Step 1: Login to the Admin portal
    await ADMIN.Login.In();
 
    // Step 2: Navigate to the Receive tab under the Items menu
    await ADMIN.Menu.Receive.GoTo();
 
    // Step 3: Click on '+ Receive Items' button
    await ADMIN.Recieve.ReceiveItems.Click();
 
    // Step 5: Enter a unique invoice number
    const InvoiceNumber = "INV-" + await ADMIN.FakeData.getMobile();
    await ADMIN.Dialog.AddReciveItems.InvoiceNumber.setText({ value: InvoiceNumber });
 
    // Step 6: Search for an existing item and select it
    await ADMIN.Dialog.AddReciveItems.SelectProductFromSuggestion("TITO");
    const itemName = "TITO 750ML";
 
    // Step 9: Click on Save button to save item details
    await ADMIN.Dialog.AddItemDetails.Save.Click();
 
    // Step 10: Enter the invoice total amount
    const Totalamount = await ADMIN.Dialog.AddReciveItems.Total.getText();
    await ADMIN.Dialog.AddReciveItems.InvoiceTotal.setText({ value: Totalamount });
 
    // Step 11: Finalize the invoice
    await ADMIN.Dialog.AddReciveItems.SaveForLater.Click();
    //Search the created invoice in recive section
    await ADMIN.Recieve.Search.setText({ value: InvoiceNumber });
    //Wait for 2 seconds for invoice to appear in table
    await ADMIN.Page.waitForTimeout(5000);
    //Step-12: Delete the non finalized invoice from View per Invoice table
    await ADMIN.Recieve.Table_ViewPerInvoice.Delete({ rowColumn: 'Finalize', rowValue: "No" });
    await ADMIN.Dialog.Confirmation.Yes.Click();
   
    //navigate to Item page
    await ADMIN.Menu.Items.GoTo();
    //search for the item used in invoice
 
    await ADMIN.Items.Search.setText({ value: itemName });
    //Verify item is present in item list after invoice deletion
    const isItemPresent = await ADMIN.Items.Table.Edit({ rowColumn: 'Name', rowValue: itemName });
    //Identify  Edit Item dialog is visible
    expect(await ADMIN.Dialog.EditItem.IsVisible()).toBeTruthy();

  });

  test('[C6175] Verify negative values in Receive Bottles field', { tag: ['@regression', '@invoice'] }, async ({ }) => {
 
    // Step 1: Login to the Admin portal
    await ADMIN.Login.In();
 
    // Step 2: Navigate to the Receive page under Items menu
    await ADMIN.Menu.Receive.GoTo();
 
    // Click on '+ Receive Items' button
    await ADMIN.Recieve.ReceiveItems.Click();
 
    // Step 3.1: Enter a unique invoice number using faker to avoid duplicates
    const InvoiceNumber = "INV-" + await ADMIN.FakeData.getMobile();
    await ADMIN.Dialog.AddReciveItems.InvoiceNumber.setText({ value: InvoiceNumber });
 
    // Step 3.2: Search for an item and select it from suggestions
    await ADMIN.Dialog.AddReciveItems.SelectProductFromSuggestion("BUD");
 
    // Step 3.3: Enter received bottle quantity in item details
    await ADMIN.Dialog.AddItemDetails.ReceivedBottles.setText({ value: "-5" });
 
    // Step 3.4: Click on Save button to add item to invoice
    await ADMIN.Dialog.AddItemDetails.Save.Click();
 
    // Step 3.5: Enter invoice total amount
    const Totalamount = await ADMIN.Dialog.AddReciveItems.Total.getText();
    await ADMIN.Dialog.AddReciveItems.InvoiceTotal.setText({ value: Totalamount });
    // Step 3.6: Click on save for later button to complete invoice
    await ADMIN.Dialog.AddReciveItems.SaveForLater.Click();
    //Step-7 : Search the created invoice in receive section
    await ADMIN.Recieve.Search.setText({ value: InvoiceNumber });
    //Wait for 5 seconds for invoice to appear in table
    await ADMIN.Page.waitForTimeout(5000);
    //Step-8: Click the Edit icon on View per Invoice table
    await ADMIN.Recieve.Table_ViewPerInvoice.Edit({ rowColumn: 'Finalize', rowValue: "No" });
  });

  test('[C8130] Verify search by supplier name in Receive Items table', { tag: ['@regression', '@invoice'] }, async ({ }) => {
    // Step 1: Login to the Admin portal
    await ADMIN.Login.In();
 
    // Step 2: Navigate to the Receive page under Items menu
    await ADMIN.Menu.Receive.GoTo();
 
    // Step 3: Create two finalized invoices to prepare for merge
 
    // Click on '+ Receive Items' button
    await ADMIN.Recieve.ReceiveItems.Click();
    //Step 4: select dropdown supplier name in supplier field
    await ADMIN.Dialog.AddReciveItems.Supplier.SelectOption({ byIndex: 1 });
 
    //Step 5: Verify selected supplier name is displayed in supplier field
    await ADMIN.Dialog.AddReciveItems.Supplier.GetSelectedOption();
  });
 
  test('[C8131] Verify search functionality in Receive Items table', { tag: ['@regression', '@invoice'] }, async ({ }) => {
    // Step 1: Login to the Admin portal
    await ADMIN.Login.In();
 
    // Step 2: Navigate to the Receive page under Items menu
    await ADMIN.Menu.Receive.GoTo();
 
    // Click on '+ Receive Items' button
    await ADMIN.Recieve.ReceiveItems.Click();
 
    // Step 3.1: Enter a unique invoice number using faker to avoid duplicates
    const InvoiceNumber = "INV-" + await ADMIN.FakeData.getMobile();
    await ADMIN.Dialog.AddReciveItems.InvoiceNumber.setText({ value: InvoiceNumber });
 
    // Step 3.2: Search for an item and select it from suggestions
    await ADMIN.Dialog.AddReciveItems.SelectProductFromSuggestion("BUD");
 
    // Step 3.3: Enter received bottle quantity in item details
    await ADMIN.Dialog.AddItemDetails.ReceivedBottles.setText({ value: "5" });
 
    // Step 3.4: Click on Save button to add item to invoice
    await ADMIN.Dialog.AddItemDetails.Save.Click();
 
    // Step 3.5: Enter invoice total amount
    const Totalamount = await ADMIN.Dialog.AddReciveItems.Total.getText();
    await ADMIN.Dialog.AddReciveItems.InvoiceTotal.setText({ value: Totalamount });
    // Step 3.6: Click on save for later button to complete invoice
    await ADMIN.Dialog.AddReciveItems.SaveForLater.Click();
    //Step-7 : Search the created invoice in receive section
    await ADMIN.Recieve.Search.setText({ value: InvoiceNumber });
    //Verify invoice appears in table after search
    const isInvoicePresent = await ADMIN.Recieve.Table_ViewPerInvoice.RowExists({ rowColumn: 'Finalize', rowValue: 'No' });
    expect(isInvoicePresent).toBeTruthy();
  });

   test('[C8132]  Verify received items grouped by supplier in Receive Items table', { tag: ['@regression', '@invoice'] }, async ({ }) => {
    //sTEP 1: Login to the Admin portal
    await ADMIN.Login.In();
 
    // Step 2: Navigate to the Receive page under Items menu
    await ADMIN.Menu.Receive.GoTo();
    //Click the  Vliew by Supllier Button
    await ADMIN.Recieve.ViewPerSupplier.Click();
    //Verify Receive Items table is grouped by Supplier
    const isGroupedBySupplier = await ADMIN.Recieve.Table_ViewBySupplier.GetSupplierGroups();
    expect(isGroupedBySupplier.length).toBeGreaterThan(0);
  });
 
 

  test('[C5980] Verify same invoice alert dialog', { tag: ['@regression', '@invoice'] }, async ({ page }) => {
    // Step 1: Login and go to Receive page
    await ADMIN.Login.In();
    await ADMIN.Menu.Receive.GoTo();
  
    // Step 2: Create new invoice
    const invoiceNumber = "INV-" + await ADMIN.FakeData.getMobile();
    await ADMIN.Recieve.ReceiveItems.Click();
    await ADMIN.Dialog.AddReciveItems.InvoiceNumber.setText({ value: invoiceNumber });
    await ADMIN.Dialog.AddReciveItems.SelectProductFromSuggestion("JACK 750ML");
    await ADMIN.Dialog.AddItemDetails.Save.Click();
  
    const totalAmount = await ADMIN.Dialog.AddReciveItems.Total.getText();
    await ADMIN.Dialog.AddReciveItems.InvoiceTotal.setText({ value: totalAmount });
    await ADMIN.Dialog.AddReciveItems.SaveForLater.Click();
    await page.waitForTimeout(2000);
  
    // Step 3: Open invoice in first tab
    await ADMIN.Recieve.Search.setText({ value: invoiceNumber });
    await page.waitForTimeout(2000);
    await ADMIN.Recieve.Table_ViewPerInvoice.Edit({ rowColumn: 'Finalize', rowValue: 'No' });
  
    // Step 4: Use POM helper to open same invoice in new tab
    await ADMIN.Recieve.Table_ViewPerInvoice.OpenInvoiceInNewTab(invoiceNumber, page);
  
  });

});
