import { Page } from "@playwright/test";
import { Button } from "../../../../objects/button";
import { BaseTable } from "../../../../base/baseTable";
import { Dialog_AddTaskList } from "../../dialogs/dialog_AddTaskList";
import { Legacy_BaseTable } from "../../../../base/legacy/legacy_BaseTable";
import { th } from "@faker-js/faker";
import { TextField } from "../../../../objects/textField";
import { Table_TasksList } from "../../tables/table_TasksList";



export class Tasks {
    private _page: Page;
    
    // Main page elements
    public AddTasks!: Button;
    public ExportCSV!: Button;
    public ImportCSV!: Button;
    public Tasktable!:Table_TasksList
    public Search!: TextField;
    
    // Add Task Dialog
    public AddTaskList!: Dialog_AddTaskList;

    constructor(page: Page) {
        this._page = page;
        this.initialize();
    }

    private initialize(): void {
        // Main page buttons
        this.AddTasks = new Button(this._page.getByRole('button', { name: ' Add Tasks' }));
        this.ExportCSV = new Button(this._page.getByRole('button', { name: ' Export CSV' }));
        this.ImportCSV = new Button(this._page.getByRole('button', { name: ' Import CSV' }));
        this.Search = new TextField(this._page.getByRole('searchbox', { name: 'Search:' }));
        this.Tasktable=new Table_TasksList(this._page.locator('#taskliststable'));
        
        // Add Task Dialog
        this.AddTaskList = new Dialog_AddTaskList(this._page);
    }

    /**
     * Gets the current date in mm-dd-yyyy format
     */
    public getCurrentDate(): { month: string, day: string, year: number } {
        const today = new Date();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        const year = today.getFullYear();
        return { month, day, year };
    }

    /**
     * Gets tomorrow's date in mm-dd-yyyy format
     */
    public getTomorrowDate(): { month: string, day: string, year: number } {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const month = String(tomorrow.getMonth() + 1).padStart(2, '0');
        const day = String(tomorrow.getDate()).padStart(2, '0');
        const year = tomorrow.getFullYear();
        return { month, day, year };
    }

    public async getCurrentTime(): Promise<{hour: number, minute: number, period: 'AM' | 'PM'}> {
        const now = new Date();
        const hour = now.getHours() % 12 || 12;
        const minute = now.getMinutes();
        const period = now.getHours() >= 12 ? 'PM' : 'AM';
        return {hour, minute, period};
    }
        
}
