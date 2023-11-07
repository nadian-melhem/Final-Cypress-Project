import { JobTitlesResponse } from "../API/Response/job-titles-response";
import { LocationsResponse } from "../API/Response/locations-response";
import { ApiHelper } from "../Helpers/api-helper";
import { SalaryComponentPayloadInitializer } from "../Initializers/Pyload Initializers/salary-components-payload-init";

/**
 * Creats Employee with Job Details and Salary Component
 * @param jobId
 * @param locationId
 * @returns Employee created
 */
export function addEmployeeDetails(
  jobId: JobTitlesResponse["id"],
  locationId: LocationsResponse["id"]
) {
  const SALARY = SalaryComponentPayloadInitializer.init();
  return ApiHelper.addEmployee().then((employeeResponse) => {
    ApiHelper.addJobDetails(employeeResponse.empNumber, jobId, locationId);
    ApiHelper.addSalaryComponent(employeeResponse.empNumber, SALARY);
    return cy.then(() => employeeResponse);
  });
}

/**
 * Write Report Details into a fixture file
 * @param jobTitle 
 * @param locationName 
 */
export function writeEmployeeReport(jobTitle: string, locationName: string) {
  cy.writeFile("cypress/fixtures/report.json", {
    name: `report${Math.floor(Math.random() * 100)}`,
    selectionCriteria: ["Job Title", "Location"],
    displayFieldGroup: ["Personal", "Job", "Salary"],
    displayField: ["Employee First Name", "Job Title", "Amount"],
    selectionCriteriaData: [jobTitle, locationName],
  });
}
