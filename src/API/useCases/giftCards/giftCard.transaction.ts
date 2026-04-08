/**
 * Default transaction response shape for add-balance (credit).
 * Used as base in the mock; code, amount, balance, ids and dates are updated from request/options.
 */
export const transactionDefault = {
    gift_card_id: 451,
    transaction_type: "credit" as const,
    amount: 10,
    updated_at: "2026-02-06T13:57:17.000000Z",
    created_at: "2026-02-06T13:57:17.000000Z",
    id: 152,
    gift_card: {
        id: 451,
        tenant_id: 1,
        code: "2426AC",
        issued_at: "2026-02-04T00:00:00.000000Z",
        expires_at: null as string | null,
        initial_balance: "100.00",
        balance: "160.00",
        status: "active" as const,
        created_at: "2026-02-04T21:03:42.000000Z",
        updated_at: "2026-02-06T13:57:17.000000Z",
    },
};