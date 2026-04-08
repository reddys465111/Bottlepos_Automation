import { Page } from "@playwright/test";
import { Button } from "../../../objects/button";
import { Checkbox } from "../../../objects/checkbox";
import { Dropdown } from "../../../objects/dropdown";
import { Loader } from "../../../objects/loader";
import { Processing } from "../../../objects/processing";
import { TextField } from "../../../objects/textField";
import { DatePicker } from "../../../objects/datePicker";
import { TimePicker } from "../../../objects/timePicker";
import { Legacy_BaseDialog } from "../../../base/legacy/legacy_BaseDialog";


export class Dialog_EditTaskList extends Legacy_BaseDialog {
    // Form fields
    public Name: TextField;
    public Type: Dropdown;
    public Enable: Checkbox;
    public Tasks: TextField;
    public ScheduleDate: DatePicker;
    public StartTime: TimePicker;
    public EndTime: TimePicker;
    public TaskNotify: Dropdown;
    public EmailAddress: TextField;
    public Device: Dropdown;

    // Action buttons
    public Save: Button;
    public Cancel: Button;
    
    constructor(page: Page) {
        super(page, "Add Task List")
        
        // Initialize form fields
        this.Name = new TextField(this._locator.locator('#newtasklistname'));
        this.Type = new Dropdown(this._locator.locator('#newtasktype'));
        this.Enable = new Checkbox(this._locator.locator('input[type="checkbox"]').first());
        this.Tasks = new TextField(this._locator.locator('#newtaskname1'));
        this.ScheduleDate = new DatePicker(this._locator.locator('#scheduletaskdate'), page);
        this.StartTime = new TimePicker(this._locator.locator('#newtasktime'), page);
        this.EndTime = new TimePicker(this._locator.locator('#newtaskendtime'), page);
        this.TaskNotify = new Dropdown(this._locator.locator('#newtaskeverytype'));
        this.EmailAddress = new TextField(this._locator.locator('#newtaskemail'));
        this.Device = new Dropdown(this._locator.locator('#newtaskdevice'));

        // Initialize action buttons
        this.Save = new Button(this._locator.getByRole("button", { name: "Save" }));
        this.Cancel = new Button(this._locator.getByRole("button", { name: "Cancel" }));

        // Set up save event handling
        this.Save.SetAfterEvent(async () => {
            const loader = new Loader(page);
            const processing = new Processing(this._locator);
            await Promise.all([
                loader.waitForHidden(),
                processing.waitForHidden()
            ]);
        });
    }

  

  
    /**
     * Handle date picker selection for schedule date
     */
    public async selectScheduleDate(date: Date): Promise<void> {
        await this.ScheduleDate.Click();
        const day = date.getDate();
        await this._page.locator(`td:has-text("${day}")`).first().click();
    }

    /**
     * Handle time picker selection for start time
     */
    public async selectStartTime(hour: number, minute: number): Promise<void> {
        await this.StartTime.Click();
        const startTimeLocator = this._locator.locator('#newtasktime');
        await startTimeLocator.locator(`[data-hour="${hour}"]`).click();
        await startTimeLocator.locator(`[data-minute="${minute}"]`).click();
        await startTimeLocator.locator('button:has-text("Done")').click();
    }


    private async PickDay(day: number): Promise<void> {
        await this._page.locator('.datepicker-days td:not(.old):not(.new)').getByText(day.toString()).click();
    }
    
    private async PickTime(hour: number, minute: number): Promise<void> {
        const timePickerLocator = this._locator.locator('#newtasktime');
        await timePickerLocator.locator(`[data-hour="${hour}"]`).click();
        await timePickerLocator.locator(`[data-minute="${minute}"]`).click();
        await timePickerLocator.locator('button:has-text("Done")').click();
    }
}
