import {test, expect} from '@playwright/test';
import {Initializer, ITEMS} from '../../../../src/utils';
import {POS} from '../../../../src/section/POS';
import {roundToDecimals} from '../../../../src/utils/numberManager';
import { register } from 'module';
import { CustomerScreen } from '../../../../src/section/POS/pages/CustomerScreen/CustomerScreen';



//This block runs before each test
test.beforeEach(async ({ page }) => {
    await Initializer.Init(page);
});

//This block runs after each test
test.afterEach(async ({ page }, testInfo) => {
    await Initializer.Finalize(page, testInfo);
});

test.describe('CustomerScreen Workflow', { tag: ['@CustomerScreen', '@regression', '@nonparallelizable','@pos'] }, () => {

    test('[C4570] Verify Customer Screen displays correct grand total and item count', { tag: ['@CustomerScreen', '@regression','@nonparallelizable'] }, async ({}) => {
        //Step1: Login to POS
        await POS.Login.In();
        await POS.Settings.Click();
        await POS.Settings.General.ShowPriceOnCustomerScreen.Check();
        await POS.Settings.General.ShowTotalOnCustomerScreen.Check();
        await POS.Register.Click();
         //Step2: Add multiple items to the cart
        await POS.Register.AddItemByStockcode({stockCode: ITEMS.BUDLIGHT.BARCODE});
        await POS.Register.AddItemByStockcode({stockCode: ITEMS.JACK.BARCODE});
        const registeritemcount=await POS.Register.TotalItems.getText();
        const registeredTotal = await POS.Register.Total.getText();
        //Click on Customer Screen button to open customer screen
        await POS.CustomerScreenButton.Click();
         //  Get newly opened page (customer screen)
        const customerScreenPage = await POS._page.context().waitForEvent("page");
        const customerScreen  = new CustomerScreen(customerScreenPage);
        await customerScreen.WaitForFirstItem();
        // Verify that the grand total and total Item count on customer screen matches with the registered total
        const customerscreenitemtext=await customerScreen.TotalItems.getText();
        const customerscreenitemcount = customerscreenitemtext.replace(/[^0-9]/g, "");
        expect(customerscreenitemcount,'Item count on Customer Screen is incorrect').toEqual(registeritemcount);
        const customerScreenGrandTotal = await customerScreen.GetGrandTotal();
        expect(customerScreenGrandTotal, 'Grand total on Customer Screen does not match Registered total').toEqual(registeredTotal);
        
    });
    test('[RP-1602] Verify customer Screen updated tax correctly with regsiter Screen', { tag: ['@CustomerScreen', '@regression','@nonparallelizable'] }, async ({}) => {
         //Step1: Login to POS
        await POS.Login.In();
        await POS.Settings.Click();
        await POS.Settings.General.ShowPriceOnCustomerScreen.Check();
        await POS.Settings.General.ShowTotalOnCustomerScreen.Check();
        await POS.Register.Click();
         //Step2: Add multiple items to the cart
        await POS.Register.AddItemByStockcode({stockCode: ITEMS.BUDLIGHT.BARCODE});
        await POS.Register.AddItemByStockcode({stockCode: ITEMS.ExcludecatfromDualPriceitem.BARCODE});
        const registeredTax = await POS.Register.Tax.getText();
         //Click on Customer Screen button to open customer screen
        await POS.CustomerScreenButton.Click();
         //  Get newly opened page (customer screen)
        const customerScreenPage = await POS._page.context().waitForEvent("page");
        const customerScreen  = new CustomerScreen(customerScreenPage);
        await customerScreen.WaitForFirstItem();
        //Verify that the tax on customer screen matches with the registered tax
        const customerScreenTaxtext = await customerScreen.Tax.getText();
        const customerScreenTax = customerScreenTaxtext.replace(/Tax:\s*/i, "").trim();``
        expect(customerScreenTax, 'Tax on Customer Screen does not match Registered tax').toEqual(registeredTax);
       
    });

});