import { type Page } from "@playwright/test";
import { Button } from "../../objects/button";

export class NavigationBar{
    Register: Button;
    Sales: Button;
    Weborders: Button;
    Reports: Button;
    Settings: Button;

    TaskList: Button;
    Fullscreen: Button;
    CustomerScreen: Button;
    ClockInOut: Button;
    Admin: Button;
    Logout: Button;
    constructor(page: Page){
        
        this.Register = new Button(page.getByRole('link', { name: 'Register' }));
        this.Sales = new Button(page.getByRole('link', {name: 'Sales'}));
        this.Weborders = new Button(page.getByRole('link', {name: 'WebOrders'}));
        this.Reports = new Button(page.getByRole('link', {name: 'Reports'}));
        this.Settings = new Button(page.getByRole('link', {name: 'Settings'}));

        this.TaskList = new Button(page.getByRole('link', {name: 'Task List'}));
        this.Fullscreen = new Button(page.getByRole('link', {name: 'Fullscreen'}));
        this.CustomerScreen = new Button(page.getByRole('link', {name: 'Customer Screen'}));
        this.ClockInOut = new Button(page.getByRole('link', {name: 'Clock In/Out'}));

        this.Admin = new Button(page.getByRole('button', {name: 'Admin'}));
        this.Logout = new Button(page.getByRole('button', {name: "Logout"}));
    }
}