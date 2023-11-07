export class PIMSharedPage{
    static elements = {
        reportsTab: () => cy.get('.oxd-topbar-body-nav > ul > :nth-child(4)')
    }

    static openReportsTab(){
        this.elements.reportsTab().click()
    }
}