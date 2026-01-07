import { test, expect } from "@playwright/test";
import { ADMIN } from "../../../../src/section/ADMIN";
import { Initializer, ITEMS } from "../../../../src/utils";


test.beforeEach(async ({ page }) => {
  await Initializer.Init(page, { Admin: true });
});

test.afterEach(async ({ page }, testInfo) => {
  await Initializer.Finalize(page, testInfo);
});
test.describe("Admin Section - Order Invoice ", { tag: ["@regression", "@Admin"] }, () => {

  test('[C8102] Verify Create Order button functionality in Orders page', { tag: ["@regression", "@Order"] }, async ({ }) => {
    //Step: 1 Login to Admin Portal
    await ADMIN.Login.In();
    //Step 2: Navigate to orders page
    await ADMIN.Menu.Order.GoTo();
    //Step 3: Click on Create Order button
    await ADMIN.Order.CreateOrder.Click();
    //Step 4: Verify Create Order dialog is opened
    expect(await ADMIN.Dialog.OrderItems._locator.isVisible()).toBeTruthy();
    

  });

  test('[C8103] Verify Supplier dropdown functionality in Create Order dialog', { tag: ["@regression", "@Order"] }, async ({ }) => {
    //Step: 1 Login to Admin Portal
    await ADMIN.Login.In();
    //Step: 2 Navigate to orders page
    await ADMIN.Menu.Order.GoTo();
    //Step: 3 Click On create order Button
    await ADMIN.Order.CreateOrder.Click();
    //Step: 4 Select the Supplier from the Dropdown
    const Supplierlist = await ADMIN.Dialog.OrderItems.getAllSuppliers();
  });

  test('[C8104]Verify search and select by product name functionality in Create Order dialog', { tag: ["@regression", "@Order"] }, async ({ }) => {
    //Step: 1 Login to Admin panel
    await ADMIN.Login.In();
    //Step 2: navigate to Orders page
    await ADMIN.Menu.Order.GoTo();
    //Step 3 : Click Create order Button
    await ADMIN.Order.CreateOrder.Click();
    //Step 4: Search and Select Product by name
    const productName = await ADMIN.Dialog.OrderItems.orderproductsuggestion("BUD");
    //Step 5: Verify selected product name in the dialog
    expect(await ADMIN.Dialog.OrderItemDetails.readName.getText()).toBe('BUD LIGHT 30PK');
  });

  test('[C8105]Verify Reorder Case box value addition functionality in Create Order dialog', { tag: ["@regression", "@Order"] }, async ({ }) => {
    //Step: 1 Login to Admin
    await ADMIN.Login.In();
    //Step:2 navigate to Order Page
    await ADMIN.Menu.Order.GoTo();
    //Step:3 Click on Create Order Button
    await ADMIN.Order.CreateOrder.Click();
    //Step:4 Search and Select Product by name
    await ADMIN.Dialog.OrderItems.orderproductsuggestion("Jack");
    //Step 5: Add reorderCase value  and Click Save in orderitem details dialog
    await ADMIN.Dialog.OrderItemDetails.ReorderCase.setText({ value: "10" });
    await ADMIN.Dialog.OrderItemDetails.Save.Click();
    //Step 6: Verify total cost  is added to order items dialog
    expect(await ADMIN.Dialog.OrderItems.Total.getText()).not.toBeNull();
  });

  test('[C8107] Verify duplicate item prevention in order', async ({ }) => {
    await ADMIN.Login.In();
    await ADMIN.Menu.Order.GoTo();
    await ADMIN.Order.CreateOrder.Click();

    const result1 = await ADMIN.Dialog.OrderItems.orderproductsuggestion("TITO");
    expect(result1).toBe("new");

    await ADMIN.Dialog.OrderItemDetails.ReorderCase.setText({ value: "10" });
    await ADMIN.Dialog.OrderItemDetails.Save.Click();

    const result2 = await ADMIN.Dialog.OrderItems.orderproductsuggestion("TITO");
    expect(result2).toBe("duplicate");

    expect(await ADMIN.Dialog.Error.GetMessage()).toContain("already added");
    await ADMIN.Dialog.Error.Ok.Click();
  });

  test('[C8106] Verify item can be removed from the Order Items dialog', async () => {
    await ADMIN.Login.In();
    await ADMIN.Menu.Order.GoTo();
    await ADMIN.Order.CreateOrder.Click();

    const itemType = await ADMIN.Dialog.OrderItems.orderproductsuggestion(ITEMS.JACK.TITLE);

    await ADMIN.Dialog.OrderItemDetails.ReorderCase.setText({ value: "10" });
    await ADMIN.Dialog.OrderItemDetails.Save.Click();

    // Remove + confirm deleted
    await ADMIN.Dialog.OrderItems.Table.RemoveExpandedRowItem(ITEMS.JACK.TITLE);

    const deleteitem = await ADMIN.Dialog.OrderItems.Table.RowExists({
      rowColumn: 'Name',
      rowValue: ITEMS.JACK.TITLE
    });

    expect(deleteitem, 'Item row should be removed from the table').toBeFalsy();
  });

  test('[C8108] Verify order item can be saved and new order is created successfully', async ({ }) => {
    await ADMIN.Login.In();
    await ADMIN.Menu.Order.GoTo();
    await ADMIN.Order.CreateOrder.Click();

    const itemType = await ADMIN.Dialog.OrderItems.orderproductsuggestion(ITEMS.JACK.TITLE);
    expect(itemType).toBe("new");

    await ADMIN.Dialog.OrderItemDetails.ReorderCase.setText({ value: "10" });
    await ADMIN.Dialog.OrderItemDetails.Save.Click();
    // Save the full order
    await ADMIN.Dialog.OrderItems.Save.Click();

    // Wait for order table to refresh and confirm a new order row is present
    await ADMIN.Order.Referesh.Click();

    // Get the latest order number (top row) and validate it's populated
    const newOrderNumber = await ADMIN.Order.OrderTable.GetCellValue(
      { getValueFrom: 'Order Number' },
      { rowIndex: 1 }
    );
    
    expect(newOrderNumber, "Order number is not null").not.toBeNull();
    expect(newOrderNumber, "Order number is not empty").not.toBe('');
  });

  test('[C8109] Verify order item cancel Button functionality in Create Order dialog', async ({ }) => {
    //Step: 1 Login to Admin
    await ADMIN.Login.In();
    //Step:2 navigate to Order Page
    await ADMIN.Menu.Order.GoTo();
    //Step:3 Click on Create Order Button
    await ADMIN.Order.CreateOrder.Click();
    //Step 4: Click on Cancel button in Create Order dialog
    await ADMIN.Dialog.OrderItems.Cancel.Click();
    //Step 5: Click on Yes button in confirmation dialog
    await ADMIN.Dialog.Confirmation.Yes.Click();
    //Step 6: Verify Create Order dialog is closed
    expect(await ADMIN.Dialog.OrderItems.IsNotVisible(), "Create Order dialog is not closed").toBeTruthy();
  });

  test('[C8110] Verify order creation and edit with new items and update', { tag: ["@review"] }, async ({ }) => {
    //Step: 1 Login to Admin
    await ADMIN.Login.In();
    //Step:2 navigate to Order Page
    await ADMIN.Menu.Order.GoTo();
    //Step:3 Click on Create Order Button
    await ADMIN.Order.CreateOrder.Click();
    //Step:4 Search and Select Product by name
    await ADMIN.Dialog.OrderItems.orderproductsuggestion("Jack");
    //Step 5: Add reorderCase value  and Click Save in orderitem details dialog
    await ADMIN.Dialog.OrderItemDetails.ReorderCase.setText({ value: "10" });
    await ADMIN.Dialog.OrderItemDetails.Save.Click();
    //Step 6: Save the Order
    await ADMIN.Dialog.OrderItems.Save.Click();
    //Click Edit button for the created order
     const newOrderNumber = await ADMIN.Order.OrderTable.GetCellValue(
      { getValueFrom: 'Order Number' },
      { rowIndex: 1 }
    );
    //Search Ordernumber
    await ADMIN.Order.Search.setText({ value: newOrderNumber});
    await ADMIN.Order.OrderTable.Edit();

    // Step 7: Add another item to the existing order
    await ADMIN.Dialog.EditorderItems.editorderproductsuggestion("Bud");
    await ADMIN.Dialog.OrderItemDetails.ReorderCase.setText({ value: "5" });
    //Click Save button
    await ADMIN.Dialog.OrderItemDetails.Save.Click();
   
    //Step 6: Save the Order
    await ADMIN.Dialog.EditorderItems.Update.Click();
  });

  test('[C8111] Verify Order Deletion in Orderpage', { tag: ["@review"] }, async ({ }) => {
    //Step:1 Login to Admin
    await ADMIN.Login.In();
    //Step:2 Navigate to Order Page
    await ADMIN.Menu.Order.GoTo();
    await ADMIN.Order.CreateOrder.Click();
    //Step:3 Search and Select Product by name
    await ADMIN.Dialog.OrderItems.orderproductsuggestion("Jack");
    //Step 4: Add reorderCase value  and Click Save in orderitem details dialog
    await ADMIN.Dialog.OrderItemDetails.ReorderCase.setText({ value: "10" });
    await ADMIN.Dialog.OrderItemDetails.Save.Click();
    //Step 5: Save the Order
    await ADMIN.Dialog.OrderItems.Save.Click();
    
    //Step:6 Select an Order to delete
    await ADMIN.Order.OrderTable.Delete();
    //Step:7 Click on Yes button in confirmation dialog
    await ADMIN.Dialog.Confirmation.Yes.Click();
    //Step:8 Verify order is deleted successfully
    

  });

  test('[C8118]Verify Generate Order button functionality in Order page', { tag: ["@review"] }, async({ }) => {
    //Step:1 Login to Admin
    await ADMIN.Login.In();
    //Step:2 Navigate to Order Page
    await ADMIN.Menu.Order.GoTo();
    await ADMIN.Order.CreateOrder.Click();
    //Select Supplier from Dropdown
    await ADMIN.Dialog.OrderItems.Supplier.SelectOption({ byIndex: 2 });
    //Click Generate Order button
    await ADMIN.Dialog.OrderItems.GenerateOrder.Click();
    expect(ADMIN.Dialog.OrderItems.Total).not.toBeNull(); //ADD ASSERTION MESSAGE

  });

  test('[C8119]Verify Advance Search button functional in Order page', { tag: ["@review"] }, async({ }) => {
    //Step:1 Login to Admin
    await ADMIN.Login.In();
    //Step:2 Navigate to Order Page
    await ADMIN.Menu.Order.GoTo();
    await ADMIN.Order.CreateOrder.Click();
    //Click Advance Search button
    await ADMIN.Dialog.OrderItems.AdvanceSearch.Click();
    //New Window should appear
    expect(await ADMIN.Dialog.AdvanceSearch.IsVisible());// ADD ASSERTION MESSAGE
   
  });


  test('[C8120] Verif item name matching in Advance Search Dialog', { tag: ["@review"] }, async({ }) =>{ 
    //Step 1 : login the Admin 
    await ADMIN.Login.In();
    await ADMIN.Menu.Order.GoTo();
    await ADMIN.Order.CreateOrder.Click();
    // expect(await ADMIN.Dialog.OrderItems.IsVisible()).toBeTruthy();

    await ADMIN.Dialog.OrderItems.AdvanceSearch.Click();
    // expect(await ADMIN.Dialog.AdvanceSearch.IsVisible()).toBeTruthy();

    await ADMIN.Dialog.OrderAdvanceSearch.ItemName.setText({ value: "BUD LIGHT" });
    await ADMIN.Dialog.OrderAdvanceSearch.Search.Click();

    const itemCellText = await ADMIN.Dialog.OrderItems.Table.GetCellValue(
      { getValueFrom: 'Name' },
      { rowIndex: 1 }
    );
    expect(itemCellText).toContain("BUD LIGHT");
    expect(itemCellText, "Expected item 'BUD LIGHT 30PK' to appear after advanced search").toBeTruthy();
  });


  test('[C8121] Verify Vendor Item Number search', { tag: ['@order'] }, async ({ }) => {
    //Step 1: Login the Admin
    await ADMIN.Login.In();
    //Step 2 : Navigate to Order Page
    await ADMIN.Menu.Order.GoTo();
    await ADMIN.Order.CreateOrder.Click();
    //Step 3: Search Vendor Item in Order Page
    await ADMIN.Dialog.OrderItems.VendorItemnoSuggestion('369258147');
    expect(await ADMIN.Dialog.OrderItemDetails.readName.getText());
    //Click Savein  order Item Details box
    await ADMIN.Dialog.OrderItemDetails.Save.Click();
    const itemCellText = await ADMIN.Dialog.OrderItems.Table.GetCellValue(
      { getValueFrom: 'Name' },
      { rowIndex: 1 }
    );
    expect(itemCellText).toContain("BUD LIGHT");
    expect(itemCellText, "Expected item 'BUD LIGHT 30PK' to appear after advanced search").toBeTruthy();
  });

  test('[C8124]Verify Add Item button in Order Dialog page', { tag: ['@Order'] }, async ({ }) => {
    //Step 1: Login the Admin
    await ADMIN.Login.In();
    //Step 2 : Navigate to Order Page
    await ADMIN.Menu.Order.GoTo();
    await ADMIN.Order.CreateOrder.Click();
    //Step 3  Click Add Button
    await ADMIN.Dialog.OrderItems.AddItem.Click();
    //Step 4: Fill the Item Deatils Stock Code, Name Price
    await ADMIN.Dialog.AddItem.Details.MultipackStockcode.GenerateBarcode({ row: 1 });
    const tmpname = await ADMIN.FakeData.getItemName();
    await ADMIN.Dialog.AddItem.Details.Name.setText({ value: tmpname.name });
    const price = await ADMIN.FakeData.getItemPrice();
    await ADMIN.Dialog.AddItem.Details.MultipackQty.EditPrice({ row: 1, price: Number(await ADMIN.FakeData.getItemPrice()) });
    //Step 4: Click Save Button
    await ADMIN.Dialog.AddItem.Save.Click();
    //Step 5: Verify ItemDetails dilaog appear
    expect(await ADMIN.Dialog.OrderItemDetails.IsVisible).toBeTruthy();
    await ADMIN.Dialog.OrderItemDetails.ReorderCase.setText({ value: '5' });
    await ADMIN.Dialog.OrderItemDetails.Save.Click();
    const itemCellText = await ADMIN.Dialog.OrderItems.Table.GetCellValue(
      { getValueFrom: 'Name' },
      { rowIndex: 1 }
    );
    expect(itemCellText).toContain(tmpname.name);
    expect(itemCellText, "Expected item to appear after Item Cretaed Successfully").toBeTruthy();
  });

  test('[C8125] Verify Save prevention without items in Order Item Dialog', { tag: ['@Order'] }, async ({ }) => {
    //Step 1: Login the Admin
    await ADMIN.Login.In();
    //Step 2 : Navigate to Order Page
    await ADMIN.Menu.Order.GoTo();
    await ADMIN.Order.CreateOrder.Click();
    //Step 3:  Click Save Button
    await ADMIN.Dialog.OrderItems.Save.Click();
    //Step 4: Alert should prompt with Empty Adding Deatils
    await ADMIN.Dialog.Error.GetMessage();
    expect(await ADMIN.Dialog.Error.GetMessage()).toBeTruthy();
  });

  test('[C8126] Verify Bottle/Case toggle button', { tag: ['@order'] }, async ({ }) => {
    //Step 1: Login the Admin
    await ADMIN.Login.In();
    //Step 2 : Navigate to Order Page
    await ADMIN.Menu.Order.GoTo();
    await ADMIN.Order.CreateOrder.Click();
    await ADMIN.Dialog.OrderItems.orderproductsuggestion(ITEMS.JACK.TITLE);
    //Step 4: Add reorderCase value  and Click Save in orderitem details dialog
    await ADMIN.Dialog.OrderItemDetails.ReorderCase.setText({ value: "4" });
    await ADMIN.Dialog.OrderItemDetails.Save.Click();
    await ADMIN.Dialog.OrderItems.ViewBycase.Click();
    const caseb = await ADMIN.Dialog.OrderItems.Table.GetCellValue(
      { getValueFrom: 'Qty OnHand' },
      { rowIndex: 1 });
    
    await ADMIN.Dialog.OrderItems.ViewByBottle.Click();
    const bottlec = await ADMIN.Dialog.OrderItems.Table.GetCellValue(
      { getValueFrom: 'Qty OnHand' },
      { rowIndex: 1 });
    
    expect.soft(caseb).toEqual(bottlec);
  });

  test('[C8127]Verify Item History icon in Order table', { tag: ['@order'] }, async ({ }) => {
    //Step 1: Login the Admin
    await ADMIN.Login.In();
    //Step 2 : Navigate to Order Page
    await ADMIN.Menu.Order.GoTo();
    await ADMIN.Order.CreateOrder.Click();
    await ADMIN.Dialog.OrderItems.orderproductsuggestion(ITEMS.BUDLIGHT.TITLE);
    //Step 4: Add reorderCase value  and Click Save in orderitem details dialog
    await ADMIN.Dialog.OrderItemDetails.ReorderCase.setText({ value: "2" });
    await ADMIN.Dialog.OrderItemDetails.Save.Click();
    //Step 5: Click the Item History icon in Order Table
    await ADMIN.Dialog.OrderItems.Table.ExpandedItemHistory(ITEMS.BUDLIGHT.TITLE);
    //Step 6: Stock Histyr dialog vaidate
    expect(await ADMIN.Dialog.OrderStockHistory.IsVisible).toBeTruthy();
  });

  test('[C8128] Verify Stock History dialog tabs in order Stock History', { tag: ['@Order'] }, async ({ }) => {
        //Step 1: Login the Admin
    await ADMIN.Login.In();
    //Step 2 : Navigate to Order Page
    await ADMIN.Menu.Order.GoTo();
    await ADMIN.Order.CreateOrder.Click();
    await ADMIN.Dialog.OrderItems.orderproductsuggestion(ITEMS.BUDLIGHT.TITLE);
    //Step 4: Add reorderCase value  and Click Save in orderitem details dialog
    await ADMIN.Dialog.OrderItemDetails.ReorderCase.setText({ value: "2" });
    await ADMIN.Dialog.OrderItemDetails.Save.Click();
    //Step 5: Click the Item History icon in Order Table
    await ADMIN.Dialog.OrderItems.Table.ExpandedItemHistory(ITEMS.BUDLIGHT.TITLE);
    //Step 6: Stock Histyr dialog vaidate
    expect(await ADMIN.Dialog.OrderStockHistory.IsVisible).toBeTruthy();
    
    await ADMIN.Dialog.OrderStockHistory.Detail.Click();
    await ADMIN.Dialog.OrderStockHistory.ExpectTabActive("historydetail");

    await ADMIN.Dialog.OrderStockHistory.Stats.Click();
    await ADMIN.Dialog.OrderStockHistory.ExpectTabActive("historystats");

    await ADMIN.Dialog.OrderStockHistory.Purchase.Click();
    await ADMIN.Dialog.OrderStockHistory.ExpectTabActive("purchasedetail");

    await ADMIN.Dialog.OrderStockHistory.ItemSales.Click();
    await ADMIN.Dialog.OrderStockHistory.ExpectTabActive("itemssalesdetail");
  });

  test('[C8129]Verify reorder case value edit in Order table',{tag:['@Orders']},async({})=>{
    //Step 1: Login the Admin
    await ADMIN.Login.In();
    //Step 2 : Navigate to Order Page
    await ADMIN.Menu.Order.GoTo();
    await ADMIN.Order.CreateOrder.Click();
    await ADMIN.Dialog.OrderItems.orderproductsuggestion(ITEMS.JACK.TITLE);
    //Step 4: Add reorderCase value  and Click Save in orderitem details dialog
    await ADMIN.Dialog.OrderItemDetails.ReorderCase.setText({ value: "2" });
    await ADMIN.Dialog.OrderItemDetails.Save.Click();
    //Step 5: Total value before edit the reorder value
    const prevtotal=await ADMIN.Dialog.OrderItems.Total.getText();
    //Step 6 Edit the reorder case value in table
    await ADMIN.Dialog.OrderItems.Table.SetReorderCase("10",{ rowColumn: "Name", rowValue: ITEMS.JACK.TITLE });
    const newtotal=await ADMIN.Dialog.OrderItems.Total.getText();
    //Step 7: Total Amount changed
    expect(Number(newtotal)).toBeGreaterThan(Number(prevtotal));
  });
  test('[C4000]Verify # of Days Supply auto-update',{tag:['@order']},async({})=>{
    //Step 1: Login the Admin
    await ADMIN.Login.In();
    //Step 2 : Navigate to Order Page
    await ADMIN.Menu.Order.GoTo();
    await ADMIN.Order.CreateOrder.Click();
     //Select Supplier from Dropdown
    await ADMIN.Dialog.OrderItems.Supplier.SelectOption({ byIndex: 2 });
    //Click Generate Order button
    await ADMIN.Dialog.OrderItems.GenerateOrder.Click();
    //Identify # Of Days Supllier label Avavaible
    expect(await ADMIN.Dialog.OrderItems.Table.GetDaysSupply('GIFT CARD')).toBeTruthy();
    //Change the Ordercase value
  });
});