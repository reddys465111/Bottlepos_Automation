import { Locator, type Page } from "@playwright/test";
import { BaseDialog } from "../../../base/baseDialog";
import { Button } from "../../../objects/button";
import { Checkbox } from "../../../objects/checkbox";
import { TextField } from "../../../objects/textField";

export class Dialog_SmsPromotion extends BaseDialog {
    public TextMessageContext: Locator;
    public MessageCount: Locator;
    public TermsAndConditions: Checkbox;
    public SuccessMessage: Locator;
    public Back: Button;

    // Contact and group selectors
    public Contacts: TextField;
    public Groups: TextField;
    public Next: Button;
    public SmsText: TextField; 
    public SelectContactChoices: Locator;
    public SelectedContactCount: Locator;
    public SelectGroupChoices: Locator;

    // Additional elements
    public SuccessDetails: Locator;
    public PayTwilioSent: Locator;
    public CloseButton: Button;


    // Message type radio buttons
    public SMSRadio: Checkbox;
    public MMSRadio: Checkbox;
    public ExtendedRadio: Checkbox;

    // Terms & Conditions checkbox for SMS provider
    public AgreeToTerms: Checkbox;
    public Send: Button;

    constructor(page: Page) {
        super(page, "SMS Promotion");

        this.TextMessageContext = this._locator.locator('#textmsgcontext-final');
        this.MessageCount = this._locator.locator('#msgcountfinal');
        this.TermsAndConditions = new Checkbox(this._locator.locator('#groupmessageterms'));
        this.SuccessMessage = this._locator.locator('.success-message');
        this.Back = new Button(this._locator.locator('button[title="Back"]'));
        this.Next = new Button(this._locator.locator('button[title="Next"]'));
        this.SmsText = new TextField(this._locator.locator('.emojionearea-editor'));

        // Contact selectors
        this.Contacts = new TextField(this._locator.locator('#msgselcontact'));
        this.SelectContactChoices = this._locator.locator('.select2-choices');
        this.SelectedContactCount = this._locator.locator('#msgselectcount');

        // Group selectors
        this.Groups = new TextField(this._locator.locator('#s2id_autogen4'));
        this.SelectGroupChoices = this._locator.locator('#s2id_msgselgroups .select2-choices');

        // Terms and conditions for SMS provider

        // Success details and other additional fields
        this.SuccessDetails = this._locator.locator('.sucess-details');
        this.PayTwilioSent = this._locator.locator('.pay-twilio-sent');

        // Close button
        this.CloseButton = new Button(this._locator.locator('button[title="Close"]'));
        this.SMSRadio = new Checkbox(this._locator.locator('input#sms'));
        this.ExtendedRadio = new Checkbox(this._locator.locator('input#extended'));
        this.MMSRadio = new Checkbox(this._locator.locator('input#mms'));

        // Agree to Terms & Conditions checkbox
        this.AgreeToTerms = new Checkbox(this._locator.locator('#groupmessageterms'));

        this.Send = new Button(this._locator.locator('button.btn-primary[title="Send"]'));
    }
}
