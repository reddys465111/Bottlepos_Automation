import { Page } from "@playwright/test";
import { EndPoint } from "../API/utils/endPoints";

export interface POSConfigMockOptions {
    /** Set general.giftcardenable (enables "Check Gift Card Balance" / native gift card). */
    giftcardenable?: boolean;
    /** Optional giftcards object merged into general.giftcards (e.g. giftcard_itemid, giftcard_expiration). */
    giftcards?: Record<string, unknown>;
}

/**
 * Intercepts POST /api/config/get and merges the given options into the response
 * so the POS sees the mocked state (e.g. native gift card enabled) without changing the backend.
 */
export async function injectPOSConfigMock(
    page: Page,
    options: POSConfigMockOptions
): Promise<void> {
    const path = EndPoint.POS.Config.Get;
    await page.route(
        (url) => url.pathname === path,
        async (route) => {
            if (route.request().method() !== "POST") {
                return route.continue();
            }
            try {
                const response = await route.fetch();
                const body = await response.json();
                if (body?.data && typeof body.data === "object") {
                    if (!body.data.general) body.data.general = {};
                    if (options.giftcardenable !== undefined) {
                        body.data.general.giftcardenable = options.giftcardenable;
                    }
                    if (options.giftcards && typeof options.giftcards === "object") {
                        body.data.general.giftcards = {
                            ...(body.data.general.giftcards || {}),
                            ...options.giftcards,
                        };
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

/** Options for enabling native gift card in the POS. */
export interface InjectNativeGiftCardEnabledOptions {
    /** Gift card item id the POS uses to add the gift card line to the cart. Default "1". Must match the item injected by injectGiftCardItemIntoItemsMock and the gift card item id in the database. */
    giftcard_itemid?: string;
}

/**
 * Enables native gift card in the POS config so the "Check Gift Card Balance" button
 * and related features are visible. Sets general.giftcardenable = true and general.giftcards.giftcard_itemid
 * so the POS can add the gift card item to the cart (use with injectGiftCardItemIntoItemsMock).
 */
export async function injectNativeGiftCardEnabled(
    page: Page,
    options: InjectNativeGiftCardEnabledOptions = {}
): Promise<void> {
    const giftcard_itemid = options.giftcard_itemid ?? "1";
    await injectPOSConfigMock(page, {
        giftcardenable: true,
        giftcards: { giftcard_itemid },
    });
}
