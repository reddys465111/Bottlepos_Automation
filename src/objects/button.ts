import { Locator } from "@playwright/test";
import { BaseObject } from "../base/baseObject";

export class Button extends BaseObject{
    constructor(locator: Locator, events? : {beforeEvent?: Function, afterEvent?: Function}){
        super(locator, {before: events?.beforeEvent, after: events?.afterEvent});
    }
}


///checking git process for the particular button to create a new branch and commit the changes to that branch and push it to remote repository and create PR for the changes made in that branch and merge it to main branch and delete the branch after merging