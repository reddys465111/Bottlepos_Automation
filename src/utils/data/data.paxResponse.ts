import { IPaxResponse } from "../../paymentDevices/pax/interfaces/interface.paxResponse";

export const paxResponse: IPaxResponse = 
{
    "errorCode": "OK",
    "error": "OK",
    "data": {
      "total": "0.02",
      "rounding": 0,
      "promocouponcount": 0,
      "promocoupondisc": 0,
      "isroundingenable": false,
      "extracosts": [
        {
          "charge": "0.00",
          "costname": "Non-cash Adj",
          "costrate": "10",
          "costtype": "non_cash_adjustment",
          "discount": "0.00",
          "total": 0.002
        }
      ],
      "ref": "1765900203580-1-6348",
      "userid": "1",
      "devid": "1",
      "locid": "1",
      "custid": "0",
      "custemail": "",
      "custnotes": "",
      "custname": "",
      "custphone": "",
      "customerage": 0,
      "customerdob": "",
      "notes": "",
      "cost": 0,
      "subtotal": "0.02",
      "numitems": 1,
      "processdt": 1765900248887,
      "items": [
        {
          "ref": "17659002488871eac47dbf",
          "sitemid": "0",
          "qty": 1,
          "name": "",
          "unit": 0.02,
          "taxid": "2",
          "increaseqty": "1",
          "code_id": "",
          "tax": {
            "inclusive": false,
            "ruleid": "2",
            "total": 0,
            "values": {}
          },
          "discountid": "undefined",
          "lineDiscount": {},
          "price": "0.02",
          "additionalcharges": "0.00",
          "additionalfeeforprint": "0",
          "additionalfeenontaxable": "0.00",
          "additionalfeetaxable": "0.00",
          "allowebt": false,
          "alt_name": "",
          "categoryid": "",
          "changed_price": ".02",
          "cost": 0,
          "desc": "",
          "donotdiscountitem": false,
          "donottrackinventory": "undefined",
          "excludefrompromotion": false,
          "excludeloyaltyreward": false,
          "exclusenoncashadj": false,
          "giftcarditem": false,
          "itemdeposit": 0,
          "itemrank": "",
          "itemtags": [],
          "itemtype": "manual_item",
          "loyaltypointsrequired": "",
          "minprice": "",
          "percenttype": "",
          "pointsmultiplier": "",
          "showhideinventory": 0,
          "tags": [],
          "unit_original": 0,
          "priceedit": true,
          "upcfull": 0,
          "totalLoyaltyPoints": 0,
          "totalLoyaltyPointsDeduct": 0,
          "id": "4545"
        }
      ],
      "codes": [
        {
          "sitemid": "0",
          "qty": 1,
          "name": "",
          "code_id": null
        }
      ],
      "payments": [
        {
          "change": 0,
          "tender": 0.022000000000000002,
          "tip_amount": 0,
          "method": "card",
          "amount": 0.022000000000000002,
          "id": "4474",
          "processdt": 1765900248887
        }
      ],
      "payout": 0,
      "totaltendered": 0.022000000000000002,
      "discountamt": 0,
      "multipleDiscounts": {},
      "lineDiscounts": {},
      "discountvalue": [
        {
          "item_id": "0",
          "discount": 0
        }
      ],
      "discountindex": -1,
      "discount": 0,
      "discount_amountvalue": 0,
      "tax": 0,
      "taxdata": {},
      "promotions": {},
      "additionalcharges": {},
      "cardfees": 0,
      "manualpriceedit": 0,
      "totalLoyaltyPoints": 0,
      "totalLoyaltyPointsDeduct": 0,
      "rating": "",
      "scanpromocouponcode": [],
      "order_from": "null",
      "response": [
        {
          "Status": "0",
          "Command": "T01",
          "Version": "1.63",
          "ResponseCode": "000000",
          "ResponseMessage": "OK",
          "isApproved": true,
          "HostInformation": [
            "0",
            "DEMO APPROVED",
            "000000",
            "88888888",
            "",
            "",
            "",
            "",
            ""
          ],
          "_processor": {
            "processorLogs": [
              "Approved"
            ],
            "processorRawResponse": "",
            "processorReferenceNumber": "88888888",
            "processorRequestFailed": true,
            "processorRequestWasApproved": true,
            "processorResponseCode": "Approved",
            "processorResponseMessage": "DEMO APPROVED",
            "expressResponseCode": "0",
            "expressResponseMessage": "DEMO APPROVED",
            "hostResponseCode": "0",
            "hostResponseMessage": "DEMO APPROVED",
            "logs": [
              "ExpressResponseCode: ''"
            ],
            "rawResponse": ""
          },
          "TransactionType": "01",
          "commandName": "Sale ",
          "AmountInformation": [
            "2",
            "0",
            "0",
            "0",
            "0",
            "0",
            "12048",
            "2022"
          ],
          "approvedAmount": 0.02,
          "subTotalAmount": 0.02,
          "tipAmount": "0",
          "surcharge_fee": 0,
          "Balance1": 0,
          "Balance2": 0,
          "fsaCard": "NotApplicable",
          "convenienceFeeAmount": "",
          "AccountInformation": [
            "3310",
            "2",
            "1227",
            "",
            "",
            "",
            "02",
            "",
            "",
            "",
            "0",
            "",
            "",
            "",
            ""
          ],
          "accountNumber": "3310",
          "isCardInserted": "",
          "cardHolderName": "",
          "entryMode": "Contactless",
          "cardTypeName": "",
          "TraceInformation": [
            "24",
            "1765900203580-1",
            "20251216105150",
            "",
            "",
            "",
            "",
            ""
          ],
          "AVSinformation": [
            "",
            "",
            "",
            "",
            ""
          ],
          "CommercialInformation": {
            "PONumber": "",
            "CustomerCode": "",
            "TaxExempt": "",
            "TaxExemptID": "",
            "MerchantTaxID": "",
            "DestinationZipCode": "",
            "ProductDescription": ""
          },
          "motoEcommerce": {
            "MOTO_ECommerceMode": "",
            "TransactionType": "",
            "SecureType": "",
            "OrderNumber": "",
            "Installments": "",
            "CurrentInstallment": ""
          },
          "AdditionalInformation": [
            "EDCTYPE=CREDIT",
            "SN=5G115516",
            "GLOBALUID=5G115516202512161051500523",
            "CARDBIN=555671",
            "PROGRAMTYPE=1",
            "TC=44369D73850A7FBD",
            "TVR=0000008001",
            "AID=A0000000041010",
            "TSI=0000",
            "ATC=00DE",
            "APPLAB=MASTERCARD",
            "APPPN=MASTERCARD",
            "IAD=0110A04001220000000000000000000000FF",
            "CVM=7"
          ],
          "VASInformation": {},
          "TORInformation": {},
          "cardLogo": "",
          "currencyCode": "",
          "expirationYear": "",
          "expirationMonth": "",
          "paymentType": "",
          "pinVerified": "",
          "signature": {
            "statusCode": "SignatureNotRequiredByThresholdAmount"
          },
          "statusCode": "Sale Approved",
          "transactionDateTime": "20251216105150",
          "transactionId": "24",
          "merchantId": "",
          "paytype": "pax",
          "binValue": "555671"
        }
      ],
      "id": "4473",
      "dt": new Date("2025-12-16 10:50:51"),
      "balance": 0,
      "status": 1
    }
  }