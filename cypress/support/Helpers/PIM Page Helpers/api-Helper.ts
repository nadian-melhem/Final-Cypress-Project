import { URLS } from "../../Constants/api-urls";
import { EmployeePayloadInitializer } from "../../Initializers/Pyload Initializers/employees-payload-init";
import { EmployeesResponseInitializer } from "../../Initializers/Response Initializers/employees-response-init";

export class PIMApiHelper {
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

  static deleteEmployees(ids) {
    cy.request({
      method: "DELETE",
      url: URLS.EMPLOYEES,
      body: { ids: ids },
    });
  }
  static createLoginDetails(user) {
    return cy.request({
      method: "Post",
      url: URLS.USERS,
      body: user,
    });
  }
}
