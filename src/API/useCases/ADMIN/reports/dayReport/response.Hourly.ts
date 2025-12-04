export interface DayReportHourlyResponse {
    errorCode: string;
    error: string;
    data: ReportHourData;
}

export interface ReportHourData {
    hourlyreport: Hourlyreport;
}

export interface Hourlyreport {
    [key: string]: HourlyData;
}

export interface HourlyData {
    qty: number;
    price: number;
    hour: string;
    hourto: string;
    hourfrom: string;
}
