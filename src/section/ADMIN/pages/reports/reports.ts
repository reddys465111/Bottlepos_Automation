import { type Locator, type Page } from "@playwright/test";
import { Button } from "../../../../objects/button";
import { Dropdown } from "../../../../objects/dropdown";
import { ComparePeriod } from "./comparePeriod";
import { CurrentStock } from "./currentStock";
import { DayReport } from "./dayReport";
import { DeadStock } from "./deadStock";
import { Expenses } from "./expenses";
import { HouseAccountReport } from "./houseAccountReport";
import { ItemsNotFound } from "./itemNotFound";
import { LoginReport } from "./loginReport";
import { MessageSentHistory } from "./MessageSentHistory";
import { ModificationReport } from "./modificationReport";
import { NotesReport } from "./notesReport";
import { OverStock } from "./overStock";
import { PayrollReport } from "./payrollReport";
import { ReceiveReport } from "./receiveReport";
import { SalesReport } from "./salesReport";
import { ScanDataReport } from "./scanDataReport";
import { Summary } from "./summary";
import { TaxBreakdown } from "./taxBreakdown";
import { TenderReport } from "./tenderReport";
import { TransferReport } from "./transferReport";
import { EntityDayReport } from "../../../../API/useCases/ADMIN/reports/dayReport/entity.DayReport";
import { GetDayReport } from "../../../../API/useCases/ADMIN/reports/dayReport/useCase.DayReport";
import { Legacy_BaseTable } from "../../../../base/legacy/legacy_BaseTable";
export type Columns_AdminSummaryReport =
  | "label"   
  | "# Sales"
  | "Total";
export class Reports {
    API: {
        DayReport: () => Promise<EntityDayReport>
    };
    Home: Button;
    Refresh: Button;
    ExportCSV: Button;
    Print: Button;
    ReportType: Dropdown;
    Summary: Summary;
    TenderReport: TenderReport;
    SalesReport: SalesReport;
    DayReport: DayReport;
    Expenses: Expenses;
    ComparePeriod: ComparePeriod;
    CurrentStock: CurrentStock;
    DeadStock: DeadStock;
    OverStock: OverStock;
    TaxBreakdown: TaxBreakdown;
    ReceiveReport: ReceiveReport;
    TransferReport: TransferReport;
    ItemsNotFound: ItemsNotFound;
    NotesReport: NotesReport;
    PayrollReport: PayrollReport;
    ModificationReport: ModificationReport;
    HouseAccountReport: HouseAccountReport;
    ScanDataReport: ScanDataReport;
    MessageSentHistory: MessageSentHistory;
    LoginReport: LoginReport;
    SummaryReportTable:Legacy_BaseTable<Columns_AdminSummaryReport>;
    _page: Page;

    constructor(page: Page,) {

        this._page = page;
        this.Home = new Button(this._page.locator("li a[onclick='WPOS.goToHome();']"));
        this.ReportType = new Dropdown(this._page.locator('#reptype'));
        this.Refresh = new Button(this._page.locator('button[title=Refresh]'));
        this.ExportCSV = new Button(this._page.locator("button[title='Export CSV']"));
        this.Print = new Button(this._page.locator('button[title=Print]'));
        this.Summary = new Summary(page, this._page.locator('#summary-report_wrapper'))
        this.TenderReport = new TenderReport(this._page.locator('#takings-report_wrapper'));
        this.SalesReport = new SalesReport(page, this._page.locator('#item-sales-report_wrapper'));
        this.DayReport = new DayReport(this._page.locator('#reportcontain'));
        this.Expenses = new Expenses(this._page.locator('#expense-report_wrapper'));
        this.ComparePeriod = new ComparePeriod(this._page.locator('.report-fullRow', { has: this._page.locator('th:has-text("Compare Period")') }));
        this.CurrentStock = new CurrentStock(this._page.locator('#current-stock-report_wrapper'));
        this.DeadStock = new DeadStock(this._page.locator('#dead-stock-report_wrapper'));
        this.OverStock = new OverStock(this._page.locator('#over-stock-report_wrapper'));
        this.TaxBreakdown = new TaxBreakdown(this._page.locator('#tax-report_wrapper'));
        this.ReceiveReport = new ReceiveReport(this._page.locator('#receive-report_wrapper'));
        this.TransferReport = new TransferReport(this._page.locator('#transfer-report_wrapper'));
        this.ItemsNotFound = new ItemsNotFound(this._page.locator('#items-no-found_wrapper'));
        this.NotesReport = new NotesReport(this._page.locator('#sale-item-notes_wrapper'));
        this.PayrollReport = new PayrollReport(this._page.locator('#payroll-report_wrapper'));
        this.ModificationReport = new ModificationReport(this._page.locator('#modification-report_wrapper'));
        this.HouseAccountReport = new HouseAccountReport(this._page.locator('#customer-ledger-report_wrapper'));
        this.ScanDataReport = new ScanDataReport(this._page.locator('#scandataprogramtable_wrapper'));
        this.MessageSentHistory = new MessageSentHistory(this._page.locator('#messagesenthist_wrapper'));
        this.LoginReport = new LoginReport(this._page.locator('messagesenthist_wrapper'));
        this.API = {
            DayReport: () => { return GetDayReport() }
        };

        // Bind to the summary report table
        this.SummaryReportTable = new Legacy_BaseTable<Columns_AdminSummaryReport>(
            this._page.locator('#summary-report')
        );

    }

}



export class APIReports {


}