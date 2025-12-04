import { ISalesPayload } from "../../../src/API/useCases/Sales/interface.SalesPayload";
import { GenerateDate, GenerateItemRef, GenerateTransactionID } from "../../../src/paymentDevices";

export const defaultSales: ISalesPayload = {
  "total": "30.24",
  "rounding": 0,
  "promocouponcount": 0,
  "promocoupondisc": 0,
  "isroundingenable": false,
  "extracosts": [],
  "ref": GenerateTransactionID(),//"1744748002130-1-3526",
  "userid": "1",
  "devid": "1",
  "locid": "1",
  "custid": "0",
  "custemail": "",
  "custnotes": "",
  "custname": "",
  "custphone": "",
  "customerage": 21,
  "customerdob": "",
  "notes": "",
  "cost": 20,
  "subtotal": "28.00",
  "numitems": 1,
  "processdt": GenerateDate(), //1744748002131,
  "items": [
    {
      "ref": GenerateItemRef(), //"174474800213111081c844",
      "sitemid": "3",
      "qty": 1,
      "name": "CROWN ROYAL 750ML",
      "unit": 28,
      "taxid": "1",
      "increaseqty": "1",
      "code_id": "2",
      "tax": {
        "inclusive": false,
        "ruleid": "1",
        "total": 2.24,
        "values": {
          "1": 2.24
        }
      },
      "discountid": "undefined",
      "lineDiscount": {
        "3": {
          "amount": 0,
          "percentage": 0,
          "username": "admin",
          "discounttype": "dollar"
        }
      },
      "price": "30.24",
      "additionalcharges": "0.00",
      "additionalfeeforprint": "0",
      "additionalfeenontaxable": "0.00",
      "additionalfeetaxable": "0.00",
      "allowebt": false,
      "alt_name": "09334",
      "categoryid": "",
      "changed_price": "28.00",
      "cost": "20.00",
      "desc": "",
      "donotdiscountitem": false,
      "donottrackinventory": false,
      "excludefrompromotion": false,
      "excludeloyaltyreward": false,
      "exclusenoncashadj": false,
      "giftcarditem": false,
      "itemdeposit": 0,
      "itemrank": "",
      "itemtags": [],
      "itemtype": "inventoryitem",
      "loyaltypointsrequired": "",
      "minprice": "",
      "percenttype": "",
      "pointsmultiplier": 1,
      "showhideinventory": 0,
      "tags": [],
      "unit_original": "28.00",
      "upcfull": 0,
      "totalLoyaltyPoints": 0,
      "totalLoyaltyPointsDeduct": 0
    }
  ],
  "codes": [
    {
      "sitemid": "3",
      "qty": 1,
      "name": "CROWN ROYAL 750ML",
      "code_id": "2"
    }
  ],
  "payments": [
    {
      "amount": 30.24,
      "tender": 30.24,
      "change": 0,
      "method": "cash",
      "tip_amount": 0
    }
  ],
  "payout": 0,
  "totaltendered": 30.24,
  "discountamt": 0,
  "multipleDiscounts": {
    "undefined": {
      "amount": 0,
      "percentage": 0,
      "username": "admin",
      "discounttype": "dollar"
    }
  },
  "lineDiscounts": {
    "3": {
      "amount": 0,
      "percentage": 0,
      "username": "admin",
      "discounttype": "dollar"
    }
  },
  "discountvalue": [
    {
      "item_id": "3",
      "discount": 0
    }
  ],
  "discountindex": -1,
  "discount": 0,
  "discount_amountvalue": 0,
  "tax": 2.24,
  "taxdata": {
    "1": 2.24
  },
  "promotions": {},
  "additionalcharges": {},
  "cardfees": 0,
  "manualpriceedit": 0,
  "totalLoyaltyPoints": 0,
  "totalLoyaltyPointsDeduct": 0,
  "rating": "",
  "scanpromocouponcode": [],
  "order_from": "null",
  "declined": false,
  "giftcard": false,
  "response": []
}