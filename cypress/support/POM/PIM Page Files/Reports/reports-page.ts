export class ReportsPage{
    static elements ={
        addButton: () => cy.get('.orangehrm-header-container > .oxd-button')
    }

    static addReport(){
        this.elements.addButton().click()
    }
}