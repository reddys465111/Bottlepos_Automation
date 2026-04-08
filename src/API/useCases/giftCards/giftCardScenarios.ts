import { Status } from "./interface.GiftCards";

/** Static gift card codes for tests. Use these in balance/add-balance flows. */
export const GIFT_CARD_SCENARIO_CODES = {
    Valid: "GFCValid",
    Expired: "GFCExpired",
    Inactive: "GFCInactive",
    Active: "GFCActive",
    ZeroBalance: "GFCZeroBalance",
} as const;

export type GiftCardScenarioCode = (typeof GIFT_CARD_SCENARIO_CODES)[keyof typeof GIFT_CARD_SCENARIO_CODES];

/**
 * Config for a static gift card scenario.
 * expires_at: "tomorrow" = valid (end of next day), "yesterday" = expired (end of previous day).
 */
export interface GiftCardScenarioConfig {
    code: string;
    balance: string;
    initial_balance?: string;
    status: Status;
    expires_at: "tomorrow" | "yesterday" | null;
}

function scenario(
    code: string,
    balance: string,
    status: Status,
    expires_at: "tomorrow" | "yesterday" | null,
    initial_balance?: string
): GiftCardScenarioConfig {
    return { code, balance, initial_balance: initial_balance ?? balance, status, expires_at };
}

/** Static scenarios by code. Used by balance mock when the requested code matches. */
export const GIFT_CARD_STATIC_SCENARIOS: Record<string, GiftCardScenarioConfig> = {
    [GIFT_CARD_SCENARIO_CODES.Valid]: scenario(GIFT_CARD_SCENARIO_CODES.Valid, "50.00", Status.Active, "tomorrow"),
    [GIFT_CARD_SCENARIO_CODES.Expired]: scenario(GIFT_CARD_SCENARIO_CODES.Expired, "50.00", Status.Active, "yesterday"),
    [GIFT_CARD_SCENARIO_CODES.Inactive]: scenario(GIFT_CARD_SCENARIO_CODES.Inactive, "50.00", Status.Inactive, "tomorrow"),
    [GIFT_CARD_SCENARIO_CODES.Active]: scenario(GIFT_CARD_SCENARIO_CODES.Active, "50.00", Status.Active, "tomorrow"),
    [GIFT_CARD_SCENARIO_CODES.ZeroBalance]: scenario(GIFT_CARD_SCENARIO_CODES.ZeroBalance, "0.00", Status.Active, "tomorrow"),
};
