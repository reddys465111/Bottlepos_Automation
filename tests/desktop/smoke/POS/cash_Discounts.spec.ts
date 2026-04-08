import { test, expect } from '@playwright/test';
import { toggleOption } from '../../../../src/objects/specialObjects/discountToggle';
import { POS } from '../../../../src/section/POS';
import { Initializer, ITEMS, getDateDaysAgo, KEY } from '../../../../src/utils';
import { Reports } from '../../../../src/section/POS/pages/reports/reports';

//This block runs before each test
test.beforeEach(async ({ page }) => {
    await Initializer.Init(page, {
        Scenario: {
            Admin: {
                Settings: {
                    POSSettings: {
                        SaleOptions: {
                            AllowChangingStoredItemPrices: 'Always'
                        }
                    }
                }
            }
        }
    });
});

//This block runs after each test
test.afterEach(async ({ page }, testInfo) => {
    await Initializer.Finalize(page, testInfo);
});

test.describe("Scenarios related to Discounts", { tag: ['@cash', '@discount', '@smoke'] }, () => {

    test('[C83] Verify Applied Dollar Discounts to Items with Cash Payment', { tag: ['@dollar', '@noID'] }, async ({}) => {
        //Login to the POS application
        await POS.Login.In();
        //Enter the barcode of an item and hit enter, item will be ringed up
        //In this case the item category has age verification enabled
        await POS.Register.AddItemByStockcode({ stockCode: ITEMS.CROWN.BARCODE });
        //Age verification dialog appears
        //Enter valid DOB
        await POS.Dialog.AgeVerification.EnterBirthDate.setText({ value: getDateDaysAgo(365 * 21) });
        //Click yes
        await POS.Dialog.AgeVerification.Yes.Click();
        //Just to make it more reliable adding a second item which is enabled as "Do not discount"
        await POS.Register.AddItemByStockcode({ stockCode: ITEMS.LOTTERY.BARCODE });
        await POS.Register.ItemLines.EditPrice({ row: 2, price: 10 });
        //Selecting Dollar discount option and applying $1 Discount
        await POS.Register.Discount.Toggle({ select: toggleOption.DOLLAR });
        //Enter discount value
        await POS.Register.Discount.SetValue({ value: 1, press: KEY.ENTER });
        //Validate discount applied
        expect(await POS.Register.ItemLines.GetDiscountTotal({ row: 1 }), 'Discount not applied correctly').toEqual('1.00');
    });

    test('[C350] Verify Applied Percentage Discounts to Items with Cash Payment', { tag: ['@percentage', '@smoke', '@nonparallelizable'] }, async ({}) => {
        //Login to the POS application
        await POS.Login.In();
        //Enter the barcode of an item and hit enter, item will be ringed up
        //In this case the item category has age verification enabled
        await POS.Register.AddItemByStockcode({ stockCode: ITEMS.CROWN.BARCODE });
        //Age verification dialog appears
        //Enter valid DOB
        await POS.Dialog.AgeVerification.EnterBirthDate.setText({ value: getDateDaysAgo(365 * 21) });
        //Click yes
        await POS.Dialog.AgeVerification.Yes.Click();
        //Just to make it more reliable adding a second item which is enabled as "Do not discount"
        await POS.Register.AddItemByStockcode({ stockCode: ITEMS.LOTTERY.BARCODE });
        await POS.Register.ItemLines.EditPrice({ row: 2, price: 10 });
        //Selecting Percentage discount option and applying 10% Discount
        await POS.Register.Discount.Toggle({ select: toggleOption.PERCENTAGE });
        //Enter discount value
        await POS.Register.Discount.SetValue({ value: 10, press: KEY.ENTER });
        //Validate discount applied
        expect(await POS.Register.ItemLines.GetDiscountTotal({ row: 1 }), 'Discount not applied correctly').toEqual('2.80');
    });

    test('[C3805] Verify Applied Percentage Discounts to Items with no discount enabled', { tag: ['@percentage', '@noDiscount'] }, async ({}) => {
        //Login to the POS application
        await POS.Login.In();
        //Enter the barcode of an item and hit enter, item will be ringed up
        //In this case the item category has age verification enabled
        await POS.Register.AddItemByStockcode({ stockCode: ITEMS.CROWN.BARCODE });
        //Age verification dialog appears
        expect(await POS.Dialog.AgeVerification.AlcoholVerifyAge(), 'Error: Age verification dialog should appear').toEqual(21);
        //Enter under age DOB
        await POS.Dialog.AgeVerification.EnterBirthDate.setText({ value: getDateDaysAgo(365 * 21) });
        //Click yes
        await POS.Dialog.AgeVerification.Yes.Click();
        //In this case the item category has age verification enabled
        await POS.Register.AddItemByStockcode({ stockCode: ITEMS.NO_DISCOUNT.BARCODE });
        //Selecting Percentage discount option and applying 10% Discount
        await POS.Register.Discount.Toggle({ select: toggleOption.PERCENTAGE });
        //Enter discount value
        await POS.Register.Discount.SetValue({ value: 10, press: KEY.ENTER });
        //Validate discount applied
        expect(await POS.Register.ItemLines.GetDiscountTotal({ row: 1 }), 'Error: Discount not applied correctly').toEqual('2.80');
    });


   test('[C3902] Verify coupon discounts % are applied correctly', { tag: ['@coupon', '@percentage'] }, async ({}) => {
        //Login to the POS application
        await POS.Login.In();
        // Add an item
        await POS.Register.AddItemByStockcode({ stockCode: ITEMS.JACK.BARCODE });
        const totalbeforecouponstr=await POS.Register.Total.getText();
        const totalbeforecoupon=Reports.parseCurrency(totalbeforecouponstr);
        await POS.Register.AddItemByStockcode({ stockCode: ITEMS.COUPON_PERCENTAGE.BARCODE });
        // Validate total items in the register
        expect(await POS.Register.TotalItems.getText(), 'Total items in the register is not correct').toEqual('2');
        // Validate coupon amount in the register
        const totalaftercouponstr=await POS.Register.Total.getText();
        const totalaftercoupon=Reports.parseCurrency(totalaftercouponstr);
        expect(totalaftercoupon).toBeLessThan(totalbeforecoupon)
    });

  test('[3902-2] Verify coupon discounts $ are applied correctly', { tag: ['@coupon', '@dollar'] }, async ({}) => {
        //Login to the POS application
        await POS.Login.In();
        // Add an item 
        await POS.Register.AddItemByStockcode({ stockCode: ITEMS.JACK.BARCODE });
        const totalbeforecouponstr=await POS.Register.Total.getText();
        const totalbeforecoupon=Reports.parseCurrency(totalbeforecouponstr);
        // Add a coupon item 
        await POS.Register.AddItemByStockcode({ stockCode: ITEMS.COUPON_DOLLAR.BARCODE });

        // Validate total items in the register
        expect(await POS.Register.TotalItems.getText(), 'Total items in the register is not correct').toEqual('2');
        const totalaftercouponstr=await POS.Register.Total.getText();
        const totalaftercoupon=Reports.parseCurrency(totalaftercouponstr);

        expect(totalaftercoupon).toBeLessThan(totalbeforecoupon);
    });
});
