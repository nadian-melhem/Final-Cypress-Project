import { ReportDataResponse } from "../../API/Response/report-data-response";

export class ReportDataResponseInitializer{
    static init(data): ReportDataResponse{
        let reportData: ReportDataResponse = {
            empJobTitle: data.empJobTitle,
            employeeFirstname: data.employeeFirstname,
            salAmount: data.salAmount[0]
        }
        return reportData
    }
}