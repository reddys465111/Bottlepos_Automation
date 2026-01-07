import { test, expect } from '@playwright/test';
import { POS } from '../../../../src/section/POS';
import { Initializer, ITEMS, getDateDaysAgo } from '../../../../src/utils';


//This block runs before each test
test.beforeEach(async ({ page }) => {
    await Initializer.Init(page, { device: { view: 'mobile' } });
});

//This block runs after each test
test.afterEach(async ({ page }, testInfo) => {
    await Initializer.Finalize(page, testInfo);
});

test.describe("Scenarios related to suspend and recall orders ", { tag: ['@mobile', '@cash', '@status', '@regression'] }, () => {

    test('[C82-1] Verify Functionality of Suspending and Complete Orders', { tag: ['@recall'] }, async ({page}) => {
        //Login to the POS application
        await Initializer.LoadScenario({
            Admin: {
                Settings: {
                    POSSettings: {
                        SaleOptions: {
                            AllowChangingStoredItemPrices: 'Always',
                        }
                    }
                }
            }
        })
        await POS.Login.In();
        //Enter the barcode of an item and hit enter, item will be ringed up
        //In this case the item category has age verification enabled
        await POS.Register.AddItemByStockcode({stockCode: ITEMS.CROWN.BARCODE});
        //Age verification dialog appears
        //Enter valid DOB
        await POS.Dialog.AgeVerification.EnterBirthDate.setText({ value: getDateDaysAgo(365 * 21) });
        //Click yes
        await POS.Dialog.AgeVerification.Yes.Click();
        //Ring another item
        await POS.Register.AddItemByStockcode({stockCode: ITEMS.LOTTERY.BARCODE});
        //Edit items price
        await POS.Register.ItemLines.EditPrice({row: 2, price: 10});
        //Checking the register total
        let register_subtotal = await POS.Register.Subtotal.getText();
        //Click on suspend button
        await POS.Register.Suspend.Click();
        //Confirming the POS screen has all items suspended
        expect(await POS.Register.ItemLines.IsEmpty(),'All items are not suspended').toBeTruthy();
        //Click on the recall button
        await POS.Register.Recall.Click();
        //Checking the transaction total in transaction detail dialog
        let transaction_subtotal = await POS.Dialog.TransactionDetails.Subtotal.getText();
        //Confirming the register total with the total on transaction detail dialog
        expect(register_subtotal == transaction_subtotal,'Suspended item total does not match with register total').toBeTruthy();
        //Click complete to ring back all items from suspend state
        await POS.Dialog.TransactionDetails.Complete.Click();
        //Confirming all the suspended items are called back
        expect(await POS.Register.TotalItems.getText(),'Recall is not ringng back 2 previous items').toEqual('2');
    });

});
