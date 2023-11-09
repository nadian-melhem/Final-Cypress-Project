import moment = require("moment");
import { JobTitlesResponse } from "../API/Response/job-titles-response";
import { LocationsResponse } from "../API/Response/locations-response";
import { ReportApiHelper } from "../Helpers/Employee Report Page Helpers/api-helper";
import { SalaryComponentPayloadInitializer } from "../Initializers/Pyload Initializers/salary-components-payload-init";
import { PIMApiHelper } from "../Helpers/PIM Page Helpers/api-Helper";

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
  return PIMApiHelper.addEmployee().then((employeeResponse) => {
    ReportApiHelper.addJobDetails(employeeResponse.empNumber, jobId, locationId);
    ReportApiHelper.addSalaryComponent(employeeResponse.empNumber, SALARY);
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

export function writeEventFixture() {
  cy.writeFile("cypress/fixtures/event.json", {
    name: `test${Math.floor(Math.random() * 100)}`,
    description: "",
    status: true,
  });
}

export function writeClaimFixture(eventId: number, amount: number) {
  cy.writeFile("cypress/fixtures/claim.json", {
    claimEventId: eventId,
    currencyId: "AFN",
    remarks: null,
  });
}

export function writeExpenseFixture(expenseId){
  cy.writeFile("cypress/fixtures/expense.json", {
    expenseTypeId: expenseId,
    amount: 100,
    date: moment().format('YYYY-MM-DD'),
    note: null,
  })
}
