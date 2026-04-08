import { GetISODateFormat } from "../../utils";
import { GenerateDate, GeneratePaymentID, GenerateTransactionID } from "../generator";
import { PayfacAuth, PayfacAuthPayload } from "./interfaces/i.PayfacAuth";
import { GetPaymentStatusData, GetPaymentStatusResponse } from "./interfaces/i.GetPaymentStatus";
import { Page } from "@playwright/test";

export class Payfac {
    private _page: Page;
    private PaymentID: string;
    private TransactionID: string;
    constructor(){
        this._page = {} as Page;
        this.PaymentID = '';
        this.TransactionID = '';
    }
    

    public async Init(page: Page){
        this._page = page;
    }

    /** The Init methdo should be used before to perform the click on the CARD button */
    public async Read(options: {amount: number}){
        this.PaymentID = GeneratePaymentID()! ;
        this.TransactionID  = GenerateTransactionID()!;
        await this._page.waitForTimeout(500);
        await this.Create1();
        await this._page.waitForTimeout(500);
        await this.Auth2(options.amount);
        await this._page.waitForTimeout(500);
        await this.GetStatus3(options.amount);
    }
    
    /**
     * Payfac first step, create the payfac transaction 
     */
    private async Create1(): Promise<void>{
        
        const paymentCreateData = {
            data: {
                payment_id: this.PaymentID,
                status: "requires_payment_method",
                external_transaction_id: this.TransactionID,
                request_id: GenerateDate() //this.RequestID //different
            },
            device: {
                terminal_id: "Nf5FBhvE",
                card_present: "card_present"
            }
        }

        // console.log(paymentCreateData);
        await this._page.route('**/api/Payfac/paymentCreate', async route=>{
            route.fulfill({
                body: JSON.stringify(paymentCreateData),
            })
        })
    }

    /** Payfac second step, after creating the transaction payfac device should be authenticated */
    private async Auth2(amount: number): Promise<void>{
        const payfacAuthPayload: PayfacAuthPayload = {
            payment_id: this.PaymentID,
            date_created: GetISODateFormat(),
            external_transaction_id: this.TransactionID,
            merchant_reference:null,
            status:"payment_method_requested",
            amount: amount.toString(), //"11.12",
            amount_authorized: amount.toString(),
            amount_captured: amount.toString(),
            amount_capturable:0,
            amount_refunded: amount.toString(),
            amount_refundable: amount,
            tip_amount:0,
            donation_amount:0,
            currency:"USD",
            card_present:true,
            payment_method_id:null,
            notes:null,          
            authorization_code:null,
            processor:"Adyen",
            funding_source:null,
            last_error:"",
            last_error_code:"",
            request_id: GenerateDate(), //this.RequestID,
            updated_at: GenerateDate()
        }

        const payfacResponse: PayfacAuth = {
            errorCode: "OK",
            error: "OK",
            data: {
                data: payfacAuthPayload,
                timeout: 120
                
            }
        }
        
        await this._page.route('**/api/Payfac/paymentAuth', async route=>{
            const response = await this._page.request.fetch(route.request());
            // console.log(response.headers);
            route.fulfill({
                body: JSON.stringify(payfacResponse)
            })
        } )
    }

    /** Payfac third step: POS will wait until the status from the transaction is completed (card swiped) */
    private async GetStatus3(amount: number): Promise<void>{
        
        const isoString = GetISODateFormat()
        const PayfacStatusData: GetPaymentStatusData = {
            payment_id: this.PaymentID, //"pi_Bottl1FB184FC5CD31986885B2C2A885",
            date_created: isoString, //"2024-08-02T19:53:16+00:00",
            external_transaction_id: this.TransactionID, //"1722628386443-42-915",
            merchant_reference: null,
            status: "capture_requested",
            amount: amount.toString(),
            amount_authorized: amount.toString(),
            amount_captured: amount.toString(),
            amount_capturable: 0,
            amount_refunded: "0.00",
            amount_refundable: amount.toString(),
            tip_amount: 0,
            donation_amount: 0,
            currency: "USD",
            card_present: true,
            payment_method_id: null,
            notes: null,
            authorization_code: null,
            processor: "Adyen",
            funding_source: null,
            payment:{
               type: "card_present",
               brand: "Mastercard",
               last_4: "9999",
               exp_month: "02",
               exp_year: 28,
               cardholder_name: null,
               receipt_data:{
                  emv_app_id: "A000000004101001",
                  emv_cryptogram: "BA132BC5AF042C3B",  /// is different each time
                  emv_reference_number: "NLNZ73JSKKT33W65", // is different esach time
                  emv_app_label: "mc en gbr gbp",
                  emv_term_id: "Nf5FBhvE",
                  emv_auth_code: "123456"
               },
               avs_response: "",
               payment_method_id: null
            },
            last_error: "",
            last_error_code: "",
            refunds:[ ]
        }
        const PayfacStatusResponse: GetPaymentStatusResponse = {
            error: 'OK',
            errorCode: 'OK',
            data: PayfacStatusData,
        }

        await this._page.route('**/api/Payfac/getPaymentStatus', async route=>{
            const response = await this._page.request.fetch(route.request());
            // console.log(response.headers);
            route.fulfill({
                body: JSON.stringify(PayfacStatusResponse)
            })
        } )

    }

    private async Refund4(amount: number): Promise<void> {
    const isoString = GetISODateFormat();

    const refundData = {
        payment_id: this.PaymentID,
        amount: amount,
        status: "succeeded",
        date_created: isoString,
        external_transaction_id: this.TransactionID,
        amount_refunded: amount.toString(),
        currency: "USD",
        card_present: true,
    };

    const refundResponse = {
        errorCode: "OK",
        error: "OK",
        data: refundData
    };

    await this._page.route('**/api/Payfac/paymentRefund', async (route) => {
        // Allow other requests through
        const request = route.request();
        // console.log(JSON.stringify(refundResponse, null, 2));
        route.fulfill({
            body: JSON.stringify(refundResponse),
        });
    });
}

public async Refund(options: { amount: number }) {
    this.PaymentID = GeneratePaymentID()!;
    this.TransactionID = GenerateTransactionID()!;
    await this._page.waitForTimeout(500);
    await this.Refund4(options.amount);
}


}

