import { test, expect } from '@playwright/test';
import { ADMIN } from '../../../../src/section/ADMIN';
import { GetCurrentDate, Initializer } from '../../../../src/utils';
import { USERS } from '../../../../src/utils/data/data.users';

//This block runs before each test
test.beforeEach(async ({ page }) => {
    await Initializer.Init(page, { Admin: true });
});

//This block runs after each test
test.afterEach(async ({ page }, testInfo) => {
    await Initializer.Finalize(page, testInfo);
});

test.describe('Admin Section - Tasks', { tag: ['@admin', '@tasks', '@regression'] }, () => {

    test('[C6132] As a user, I want to add task details and click the Save button so that newly added task I can see in the task list view', { tag: ['@create_task', '@critical'] }, async ({ }) => {
        // Step 1: Login into Admin with admin credentials
        await ADMIN.Login.In();
        // Step 2: Navigate to Tasks menu
        await ADMIN.Menu.Tasks.GoTo();
        await ADMIN.Tasks.AddTasks.Click();
        const taskName = `TEST TASK ${Date.now()}`;
        const taskType = 'Alert';
        const taskDescription = 'RANDOM TASK 1';
        // Step 3: Add a task name
        await ADMIN.Dialog.AddTaskList.Name.setText({ value: taskName });
        // Step 4: Select the type alert
        await ADMIN.Dialog.AddTaskList.Type.SelectOption({ byText: taskType });
        // Step 5: Create a task e.g. "random task 1"
        await ADMIN.Dialog.AddTaskList.Tasks.setText({ value: taskDescription });
        // Step 6: Schedule the task for tomorrow (ahead of current date)
        const currentDate = ADMIN.Tasks.getCurrentDate();
        await ADMIN.Dialog.AddTaskList.ScheduleDate.setDate({ day: currentDate.day });
        // Step 7: Set start time one hour ahead of the current time
        const currentTime = GetCurrentDate(true, 'hh:mm A');
        await ADMIN.Dialog.AddTaskList.StartTime.setTime(`${Number(currentTime.split(':')[0]) + 1}`);
        await ADMIN.Dialog.AddTaskList.TaskNotify.SelectOption({ byText: 'One Time' });
        // Step 8: Save the new task
        await ADMIN.Dialog.AddTaskList.Save.Click();
        await ADMIN.Dialog.Success.Ok.Click();
        // Step 9: Verify the newly created task appears in the Tasks List table
        const taskExists = await ADMIN.Tasks.Tasktable.RowExists({ rowColumn: 'Name', rowValue: taskName });
        expect(taskExists, `Task "${taskName}" was not found in the table`).toBeTruthy();


    });
    test('[C6120] Navigate the Tasks page and verify the  Tasks List table is displayed correctly', { tag: ['@tasks', '@Admin', '@regression'] }, async ({ }) => {
        //Step :1 Login to Admin
        await ADMIN.Login.In();
        //Step :2 Navigate to Tasks menu
        await ADMIN.Menu.Tasks.GoTo();
        //Step: 3 Verify the Tasks List dialog is displayed correctly
        expect(await ADMIN.Tasks.AddTasks.IsClickable()).toBeTruthy();

    });
    test('[C6134] Verify search functionality in Tasks table', { tag: ['@SearchTask', '@Admin'] }, async ({ }) => {
        // Step 1: Login into Admin with admin credentials
        await ADMIN.Login.In();
        // Step 2: Navigate to Tasks menu
        await ADMIN.Menu.Tasks.GoTo();
        await ADMIN.Tasks.AddTasks.Click();
        const taskName = `SEARCH TASK ${Date.now()}`;
        const taskType = 'Check List';
        const taskDescription = 'SEARCHE A TASK 1';
        // Step 3: Add a task name
        await ADMIN.Dialog.AddTaskList.Name.setText({ value: taskName });
        // Step 4: Select the type alert
        await ADMIN.Dialog.AddTaskList.Type.SelectOption({ byText: taskType });
        // Step 5: Create a task e.g. "random task 1"
        await ADMIN.Dialog.AddTaskList.Tasks.setText({ value: taskDescription });
        // Step 6: Schedule the task for tomorrow (ahead of current date)
        const currentDate = ADMIN.Tasks.getCurrentDate();
        await ADMIN.Dialog.AddTaskList.ScheduleDate.setDate({ day: currentDate.day });
        // Step 7: Set start time one hour ahead of the current time
        const currentTime = GetCurrentDate(true, 'hh:mm A');
        await ADMIN.Dialog.AddTaskList.StartTime.setTime(`${Number(currentTime.split(':')[0]) + 1}`);
        await ADMIN.Dialog.AddTaskList.TaskNotify.SelectOption({ byText: 'One Time' });
        await ADMIN.Dialog.AddTaskList.Save.Click();
        await ADMIN.Dialog.Success.Ok.Click();
        // Step 8: Verify the newly created task seaches correctly
         await ADMIN.Tasks.Search.setText({ value: taskName });
        // Step 9: Verify the task appears in the search results correctly
        const taskExists = await ADMIN.Tasks.Tasktable.RowExists({ rowColumn: 'Name', rowValue: taskName });
        expect(taskExists, `Task "${taskName}" was not found in the search results`).toBeTruthy();
    });

    test('[C6136]  Verify edit a task works correctly', { tag: ['@EditTask', '@Admin'] }, async ({ }) => {

        // Step 1: Login into Admin with admin credentials
        await ADMIN.Login.In();
        // Step 2: Navigate to Tasks menu
        await ADMIN.Menu.Tasks.GoTo();
        await ADMIN.Tasks.AddTasks.Click();
        const taskName = `SearchTask ${Date.now()}`;
        const taskType = 'Check List';
        const taskDescription = 'Searchable task 1';
        // Step 3: Add a task name
        await ADMIN.Dialog.AddTaskList.Name.setText({ value: taskName });
        // Step 4: Select the type alert
        await ADMIN.Dialog.AddTaskList.Type.SelectOption({ byText: taskType });
        // Step 5: Create a task e.g. "random task 1"
        await ADMIN.Dialog.AddTaskList.Tasks.setText({ value: taskDescription });
        // Step 6: Schedule the task for tomorrow (ahead of current date)
        // We'll use the DatePicker to select tomorrow's date
        const currentDate = ADMIN.Tasks.getCurrentDate();
        await ADMIN.Dialog.AddTaskList.ScheduleDate.setDate({ day: currentDate.day });
        // Step 7: Set start time one hour ahead of the current time
        const currentTime = GetCurrentDate(true, 'hh:mm A');
        await ADMIN.Dialog.AddTaskList.StartTime.setTime(`${Number(currentTime.split(':')[0]) + 1}`);
        await ADMIN.Dialog.AddTaskList.TaskNotify.SelectOption({ byText: 'One Time' });
        await ADMIN.Dialog.AddTaskList.Save.Click();
        await ADMIN.Dialog.Success.Ok.Click();
        // Step 8: Search for the newly created task
        await ADMIN.Tasks.Search.setText({ value: taskName });
        // Step 9: Edit the Searched result task
        await ADMIN.Tasks.Tasktable.EditTask();
        //Step:10 Verify Edit Task Dialog is opened
        expect(await ADMIN.Dialog.EditTaskList.IsVisible()).toBeTruthy();
        // Step 11: Change the task name
        const updatedTaskName = `${taskName} - UPDATED`;
        await ADMIN.Dialog.EditTaskList.Name.setText({ value: updatedTaskName });
        // Step 12: Save the changes
        await ADMIN.Dialog.EditTaskList.Save.Click();
        await ADMIN.Dialog.Success.Ok.Click();
        // Step 13: Verify the updated task appears in the Tasks List table
        await ADMIN.Tasks.Search.setText({ value: updatedTaskName });
        const taskExists = await ADMIN.Tasks.Tasktable.IsNotEmpty();
        expect(taskExists, `Updated Task "${updatedTaskName}" was not found in the table`).toBeTruthy();

    });
    test('[C6137] Verify Task History shows status update correctly', { tag: ['@TaskHistory', '@Admin'] }, async ({ }) => {
         // Step 1: Login into Admin with admin credentials
        await ADMIN.Login.In();
        // Step 2: Navigate to Tasks menu
        await ADMIN.Menu.Tasks.GoTo();
        await ADMIN.Tasks.AddTasks.Click();
        const taskName = `SearchTask ${Date.now()}`;
        const taskType = 'Check List';
        const taskDescription = 'Searchable task 1';
        // Step 3: Add a task name
        await ADMIN.Dialog.AddTaskList.Name.setText({ value: taskName });
        // Step 4: Select the type alert
        await ADMIN.Dialog.AddTaskList.Type.SelectOption({ byText: taskType });
        // Step 5: Create a task e.g. "random task 1"
        await ADMIN.Dialog.AddTaskList.Tasks.setText({ value: taskDescription });
        // Step 6: Schedule the task for tomorrow (ahead of current date)
        // We'll use the DatePicker to select tomorrow's date
        const currentDate = ADMIN.Tasks.getCurrentDate();
        await ADMIN.Dialog.AddTaskList.ScheduleDate.setDate({ day: currentDate.day });
        // Step 7: Set start time one hour ahead of the current time
        const currentTime = GetCurrentDate(true, 'hh:mm A');
        await ADMIN.Dialog.AddTaskList.StartTime.setTime(`${Number(currentTime.split(':')[0]) + 1}`);
        await ADMIN.Dialog.AddTaskList.TaskNotify.SelectOption({ byText: 'One Time' });
        await ADMIN.Dialog.AddTaskList.Save.Click();
        await ADMIN.Dialog.Success.Ok.Click();
        // Step 8: Search for the newly created task
        await ADMIN.Tasks.Search.setText({ value: taskName });
        // Step 9: Open Task History for the searched task
        await ADMIN.Tasks.Tasktable.TaskHistory();
        // Step 10: Verify Task History dialog is displayed
        expect(await ADMIN.Dialog.TaskListHistory.IsVisible()).toBeTruthy();
        // Step 11: Verify the status changes are recorded correctly
        const historyStatus = await ADMIN.Dialog.TaskListHistory.TaskHistoryTable.getStatus();
        expect(historyStatus, `No history records found for task '${taskName}'`).toBeTruthy();

    });

    test('[C6138] Verify delete a task works correctly', { tag: ['@DeleteTask', '@Admin'] }, async ({ }) => {
         // Step 1: Login into Admin with admin credentials
        await ADMIN.Login.In();
        // Step 2: Navigate to Tasks menu
        await ADMIN.Menu.Tasks.GoTo();
        await ADMIN.Tasks.AddTasks.Click();
        const taskName = `SearchTask ${Date.now()}`;
        const taskType = 'Check List';
        const taskDescription = 'Searchable task 1';
        // Step 3: Add a task name
        await ADMIN.Dialog.AddTaskList.Name.setText({ value: taskName });
        // Step 4: Select the type alert
        await ADMIN.Dialog.AddTaskList.Type.SelectOption({ byText: taskType });
        // Step 5: Create a task e.g. "random task 1"
        await ADMIN.Dialog.AddTaskList.Tasks.setText({ value: taskDescription });
        // Step 6: Schedule the task for tomorrow (ahead of current date)
        // We'll use the DatePicker to select tomorrow's date
        const currentDate = ADMIN.Tasks.getCurrentDate();
        await ADMIN.Dialog.AddTaskList.ScheduleDate.setDate({ day: currentDate.day });
        // Step 7: Set start time one hour ahead of the current time
        const currentTime = GetCurrentDate(true, 'hh:mm A');
        await ADMIN.Dialog.AddTaskList.StartTime.setTime(`${Number(currentTime.split(':')[0]) + 1}`);
        await ADMIN.Dialog.AddTaskList.TaskNotify.SelectOption({ byText: 'One Time' });
        await ADMIN.Dialog.AddTaskList.Save.Click();
        await ADMIN.Dialog.Success.Ok.Click();
        // Step 8: Search for the newly created task
        await ADMIN.Tasks.Search.setText({ value: taskName });
        // Step 9: Open Task History for the searched task
        await ADMIN.Tasks.Tasktable.DeleteTask();
        //Step10: Click Yes
        await ADMIN.Dialog.Confirm.Yes.Click();
        await ADMIN.Dialog.Success.Ok.Click();
        // Step 14: Verify the task has been removed from the Tasks List table
        await ADMIN.Tasks.Search.setText({ value: taskName });
        const taskExists = await ADMIN.Tasks.Tasktable.RowExists({ rowColumn: 'Name', rowValue: taskName });
        expect(taskExists, `Task "${taskName}" was found in the table after deletion`).toBeFalsy();
        

    });

});
