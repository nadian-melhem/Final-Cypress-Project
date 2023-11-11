import { EmployeeResponse } from "../../support/API/Response/employees-response";
import { JobTitlesResponse } from "../../support/API/Response/job-titles-response";
import { LocationsResponse } from "../../support/API/Response/locations-response";
import { ReportApiHelper } from "../../support/Helpers/Employee Report Page Helpers/api-helper";
import { PIMApiHelper } from "../../support/Helpers/PIM Page Helpers/api-Helper";
import { JobTitlesPayloadInitializer } from "../../support/Initializers/Pyload Initializers/job-titles-payload-init";
import { LocationsPayloadInitializer } from "../../support/Initializers/Pyload Initializers/locations-payload-init";
import { AddReportPage } from "../../support/POM/PIM Page Files/Reports/add-report-page";
import { MyReportPage } from "../../support/POM/PIM Page Files/Reports/my-report-page";
import { ReportsPage } from "../../support/POM/PIM Page Files/Reports/reports-page";
import { PIMSharedPage } from "../../support/POM/PIM Page Files/pim-shared-page";
import DashboardPage from "../../support/POM/dashboard-page";
import {
  addEmployeeDetails,
  writeEmployeeReport,
} from "../../support/Utils/employee-utils";

Cypress.on("uncaught:exception", (err, runnable) => {
  return false;
});

describe("Employee Report Page Test Cases", () => {
  let MY_REPORT_PAGE: MyReportPage;
  const LOCATION_DETAILS = LocationsPayloadInitializer.init();
  const JOB = JobTitlesPayloadInitializer.init();

  let employees: EmployeeResponse[] = [];
  let location: LocationsResponse;
  let job: JobTitlesResponse;

  beforeEach(() => {
    MY_REPORT_PAGE = new MyReportPage();
    cy.login("Admin", "admin123");

    ReportApiHelper.addLocation(LOCATION_DETAILS).then((locationResponse) => {
      location = locationResponse;
    });

    ReportApiHelper.createJob(JOB).then((jobResponse) => {
      job = jobResponse;

      addEmployeeDetails(job.id, location.id).then((employee) =>
        employees.push(employee)
      );
      addEmployeeDetails(job.id, location.id).then((employee) =>
        employees.push(employee)
      );
      addEmployeeDetails(job.id, location.id).then((employee) =>
        employees.push(employee)
      );
    });

    writeEmployeeReport(JOB.title, LOCATION_DETAILS.name);
  });

  it("verify time sheet report is added and the table data is correct", () => {
    DashboardPage.openPimPage();
    PIMSharedPage.openReportsTab();
    ReportsPage.addReport();
    AddReportPage.fillReport("report");

    cy.fixture("report").then((report) => {
      MY_REPORT_PAGE.verifyReportName(report.name);
      MY_REPORT_PAGE.verifyReportTableHeaders(report.displayField);
      MY_REPORT_PAGE.verifyReportTableRowsNumber(employees.length);
      ReportApiHelper.getReportId(report.name).then((reportResponse) => {
        ReportApiHelper.getReportData(reportResponse.id).then((reportDataRespone) => {
          MY_REPORT_PAGE.verifyTableData(
            report.displayField,
            reportDataRespone
          );
        });
      });
    });
  });

  afterEach(() => {
    PIMApiHelper.deleteEmployees(employees.map((employee) => employee.empNumber));
    ReportApiHelper.deleteJobTitles([job.id]);
    ReportApiHelper.deleteLocations([location.id]);
    cy.fixture("report").then((report) =>
      ReportApiHelper.getReportId(report.name).then((reportResponse) => {
        ReportApiHelper.deletReports([reportResponse.id]);
      })
    );
  });
});
