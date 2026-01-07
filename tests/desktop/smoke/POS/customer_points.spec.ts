import { test, expect } from '@playwright/test';
import { POS } from '../../../../src/section/POS';
import { Initializer, ITEMS, getDateDaysAgo } from '../../../../src/utils';
import { CUSTOMER } from '../../../../src/utils/data/data.customer';
import { USERS } from '../../../../src/utils/data/data.users';

//This block runs before each test
test.beforeEach(async ({ page }) => {
  await Initializer.Init(page);
});

//This block runs after each test
test.afterEach(async ({ page }, testInfo) => {
  await Initializer.Finalize(page, testInfo);
});

test.describe("Scenarios related to loyalty points", { tag: ['@loyalty', '@smoke'] }, () => {
  
 test('[C8152] Verify points-required item requires customer with sufficient points', { tag: ['@refund', '@points', '@customer'] }, async () => {
 
    // Login to the POS application
    await POS.Login.In();
    // Add the points-required item
    await POS.Register.AddItemByStockcode({ stockCode: ITEMS.LOYALTY_ITEM.BARCODE });
    // Pay the order
    await POS.Register.PayButton.Click();
    // Verify the points-required dialog is visible
    expect(await POS.Dialog.PointsRequired.IsVisible(), 'Points Required dialog is not visible').toBe(true);
    await POS.Dialog.PointsRequired.OK.Click();
 
    // Select the customer mobile number
    await POS.Register.Customer.SelectCustomer({customer: CUSTOMER.WITH_LOYALTY_POINTS.Mobile});
    await POS.Dialog.Customerinfo.Close();
    //Click Pay Button
    await POS.Register.PayButton.Click();
    //Verify pay button works
    expect(await POS.Dialog.Checkout.IsVisible).toBeTruthy();
 
   
  });

 test('[C1439] Verify customer earns loyalty points after transaction', { tag: ['@loyaltypoints', '@customer'] }, async () => {
    // Login to the POS application
    await POS.Login.In();
    await POS.Settings.Click();
    await POS.Settings.General.ShowCustomerNumber.Check();
    await POS.Register.Click();
    // Select the customer mobile number
    await POS.Register.Customer.SelectCustomer({customer: CUSTOMER.WITH_LOYALTY_POINTS.Mobile});
    expect(await POS.Dialog.Customerinfo.IsVisible(), 'Customer info dialog is not visible').toBe(true);
    const oldPoints = await POS.Dialog.Customerinfo.Points.getText();
    // Close the customer info dialog
    await POS.Dialog.Customerinfo.Close();
    // Add the item
    await POS.Register.AddItemByStockcode({ stockCode: ITEMS.NO_AGE_VERIFICATION.BARCODE });
    // Pay the order
    await POS.Register.PayButton.Click();
    await POS.Dialog.Checkout.ClickCashPaymentButton({index: 1});
    await POS.Dialog.CheckoutComplete.No.Click();
    await POS.Settings.Click();
    await POS.Settings.General.RefreshRemoteData.Click();
    await POS.Dialog.ReloadData.Yes.Click();
    await POS.Register.Click();
    // Select the customer mobile number again to verify updated points
    await POS.Register.Customer.SelectCustomer({customer: CUSTOMER.WITH_LOYALTY_POINTS.Mobile});
    const newPoints = await POS.Dialog.Customerinfo.Points.getText();
    expect(Number(newPoints), 'Points are not correct').toBe(Number(oldPoints) + Number(ITEMS.NO_AGE_VERIFICATION.PRICE));
  });

  test('[C4456-1] Verify points validation restricts checkout for insufficient customer points', { tag: ['@points', '@customer', '@cashier'] }, async ({}) => {
       
    // Step 1: Login as register (previously login/logout with admin)
    // First, admin needs to register the device
     const customerDetails = {
      name: await POS.FakeData.getName(),
      mobile: (await POS.FakeData.getMobile()).toString(),
      email: await POS.FakeData.getEmail(),
      dob: await POS.FakeData.getDOB({ format: 'MMDDYYYY' }),
      address: await POS.FakeData.getAddress(),
      zipcode: await POS.FakeData.getZipcode(),
    }
    await POS.Login.In(); // Default admin credentials to register device
    await POS.Settings.Click();
    await POS.Settings.General.ShowCustomerNumber.Check();
    await POS.Register.Click();
    // Step 2: Add a customer mobile (without points)
   //await POS.Register.Customer.SelectCustomer({customer: CUSTOMER.NO_LOYALTY_POINTS.Mobile});
    await POS.Register.Customer.Mobile.setText({ value: customerDetails.mobile });
    await POS.Register.Customer.Options.Click();
    // Click on the create new customer button
    await POS.Dialog.CustomerNotFound.CreateNewCustomer.Click();
    // Fill the customer details
    await POS.Dialog.CustomerDetails.Name.setText({ value: customerDetails.name });
    await POS.Dialog.CustomerDetails.Mobile.setText({ value: customerDetails.mobile });
    await POS.Dialog.CustomerDetails.Email.setText({ value: customerDetails.email });
    await POS.Dialog.CustomerDetails.DOB.setText({ value: customerDetails.dob, sequential: true });
    await POS.Dialog.CustomerDetails.Address.setText({ value: customerDetails.address });
    await POS.Dialog.CustomerDetails.Zipcode.setText({ value: customerDetails.zipcode });
    // Save the customer details
    await POS.Dialog.CustomerDetails.Save.Click();
    // Select the customer mobile number
    await POS.Register.Customer.Mobile.setText({ value: customerDetails.mobile });
    await POS.Register.Customer.Options.Click();
    // Validation 3: Verify customer actually has 0 points (test precondition)
    const customerPoints = await POS.Dialog.Customerinfo.Points.getText();
    await POS.Dialog.Customerinfo.Ok.Click();
   
    expect(customerPoints, 'Customer should have 0 points for this test scenario').toEqual('0');
   
    await POS.Register.AddItemByStockcode({stockCode: ITEMS.LOYALTY_ITEM.BARCODE});
   
    // Step 3: Ring up an item (item without points required)
    await POS.Register.AddItemByStockcode({stockCode: ITEMS.NO_AGE_VERIFICATION.BARCODE});
 
    await POS.Register.PayButton.Click();
 
    // Validation 2: Verify that the transaction is blocked (cannot proceed to payment)
    expect(await POS.Dialog.PointsRequired.IsVisible(), 'Points Required dialog should remain visible, blocking transaction').toBeTruthy();
  });
});