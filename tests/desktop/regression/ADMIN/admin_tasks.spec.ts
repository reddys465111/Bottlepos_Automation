import { test, expect } from '@playwright/test';
import { ADMIN } from '../../../../src/section/ADMIN';
import { GetCurrentDate, Initializer } from '../../../../src/utils';
import { USERS } from '../../../../src/utils/data/data.users';

//This block runs before each test
test.beforeEach(async ({ page }) => {
    await Initializer.Init(page, {Admin: true});
});

//This block runs after each test
test.afterEach(async ({ page }, testInfo) => {
    await Initializer.Finalize(page, testInfo);
});

test.describe('Admin Section - Tasks', { tag: ['@admin', '@tasks', '@regression'] }, () => {
    
    test('[C6132] As a user, I want to add task details and click the Save button so that newly added task I can see in the task list view', { tag: ['@create_task', '@critical'] }, async ({}) => {
        // Step 1: Login into Admin with admin credentials
        await ADMIN.Login.In();
        // Step 2: Navigate to Tasks menu
        await ADMIN.Menu.Tasks.GoTo();
        await ADMIN.Tasks.AddTasks.Click();
        const taskName = `Test Task ${Date.now()}`;
        const taskType = 'Alert';
        const taskDescription = 'random task 1';
        
        // Step 2.1: Add a task name
        await ADMIN.Dialog.AddTaskList.Name.setText({ value: taskName });
        // Step 2.2: Select the type alert
        await ADMIN.Dialog.AddTaskList.Type.SelectOption({ byText: taskType });
        // Step 2.3: Create a task e.g. "random task 1"
        await ADMIN.Dialog.AddTaskList.Tasks.setText({ value: taskDescription });
        // Step 2.4: Schedule the task for tomorrow (ahead of current date)
        // We'll use the DatePicker to select tomorrow's date
        const currentDate = ADMIN.Tasks.getCurrentDate();
        await ADMIN.Dialog.AddTaskList.ScheduleDate.setDate({day: currentDate.day});
        // Step 2.5: Set start time one hour ahead of the current time
        // We'll use the TimePicker to set the time
        const currentTime = GetCurrentDate(true, 'hh:mm A');
        await ADMIN.Dialog.AddTaskList.StartTime.setTime(`${Number(currentTime.split(':')[0]) + 1}`);
        await ADMIN.Dialog.AddTaskList.TaskNotify.SelectOption({ byText: 'One Time' });
        await ADMIN.Dialog.AddTaskList.Save.Click();

        
        await ADMIN.Dialog.Success.Ok.Click();
        // Step 3: Verify the task is being displayed in the table
        await ADMIN.Tasks.Table.SortByColumn({ columnTitle: 'Name', sortOrder: 'descending' });
        const taskExists = await ADMIN.Tasks.Table.RowExists({ rowColumn: 'Name', rowValue: taskName});
        expect(taskExists, `Task "${taskName}" was not found in the table`).toBeTruthy();
        
        // Additional verification: Check task details in table
        // This verifies that the task was created with the correct information
        expect(await ADMIN.Tasks.Table.GetCellValue({ getValueFrom: 'Type' }, { rowIndex: 1 })).toBe(taskType);
    });

});
