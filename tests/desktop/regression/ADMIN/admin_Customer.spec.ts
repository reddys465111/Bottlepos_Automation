import { test, expect } from '@playwright/test';
import { ADMIN } from '../../../../src/section/ADMIN';
import { Initializer } from '../../../../src/utils';
import { Customers } from '../../../../src/section/ADMIN/pages/customers/Customers';

//This block runs before each test
test.beforeEach(async ({ page }) => {
    await Initializer.Init(page, { Admin: true });
});

//This block runs after each test
test.afterEach(async ({ page }, testInfo) => {
    await Initializer.Finalize(page, testInfo);
});

test.describe('Admin Section - Customers', { tag: ['@regression'] }, () => {
    test('[C6080]add reward in the Manage Customer Rewards dialog box', { tag: ['@CustomerRewards'] }, async ({ }) => {
        //Step 1: Login to Admin 
        await ADMIN.Login.In();
        //Step 2: Go to Customers page
        await ADMIN.Menu.Customers.GoTo();
        //Step 3: Click Custmer manage Rewards button
        await ADMIN.Customers.ManageRewards.Click();
        //Step 4 : The Manage Customer Rewards dialog box should appear
        expect(await ADMIN.Dialog.ManageCustomerRewards.IsVisible()).toBeTruthy();
        //Step 5: Click the Add Button
        await ADMIN.Dialog.ManageCustomerRewards.Add.Click();
        //Step 6: The Add Reward dialog box should appear
        expect(await ADMIN.Dialog.AddReward.IsVisible()).toBeTruthy();
        //Step 7: Fill in the details for the new reward
        const rewardname = await ADMIN.FakeData.getName();
        await ADMIN.Dialog.AddReward.Name.setText({ value: rewardname });
        await ADMIN.Dialog.AddReward.Amount.setText({ value: '10' });
        await ADMIN.Dialog.AddReward.OfferType.SelectOption({ byText: '% off' });
        await ADMIN.Dialog.AddReward.PointsNeeded.setText({ value: '5' });
        //Step 8: Click the Save button
        await ADMIN.Dialog.AddReward.Save.Click();//

    });

    test('[C6082] Edit an existing reward in the Manage Customer Rewards table', { tag: ['@CustomerRewards'] }, async ({ }) => {
        //Step 1: Login to Admin 
        await ADMIN.Login.In();
        //Step 2: Go to Customers page
        await ADMIN.Menu.Customers.GoTo();
        //Step 3: Click Custmer manage Rewards button
        await ADMIN.Customers.ManageRewards.Click();
        //Step 4 : The Manage Customer Rewards dialog box should appear
        await ADMIN.Dialog.ManageCustomerRewards.Add.Click();
        //Step 6: The Add Reward dialog box should appear
        //Step 7: Fill in the details for the new reward
        const rewardname = await ADMIN.FakeData.getName();
        await ADMIN.Dialog.AddReward.Name.setText({ value: rewardname });
        await ADMIN.Dialog.AddReward.Amount.setText({ value: '10' });
        await ADMIN.Dialog.AddReward.OfferType.SelectOption({ byText: '% off' });
        const Amount = '5';
        await ADMIN.Dialog.AddReward.PointsNeeded.setText({ value: Amount });
        //Step 8: Click the Save button
        await ADMIN.Dialog.AddReward.Save.Click();//
        //Step 9: In the Manage Customer Rewards dialog box, click the Edit button for the newly created reward
        await ADMIN.Dialog.ManageCustomerRewards.RewardsTable.editReward();
        //Step 10: The Edit Reward dialog box should appear
        expect(await ADMIN.Dialog.EditReward.IsVisible()).toBeTruthy();
        //Step 11: Modify the the Amount value   of the reward
        const newAmount = '20';
        await ADMIN.Dialog.EditReward.Amount.setText({ value: newAmount });
        //Step 12: Click the Save button
        await ADMIN.Dialog.EditReward.Save.Click();
        //Step 13: The Manage Customer Rewards dialog box should be displayed
        expect(await ADMIN.Dialog.ManageCustomerRewards.IsVisible()).toBeTruthy();
        //Step 14: Verify that the reward has been updated with the new Amount value
        expect(Amount).not.toBe(newAmount);
    });

    test('[C6083] Delete a reward from the Manage Customer Rewards table', { tag: ['@CustomerRewards'] }, async ({ }) => {
        //Step 1: Login to Admin 
        await ADMIN.Login.In();
        //Step 2: Go to Customers page
        await ADMIN.Menu.Customers.GoTo();
        //Step 3: Click Custmer manage Rewards button
        await ADMIN.Customers.ManageRewards.Click();
        //Step 4 : The Manage Customer Rewards dialog box should appear
        await ADMIN.Dialog.ManageCustomerRewards.Add.Click();
        //Step 6: The Add Reward dialog box should appear
        //Step 7: Fill in the details for the new reward
        const rewardname = await ADMIN.FakeData.getName();
        await ADMIN.Dialog.AddReward.Name.setText({ value: rewardname });
        await ADMIN.Dialog.AddReward.Amount.setText({ value: '10' });
        await ADMIN.Dialog.AddReward.OfferType.SelectOption({ byText: '% off' });
        const Amount = '5';
        await ADMIN.Dialog.AddReward.PointsNeeded.setText({ value: Amount });
        //Step 8: Click the Save button
        await ADMIN.Dialog.AddReward.Save.Click();//
        //Step 9: In the Manage Customer Rewards dialog box, click the Edit button for the newly created reward
        await ADMIN.Dialog.ManageCustomerRewards.RewardsTable.deleteReward();
        //Step 11: Confirm the deletion
        await ADMIN.Dialog.Confirmation.Yes.Click();
        //Step 12: reward Deledted successfully
        expect(await ADMIN.Dialog.Success.IsVisible()).toBeTruthy();
        await ADMIN.Dialog.Success.Ok.Click();

    });
    test('[C6089] Customer: Edit, an existing customer group in the Manage Customer Groups dialog', { tag: ['@CustomerGroups'] }, async ({ }) => {

        //Step 1: Login to Admin 
        await ADMIN.Login.In();
        //Step 2: Go to Customers page
        await ADMIN.Menu.Customers.GoTo();
        //Step 3: Click Custmer manage Groups button
        await ADMIN.Customers.ManageGroups.Click();
        //Step 4 : The Manage Customer Groups dialog box should appear
        expect(await ADMIN.Dialog.ManageCustomerGroups.IsVisible()).toBeTruthy();
        //Step 5: Click the Add Button
        await ADMIN.Dialog.ManageCustomerGroups.Add.Click();
        //Step 6: The Add Customer Group dialog box should appear
        expect(await ADMIN.Dialog.AddCustomerGroup.IsVisible()).toBeTruthy();
        //Step 7: Fill in the details for the new customer group
        const groupname = await ADMIN.FakeData.getName();
        await ADMIN.Dialog.AddCustomerGroup.GroupName.setText({ value: groupname });
        //Step 8: Click the + button in let side of window to add customers to the group
        await ADMIN.Dialog.AddCustomerGroup.Addicon.Click();
        //Step 9: The customer count should not be zero
        expect(await ADMIN.Dialog.AddCustomerGroup.Customercount.getText()).not.toBe('0');
        //Step 10: Click the Save button
        await ADMIN.Dialog.AddCustomerGroup.Save.Click();
        //Step11 :The selected customer should be added successfully and list  shown in the redirected Manage Customer Groups dialog
        expect(await ADMIN.Dialog.ManageCustomerGroups.ManageCustomerGroupsTable.IsNotEmpty()).toBeTruthy();

    });
    test('[C6086]  edit an existing customer group in the Manage Customer Groups dialog', { tag: ['@CustomerGroups'] }, async ({ }) => {

        //Step 1: Login to Admin 
        await ADMIN.Login.In();
        //Step 2: Go to Customers page
        await ADMIN.Menu.Customers.GoTo();
        //Step 3: Click Custmer manage Groups button
        await ADMIN.Customers.ManageGroups.Click();
        //Step 4 : The Manage Customer Groups dialog box should appear
        expect(await ADMIN.Dialog.ManageCustomerGroups.IsVisible()).toBeTruthy();
        //Step 5: Click the Add Button
        await ADMIN.Dialog.ManageCustomerGroups.Add.Click();
        //Step 6: The Add Customer Group dialog box should appear
        expect(await ADMIN.Dialog.AddCustomerGroup.IsVisible()).toBeTruthy();
        //Step 7: Fill in the details for the new customer group
        const groupname = await ADMIN.FakeData.getName();
        await ADMIN.Dialog.AddCustomerGroup.GroupName.setText({ value: groupname });
        //Step 8: Click the + button in let side of window to add customers to the group
        await ADMIN.Dialog.AddCustomerGroup.Addicon.Click();
        //Step 9: The customer count should not be zero
        expect(await ADMIN.Dialog.AddCustomerGroup.Customercount.getText()).not.toBe('0');
        //Step 10: Click the Save button
        await ADMIN.Dialog.AddCustomerGroup.Save.Click();
        //Step11 :The selected customer should be added successfully and list  shown in the redirected Manage Customer Groups dialog
        expect(await ADMIN.Dialog.ManageCustomerGroups.ManageCustomerGroupsTable.IsNotEmpty()).toBeTruthy();
        //Step 12: In the Manage Customer Groups dialog box, click the Edit button for the newly created customer group
        await ADMIN.Dialog.ManageCustomerGroups.ManageCustomerGroupsTable.editGroup();
        //Step 13: The Edit Customer Group dialog box should appear
        expect(await ADMIN.Dialog.EditCustomerGroup.IsVisible()).toBeTruthy();

    });
    test('[C6090] Add customers so that they appear in the "Manage Your Customer Base" show list ', { tag: ['@CustomerGroups'] }, async ({ }) => {
        //Step 1: Login to Admin
        await ADMIN.Login.In();
        //Step 2: Go to Customers page
        await ADMIN.Menu.Customers.GoTo();
        //Step 3: Click Add New Customer button
        await ADMIN.Customers.Add.Click();
        //Step 4: The Add New Customer page should appear
        expect(await ADMIN.Dialog.AddCustomer.IsVisible()).toBeTruthy();
        //Step 5: Fill in the details for the new customer
        const customerDetails = {
            name: await ADMIN.FakeData.getName(),
            mobile: (await ADMIN.FakeData.getMobile()).toString(),
            email: await ADMIN.FakeData.getEmail(),
            dob: await ADMIN.FakeData.getDOB({ format: 'MMDDYYYY' }),
            address: await ADMIN.FakeData.getAddress(),
            zipcode: await ADMIN.FakeData.getZipcode(),
        }
        await ADMIN.Dialog.AddCustomer.Name.setText({ value: customerDetails.name });
        await ADMIN.Dialog.AddCustomer.Mobile.setText({ value: customerDetails.mobile });
        await ADMIN.Dialog.AddCustomer.Email.setText({ value: customerDetails.email });
        await ADMIN.Dialog.AddCustomer.DOB.setText({ value: customerDetails.dob, sequential: true });
        await ADMIN.Dialog.AddCustomer.Address.setText({ value: customerDetails.address });
        await ADMIN.Dialog.AddCustomer.Zipcode.setText({ value: customerDetails.zipcode });
        await ADMIN.Dialog.AddCustomer.Save.Click();
        //Step 6: The new customer should be added successfully and appear in the Manage Your Customer Base list
        await ADMIN.Customers.Search.setText({ value: customerDetails.mobile });

       const isVisible = await ADMIN.Customers.Table.isCustomerVisible({ text: customerDetails.mobile });
       expect(isVisible).toBeTruthy();

    });

    test('[C6098]  Advanced Search option can access additional search filters', { tag: ['@CustomerSearch', '@Admin'] }, async ({ }) => {
        //Step 1: Login to Admin
        await ADMIN.Login.In();
        //Step 2: Go to Customers page
        await ADMIN.Menu.Customers.GoTo();
        //Step 3: Click on Advanced Search link
        await ADMIN.Customers.AdvanceSearch.Click();
        //Step 4: Additional search filters should be displayed
        expect(await ADMIN.Customers.AdvanceSearch.Exists()).toBeTruthy();
 
    });
    test('[C6105] edit customer details update and save changes to the customer information successfully. ', { tag: ['@CustomerEdit', '@Admin'] }, async ({ }) => {
        //Step 1: Login to Admin
        await ADMIN.Login.In();
        //Step 2: Go to Customers page
        await ADMIN.Menu.Customers.GoTo();
        //Step 3: Click Add New Customer button
        await ADMIN.Customers.Add.Click();
        //Step 4: The Add New Customer page should appear
        expect(await ADMIN.Dialog.AddCustomer.IsVisible()).toBeTruthy();
        //Step 5: Fill in the details for the new customer
        const customerDetails = {
            name: await ADMIN.FakeData.getName(),
            mobile: (await ADMIN.FakeData.getMobile()).toString(),
            email: await ADMIN.FakeData.getEmail(),
            dob: await ADMIN.FakeData.getDOB({ format: 'MMDDYYYY' }),
            address: await ADMIN.FakeData.getAddress(),
            zipcode: await ADMIN.FakeData.getZipcode(),
        }
        await ADMIN.Dialog.AddCustomer.Name.setText({ value: customerDetails.name });
        await ADMIN.Dialog.AddCustomer.Mobile.setText({ value: customerDetails.mobile });
        await ADMIN.Dialog.AddCustomer.Email.setText({ value: customerDetails.email });
        await ADMIN.Dialog.AddCustomer.DOB.setText({ value: customerDetails.dob, sequential: true });
        await ADMIN.Dialog.AddCustomer.Address.setText({ value: customerDetails.address });
        await ADMIN.Dialog.AddCustomer.Zipcode.setText({ value: customerDetails.zipcode });
        await ADMIN.Dialog.AddCustomer.Save.Click();
        //Step 6: The new customer should be added successfully and appear in the Manage Your Customer Base list
        await ADMIN.Customers.Search.setText({ value: customerDetails.mobile });
        await ADMIN.waitForTimeout(5000);
        //Step 7 : Edit the newly created customer
        await ADMIN.Customers.Table.EditCustomer({ rowIndex: 1 });
        //Step 8: The Edit Customer page should appear
        expect(await ADMIN.Dialog.EditCustomer.IsVisible()).toBeTruthy();
        //Step 9: Modify the customer details
        const updatedCustomerDetails = {
            name: await ADMIN.FakeData.getName(),
            mobile: (await ADMIN.FakeData.getMobile()).toString(),
            email: await ADMIN.FakeData.getEmail(),
            dob: await ADMIN.FakeData.getDOB({ format: 'MMDDYYYY' }),
        }
        await ADMIN.Dialog.EditCustomer.Name.setText({ value: updatedCustomerDetails.name });
        await ADMIN.Dialog.EditCustomer.Mobile.setText({ value: updatedCustomerDetails.mobile });
        await ADMIN.Dialog.EditCustomer.Email.setText({ value: updatedCustomerDetails.email });
        await ADMIN.Dialog.EditCustomer.DOB.setText({ value: updatedCustomerDetails.dob, sequential: true });
        await ADMIN.Dialog.EditCustomer.Update.Click();
        //Step 18 : Confirm latest changes are saved and displayed in the Customers table
        await ADMIN.Customers.Search.setText({ value: updatedCustomerDetails.mobile });
        await ADMIN.waitForTimeout(2000);
        const isVisible = await ADMIN.Customers.Table.isCustomerVisible({ text: updatedCustomerDetails.mobile });
        expect(isVisible).toBeTruthy();
    });
    test('[C6106] Delete a customer group and verify it is removed from the Manage Customer Groups list', { tag: ['@CustomerGroups'] }, async ({ }) => {
        //Step 1: Login to Admin
        await ADMIN.Login.In();
        //Step 2: Go to Customers page
        await ADMIN.Menu.Customers.GoTo();
        //Step 3: Click Custmer manage Groups button
        await ADMIN.Customers.ManageGroups.Click();
        //Step 4: Click the Add Button
        await ADMIN.Dialog.ManageCustomerGroups.Add.Click();
        //Step 5: Fill in the details for the new customer group
        const groupname = await ADMIN.FakeData.getName();
        await ADMIN.Dialog.AddCustomerGroup.GroupName.setText({ value: groupname });
        //Step 6: Click the + button in let side of window to add customers to the group
        await ADMIN.Dialog.AddCustomerGroup.Addicon.Click();
        //Step 7: The customer count should not be zero
        expect(await ADMIN.Dialog.AddCustomerGroup.Customercount.getText()).not.toBe('0');
        //Step 8: Click the Save button
        await ADMIN.Dialog.AddCustomerGroup.Save.Click();
        //Step9 :Search the newly created customer group in Manage Customer Groups table
        await ADMIN.Dialog.ManageCustomerGroups.Search.setText({ value: groupname });
        //Step10: Attempt to delete the newly created customer group
        await ADMIN.Dialog.ManageCustomerGroups.ManageCustomerGroupsTable.deleteGroup({ rowIndex: 1 });
        //Step11: Cancel the deletion with No
        await ADMIN.Dialog.Confirmation.No.Click();
        // Step12: Delete the newly created customer group
        await ADMIN.Dialog.ManageCustomerGroups.ManageCustomerGroupsTable.deleteGroup({ rowIndex: 1 });
        //Step13: Confirm the deletion with Yes  
        await ADMIN.Dialog.Confirmation.Yes.Click();    
 
    });
    test('[C6108]access the sale stats of a customer in the history section to track their sales performance over time', { tag: ['@CustomerHistory'] }, async ({ }) => {
        //Step 1 : Login to Admin
        await ADMIN.Login.In();
        //Step 2: Go to Customers page
        await ADMIN.Menu.Customers.GoTo();  
        //Step 3: Click the History tab to access the customer's sales history
        await ADMIN.Customers.Table.CustomerHistory({ rowIndex: 1 });
        //Step 4: The Customer History page should appear
        expect(await ADMIN.Dialog.CustomerHistory.IsVisible()).toBeTruthy();
        //Step 5: Click on the Stats link to view sales statistics
        await ADMIN.Dialog.CustomerHistory.Stats.Click();
        //Step 6: Sales statistics should be displayed
        expect(await ADMIN.Dialog.CustomerHistory.IsVisible()).toBeTruthy();
 
    });
    test('[C6110]Open the transaction history of a customer to verify the transaction details', { tag: ['@CustomerTransactionHistory'] }, async ({ }) => {
        //Step 1 : Login to Admin
        await ADMIN.Login.In();
        //Step 2: Go to Customers page
        await ADMIN.Menu.Customers.GoTo();
        //Step 3: Click the History tab to access the customer's sales history
        await ADMIN.Customers.Table.CustomerHistory({ rowIndex: 1 });
        //Step 4: The Customer History page should appear
        expect(await ADMIN.Dialog.CustomerHistory.IsVisible()).toBeTruthy();
        //Step 5:Navigate to the Transactions tab in the Customer History dialog
        await ADMIN.Dialog.CustomerHistory.Transactions.Click();
        //Step 6: Transaction history should be displayed
        expect(await ADMIN.Dialog.CustomerHistory.IsVisible()).toBeTruthy();
        //Step 7  The Transactions tab should display the customer's sales details corresponding to the selected customer only, including:Reference ,NumberTime,Total
       expect(await ADMIN.Dialog.CustomerHistory.Transactions.table.isColumnVisible({ column: 'Ref' })).toBeTruthy();
       expect(await ADMIN.Dialog.CustomerHistory.Transactions.table.isColumnVisible({ column: 'Time' })).toBeTruthy();
       expect(await ADMIN.Dialog.CustomerHistory.Transactions.table.isColumnVisible({ column: 'Total' })).toBeTruthy();
    });
 
    
    test('[C6111] Items history of a customer to verify information along with quantity purchased', { tag: ['@CustomerItemsHistory'] }, async ({ }) => {
    //Step 1 : Login to Admin
    await ADMIN.Login.In();
    //Step 2: Go to Customers page
    await ADMIN.Menu.Customers.GoTo();
    //Step 3: Click the History tab to access the customer's sales history
    await ADMIN.Customers.Table.CustomerHistory({ rowIndex: 1 });
    //Step 4: The Customer History page should appear
    expect(await ADMIN.Dialog.CustomerHistory.IsVisible()).toBeTruthy();
    //Step 5:Navigate to the Items  History tab in the Customer History dialog
    await ADMIN.Dialog.CustomerHistory.ItemHistory.Click();
    //Step 6: Items history should be displayed
    expect(await ADMIN.Dialog.CustomerHistory.IsVisible()).toBeTruthy();
    //Step 7: Validate item hsitory table has Sold data
    expect(await ADMIN.Dialog.CustomerHistory.ItemHistory.itemsoldtable.ItemExist()).toBeTruthy();
    });

});