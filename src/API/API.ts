
import { EntityDayReport } from "./useCases/ADMIN/reports/dayReport/entity.DayReport";
import { GetDayReport } from "./useCases/ADMIN/reports/dayReport/useCase.DayReport";
import { EntitySummaryReport } from "./useCases/ADMIN/reports/summaryReport/entity.SummaryReport";
import { GetSummaryReport } from "./useCases/ADMIN/reports/summaryReport/useCase.SumaryReport";
import { Authenticate, Logout } from "./useCases/auth/useCase.Auth";

export class api {

    public Reports: {
        DayReport: (options?: { dateFrom: string, dateTo: string }) => Promise<EntityDayReport>;
        SummaryReport: (options?: { dateFrom: string, dateTo: string }) => Promise<EntitySummaryReport>;
    };

    public async Init(): Promise<api> {
        await Authenticate();
        return this;
    }

    public async Finish(): Promise<void> {
        await Logout();
    }

    constructor() {

        this.Reports = {
            DayReport: (options?: { dateFrom: string, dateTo: string }) => {
                return GetDayReport(options)
            },
            SummaryReport: (options?: { dateFrom: string, dateTo: string }) => {
                return GetSummaryReport(options)
            }
        };
    }
}

export const API = new api();

