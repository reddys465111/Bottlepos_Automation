import { Locator } from "@playwright/test";
import { BaseObject } from "../base/baseObject";

export class Button extends BaseObject{
    constructor(locator: Locator, events? : {beforeEvent?: Function, afterEvent?: Function}){
        super(locator, {before: events?.beforeEvent, after: events?.afterEvent});
    }
}