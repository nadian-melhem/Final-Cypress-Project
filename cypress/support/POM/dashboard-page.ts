class DashboardPage {
  static elements = {
    mainMenuItems: () => cy.get(".oxd-sidepanel-body"),
    userIcon: () => cy.get(".oxd-userdropdown-tab > .oxd-icon"),
    logout: () => cy.get(":nth-child(4) > .oxd-userdropdown-link"),
  };

  static openPimPage() {
    this.elements.mainMenuItems().contains("PIM").click();
  }

  static openRecruitmentPage() {
    this.elements.mainMenuItems().contains("Recruitment").click();
  }

  static openLeavePage() {
    this.elements.mainMenuItems().contains("Leave").click();
  }
  static openBuzzPage() {
    this.elements.mainMenuItems().contains("Buzz").click();
  }

  static openClaimPage() {
    this.elements.mainMenuItems().contains("Claim").click();
  }
}
export default DashboardPage;
