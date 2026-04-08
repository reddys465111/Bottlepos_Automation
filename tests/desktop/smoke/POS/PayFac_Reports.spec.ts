import { test, expect } from '@playwright/test';
import { API } from '../../../../src/API/API';
import { POS } from '../../../../src/section/POS';
import { Initializer, payfac, ITEMS } from '../../../../src/utils';

//This block runs before each test
test.beforeEach(async ({page}, testInfo)=>{
  await Initializer.Init( page );
  await payfac.Init(page);
  
});

//This block runs after each test
test.afterEach(async ({ page }, testInfo) => {
  await Initializer.Finalize(page, testInfo);
});

test.describe("Scenarios related to Day Report", { tag: ['@dayreport', '@smoke', '@nonparallelizable'] }, () => {

 test('[C7096] Verify Day Report - Lotto Payout', { tag: ['@lottopayout', '@nonparallelizable'] }, async ({ }) => {
    const customerDetails = {
      name: await POS.FakeData.getName(),
      mobile: (await POS.FakeData.getMobile()).toString(),
      email: await POS.FakeData.getEmail(),
      dob: await POS.FakeData.getDOB({ format: 'MMDDYYYY' }),
      address: await POS.FakeData.getAddress(),
      zipcode: await POS.FakeData.getZipcode(),
    }
    await POS.Login.In();
    await POS.Settings.Click();
    //Enbale Customer Settings
    await POS.Settings.General.ShowCustomerNumber.Check();
    await POS.Register.Click();
    await API.Init();
    const prev_lottopayout = (await API.Reports.DayReport()).TOTAL_TENDERED?.Category['Lotto Payout'];
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
    await POS.Dialog.Customerinfo.Ok.Click();
    await POS.Register.StockSearch.SearchAndSelect({ title: ITEMS.LOTTO_PAYOUT.TITLE });
    await POS.Register.PayButton.Click();
    await payfac.Read({ amount: 5 })
    await POS.Dialog.Checkout.Card.Click();
    await POS.Dialog.Success.Close.Click();
 
    const post_lottopayout = (await API.Reports.DayReport()).TOTAL_TENDERED?.Category['Lotto Payout'];
 
    expect(post_lottopayout?.Hits, 'Hits should be 1 more than previous').toEqual((prev_lottopayout?.Hits ?? 0) + 1);
    expect(post_lottopayout?.Expected, 'Expected amount should be 5 less than previous').toEqual((prev_lottopayout?.Expected ?? 0) - 5);
  });

  test('[C7091] Verify Day Report - Lotto Sales', { tag: ['@lottosales'] }, async ({}) => {
    await POS.Login.In();
    await API.Init();
    const prev_lottosales = (await API.Reports.DayReport()).TOTAL_REGISTER?.Category['Lotto Sales'];
    await POS.Register.StockSearch.SearchAndSelect({title : ITEMS.LOTTO_SALE.TITLE});
    await POS.Register.PayButton.Click();
    await payfac.Read({ amount: 5 })
    await POS.Dialog.Checkout.Card.Click();
    await POS.Dialog.Success.Close.Click();

    const post_lottosales = (await API.Reports.DayReport()).TOTAL_REGISTER?.Category['Lotto Sales'];

    expect(post_lottosales?.Hits, 'Hits should be 1 more than previous').toEqual((prev_lottosales?.Hits ?? 0) + 1);
    expect(post_lottosales?.NetAmount, 'Net amount should be 5 more than previous').toEqual((prev_lottosales?.NetAmount ?? 0) + 5);
  });

  test('[C7094] Verify Day Report - Online lottery', { tag: ['@onlinelottery'] }, async ({}) => {
    await POS.Login.In();
    await API.Init();
    const prev_onlinelottery = (await API.Reports.DayReport()).TOTAL_REGISTER?.Category['Online Lottery Sales'];
    await POS.Register.StockSearch.SearchAndSelect({title : ITEMS.LOTTERY.TITLE});
    await POS.Register.PayButton.Click();
    await payfac.Read({ amount: 5 })
    await POS.Dialog.Checkout.Card.Click();
    await POS.Dialog.Success.Close.Click();

    const post_onlinelottery = (await API.Reports.DayReport()).TOTAL_REGISTER?.Category['Online Lottery Sales'];

    expect(post_onlinelottery?.Hits, 'Hits should be 1 more than previous').toEqual((prev_onlinelottery?.Hits ?? 0) + 1);
    expect(post_onlinelottery?.NetAmount, 'Net amount should be 5 more than previous').toEqual((prev_onlinelottery?.NetAmount ?? 0) + 5);
  });

   test('[C7097] Verify Day Report - Online Payout', { tag: ['@onlinepayout'] }, async ({ }) => {
    const customerDetails = {
      name: await POS.FakeData.getName(),
      mobile: (await POS.FakeData.getMobile()).toString(),
      email: await POS.FakeData.getEmail(),
      dob: await POS.FakeData.getDOB({ format: 'MMDDYYYY' }),
      address: await POS.FakeData.getAddress(),
      zipcode: await POS.FakeData.getZipcode(),
    }
    await POS.Login.In();
    await POS.Settings.Click();
    //Enbale Customer Settings
    await POS.Settings.General.ShowCustomerNumber.Check();
    await POS.Register.Click();
    await API.Init();
    const prev_onlinepayout = (await API.Reports.DayReport()).TOTAL_TENDERED?.Category['Online Payout'];
    await POS.Register.Customer.Mobile.setText({ value: customerDetails.mobile });
    await POS.Register.Customer.Options.Click();
 
    // Click on the create new customer button
    await POS.Dialog.CustomerNotFound.CreateNewCustomer.Click();
 
    // Generate the customer details
 
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
    await POS.Dialog.Customerinfo.Ok.Click();
 
    await POS.Register.StockSearch.SearchAndSelect({ title: ITEMS.ONLINE_PAYOUT.TITLE });
    await POS.Register.PayButton.Click();
    await payfac.Read({ amount: ITEMS.ONLINE_PAYOUT.PRICE })
    await POS.Dialog.Checkout.Card.Click();
    await POS.Dialog.Success.Close.Click();
 
    const post_onlinepayout = (await API.Reports.DayReport()).TOTAL_TENDERED?.Category['Online Payout'];
 
    expect(post_onlinepayout?.Hits, 'Hits should be 1 more than previous').toEqual((prev_onlinepayout?.Hits ?? 0) + 1);
    expect(post_onlinepayout?.Expected, 'Net amount should be 5 more than previous').toEqual((prev_onlinepayout?.Expected ?? 0) - ITEMS.ONLINE_PAYOUT.PRICE);
  });

});
