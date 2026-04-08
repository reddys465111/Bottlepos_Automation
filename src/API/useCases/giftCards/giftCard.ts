import { Page } from "@playwright/test";
import { EndPoint } from "../../utils/endPoints";

import { IGiftCardBalanceResponse, Status } from "./interface.GiftCards";
import { IGiftCardLoginResponse } from "./interface.GiftCardLogin";
import { transactionDefault } from "./giftCard.transaction";
import { GIFT_CARD_SCENARIO_CODES, GIFT_CARD_STATIC_SCENARIOS, type GiftCardScenarioConfig } from "./giftCardScenarios";
import { Initializer } from "../../../utils/initializer";

// 🔹 Fake in-memory DB for gift card balances
const giftCardBalanceStore = new Map<string, number>();

/** Default gift card item id used by POS to add gift card line to cart. Must match config general.giftcards.giftcard_itemid and the gift card item id in the database. */
export const DEFAULT_GIFT_CARD_ITEM_ID = "1";

/** Minimal POS item record so the register can add the gift card line to the cart (getItemById finds it). */
function buildMinimalGiftCardItem(id: string | number): Record<string, unknown> {
    const numId = typeof id === "string" ? parseInt(id, 10) : id;
    return {
        id: numId,
        code: "GIFTCARD",
        name: "GIFT CARD",
        shortcutname: "GIFT CARD",
        price: "0.00",
        cost: "0.00",
        itemtype: "gift_item",
        categoryid: 1,
        additionalcharges: [],
        modifiers: [],
        promptforqty: false,
        stock_codes: [
            { id: "1", code: "undefined", upcfull: "", stocklevel: "0" },
        ],
        taxid: null,
        type: "stored",
        qty: 0,
        minprice: "0",
        itemdeposit: [],
        itemtags: [],
        seprate_total_stock: "0",
        total_stock: "0",
        donotdiscountitem: false,
        excludefrompromotion: false,
        showtoweb: 0,
        shortcutkeys: true,
        sort_index: 0,
        itemsortno: "0",
        color_code: "#d1e5f2",
        upcfull: "",
        vendoritemno: "",
        vendorname: "",
        supplierid: "",
        supplier_name: "",
        margin: "0",
        markup: "0",
        lastcost: "0",
        unitspercase: "1",
        reorder_point: "0",
        reorder_value: "0",
        pointsvalue: "0",
        pointsmultiplier: "0",
        itemrank: "",
        description: "",
        notes: "",
        allow_duplicate: true,
    };
}

export interface GiftCardMockOptions {
    /** Mock balance returned when verifying the gift card (e.g. "25.00") */
    balance?: string;
    /** Mock gift card code (e.g. the code used in the request) */
    code?: string;
    /** Initial balance for the mock card */
    initial_balance?: string;
    /** Override the full mock response (array). If set, balance/code/initial_balance are ignored. */
    customResponse?: IGiftCardBalanceResponse[];
    /** Options for POST create/activate gift card mock. If set, POST to Create endpoint is also intercepted. */
    create?: GiftCardCreateMockOptions;
    /** Expiry date (e.g. "02/08/2026"). Optional time HH:mm or HH:mm:ss; if omitted, set to end of that day (23:59:59). */
    expires_at?: string | null;
    /** Card status (e.g. "active" or "inactive") */
    status?: Status;
}

export interface GiftCardCreateMockOptions {
    /** Override code (otherwise taken from request body) */
    code?: string;
    /** Override initial_balance (otherwise taken from request body) */
    initial_balance?: number;
    /** Override id in response (otherwise 1) */
    id?: number;
    /** Override expires_at in response. Optional time HH:mm or HH:mm:ss; if omitted, end of that day. */
    expires_at?: string | null;
}

/**
 * Parses expires_at string. If it includes time (HH:mm or HH:mm:ss), uses that; otherwise sets time to end of day (23:59:59.999).
 */
function parseExpiresAt(value: string): Date {
    const trimmed = value.trim();
    const timeMatch = trimmed.match(/\s+(\d{1,2}):(\d{2})(?::(\d{2}))?\s*$/);
    if (timeMatch) {
        const datePart = trimmed.replace(/\s+\d{1,2}:\d{2}(?::\d{2})?\s*$/, "").trim();
        const d = new Date(datePart);
        if (!Number.isNaN(d.getTime())) {
            const h = parseInt(timeMatch[1], 10);
            const m = parseInt(timeMatch[2], 10);
            const s = timeMatch[3] != null ? parseInt(timeMatch[3], 10) : 0;
            d.setHours(h, m, s, 0);
            return d;
        }
    }
    const dateOnly = new Date(trimmed);
    if (Number.isNaN(dateOnly.getTime())) return dateOnly;
    dateOnly.setHours(23, 59, 59, 999);
    return dateOnly;
}

/** Converts scenario relative expires_at to end-of-day Date. */
function expiresAtFromRelative(relative: "tomorrow" | "yesterday"): Date {
    const d = new Date();
    if (relative === "tomorrow") d.setDate(d.getDate() + 1);
    else d.setDate(d.getDate() - 1);
    d.setHours(23, 59, 59, 999);
    return d;
}

/** Ids for the 5 static scenario cards (stable across responses). */
const STATIC_SCENARIO_IDS = [1001, 1002, 1003, 1004, 1005];

/** Builds one balance response from a static scenario config. */
function buildFromStaticScenario(scenarioConfig: GiftCardScenarioConfig, fixedId?: number): IGiftCardBalanceResponse[] {
    const now = new Date();
    const id = fixedId ?? 1000 + Math.floor(Math.random() * 9000);
    const expiresAt = scenarioConfig.expires_at ? expiresAtFromRelative(scenarioConfig.expires_at) : null;
    return [
        {
            id,
            tenant_id: 1,
            code: scenarioConfig.code,
            issued_at: now as unknown as Date,
            expires_at: expiresAt as unknown as Date,
            initial_balance: scenarioConfig.initial_balance ?? scenarioConfig.balance,
            balance: scenarioConfig.balance,
            status: scenarioConfig.status,
            created_at: now as unknown as Date,
            updated_at: now as unknown as Date,
        },
    ];
}

/** Ordered codes so the 5 static cards are always in the same order with stable ids. */
const STATIC_SCENARIO_ORDER = [
    GIFT_CARD_SCENARIO_CODES.Valid,
    GIFT_CARD_SCENARIO_CODES.Expired,
    GIFT_CARD_SCENARIO_CODES.Inactive,
    GIFT_CARD_SCENARIO_CODES.Active,
    GIFT_CARD_SCENARIO_CODES.ZeroBalance,
];

/** Builds balance response array with all 5 static scenarios (always included in GET balance). */
function buildAllStaticScenarioCards(): IGiftCardBalanceResponse[] {
    return STATIC_SCENARIO_ORDER.flatMap((code, i) =>
        buildFromStaticScenario(GIFT_CARD_STATIC_SCENARIOS[code], STATIC_SCENARIO_IDS[i])
    );
}

/** Builds a single mock gift card. Uses static scenarios when code matches; otherwise builds from options. */
const buildMockGiftCard = (options: GiftCardMockOptions): IGiftCardBalanceResponse[] => {
    if (options.code == null || options.code === "") return [];
    const staticScenario = GIFT_CARD_STATIC_SCENARIOS[options.code];
    if (staticScenario) return buildFromStaticScenario(staticScenario);
    const now = new Date().toISOString();
    const expiresAt = options.expires_at ? parseExpiresAt(options.expires_at) : null;
    const id = 1000 + Math.floor(Math.random() * 9000); // random id in [1000, 9999]
    return [
        {
            id,
            tenant_id: 1,
            code: options.code,
            issued_at: new Date(now) as unknown as Date,
            expires_at: expiresAt as unknown as Date,
            initial_balance: options.initial_balance ?? "0.00",
            balance: options.balance ?? "0.00",
            status: Status.Active,
            created_at: new Date(now) as unknown as Date,
            updated_at: new Date(now) as unknown as Date,
        },
    ];
};

const toApiDate = (d: Date): string =>
    d.toISOString().replace(/\.\d{3}Z$/, ".000000Z");

/** Response shape for POST create (single object with string dates for JSON). */
const createMockGiftCardResponse = (
    code: string,
    initialBalance: number,
    id: number,
    expires_at: string | null
): Record<string, unknown> => {
    const now = new Date();
    const balanceStr = initialBalance.toFixed(2);
    const issuedAt = now.toISOString().slice(0, 10) + "T00:00:00.000000Z";
    return {
        id,
        tenant_id: 1,
        code,
        issued_at: issuedAt,
        expires_at: expires_at,
        initial_balance: balanceStr,
        balance: balanceStr,
        status: Status.Active,
        created_at: toApiDate(now),
        updated_at: toApiDate(now),
    };
};

/**
 * Intercepts GET requests to the gift-cards endpoint (balance) and optionally POST
 * to the create endpoint (create/activate), fulfilling them with mock responses.
 */

export async function injectInternalGiftCardBalanceMock(
    pageOrOptions?: Page | GiftCardMockOptions,
    options: GiftCardMockOptions = {}
): Promise<void> {
    // Allow calling with either (page, options) or (options) only.
    const page: Page = (pageOrOptions && (pageOrOptions as Page).route) ? (pageOrOptions as Page) : Initializer.GetPage();
    const opts: GiftCardMockOptions = (pageOrOptions && !(pageOrOptions as Page).route) ? (pageOrOptions as GiftCardMockOptions) : options;

    // GET /api/gift-cards — balance verification (returns array). Use the code from the request (e.g. ?code=abc123) so the response matches what the POS asked for.
    await page.route(
        (url) => {
            const path = new URL(url).pathname;
            return path === EndPoint.POS.GiftCards.Get || path.startsWith(EndPoint.POS.GiftCards.Get + "?");
        },
        async (route) => {
            if (route.request().method() !== "GET") {
                return route.continue();
            }
            const requestUrl = route.request().url();
            const requestedCode = new URL(requestUrl).searchParams.get("code") ?? undefined;
            const code = (requestedCode != null && requestedCode !== "" ? requestedCode : undefined) ?? opts.code;
            const responseOptions: GiftCardMockOptions = { ...opts, code: code ?? "" };
            // 🔹 Use stored balance if available (after redeem)
            const storedBalance = code ? giftCardBalanceStore.get(code) : undefined;

            const effectiveBalance =
                storedBalance !== undefined
                    ? storedBalance.toFixed(2)
                    : opts.balance ?? "0.00";

            // Always include all 5 static scenario cards; add the requested card if it's not one of them (e.g. newly created).
            let body: IGiftCardBalanceResponse[] = buildAllStaticScenarioCards();
            if (code && !GIFT_CARD_STATIC_SCENARIOS[code]) {
                body = body.concat(
                    buildMockGiftCard({
                        ...responseOptions,
                        balance: effectiveBalance,
                        initial_balance: responseOptions.initial_balance ?? effectiveBalance,
                    })
                );
            }

            if (opts.customResponse?.length) body = body.concat(opts.customResponse as IGiftCardBalanceResponse[]);
            await route.fulfill({
                status: 200,
                contentType: "application/json",
                body: JSON.stringify(body),
            });
        }
    );
}

/**
 * Intercepts POST requests to the gift-cards create/activate endpoint and fulfills
 * them with a mock response (single object).
 * Also injects the gift card item into the items table so the POS can add the 
 * gift card line to the cart when creating/activating.
 * 
 * Note: Native gift card must be enabled via Initializer.Init() with 
 * Scenario.Admin.Settings.GeneralSettings.GiftCards = { Enable: true }
 */
export async function injectActivateGiftCard(
    // page: Page,
    options: GiftCardCreateMockOptions = {}
): Promise<void> {

    const page = Initializer.GetPage();
    await injectGiftCardItemIntoItemsMock(page);
    await injectInternalGiftCardBalanceMock(page, {});
    await page.route(
        (url) => {
            const u = new URL(url);
            return u.pathname === EndPoint.POS.GiftCards.Create && (u.hostname.includes("giftcards") || u.hostname === "localhost");
        },
        async (route) => {
            if (route.request().method() !== "POST") {
                return route.continue();
            }
            let code: string | undefined = options.code;
            let initialBalance: number | undefined = options.initial_balance;
            try {
                const postData = route.request().postDataJSON() as { code?: string; initial_balance?: number } | undefined;
                if (postData?.code != null) code = String(postData.code);
                if (postData?.initial_balance != null) initialBalance = Number(postData.initial_balance);
            } catch {
                // use request/options only
            }
            if (code == null || code === "") {
                await route.fulfill({ status: 400, contentType: "application/json", body: JSON.stringify({ error: "code required" }) });
                return;
            }
            if (initialBalance == null || Number.isNaN(initialBalance)) initialBalance = 0;
            const id = options.id ?? 1;
            const expires_at = options.expires_at != null ? toApiDate(parseExpiresAt(options.expires_at)) : null;
            const response = createMockGiftCardResponse(code, initialBalance, id, expires_at);
            const allGiftCards = [...buildAllStaticScenarioCards(), response as unknown as IGiftCardBalanceResponse];
            await route.fulfill({
                status: 200,
                contentType: "application/json",
                body: JSON.stringify({ ...response, gift_cards: allGiftCards }),
            });
        }
    );
}

/** Default mock response for gift card login (alpha@bottlepos.com). */
const defaultGiftCardLoginResponse: IGiftCardLoginResponse = {
    errorCode: "OK",
    error: "OK",
    data: {
        tenant: { id: 1, name: "BottlePOS Alpha" },
        user: {
            id: 2,
            name: "BottlePOS Alpha Admin",
            email: "alpha@bottlepos.com",
        },
        api_token: "110|f78AbhXkf0MokWCQvaVsUXnX60sgvyV5gkT3rtW8fad11d82",
    },
};

/**
 * Returns the default gift card login response (e.g. for tests that need api_token or user/tenant).
 */
export function giftCardLogin(): IGiftCardLoginResponse {
    return defaultGiftCardLoginResponse;
}

export interface GiftCardAddBalanceMockOptions {
    /** Override gift_card_code (otherwise taken from request body) */
    gift_card_code?: string;
    /** Override gift_card_id in the response (otherwise 1) */
    gift_card_id?: number;
    /** Override transaction id in the response (otherwise 1) */
    transaction_id?: number;
    /** Balance before adding (gift_card.balance = previous_balance + amount). Optional, default 0. */
    previous_balance?: number;
    /** Override initial_balance on the gift_card object (otherwise "0.00") */
    initial_balance?: string;
    /** Override amount (otherwise taken from request body) */
    amount?: number;
}

/**
 * Builds the add-balance (credit) transaction response from transactionDefault,
 * with code, amount, balance, ids and dates updated from request/options.
 */
const createAddBalanceTransactionResponse = (
    code: string,
    amount: number,
    previousBalance: number,
    giftCardId: number,
    transactionId: number,
    initialBalanceStr: string
): Record<string, unknown> => {
    const now = new Date();
    const newBalance = previousBalance + amount;
    const nowStr = toApiDate(now);
    return {
        ...transactionDefault,
        gift_card_id: giftCardId,
        transaction_type: "credit",
        amount,
        updated_at: nowStr,
        created_at: nowStr,
        id: transactionId,
        gift_card: {
            ...transactionDefault.gift_card,
            id: giftCardId,
            code,
            initial_balance: initialBalanceStr,
            balance: newBalance.toFixed(2),
            created_at: nowStr,
            updated_at: nowStr,
        },
    };
};

/**
 * Intercepts POST requests to the gift-cards transactions endpoint (add balance / credit).
 * Use with injectGiftCardBalanceMock so GET /api/gift-cards (check exists) is also mocked.
 * Matches by pathname so it works on any host (e.g. qa-giftcards-api or localhost).
 */
async function injectInternalGiftCardAddBalanceMock(
    page: Page,
    options: GiftCardAddBalanceMockOptions = {}
): Promise<void> {
    await page.route(
        (url) => {
            const path = new URL(url).pathname;
            return path === EndPoint.POS.GiftCards.Transactions || path === "/api/transaction";
        },
        async (route) => {
            if (route.request().method() !== "POST") {
                return route.continue();
            }
            let code: string | undefined = options.gift_card_code;
            let amount: number | undefined = options.amount;
            try {
                const postData = route.request().postDataJSON() as { gift_card_code?: string; amount?: number } | undefined;
                if (postData?.gift_card_code != null) code = String(postData.gift_card_code);
                if (postData?.amount != null) amount = Number(postData.amount);
            } catch {
                // use request/options only
            }
            if (code == null || code === "") {
                await route.fulfill({ status: 400, contentType: "application/json", body: JSON.stringify({ error: "gift_card_code required" }) });
                return;
            }
            if (amount == null || Number.isNaN(amount)) amount = 0;
            const giftCardId = options.gift_card_id ?? 1;
            const transactionId = options.transaction_id ?? 1;
            const previousBalance = options.previous_balance ?? 0;
            const initialBalanceStr = options.initial_balance ?? "0.00";
            const transaction = createAddBalanceTransactionResponse(
                code,
                amount,
                previousBalance,
                giftCardId,
                transactionId,
                initialBalanceStr
            );
            const transactionGiftCard = transaction.gift_card as IGiftCardBalanceResponse;
            const allGiftCards = [...buildAllStaticScenarioCards(), transactionGiftCard];
            await route.fulfill({
                status: 200,
                contentType: "application/json",
                body: JSON.stringify({ data: transaction, gift_cards: allGiftCards }),
            });
        }
    );
}

/**
 * Injects both balance (GET) and add-balance (POST) mocks with one call.
 * Use this when the test checks balance and then adds balance to a gift card.
 */
export async function injectAddGiftCardBalanceMock(
    options: GiftCardMockOptions & GiftCardAddBalanceMockOptions = {}
): Promise<void> {
    const page = Initializer.GetPage();
    await injectInternalGiftCardBalanceMock(page, options);
    await injectInternalGiftCardAddBalanceMock(page, {
        gift_card_code: options.gift_card_code ?? options.code,
        gift_card_id: options.gift_card_id,
        transaction_id: options.transaction_id,
        previous_balance: options.previous_balance,
        initial_balance: options.initial_balance,
        amount: options.amount,
    });
}

export interface GiftCardRedeemFlowMockOptions {
    /** Gift card code */
    code: string;
    /** Current balance on card BEFORE redemption */
    currentBalance: string;
    /** Amount customer wants to pay (amount due on transaction) */
    amountDue: number;
    /** Optional: Override calculated redeem amount */
    redeemAmount?: number;
    /** Optional: Card status (default: "active") */
    status?: Status;
    /** Optional: Expiration date */
    expires_at?: string | null;
    /** Optional: Initial balance when card was created */
    initial_balance?: string;
    /** Optional: Gift card ID */
    gift_card_id?: number;
    /** Optional: Transaction ID */
    transaction_id?: number;
}

/**
 * Injects complete gift card redemption flow mock that mirrors actual POS behavior.
 * 
 * This mock follows the exact flow that happens in production:
 * 1. User scans gift card → GET /api/gift-cards (balance check)
 * 2. POS calculates redeem amount: Math.min(cardBalance, amountDue)
 * 3. User confirms → POST /api/transactions with negative amount
 * 4. Returns updated balance after redemption
 */



export async function injectRedeemGiftCardMock(
    options: GiftCardRedeemFlowMockOptions
): Promise<void> {
    const page = Initializer.GetPage();

    const currentBalance = parseFloat(options.currentBalance);
    const calculatedRedeemAmount = Math.min(currentBalance, options.amountDue);
    const redeemAmount = options.redeemAmount ?? calculatedRedeemAmount;
    const newBalance = currentBalance - redeemAmount;

    const giftCardId = options.gift_card_id ?? 1000 + Math.floor(Math.random() * 9000);
    const now = new Date();
    const expiresAt = options.expires_at ? parseExpiresAt(options.expires_at) : null;

    await injectInternalGiftCardBalanceMock(page, {
        code: options.code,
        balance: options.currentBalance,
        initial_balance: options.initial_balance ?? options.currentBalance,
        expires_at: options.expires_at ?? undefined,
        customResponse: [{
            id: giftCardId,
            tenant_id: 1,
            code: options.code,
            issued_at: now as unknown as Date,
            expires_at: expiresAt as unknown as Date,
            initial_balance: options.initial_balance ?? options.currentBalance,
            balance: options.currentBalance,
            status: options.status ?? Status.Active,
            created_at: now as unknown as Date,
            updated_at: now as unknown as Date,
        }]
    });

    await page.route(
        (url) => {
            const path = new URL(url).pathname;
            return path === EndPoint.POS.GiftCards.Transactions || path === "/api/transaction";
        },
        async (route) => {
            if (route.request().method() !== "POST") {
                return route.continue();
            }

            const transactionId = options.transaction_id ?? 1;
            const expectedAmount = -Math.abs(redeemAmount);

            const remainingDue = options.amountDue - redeemAmount;

            giftCardBalanceStore.set(options.code, newBalance);

            const response = {
                data: {
                    id: transactionId,
                    gift_card_id: giftCardId,
                    transaction_type: "debit",
                    amount: expectedAmount,


                    remaining_due: remainingDue > 0 ? remainingDue.toFixed(2) : "0.00",

                    created_at: toApiDate(now),
                    updated_at: toApiDate(now),
                    gift_card: {
                        id: giftCardId,
                        tenant_id: 1,
                        code: options.code,
                        issued_at: now.toISOString().slice(0, 10) + "T00:00:00.000000Z",
                        expires_at: expiresAt ? toApiDate(expiresAt) : null,
                        initial_balance: options.initial_balance ?? options.currentBalance,
                        balance: newBalance.toFixed(2),
                        status: options.status ?? Status.Active,
                        created_at: toApiDate(now),
                        updated_at: toApiDate(now),
                    }
                },
                gift_cards: buildAllStaticScenarioCards()
            };


            await route.fulfill({
                status: 200,
                contentType: "application/json",
                body: JSON.stringify(response),
            });
        }
    );
}

export interface GiftCardLoginMockOptions {
    /** Override the full login response. */
    customResponse?: IGiftCardLoginResponse;
}

/**
 * Intercepts POST requests to the gift card login endpoint and fulfills them with a mock response.
 * Uses customResponse when provided; otherwise builds response from request body (email) so no hardcoded user data.
 */
export async function injectGiftCardLoginMock(
    page: Page,
    options: GiftCardLoginMockOptions = {}
): Promise<void> {
    await page.route(
        (url) => url.pathname === EndPoint.POS.GiftCards.Login,
        async (route) => {
            if (route.request().method() !== "POST") {
                return route.continue();
            }
            if (options.customResponse) {
                await route.fulfill({
                    status: 200,
                    contentType: "application/json",
                    body: JSON.stringify(options.customResponse),
                });
                return;
            }
            let email: string | undefined;
            try {
                const postData = route.request().postDataJSON() as { email?: string } | undefined;
                if (postData?.email != null) email = String(postData.email).trim();
            } catch {
                // use request only
            }
            const response: IGiftCardLoginResponse = {
                ...defaultGiftCardLoginResponse,
                data: {
                    ...defaultGiftCardLoginResponse.data,
                    user: {
                        ...defaultGiftCardLoginResponse.data.user,
                        email: email ?? defaultGiftCardLoginResponse.data.user.email,
                    },
                },
            };
            await route.fulfill({
                status: 200,
                contentType: "application/json",
                body: JSON.stringify(response),
            });
        }
    );
}

interface InjectGiftCardItemIntoItemsMockOptions {
    /** Gift card item id to inject. Must match config general.giftcards.giftcard_itemid. Default "163". */
    itemId?: string | number;
}

/**
 * Intercepts items/get and items/get/server and injects a minimal gift card item into the response
 * so that when the user adds gift card balance, the POS can add the gift card line to the cart
 * (ItemService.getItemById(giftcard_itemid) finds the item). Use with injectNativeGiftCardEnabled
 * so config.general.giftcards.giftcard_itemid matches this itemId.
 */
export async function injectGiftCardItemIntoItemsMock(
    page: Page,
    options: InjectGiftCardItemIntoItemsMockOptions = {}
): Promise<void> {
    const itemId = String(options.itemId ?? DEFAULT_GIFT_CARD_ITEM_ID);
    const giftCardItem = buildMinimalGiftCardItem(itemId);

    const matchItemsGet = (pathname: string) =>
        pathname === "/api/items/get" ||
        pathname === EndPoint.Items.Get ||
        pathname.startsWith("/api/items/get");

    await page.route(
        (url) => matchItemsGet(new URL(url).pathname),
        async (route) => {
            try {
                const response = await route.fetch();
                const raw = await response.text();
                let body: unknown;
                try {
                    body = JSON.parse(raw);
                } catch {
                    await route.fulfill({ response });
                    return;
                }
                if (body != null && typeof body === "object") {
                    const data = (body as Record<string, unknown>).data;
                    if (data != null && typeof data === "object" && !Array.isArray(data)) {
                        (data as Record<string, unknown>)[itemId] = giftCardItem;
                    } else if (!Array.isArray(body)) {
                        (body as Record<string, unknown>)[itemId] = giftCardItem;
                    }
                }
                await route.fulfill({
                    status: response.status(),
                    headers: response.headers(),
                    body: JSON.stringify(body),
                });
            } catch {
                await route.continue();
            }
        }
    );
    async function injectNativeGiftCardEnabled(page: Page): Promise<void> {
        await page.route(
            (url) => {
                const path = new URL(url).pathname;
                return path === EndPoint.POS.Config.Get || path.startsWith(EndPoint.POS.Config.Get + "?");
            },
            async (route) => {
                if (route.request().method() !== "GET") {
                    return route.continue();
                }
                try {
                    const response = await route.fetch();
                    const body = await response.json();
                    if (body != null && typeof body === "object") {
                        const data = (body as Record<string, unknown>).data;
                        if (data != null && typeof data === "object") {
                            const general = (data as Record<string, unknown>).general;
                            if (general != null && typeof general === "object") {
                                const giftcards = (general as Record<string, unknown>).giftcards;
                                if (giftcards != null && typeof giftcards === "object") {
                                    (giftcards as Record<string, unknown>).enabled = true;
                                    (giftcards as Record<string, unknown>).giftcard_itemid = DEFAULT_GIFT_CARD_ITEM_ID;
                                }
                            }
                        }
                    }
                    await route.fulfill({
                        status: response.status(),
                        headers: response.headers(),
                        body: JSON.stringify(body),
                    });
                } catch {
                    await route.continue();
                }
            }
        );
    }

}
