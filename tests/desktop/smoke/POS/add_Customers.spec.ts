import { test, expect } from '@playwright/test';
import { Initializer, KEY } from '../../../../src/utils';
import { POS } from '../../../../src/section/POS';

//This block runs before each test
test.beforeEach(async ({ page }) => {
    await Initializer.Init(page);
});

//This block runs after each test
test.afterEach(async ({ page }, testInfo) => {
    await Initializer.Finalize(page, testInfo);
});

test.describe("Scenarios related to Customers", { tag: ['@customer', '@smoke'] }, () => {

   test('[C1203] Add new customer', { tag: ['@new'] }, async ({}) => {
        //Login to the POS application
        await POS.Login.In();
        await POS.Settings.Click();
        await POS.Settings.General.ShowCustomerNumber.Check();
        await POS.Register.Click();
        //Populate random Mobile Number
        const randomMobile = await POS.FakeData.getMobile();
        //Populate random Name
        const randomName = await POS.FakeData.getName();
        //Populate random Email
        const randomEmail = await POS.FakeData.getEmail();
        //Enter Mobile Number in the Customer Mobile Number input field
        await POS.Register.Customer.Mobile.setText({ value: randomMobile.toString(), press: KEY.ENTER });
        //Customer not found dialog appears
        await POS.Dialog.CustomerNotFound.CreateNewCustomer.Click();
        //Random name entered
        await POS.Dialog.CustomerDetails.Name.setText({ value: randomName });
        //Random email entered
        await POS.Dialog.CustomerDetails.Email.setText({ value: randomEmail });
        //SMS & Email Promotion is checked/selected
        await POS.Dialog.CustomerDetails.Sms_Email_Promotion.Check();
        //Save button is clicked
        await POS.Dialog.CustomerDetails.Save.Click();
        //Click on the Customer options button
        await POS.Register.Customer.Options.Click();
        //Verifying the name entered is matching the customer info
        const actualname = await POS.Dialog.Customerinfo.Name.getText();
        expect(actualname, 'Customer ' + randomName + ' expected but found' + actualname).toEqual(randomName);
        //Verifying the email entered is matching the customer info
        const actualemail = (await POS.Dialog.Customerinfo.Email.getText()).toLowerCase();
        expect(actualemail, 'Customer ' + randomEmail + ' expected but found' + actualemail).toEqual(randomEmail);
        //Verifying the mobile number entered is matching the customer info
        const actualmobile = await POS.Dialog.Customerinfo.Mobile.getText();
        expect(actualmobile, 'Customer ' + randomMobile + ' expected but found' + actualmobile).toEqual(randomMobile.toString());
    });
});
