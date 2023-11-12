import { EmployeeResponse } from "../../support/API/Response/employees-response";
import { JobTitlesResponse } from "../../support/API/Response/job-titles-response";
import { LocationsResponse } from "../../support/API/Response/locations-response";
import { ApiHelper } from "../../support/Helpers/api-helper";
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
  const LOCATION_DETAILS = LocationsPayloadInitializer.init();
  const JOB = JobTitlesPayloadInitializer.init();

  let employees: EmployeeResponse[] = [];
  let location: LocationsResponse;
  let job: JobTitlesResponse;

  beforeEach(() => {
    cy.login("Admin", "admin123");

    ApiHelper.addLocation(LOCATION_DETAILS).then((locationResponse) => {
      location = locationResponse;
    });

    ApiHelper.createJob(JOB).then((jobResponse) => {
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
      MyReportPage.verifyReportName(report.name);
      MyReportPage.verifyReportTableHeaders(report.displayField);
      MyReportPage.verifyReportTableRowsNumber(employees.length);
      ApiHelper.getReportId(report.name).then((reportResponse) => {
        ApiHelper.getReportData(reportResponse.id).then((reportDataRespone) => {
          MyReportPage.verifyTableData(report.displayField, reportDataRespone);
        });
      });
    });
  });

  afterEach(() => {
    ApiHelper.deleteEmployees(employees.map((employee) => employee.empNumber));
    ApiHelper.deleteJobTitles([job.id]);
    ApiHelper.deleteLocations([location.id]);
    cy.fixture("report").then((report) =>
      ApiHelper.getReportId(report.name).then((reportResponse) => {
        ApiHelper.deletReports([reportResponse.id]);
      })
    );
  });
});
