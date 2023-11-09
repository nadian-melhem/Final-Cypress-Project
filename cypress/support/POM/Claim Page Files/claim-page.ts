export class ClaimPage {
  static elements = {
    button: () => cy.get(".oxd-button"),
  };

  static approveClaim() {
    this.elements.button().contains(" Approve ").click();
  }

  static rejectClaim() {
    this.elements.button().contains(" Reject ").click();
  }
}
