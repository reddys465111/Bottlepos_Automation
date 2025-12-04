import { type Locator, type Page } from "@playwright/test";
import { BaseDialog } from "../../../base/baseDialog";
import { Button } from "../../../objects/button";
import { Table_ManageCustomerRewards } from "../pages/customers/tables/table_ManageCustomerRewards";
import { Dialog_AddReward } from "./dialog_AddReward";

export class Dialog_ManageCustomerRewards extends BaseDialog {
    public RewardsTable: Table_ManageCustomerRewards;
    public Add: Button;
    public AddReward!: Dialog_AddReward;

    constructor(page: Page) {
        super(page, "Manage Customer Rewards");
        this.Add = new Button(this._locator.locator("button[title='Add']"));
        this.RewardsTable = new Table_ManageCustomerRewards(this._locator.locator("#customerofferlistbody"));

    }
}