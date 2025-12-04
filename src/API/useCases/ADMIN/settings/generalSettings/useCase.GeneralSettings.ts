import { EntityGeneralSettings, IGeneralSettingsData } from "..";
import { Timezones } from "../../../../../utils";
import { posFetcher } from "../../../../pos.adapter";
import { EncodeData, EndPoint } from "../../../../utils";
import { IGeneralSettingsResponse, IGeneralSettingsResponseData } from "./interface.GeneralSettingsResponse";

export const LoadGeneralSettings = async (): Promise<IGeneralSettingsResponseData> => {
    return (await posFetcher.get<IGeneralSettingsResponse>({ url: EndPoint.GeneralSettings.Get })).data.data;
}

export const GeneralSettings_LoadArgs = async (eGeneralSettings: EntityGeneralSettings): Promise<IGeneralSettingsData> => {
    if (eGeneralSettings) {
        console.log('Loading General Settings');
    }
    const loadedGeneralSettingsProps = await LoadGeneralSettings();
     const cardType =
        // ( eGeneralSettings.CreditCard?.Tripos       ? 'Tripos'          : undefined ) ?? 
        // ( eGeneralSettings.CreditCard?.TriposDirect ? 'TriposDirect'    : undefined ) ??
        // ( eGeneralSettings.CreditCard?.DataCap      ? 'DataCap'         : undefined ) ?? 
        (eGeneralSettings.CreditCard?.Pax ? 'Pax' : undefined) ?? 'PayFac'

     const newGeneralSettingsProps : IGeneralSettingsData = { 
        ...loadedGeneralSettingsProps,
        /** FORMATS  */
        timezone: eGeneralSettings.Formats?.TimeZone ?? (loadedGeneralSettingsProps.timezone as Timezones),
        dateformat: eGeneralSettings.Formats?.DateFormat ?? loadedGeneralSettingsProps.dateformat,

        currencyformat: GetCurrencyFormat({
            symbol: eGeneralSettings.Formats?.CurrencySymbol,
            decimals: eGeneralSettings.Formats?.CurrencyDecimals,
            separatorD: eGeneralSettings.Formats?.DecimalSeparator,
            separatorT: eGeneralSettings.Formats?.ThousandSeparator,
            position: eGeneralSettings.Formats?.SymbolPosition
        }),

        /** BUSINESS DETAILS */

        /** ALTERNATE LABELS */

        /** SMS */

        /** EMAIL */

        /** AUTOMATION SETTINGS */

        /** DEFAULT TIME FOR REPORTS */

        tendersettings: {
            tendersidecard : eGeneralSettings.TenderSettings?.SideCard ?? loadedGeneralSettingsProps.tendersettings?.tendersidecard ?? false,
            tendercheck: eGeneralSettings.TenderSettings?.Check ?? loadedGeneralSettingsProps.tendersettings?.tendercheck ?? false,
        },

        /** INVENTORY SETTINGS */

        /** OTHER SETTINGS */

        /** LOYALTY SETTINGS */
        loyaltysettings: {
            loyaltystatus: eGeneralSettings.loyaltysettings?.loyaltystatus ?? loadedGeneralSettingsProps.loyaltysettings?.loyaltystatus ?? false,
            pointdollarratio: eGeneralSettings.loyaltysettings?.pointdollarratio ?? loadedGeneralSettingsProps.loyaltysettings?.pointdollarratio ?? '',
        },

        /** CREDIT CARD */
        card_type: cardType,
        paxsettings: {
            pax_surcharge: eGeneralSettings.CreditCard?.Pax?.Surcharge ?? loadedGeneralSettingsProps.paxsettings?.pax_surcharge ?? false,
            pax_application_name: eGeneralSettings.CreditCard?.Pax?.PaxApplicationName ?? loadedGeneralSettingsProps.paxsettings?.pax_application_name,
            pax_timeout: eGeneralSettings.CreditCard?.Pax?.ConfigurationTimeout ?? loadedGeneralSettingsProps.paxsettings?.pax_timeout,
            mobilepax_debitsales: eGeneralSettings.CreditCard?.Pax?.ShowFraudWarningOn?.Swipe ?? loadedGeneralSettingsProps.paxsettings?.mobilepax_debitsales ?? false,
            mobilepax_ebtcash: eGeneralSettings.CreditCard?.Pax?.ShowFraudWarningOn?.Swipe ?? loadedGeneralSettingsProps.paxsettings?.mobilepax_ebtcash ?? false,
            mobilepax_ebtsales: eGeneralSettings.CreditCard?.Pax?.ShowFraudWarningOn?.Swipe ?? loadedGeneralSettingsProps.paxsettings?.mobilepax_ebtsales ?? false,
            mobilepax_giftcard: eGeneralSettings.CreditCard?.Pax?.ShowFraudWarningOn?.Swipe ?? loadedGeneralSettingsProps.paxsettings?.mobilepax_giftcard ?? false,
            pax_promptForSignature: eGeneralSettings.CreditCard?.Pax?.ConfigurationPromptForSignature ?? loadedGeneralSettingsProps.paxsettings?.pax_promptForSignature,
            pax_fraudprevention: eGeneralSettings.CreditCard?.Pax?.FraudPrevention ?? loadedGeneralSettingsProps.paxsettings?.pax_fraudprevention,
            pax_fraud_manual: eGeneralSettings.CreditCard?.Pax?.ShowFraudWarningOn?.Manual ?? loadedGeneralSettingsProps.paxsettings?.pax_fraud_manual ?? false,
            pax_fraud_swipe: eGeneralSettings.CreditCard?.Pax?.ShowFraudWarningOn?.Swipe ?? loadedGeneralSettingsProps.paxsettings?.pax_fraud_swipe ?? false,
            pax_fraud_chipfallback: eGeneralSettings.CreditCard?.Pax?.ShowFraudWarningOn?.ChipFallBackSwipte ?? loadedGeneralSettingsProps.paxsettings?.pax_fraud_chipfallback ?? false,
            pax_fraud_scanner: eGeneralSettings.CreditCard?.Pax?.ShowFraudWarningOn?.Scanner ?? loadedGeneralSettingsProps.paxsettings?.pax_fraud_scanner ?? false,
            pax_fraud_contactless: eGeneralSettings.CreditCard?.Pax?.ShowFraudWarningOn?.ContactLess ?? loadedGeneralSettingsProps.paxsettings?.pax_fraud_contactless ?? false,
            pax_fraud_chip: eGeneralSettings.CreditCard?.Pax?.ShowFraudWarningOn?.Chip ?? loadedGeneralSettingsProps.paxsettings?.pax_fraud_chip ?? false,
            pax_fraudwarningamt: eGeneralSettings.CreditCard?.Pax?.AmountAbove ?? loadedGeneralSettingsProps.paxsettings?.pax_fraudwarningamt,
            pax_prompt_for_tips: eGeneralSettings.CreditCard?.Pax?.PromptForTips ?? loadedGeneralSettingsProps.paxsettings?.pax_prompt_for_tips,
            pax_application_version: eGeneralSettings.CreditCard?.Pax?.PaxApplicationVersion ?? loadedGeneralSettingsProps.paxsettings?.pax_application_version ?? '',
            pax_batchclosetoggle: eGeneralSettings.CreditCard?.Pax?.BatchCloseToggle ?? loadedGeneralSettingsProps.paxsettings?.pax_batchclosetoggle ?? false,
            pax_custom_one_tip: eGeneralSettings.CreditCard?.Pax?.CustomTips?.tip1 ?? loadedGeneralSettingsProps.paxsettings?.pax_custom_one_tip ?? '',
            pax_custom_three_tip: eGeneralSettings.CreditCard?.Pax?.CustomTips?.tip3 ?? loadedGeneralSettingsProps.paxsettings?.pax_custom_three_tip ?? '',
            pax_custom_tips: eGeneralSettings.CreditCard?.Pax?.CustomTips?.enable ?? loadedGeneralSettingsProps.paxsettings?.pax_custom_tips ?? false,
            pax_custom_two_tip: eGeneralSettings.CreditCard?.Pax?.CustomTips?.tip2 ?? loadedGeneralSettingsProps.paxsettings?.pax_custom_two_tip ?? '',
            pax_debitsales: eGeneralSettings.CreditCard?.Pax?.DebitSales ?? loadedGeneralSettingsProps.paxsettings?.pax_debitsales ?? false,
            pax_ebtcash: eGeneralSettings.CreditCard?.Pax?.EbtCash ?? loadedGeneralSettingsProps.paxsettings?.pax_ebtcash ?? false,
            pax_ebtsales: eGeneralSettings.CreditCard?.Pax?.EbtSales ?? loadedGeneralSettingsProps.paxsettings?.pax_ebtsales ?? false,
        },
        payfac: {
            pf_accountid: eGeneralSettings.CreditCard?.PayFac?.AccountID ?? loadedGeneralSettingsProps.payfac?.pf_accountid ?? '1',
            pf_apiurl: eGeneralSettings.CreditCard?.PayFac?.APIURL ?? loadedGeneralSettingsProps.payfac?.pf_apiurl ?? 'https://payment.bottlepos.com/',
            pf_ebtsales: eGeneralSettings.CreditCard?.PayFac?.EbtSales ?? loadedGeneralSettingsProps.payfac?.pf_ebtsales,
            pf_ebtcash: eGeneralSettings?.CreditCard?.PayFac?.EbtCash ?? loadedGeneralSettingsProps.payfac?.pf_ebtcash,
            pf_card_not_present: eGeneralSettings?.CreditCard?.PayFac?.AllowManualEntry ?? loadedGeneralSettingsProps.payfac?.pf_card_not_present,
            pf_timeout: eGeneralSettings.CreditCard?.PayFac?.P5Timeout ?? loadedGeneralSettingsProps.payfac?.pf_timeout ?? '20',
            pf_max_refund_amount: eGeneralSettings.CreditCard?.PayFac?.MaxRefundAmount ?? loadedGeneralSettingsProps.payfac?.pf_max_refund_amount,
            pf_fraudprevention: eGeneralSettings.CreditCard?.PayFac?.FraudPrevention ?? loadedGeneralSettingsProps.payfac?.pf_fraudprevention,

            pf_fraud_manual: eGeneralSettings.CreditCard?.PayFac?.ShowFraudWarningOn?.Manual ?? loadedGeneralSettingsProps.payfac?.pf_fraud_manual ?? false,
            pf_fraud_swipe: eGeneralSettings.CreditCard?.PayFac?.ShowFraudWarningOn?.Swipe ?? loadedGeneralSettingsProps.payfac?.pf_fraud_swipe ?? false,
            pf_fraud_chipfallback: eGeneralSettings.CreditCard?.PayFac?.ShowFraudWarningOn?.ChipFallBackSwipte ?? loadedGeneralSettingsProps.payfac?.pf_fraud_chipfallback ?? false,
            pf_fraud_scanner: eGeneralSettings.CreditCard?.PayFac?.ShowFraudWarningOn?.Scanner ?? loadedGeneralSettingsProps.payfac?.pf_fraud_scanner ?? false,
            pf_fraud_contactless: eGeneralSettings.CreditCard?.PayFac?.ShowFraudWarningOn?.ContactLess ?? loadedGeneralSettingsProps.payfac?.pf_fraud_contactless ?? false,
            pf_fraud_chip: eGeneralSettings.CreditCard?.PayFac?.ShowFraudWarningOn?.Chip ?? loadedGeneralSettingsProps.payfac?.pf_fraud_chip ?? false,

            pf_fraudwarningamt: eGeneralSettings.CreditCard?.PayFac?.AmountAbove ?? loadedGeneralSettingsProps.payfac?.pf_fraudwarningamt,
            pf_prompt_for_tips: eGeneralSettings.CreditCard?.PayFac?.PromptForTips ?? loadedGeneralSettingsProps.payfac?.pf_prompt_for_tips,

            pf_payfac_custom_tips: eGeneralSettings.CreditCard?.PayFac?.CustomTips?.enable ?? loadedGeneralSettingsProps.payfac?.pf_payfac_custom_tips,
            pf_custom_one_tip: eGeneralSettings.CreditCard?.PayFac?.CustomTips?.tip1 ?? loadedGeneralSettingsProps.payfac?.pf_custom_one_tip,
            pf_custom_two_tip: eGeneralSettings.CreditCard?.PayFac?.CustomTips?.tip2 ?? loadedGeneralSettingsProps.payfac?.pf_custom_two_tip,
            pf_custom_three_tip: eGeneralSettings.CreditCard?.PayFac?.CustomTips?.tip3 ?? loadedGeneralSettingsProps.payfac?.pf_custom_three_tip,

        },
        triposdirect: {
            mobiletripos_direct_ebtcash: eGeneralSettings.CreditCard?.TriposDirect?.MobileEbtCash ?? loadedGeneralSettingsProps.Triposdirect?.mobiletripos_direct_ebtcash ?? false,
            mobiletripos_direct_ebtsales: eGeneralSettings.CreditCard?.TriposDirect?.MobileEbtSales ?? loadedGeneralSettingsProps.Triposdirect?.mobiletripos_direct_ebtsales ?? false,
            tD_accept: eGeneralSettings.CreditCard?.TriposDirect?.Accept ?? loadedGeneralSettingsProps.Triposdirect?.tD_accept ?? '',
            tD_content_type: eGeneralSettings.CreditCard?.TriposDirect?.ContentType ?? loadedGeneralSettingsProps.Triposdirect?.tD_content_type ?? '',
            tD_developerKey: eGeneralSettings.CreditCard?.TriposDirect?.DeveloperKey ?? loadedGeneralSettingsProps.Triposdirect?.tD_developerKey ?? '',
            tD_developerSecret: eGeneralSettings.CreditCard?.TriposDirect?.DeveloperSecret ?? loadedGeneralSettingsProps.Triposdirect?.tD_developerSecret ?? '',
            tD_tp_application_id: eGeneralSettings.CreditCard?.TriposDirect?.TpApplicationId ?? loadedGeneralSettingsProps.Triposdirect?.tD_tp_application_id ?? '',
            tD_tp_application_name: eGeneralSettings.CreditCard?.TriposDirect?.TpApplicationName ?? loadedGeneralSettingsProps.Triposdirect?.tD_tp_application_name ?? '',
            tD_tp_application_version: eGeneralSettings.CreditCard?.TriposDirect?.TpApplicationVersion ?? loadedGeneralSettingsProps.Triposdirect?.tD_tp_application_version ?? '',
            tD_tp_promptForSignature: eGeneralSettings.CreditCard?.TriposDirect?.TpPromptForSignature ?? loadedGeneralSettingsProps.Triposdirect?.tD_tp_promptForSignature ?? '',
            tD_tp_thresholdAmount: eGeneralSettings.CreditCard?.TriposDirect?.TpThresholdAmount ?? loadedGeneralSettingsProps.Triposdirect?.tD_tp_thresholdAmount ?? '',
            tD_url: eGeneralSettings.CreditCard?.TriposDirect?.Url ?? loadedGeneralSettingsProps.Triposdirect?.tD_url ?? '',
            tripos_direct_ebtcash: eGeneralSettings.CreditCard?.TriposDirect?.EbtCash ?? loadedGeneralSettingsProps.Triposdirect?.tripos_direct_ebtcash ?? false,
            tripos_direct_ebtsales: eGeneralSettings.CreditCard?.TriposDirect?.EbtSales ?? loadedGeneralSettingsProps.Triposdirect?.tripos_direct_ebtsales ?? false,
        },
    }
    const response = await posFetcher.post<IGeneralSettingsData>({ url: EndPoint.GeneralSettings.Edit, data: EncodeData(newGeneralSettingsProps) });
    return response.data;
}

const GetCurrencyFormat = (options: { symbol?: string, decimals?: string, separatorD?: string, separatorT?: string, position?: 'Before Amount' | 'After Amount' }): string => {
    const _symbol = options.symbol ?? '$';
    const _decimal = options.decimals ?? '2';
    const _separatorD = options.separatorD ?? '.';
    const _separatorT = options.separatorT ?? ',';
    const _position = options.position ?? 'Before Amount';

    return `${_symbol}~${_decimal}~${_separatorD}~${_separatorT}~${_position == 'Before Amount' ? 0 : 1}`;
}