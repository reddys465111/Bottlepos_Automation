import { test as setup, expect } from "@playwright/test";
import { Initializer, Session } from "../../src/utils";
import { GeneralData } from "./scenarios/scenario.cash";
import { Authenticate } from "../../src/API/useCases/auth/useCase.Auth";
import { ScenarioItems } from "./scenarios/scenario.items";
import { ScenarioPromotions } from "./scenarios/scenario.promotions";

setup.describe.serial("Setup initial data and users ", { tag: ['@init'] }, () => {

    setup("Init Data ", { tag: ['@data'] }, async ({ request }) => {
        await Initializer.InitData({ Scenario: GeneralData });
        console.log("URL seeded:" + Session.URL);
    });

    // Initialize items in two parts, to avoid timeout errors
    setup("Init items 1 of 2", { tag: ['@data'] }, async ({ request }) => {
        await Initializer.InitData({ Scenario: { Admin: { 
            Items: 
            {
                    Items: ScenarioItems.slice(0, ScenarioItems.length / 2),
            }
        }}  });
    });

    // Initialize items in two parts, to avoid timeout errors
    setup("Init items 2 of 2", { tag: ['@data'] }, async ({ request }) => {
        await Initializer.InitData({ Scenario: { Admin: { 
            Items: {
                Items: ScenarioItems.slice(ScenarioItems.length / 2, ScenarioItems.length),
            }
        }} 
    });  
    });
    
    // Initialize item promotion
    setup("Init item promotion", { tag: ['@data'] }, async ({ request }) => {
        await Initializer.InitData(
            {
                Scenario: { Admin: {
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
});

