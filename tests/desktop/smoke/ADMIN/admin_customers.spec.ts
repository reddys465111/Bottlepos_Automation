import { test, expect } from '@playwright/test';
import { ADMIN } from '../../../../src/section/ADMIN';
import { Initializer } from '../../../../src/utils';

//This block runs before each test
test.beforeEach(async ({ page }) => {
    await Initializer.Init(page, {Admin: true});
});

//This block runs after each test
test.afterEach(async ({ page }, testInfo) => {
    await Initializer.Finalize(page, testInfo);
});

test.describe('Admin Section - Customers',{tag: ['@smoke', '@admin', '@customers']}, () => {
 
    test('[C6073] - Verify if the customer can be added from the admin side', { tag: ['@add'] }, async ({}) => {
        // Login
        await ADMIN.Login.In();
        // Go to Customers
        await ADMIN.Menu.Customers.GoTo();
        await ADMIN.Customers.Add.Click();
        // customer data
        const customer = {
            name: await ADMIN.FakeData.getName(),
            mobile: (await ADMIN.FakeData.getMobile()).toString(),
            dob: await ADMIN.FakeData.getDOB(),
            email: await ADMIN.FakeData.getEmail(),
            address: await ADMIN.FakeData.getAddress(),
            zipcode: await ADMIN.FakeData.getZipcode(),
            points: '100'
        }
        // Add customer
        await ADMIN.Dialog.AddCustomer.Name.setText({value: customer.name});
        await ADMIN.Dialog.AddCustomer.Mobile.setText({value: customer.mobile});
        await ADMIN.Dialog.AddCustomer.DOB.setText({value: customer.dob});
        await ADMIN.Dialog.AddCustomer.Email.setText({value: customer.email});
        await ADMIN.Dialog.AddCustomer.Address.setText({value: customer.address});
        await ADMIN.Dialog.AddCustomer.Zipcode.setText({value: customer.zipcode});
        await ADMIN.Dialog.AddCustomer.Points.setText({value: customer.points});
        // Save customer
        await ADMIN.Dialog.AddCustomer.Save.Click();
        await ADMIN.Customers.Table.SortByColumn({columnTitle: 'ID', sortOrder: 'descending'});
        // Verify customer was added
        expect(await ADMIN.Customers.Table.RowExists({rowColumn: 'Name', rowValue: customer.name}), 'Customer was not added').toBe(true);

    });
});
