import { Page } from "@playwright/test";
import { Button } from "../../../objects/button";
import { TextField } from "../../../objects/textField";
import { Legacy_BaseDialog } from "../../../base/legacy/legacy_BaseDialog";
import { Table_TaskHistoryStatus } from "../tables/table_TaskHistoryStatus";



export class Dialog_TaskListHistory extends Legacy_BaseDialog {
    // Form fields
    public Search: TextField;
    public TaskHistoryTable: Table_TaskHistoryStatus;
    // Action buttons
    public Close: Button;
    
    constructor(page: Page) {
        super(page, "Task List History")
        
        // Initialize form fields
        this.Search = new TextField(this._locator.locator('input[type="search"][aria-controls="tbltasklisthist"]'));
        this.TaskHistoryTable = new Table_TaskHistoryStatus(this._locator.locator('#tbltasklisthist'));
        this.Close = new Button(this._locator.getByRole("button", { name: "Close" }));

        }
    }
