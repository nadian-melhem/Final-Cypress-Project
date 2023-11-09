import { URLS } from "../../Constants/api-urls";

export class ClaimApiHelper {
  static createClaim(claim) {
    return cy.request({
      method: "POST",
      url: URLS.CLAIMS,
      body: claim,
    });
  }

  static submitClaim(id) {
    return cy.request({
      method: "PUT",
      url: URLS.SUBMIT_CLAIMS + id + "/action",
      body: { action: "SUBMIT" },
    });
  }
  static addEvent(event) {
    return cy.request({
      method: "POST",
      url: URLS.EVENTS,
      body: event,
    });
  }

  static deleteEvents(ids) {
    return cy.request({
      method: "DELETE",
      url: URLS.EVENTS,
      body: { ids: ids },
    });
  }

  static addExpenseType() {
    return cy.request({
      method: "POST",
      url: URLS.EXPENSES_TYPES,
      body: {
        name: `test${Math.floor(Math.random() * 100)}`,
        description: "",
        status: true,
      },
    });
  }

  static deleteExpenseType(ids) {
    return cy.request({
      method: "DELETE",
      url: URLS.EXPENSES_TYPES,
      body: { ids: ids },
    });
  }

  static addExpences(expense, id) {
    return cy.request({
      method: "POST",
      url: `${URLS.EXPENSES}${id}/expenses`,
      body: expense,
    });
  }
}
