import { test, expect } from "@playwright/test";
import { POS } from "../../../../src/section/POS";
import { Initializer, payfac, ITEMS, getDateDaysAgo } from "../../../../src/utils";

//This block runs before each test
test.beforeEach(async ({ page }, testInfo) => {
    await Initializer.Init(page, {
        Scenario: {
            Admin: {
                Settings: {
                    GeneralSettings: {
                        CreditCard: {
                            PayFac: {
                                Enable: true,
                            }
                        }
                    }
                }
            }
        }
    });
    await payfac.Init(page);
})

//This block runs after each test
test.afterEach(async ({ page }, testInfo) => {
    await Initializer.Finalize(page, testInfo)
})

test.describe("Scenarios related to Age Verification using payfac", { tag: ['@age', '@payfac', '@smoke'] }, () => {

    test("[C3798] Verify Display of Age Verification Popup", { tag: ['@valid', '@noID'] }, async ({page}) => {
        //Login to qa.bottlepos.com
        await POS.Login.In();
        //Click on Stock code field
        //add item to the transection
        await POS.Register.AddItemByStockcode({ stockCode: ITEMS.AGE_VERIFICATION.BARCODE })
        //Age verification dialog box appears
        await POS.Dialog.AgeVerification.IsVisible()
        //Enter DOB in correct format "MM/DD/YYY"
        await POS.Dialog.AgeVerification.EnterBirthDate.setText({ value: getDateDaysAgo(365 * 21) })
        //Assert that the Age Verification dialog is visible
        expect(await POS.Dialog.AgeVerification.IsVisible(), 'Error: Age Verification dialog was not displayed').toBeTruthy();
        //Confirm age verification dialog and click yes
        await POS.Dialog.AgeVerification.Yes.Click()
        //Click pay button
        await POS.Register.PayButton.Click()
        //Initiate payfac with amount 21.60
        await payfac.Read({ amount: 21.60 })
        //Click card
        await POS.Dialog.Checkout.Card.Click()
        //Verify that the Approved dialog is visible
        expect(await POS.Dialog.Success.IsVisible(), 'Error: Payfac transaction was not approved').toBeTruthy();
        //Click yes
        await POS.Dialog.Success.Close.Click()
    });

});
