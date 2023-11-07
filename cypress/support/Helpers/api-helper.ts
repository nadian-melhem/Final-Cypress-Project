import { JobTitlePayload } from "../API/Payload/job-titles-payload";
import { LocationPayload } from "../API/Payload/locations-payload";
import { SalaryComponentPayload } from "../API/Payload/salay-components-payload";
import { URLS } from "../Constants/api-urls";
import { EmployeePayloadInitializer } from "../Initializers/Pyload Initializers/employees-payload-init";
import { JobDetailsPayloadInitializer } from "../Initializers/Pyload Initializers/job-details-payload-init";
import { EmployeesResponseInitializer } from "../Initializers/Response Initializers/employees-response-init";
import { JobTitlesResponseInitializer } from "../Initializers/Response Initializers/job-titles-response-init";
import { LocationsResponseInitializer } from "../Initializers/Response Initializers/locations-resonse-init";
import { ReportDataResponseInitializer } from "../Initializers/Response Initializers/report-data-response-initializer";

export class ApiHelper {
  static addLocation(location: LocationPayload) {
    return cy
      .request({
        method: "POST",
        url: URLS.LOCATIONS,
        body: location,
      })
      .then((response) => {
        return LocationsResponseInitializer.init(response.body.data);
      });
  }

  static createJob(job: JobTitlePayload) {
    return cy
      .request({
        method: "POST",
        url: URLS.JOB_TITLES,
        body: job,
      })
      .then((response) => {
        return JobTitlesResponseInitializer.init(response.body.data);
      });
  }

  static addEmployee() {
    return cy
      .request({
        method: "POST",
        url: URLS.EMPLOYEES,
        body: EmployeePayloadInitializer.init(),
      })
      .then((response) => {
        return EmployeesResponseInitializer.init(response.body.data);
      });
  }

  static addJobDetails(empNumber: number, jobId, locationId) {
    return cy.request({
      method: "PUT",
      url: `${URLS.JOB_DETAILS}${empNumber}/job-details`,
      body: JobDetailsPayloadInitializer.init(jobId, locationId),
    });
  }

  static addSalaryComponent(empNumber: number, salary: SalaryComponentPayload) {
    return cy.request({
      method: "POST",
      url: `${URLS.SALARY_COMPONENTS}${empNumber}/salary-components`,
      body: salary,
    });
  }

  static deleteLocations(ids: [number]) {
    cy.request({
      method: "DELETE",
      url: URLS.LOCATIONS,
      body: { ids: ids },
    });
  }

  static deleteJobTitles(ids: [number]) {
    cy.request({
      method: "DELETE",
      url: URLS.JOB_TITLES,
      body: { ids: ids },
    });
  }

  static deleteEmployees(ids) {
    cy.request({
      method: "DELETE",
      url: URLS.EMPLOYEES,
      body: { ids: ids },
    });
  }

  static deletReports(ids) {
    cy.request({
      method: "DELETE",
      url: URLS.DEFINED_REPORTS,
      body: { ids: ids },
    });
  }

  static getReportId(name: string) {
    return cy
      .request({
        method: "GET",
        url: URLS.DEFINED_REPORTS,
      })
      .then((response) => {
        return response.body.data.find((element) => element.name === name);
      });
  }

  static getReportData(id: number) {
    let reports = [];
    return cy
      .request({
        method: "GET",
        url: `${URLS.VIEW_REPORT}${id}&name=pim_defined`,
      })
      .then((response) => {
        response.body.data.forEach((element) => {
          reports.push(ReportDataResponseInitializer.init(element));
        });
        return reports;
      });
  }
}
