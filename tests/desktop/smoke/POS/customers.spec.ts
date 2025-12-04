import { test, expect } from '@playwright/test';
import { POS } from '../../../../src/section/POS';
import { Initializer, ITEMS } from '../../../../src/utils';
import { CUSTOMER } from '../../../../src/utils/data/data.customer';

//This block runs before each test
test.beforeEach(async ({ page }) => {
    await Initializer.Init(page);
});

//This block runs after each test
test.afterEach(async ({ page }, testInfo) => {
    await Initializer.Finalize(page, testInfo);
});

test.describe('POS Section - Customers', {tag: ['@smoke', '@pos', '@cash', '@customers']}, () => {
     test('[C1436] - As a Cashier, I want to add a customer from the POS so that I can add customers directly from POS', { tag: ['@newCustomer'] }, async ({}) => {
        const customerDetails = {
            name: await POS.FakeData.getName(),
            mobile: (await POS.FakeData.getMobile()).toString(),
            email: await POS.FakeData.getEmail(),
            dob: await POS.FakeData.getDOB({format: 'MMDDYYYY'}),
            address: await POS.FakeData.getAddress(),
            zipcode: await POS.FakeData.getZipcode(),
        }
        // Login to the POS application
        await POS.Login.In();
        await POS.Settings.Click();
        await POS.Settings.General.ShowCustomerNumber.Check();
        await POS.Register.Click();
        // Select the customer mobile number
        // Fill the customer mobile number
        await POS.Register.Customer.Mobile.setText({value: customerDetails.mobile});
        await POS.Register.Customer.Options.Click();
 
        // Click on the create new customer button
        await POS.Dialog.CustomerNotFound.CreateNewCustomer.Click();
 
        // Generate the customer details
 
        // Fill the customer details
        await POS.Dialog.CustomerDetails.Name.setText({value: customerDetails.name});
        await POS.Dialog.CustomerDetails.Mobile.setText({value: customerDetails.mobile});
        await POS.Dialog.CustomerDetails.Email.setText({value: customerDetails.email});
        await POS.Dialog.CustomerDetails.DOB.setText({value: customerDetails.dob, sequential: true});
        await POS.Dialog.CustomerDetails.Address.setText({value: customerDetails.address});
        await POS.Dialog.CustomerDetails.Zipcode.setText({value: customerDetails.zipcode});
 
        // Save the customer details
        await POS.Dialog.CustomerDetails.Save.Click();
 
        // Select the customer mobile number
        await POS.Register.Customer.Mobile.setText({value: customerDetails.mobile});
        await POS.Register.Customer.Options.Click();
 
        // Verify the customer details
        expect(await POS.Dialog.Customerinfo.IsVisible(), 'Customer info dialog should be visible').toBe(true);
 
        expect((await POS.Dialog.Customerinfo.Name.getText()).toLowerCase(), 'Customer name should be displayed').toEqual(customerDetails.name.toLowerCase());
        expect((await POS.Dialog.Customerinfo.Mobile.getText()).toLowerCase(), 'Customer mobile number should be displayed').toEqual(customerDetails.mobile.toLowerCase());
        expect((await POS.Dialog.Customerinfo.Email.getText()).toLowerCase(), 'Customer email should be displayed').toEqual(customerDetails.email.toLowerCase());
        expect((await POS.Dialog.Customerinfo.Address.getText()).toLowerCase(), 'Customer address should be displayed').toEqual(customerDetails.address.toLowerCase());
        expect((await POS.Dialog.Customerinfo.Zipcode.getText()).toLowerCase(), 'Customer zipcode should be displayed').toEqual(customerDetails.zipcode.toLowerCase());
 
    });
 

  
});
