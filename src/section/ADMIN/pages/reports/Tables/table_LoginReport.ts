import { Locator } from "@playwright/test";
import { BaseTable } from "../../../../../base/baseTable";

export type Titles = 'User Id' | 'User Name' | 'Login Type' | 'Device Name' | 'Location Name' | 'Login' | 'Logout' ;

    export class Table_LoginReport extends BaseTable<Titles>{

        constructor(locator: Locator){
            super(locator)

        }
    }