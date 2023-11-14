import { CLAIM_STATUS } from "../../support/Constants/claim-status";
import { UserPayloadInitializer } from "../../support/Initializers/Pyload Initializers/user-payload-init";
import { ClaimPage } from "../../support/POM/Claim Page Files/claim-page";
import { EmployeeClaimsPage } from "../../support/POM/Claim Page Files/employee-claims-page";
import DashboardPage from "../../support/POM/dashboard-page";
import {
  writeClaimFixture,
  writeEventFixture,
  writeExpenseFixture,
} from "../../support/Utils/employee-utils";
import { UserPayload } from "../../support/API/Payload/users-payload";
import { CLAIM_HEADERS } from "../../support/Constants/claim-headers";
import { ClaimApiHelper } from "../../support/Helpers/Employee Claim Page Helpers/api-helper";
import { PIMApiHelper } from "../../support/Helpers/PIM Page Helpers/api-Helper";

Cypress.on("uncaught:exception", (err, runnable) => {
  return false;
});

describe("Employee Claim Status", () => {
  let EMPLOYEE_CLAIMS_PAGE: EmployeeClaimsPage;
  let refrenceId: string;
  let user: UserPayload;
  let eventId: number;
  let expenseTypeId: number;

  before(("Given The user logged in to the system as admin and added a new employee and create login details and added new expense type and added nw event"),() => {
    EMPLOYEE_CLAIMS_PAGE = new EmployeeClaimsPage();
    cy.login("Admin", "admin123");

    PIMApiHelper.addEmployee().then((employeeRepsonse) => {
      user = UserPayloadInitializer.init(employeeRepsonse.empNumber);

      PIMApiHelper.createLoginDetails(user);

      ClaimApiHelper.addExpenseType().then((expenseTyperesponse) => {
        expenseTypeId = expenseTyperesponse.body.data.id;
        writeExpenseFixture(expenseTyperesponse.body.data.id);
      });

      writeEventFixture();
      cy.fixture("event").then((event) => {
        ClaimApiHelper.addEvent(event).then((eventResponse) => {
          eventId = eventResponse.body.data.id;
          writeClaimFixture(
            eventResponse.body.data.id,
            eventResponse.body.data.amount
          );
        });
        cy.logout();
      });
    });
  });

  beforeEach(("Given The user logged in to the system with the new added credentials and created a new claim and added an expense to the added claim and submitted the claim"),() => {
    cy.login(user.username, user.password);
    cy.fixture("claim").then((claim) => {
      ClaimApiHelper.createClaim(claim).then((claimResponse) => {
        refrenceId = claimResponse.body.data.referenceId;

        cy.fixture("expense").then((expense) => {
          ClaimApiHelper.addExpences(expense, claimResponse.body.data.id);
        });

        ClaimApiHelper.submitClaim(claimResponse.body.data.id);
      });
    });
    cy.logout();
  });

  it("When the user login as admin and open claim page and view the added claim details and approve the added claim, then the emplyee claims page table should contain the approved claim with its correct details", () => {
    cy.login("Admin", "admin123");

    DashboardPage.openClaimPage();
    EMPLOYEE_CLAIMS_PAGE.viewClaimDetails(refrenceId, "Reference Id");
    ClaimPage.approveClaim();

    cy.fixture("expense").then((expense) => {
      const CLAIM_DETAILS = [
        expense.date,
        CLAIM_STATUS.APPROVED,
        expense.amount,
      ];

      cy.visit("web/index.php/claim/viewAssignClaim");
      EMPLOYEE_CLAIMS_PAGE.verifyClaimDetails(
        CLAIM_DETAILS,
        CLAIM_HEADERS,
        refrenceId,
        "Reference Id"
      );
    });
    cy.logout();
  });

  it("when the user login as admin and open claim page and view the added claim details and reject the added claim, then the emplyee claims page table should contain the approved claim with its correct details", () => {
    cy.login("Admin", "admin123");

    DashboardPage.openClaimPage();
    EMPLOYEE_CLAIMS_PAGE.viewClaimDetails(refrenceId, "Reference Id");
    ClaimPage.rejectClaim();

    cy.fixture("expense").then((expense) => {
      const CLAIM_DETAILS = [
        expense.date,
        CLAIM_STATUS.REJECTED,
        expense.amount,
      ];

      cy.visit("web/index.php/claim/viewAssignClaim");
      EMPLOYEE_CLAIMS_PAGE.verifyClaimDetails(
        CLAIM_DETAILS,
        CLAIM_HEADERS,
        refrenceId,
        "Reference Id"
      );
    });
    cy.logout();
  });

  after(() => {
    cy.login("Admin", "admin123");
    ClaimApiHelper.deleteEvents([eventId]);
    ClaimApiHelper.deleteExpenseType([expenseTypeId]);
    PIMApiHelper.deleteEmployees([user.empNumber]);
    cy.logout();
  });
});
