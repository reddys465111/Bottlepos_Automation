import { test as setup, expect } from "@playwright/test";
import { Initializer, Session } from "../../src/utils";
import { GeneralData } from "./scenarios/scenario.cash";
import { Authenticate } from "../../src/API/useCases/auth/useCase.Auth";
import { ScenarioItems } from "./scenarios/scenario.items";
import { ScenarioPromotions } from "./scenarios/scenario.promotions";

/*
This function creates slices of items to avoid timeout errors
*/
function createItemSlices(n: number, totalItems: number): Array<{ start: number; end: number; part: number }> {
    const slices: Array<{ start: number; end: number; part: number }> = [];
    const itemsPerSlice = Math.floor(totalItems / n);
    const remainder = totalItems % n;
    
    let currentStart = 0;
    for (let i = 0; i < n; i++) {
        // Distribute remainder items across first slices
        const currentEnd = currentStart + itemsPerSlice + (i < remainder ? 1 : 0);
        slices.push({
            start: currentStart,
            end: currentEnd,
            part: i + 1
        });
        currentStart = currentEnd;
    }
    
    return slices;
}

setup.describe.serial("Setup initial data and users ", { tag: ['@init'] }, () => {
    // Setup steps (InitData, items, promotions, etc.) use API calls and can exceed default 30s
    setup.setTimeout(120_000);

    setup("Init Data ", { tag: ['@data'] }, async ({ request }) => {
        await Initializer.InitData({ Scenario: GeneralData });
        console.log("URL seeded:" + Session.URL);
    });

    // Initialize items in three parts, to avoid timeout errors
    const totalItems = ScenarioItems.length;
    const numberOfSlices = 3;
    const itemSlices = createItemSlices(numberOfSlices, totalItems);

    for (const slice of itemSlices) {
        setup(`Init items ${slice.part} of ${numberOfSlices}`, { tag: ['@data'] }, async ({ request }) => {
            await Initializer.InitData({ 
                Scenario: { 
                    Admin: { 
                        Items: {
                            Items: ScenarioItems.slice(slice.start, slice.end)
                        }
                    }
                }
            });
        });
    }
    
    // Initialize item promotion
    setup("Init item promotion", { tag: ['@data'] }, async ({ request }) => {
        await Initializer.InitData({
            Scenario: {
                Admin: {
                    Items: {
                        Promotions: ScenarioPromotions
                    }
                }
            }
        });
    });

    setup('Verify User', { tag: ['@credential'] }, async ({ request }) => {
        await Initializer.InitData({})
        // password 'bottlepos 'encripted
        const bottlepos = '38076b9a1a153ff3bcfa0d4e6d89b6d9f1895578e0194911bce3a2d248bfe005';
        // const zapbuild1 = '5d337e200f5da77cb0c0627ef683039b932be9cee09c10032f6f60d98d0d08f2'
        const password1 = await Authenticate({ user: 'admin', password: bottlepos });
        expect(password1.error == 'OK' && password1.errorCode == 'OK', "Credential error: User credentials doesn't not match").toBeTruthy();
        // process.env.POS_PASSWORD = 'bottlepos';
    });

    setup('Setup default POS settings', { tag: ['@data'] }, async ({ request }) => {
        await Initializer.InitData({
            Scenario: {
                POS: {
                    General: {
                        UseOnScreenKeypad: false,
                        ShowFixedKeypad: false,
                    }
                }
            }
        });
    });
});

