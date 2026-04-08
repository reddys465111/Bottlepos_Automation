import { Page, Locator } from "@playwright/test";
import { Checkbox } from "../../../../objects/checkbox";
import { Dropdown } from "../../../../objects/dropdown";
import { TextField } from "../../../../objects/textField";

export class Panel_CreditCard {

    public CardType: Dropdown;
    public Sidecard: Checkbox;
    public mobileSidecard: Checkbox;
    public Check: Checkbox;
    public mobileCheck: Checkbox;

    // Datacap
    public ApiURL: TextField;
    public MerchantID: TextField;
    public SequenceNo: TextField;
    public DCcustomtips: Checkbox;
    public DCDebitSales: Checkbox;
    public DCEBTSales: Checkbox;
    public DCEBTcash: Checkbox;

    // Pax
    public PaxApplicationName: TextField;
    public PaxApplicationVersion: TextField;
    public PaxConfigurationTimeout: TextField;
    public PaxPromptForSignature: Dropdown;
    public PaxPromptForTips: Checkbox;
    public PaxCustomTips: Checkbox;
    public PaxEBTSales: Checkbox;
    public PaxEBTCash: Checkbox;
    public PaxSurcharge: Checkbox;

    // PayFac
    public payfacacid: TextField;
    public payfacapiURL: TextField;
    public payfacmanualentry: Checkbox;
    public payfacmanualebtentry: Checkbox;
    public payfacpromttips: Checkbox;
    public payfacebtsale: Checkbox;
    public payfacebtcash: Checkbox;

    // TriposDirect
    public triposUrl: TextField;
    public triposAccept: TextField;
    public triposContentType: TextField;

    public triposAppId: TextField;
    public triposAppName: TextField;
    public triposAppVersion: TextField;

    public triposDeveloperKey: TextField;
    public triposDeveloperSecret: TextField;

    public triposThresholdAmount: TextField;
    public triposPromptForSignature: TextField;

    public triposEbtSales: Checkbox;
    public triposEbtCash: Checkbox;
    public triposMobileEbtSales: Checkbox;
    public triposMobileEbtCash: Checkbox;

    // Pax Fraud Warning
    public ShowFraudWarningOn: {
        Manual: Checkbox,
        Swipe: Checkbox,
        ChipFallBackSwipe: Checkbox,
        Scanner: Checkbox,
        Contactless: Checkbox,
        Chip: Checkbox
    }

    constructor(locator: Locator) {

        this.CardType = new Dropdown(locator.locator('#card_type'));
        this.Sidecard=new Checkbox(locator.locator('#tendersidecard'));
        this.Check=new Checkbox(locator.locator('#tendercheck'));
        this.mobileSidecard=new Checkbox(locator.locator('#mobiletendersidecard'));
        this.mobileCheck=new Checkbox(locator.locator('#mobiletendercheck'));
 
    

        // Pax
        this.PaxApplicationName = new TextField(locator.locator('#pax_application_name'));
        this.PaxApplicationVersion = new TextField(locator.locator('#pax_application_version'));
        this.PaxConfigurationTimeout = new TextField(locator.locator('#pax_timeout'));
        this.PaxPromptForSignature = new Dropdown(locator.locator('#pax_promptForSignature'));
        this.PaxPromptForTips = new Checkbox(locator.locator('#pax_prompt_for_tips'));
        this.PaxCustomTips = new Checkbox(locator.locator('#pax_custom_tips'));
        this.PaxEBTSales = new Checkbox(locator.locator('#pax_ebtsales'));
        this.PaxEBTCash = new Checkbox(locator.locator('#pax_ebtcash'));
        this.PaxSurcharge = new Checkbox(locator.locator('#pax_surcharge'));

        // Datacap
        this.ApiURL = new TextField(locator.locator('#datacapurl'));
        this.MerchantID = new TextField(locator.locator('#datacapmerchant'));
        this.SequenceNo = new TextField(locator.locator('#datacapsequenceno'));
        this.DCcustomtips = new Checkbox(locator.locator('#datacapcustomtip'));
        this.DCDebitSales = new Checkbox(locator.locator('#datacap_debitsales'));
        this.DCEBTSales = new Checkbox(locator.locator('#datacap_ebtsales'));
        this.DCEBTcash = new Checkbox(locator.locator('#datacap_ebtcash'));

        // PayFac
        this.payfacacid = new TextField(locator.locator('#pf_accountid'));
        this.payfacapiURL = new TextField(locator.locator('#pf_apiurl'));
        this.payfacmanualentry = new Checkbox(locator.locator('#pf_card_not_present'));
        this.payfacmanualebtentry = new Checkbox(locator.locator('#pf_ebt_card_not_present'));
        this.payfacpromttips = new Checkbox(locator.locator('#pf_prompt_for_tips'));
        this.payfacebtsale = new Checkbox(locator.locator('#pf_ebtsales'));
        this.payfacebtcash = new Checkbox(locator.locator('#pf_ebtcash'));

        // TriposDirect
        this.triposUrl = new TextField(locator.locator('#tD_url'));
        this.triposAccept = new TextField(locator.locator('#tD_accept'));
        this.triposContentType = new TextField(locator.locator('#tD_content_type'));

        this.triposAppId = new TextField(locator.locator('#tD_tp_application_id'));
        this.triposAppName = new TextField(locator.locator('#tD_tp_application_name'));
        this.triposAppVersion = new TextField(locator.locator('#tD_tp_application_version'));

        this.triposDeveloperKey = new TextField(locator.locator('#tD_developerKey'));
        this.triposDeveloperSecret = new TextField(locator.locator('#tD_developerSecret'));

        this.triposThresholdAmount = new TextField(locator.locator('#tD_tp_thresholdAmount'));
        this.triposPromptForSignature = new TextField(locator.locator('#tD_tp_promptForSignature'));

        this.triposEbtSales = new Checkbox(locator.locator('#tripos_direct_ebtsales'));
        this.triposEbtCash = new Checkbox(locator.locator('#tripos_direct_ebtcash'));

        this.triposMobileEbtSales = new Checkbox(locator.locator('#mobiletripos_direct_ebtsales'));
        this.triposMobileEbtCash = new Checkbox(locator.locator('#mobiletripos_direct_ebtcash'));

        // Pax Fraud Warning
        this.ShowFraudWarningOn = {
            Manual: new Checkbox(locator.locator('#pax_fraud_manual')),
            ChipFallBackSwipe: new Checkbox(locator.locator('#pax_fraud_chipfallback')),
            Swipe: new Checkbox(locator.locator('#pax_fraud_swipe')),
            Scanner: new Checkbox(locator.locator('#pax_fraud_scanner')),
            Chip: new Checkbox(locator.locator('#pax_fraud_chip')),
            Contactless: new Checkbox(locator.locator('#pax_fraud_contactless')),
        }
    }
}