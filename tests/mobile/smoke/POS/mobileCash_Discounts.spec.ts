import { test, expect } from '@playwright/test';
import { toggleOption } from '../../../../src/objects/specialObjects/discountToggle';
import { POS } from '../../../../src/section/POS';
import { Initializer, ITEMS, getDateDaysAgo, KEY } from '../../../../src/utils';

//This block runs before each test
test.beforeEach(async ({ page }) => {
  await Initializer.Init(page, {
    device: { view: 'mobile' },
    Scenario: {
      Admin: {
        Settings: {
          POSSettings: {
            SaleOptions: {
              AllowChangingStoredItemPrices: 'Always',
            },
          },
        },
      },
    },
  });
});

//This block runs after each test
test.afterEach(async ({ page }, testInfo) => {
    await Initializer.Finalize(page, testInfo);
});

test.describe("Scenarios related to Discounts", { tag: ['@mobile', '@cash', '@discount', '@smoke'] }, () => {

    test('[C83-1] Verify Applied Dollar Discounts to Items with Cash Payment', { tag: ['@dollar', '@noID'] }, async ({}) => {
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
        await POS.Register.TotalButton.Click();
        //Selecting Dollar discount option and applying $1 Discount
        await POS.Register.Discount.Toggle({ select: toggleOption.DOLLAR });
        
        //Enter discount value
        await POS.Register.Discount.SetValue({ value: 1, press: KEY.ENTER });
        //Validate discount applied
        expect(await POS.Register.ItemLines.GetDiscountTotal({ row: 1 }), 'Discount not applied correctly').toEqual('1.00');
    });

    test('[C350-1] Verify Applied Percentage Discounts to Items with Cash Payment', { tag: ['@percentage'] }, async ({}) => {
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
        await POS.Register.TotalButton.Click();
        //Selecting Percentage discount option and applying 10% Discount
        await POS.Register.Discount.Toggle({ select: toggleOption.PERCENTAGE });
        //Enter discount value
        await POS.Register.Discount.SetValue({ value: 10, press: KEY.ENTER });
        //Validate discount applied
        expect(await POS.Register.ItemLines.GetDiscountTotal({ row: 1 }), 'Discount not applied correctly').toEqual('2.80');
    });

    test('[C3902-1] Verify coupon discounts % are applied correctly', { tag: ['@coupon', '@dollar'] }, async ({}) => {
        //Login to the POS application
        await POS.Login.In();
        // Add an item 
        await POS.Register.AddItemByStockcode({ stockCode: ITEMS.JACK.BARCODE });
        // Add a coupon item 
        await POS.Register.AddItemByStockcode({ stockCode: ITEMS.COUPON_PERCENTAGE.BARCODE });

        await POS.Register.TotalButton.Click();

        const tmptotal=await POS.Register.Total.getText();
        const tmpsubtotal=await POS.Register.Subtotal.getText();
        // Validate total items in the register
        expect(await POS.Register.TotalItems.getText(), 'Total items in the register is not correct').toEqual('2');

        // Validate total amount in the register
        expect(await POS.Register.Total.getText(), 'Total amount in the register is not correct').toEqual(tmptotal);

        // Validate total discount in the register
        expect(await POS.Register.Subtotal.getText(), 'Total discount in the register is not correct').toEqual(tmpsubtotal);
    });

    test('[CNAN-1] Verify coupon discounts $ are applied correctly', { tag: ['@coupon', '@dollar'] }, async ({}) => {
        //Login to the POS application
        await POS.Login.In();
        // Add an item 
        await POS.Register.AddItemByStockcode({ stockCode: ITEMS.JACK.BARCODE });
        // Add a coupon item 
        await POS.Register.AddItemByStockcode({ stockCode: ITEMS.COUPON_DOLLAR.BARCODE });
        const tmptotal=await POS.Register.Total.getText();
        const tmpsubtotal=await POS.Register.Subtotal.getText();
        // Validate total items in the register

        await POS.Register.TotalButton.Click();
        // Validate total items in the register
        expect(await POS.Register.TotalItems.getText(), 'Total items in the register is not correct').toEqual('2');

        // Validate total amount in the register
        expect(await POS.Register.Total.getText(), 'Total amount in the register is not correct').toEqual(tmptotal);

        // Validate total discount in the register
        expect(await POS.Register.Subtotal.getText(), 'Total discount in the register is not correct').toEqual(tmpsubtotal);
    });

});
