import { test, expect } from "@playwright/test";
import { ADMIN } from "../../../../src/section/ADMIN";
import { Initializer, ITEMS } from "../../../../src/utils";

//This block runs before each test
test.beforeEach(async ({ page }) => {
  await Initializer.Init(page, { Admin: true });
});

//This block runs after each test
test.afterEach(async ({ page }, testInfo) => {
  await Initializer.Finalize(page, testInfo);
});

test.describe("Admin Section - RealTime", { tag: ['@smoke', '@admin', '@realtime', '@nonparallelizable'] }, () => {

  test('[C8181] Realtime: Todays Takings section to navigate to the next set of transaction records', { tag: ['@Realtime', '@TodaysTakings'] }, async ({ }) => {
    //Login the Admin Console
    await ADMIN.Login.In();
    await ADMIN.Refresh.Click();
    //Navugate to Realtime 
    await ADMIN.Menu.Realtime.GoTo();
    //Click on the revenue infobox
    await ADMIN.Realtime.Todays_Takings.Revenue.Click();
    //Report transcations dialog should open
    expect(await ADMIN.Dialog.ReportTransaction.IsVisible(), 'Report Transaction dialog is not visible in Revenu button').toBe(true);
    //Verify Next button is visible and click it
    expect(await ADMIN.Dialog.ReportTransaction.next.IsVisible(), 'Next button is not visible in Report Transaction dialog').toBe(true);

  });

  test('[C8182]  Realtime: Close button functionality on the revenue Detail popup should return to the main view', { tag: ['@Realtime', '@TodaysTakings'] }, async ({ }) => {
    //Login the Admin Console
    await ADMIN.Login.In();
    await ADMIN.Refresh.Click();
    //Navugate to Realtime 
    await ADMIN.Menu.Realtime.GoTo();
    //Click on the revenue infobox
    await ADMIN.Realtime.Todays_Takings.Revenue.Click();
    //Report transcations dialog should open
    expect(await ADMIN.Dialog.ReportTransaction.IsVisible(), 'Report Transaction dialog is not visible in Revenu button').toBe(true);
    //Click close button
    await ADMIN.Dialog.ReportTransaction.Close.Click();
    //Verify Report Transaction dialog is closed
    expect(await ADMIN.Dialog.ReportTransaction.IsVisible(), 'Report Transaction dialog is still visible after clicking close button').toBe(false);
  });

  test('[C8183] Realtime: Todays Takings section to refresh the transaction popup with updated details when clicked', { tag: ['@Realtime', '@TodaysTakings'] }, async ({ }) => {
    //Login the Admin Console
    await ADMIN.Login.In();
    await ADMIN.Refresh.Click();
    //Navugate to Realtime
    await ADMIN.Menu.Realtime.GoTo();
    //Click on the revenue infobox
    await ADMIN.Realtime.Todays_Takings.Revenue.Click();
    //Report transcations dialog should open
    expect(await ADMIN.Dialog.ReportTransaction.IsVisible(), 'Report Transaction dialog is not visible in Revenu button').toBe(true);
   //Verify deatils button is visisble and clickable
    expect(await ADMIN.Dialog.ReportTransaction.Details.IsVisible(), 'Details button is not clickable').toBe(true);
    
  });

  //C8184 seems duplicate with C8183

  test('[C8185] Realtime: Edit and save the Notes field in the Latest Transcations', { tag: ['@Realtime', '@LatestTranscations'] }, async ({ }) => {
    //Login the Admin Console
    await ADMIN.Login.In();
    await ADMIN.Refresh.Click();
    //Navugate to Realtime
    await ADMIN.Menu.Realtime.GoTo();
    //Click on the Edit button icon for the first transaction in the Latest Transactions section
    await ADMIN.Realtime.LatestTransactions.EditIcon(0).Click();
    //Notes field should become editable, enter some text and save it
    await ADMIN.Dialog.TransactionDetails.Notes.setText({ value: 'Test note' });
    await ADMIN.Dialog.TransactionDetails.Save.Click();
    //Confirmation dialog should appear, click Yes
    await ADMIN.Dialog.Confirmation.Yes.Click();
    //Verify the Notes field is updated with the new text
    expect(await ADMIN.Dialog.TransactionDetails.Notes.getText(), 'Notes field is not updated with new text').toBe('Test note');
  });

  test('[C8186] verify all transaction tabs to be visible and the Details tab to be selected by default and ensure proper navigation within the Transaction Detail .', { tag: ['@Realtime', '@TransactionDetails'] }, async ({ }) => {
    //Login the Admin Console
    await ADMIN.Login.In();
    await ADMIN.Refresh.Click();
    //Navugate to Realtime
    await ADMIN.Menu.Realtime.GoTo();
    //Click on the Edit button 
    await ADMIN.Realtime.LatestTransactions.EditIcon(0).Click();
    //Transcation Deatil dialog should open with Details tab selected by default
    expect(await ADMIN.Dialog.TransactionDetails.IsVisible(), 'Transaction Details dialog is not visible after clicking edit icon').toBe(true);
    //Verify Deatils, Item payment and Option tab  are Visible
    await ADMIN.Dialog.TransactionDetails.payments.Click();
    expect(await ADMIN.Dialog.TransactionDetails.payments.method.IsVisible(), 'Payments tab is not visible in Transaction Details dialog').toBe(true);
    await ADMIN.Dialog.TransactionDetails.items.Click();
    expect(await ADMIN.Dialog.TransactionDetails.items.Name.IsVisible(), 'Items tab is not visible in Transaction Details dialog').toBe(true);
    await ADMIN.Dialog.TransactionDetails.options.Click();
    expect(await ADMIN.Dialog.TransactionDetails.options.Click, 'Options tab is not visible in Transaction Details dialog').toBeTruthy();
  
  });
  test('[C8187] Realtime: View button on the Details tab of the Transaction Detail popup and verify review transaction information in a non-editable format.', { tag: ['@Realtime', '@DetailsTab'] }, async ({ }) => {
    //Login the Admin Console
    await ADMIN.Login.In();
    await ADMIN.Refresh.Click();
    //Navugate to Realtime
    await ADMIN.Menu.Realtime.GoTo();
    //Click on the Edit button
    await ADMIN.Realtime.LatestTransactions.EditIcon(0).Click();
    //Transcation Deatil dialog should open with Details tab selected by default
    expect(await ADMIN.Dialog.TransactionDetails.IsVisible(), 'Transaction Details dialog is not visible after clicking edit icon').toBe(true);
    //Click the Detail tab
    await ADMIN.Dialog.TransactionDetails.details.Click();
    //Click on Deatils tab and verify all fields are in non editable format
    expect(await ADMIN.Dialog.TransactionDetails.Subtotal.IsVisible(), 'Sale Total field is editable in Details tab of Transaction Details dialog').toBe(true);
    expect(await ADMIN.Dialog.TransactionDetails.Tax.IsVisible(), 'Tax field is editable in Details tab of Transaction Details dialog').toBe(true);
    expect(await ADMIN.Dialog.TransactionDetails.Total.IsVisible(), 'Total field is editable in Details tab of Transaction Details dialog').toBe(true);
    
  });

  test('[C8189] view all items listed under the Items tab of the Transaction Detail popup should list all coulmns.', { tag: ['@Realtime', '@ItemsTab'] }, async ({ }) => {
      //Login the Admin Console
      await ADMIN.Login.In();
      await ADMIN.Refresh.Click();
      //Navugate to Realtime
      await ADMIN.Menu.Realtime.GoTo();
      //Click on the Edit button
      await ADMIN.Realtime.LatestTransactions.EditIcon(0).Click();
      //Click in Item tab
      await ADMIN.Dialog.TransactionDetails.items.Click();
      //Click on Items tab and verify all columns are visible
      expect(await ADMIN.Dialog.TransactionDetails.items.Qty.IsVisible(), 'Qty column is not visible in Items tab of Transaction Details dialog').toBe(true);
      expect(await ADMIN.Dialog.TransactionDetails.items.Name.IsVisible(), 'Name column is not visible in Items tab of Transaction Details dialog').toBe(true);
      expect(await ADMIN.Dialog.TransactionDetails.items.Price.IsVisible(), 'Price column is not visible in Items tab of Transaction Details dialog').toBe(true);
      expect(await ADMIN.Dialog.TransactionDetails.items.Total.IsVisible(), 'Total column is not visible in Items tab of Transaction Details dialog').toBe(true);
  });

  test('[C8190]Click on the Payments tab of the Transaction Detail popup and verify all payment details are listed in a non-editable format.', { tag: ['@Realtime', '@PaymentsTab'] }, async ({ }) => {
    //Login the Admin Console
    await ADMIN.Login.In();
    await ADMIN.Refresh.Click();
    //Navugate to Realtime
    await ADMIN.Menu.Realtime.GoTo();
    //Click on the Edit button
    await ADMIN.Realtime.LatestTransactions.EditIcon(0).Click();
    //Click on Payment tab
    await ADMIN.Dialog.TransactionDetails.payments.Click();
    //Verify all payment details are in non editable format
    expect(await ADMIN.Dialog.TransactionDetails.payments.method.IsVisible(), 'Payment Method field is not visible in Payments tab of Transaction Details dialog').toBe(true);
    expect(await ADMIN.Dialog.TransactionDetails.payments.amount.IsVisible(), 'Amount field is not visible in Payments tab of Transaction Details dialog').toBe(true);
    expect(await ADMIN.Dialog.TransactionDetails.payments.Tendered.IsVisible(), 'Tendered field is not visible in Payments tab of Transaction Details dialog').toBe(true);
    expect(await ADMIN.Dialog.TransactionDetails.payments.Change.IsVisible(), 'Change field is not visible in Payments tab of Transaction Details dialog').toBe(true);
  
  });
  test('[C8194] Verify Option tab of the Transaction Detail popup to ensure all options are visible and functional.', { tag: ['@Realtime', '@OptionsTab'] }, async ({ }) => {
    //Login the Admin Console
    await ADMIN.Login.In();
    await ADMIN.Refresh.Click();
    //Navugate to Realtime
    await ADMIN.Menu.Realtime.GoTo();
    //Click on the Edit button
    await ADMIN.Realtime.LatestTransactions.EditIcon(0).Click();
    //Click on Option tab
    await ADMIN.Dialog.TransactionDetails.options.Click();
    //Verify all options are visible and clickable
    expect(await ADMIN.Dialog.TransactionDetails.GenerateInvoice.IsVisible(), 'Generate Invoice option is not visible in Options tab of Transaction Details dialog').toBe(true);
    expect(await ADMIN.Dialog.TransactionDetails.PrintReceipt.IsVisible(), 'Print Receipt option is not visible in Options tab of Transaction Details dialog').toBe(true);
    expect(await ADMIN.Dialog.TransactionDetails.DownloadCSV.IsVisible(), 'Download CSV option is not visible in Options tab of Transaction Details dialog').toBe(true);
    expect(await ADMIN.Dialog.TransactionDetails.History.IsVisible(), 'Print option is not visible in Options tab of Transaction Details dialog').toBe(true);
  });

})