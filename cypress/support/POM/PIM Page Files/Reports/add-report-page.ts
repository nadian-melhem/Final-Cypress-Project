export class AddReportPage {
    static elements = {
        reportName: () => cy.get(':nth-child(2) > .oxd-input'),
        selectionCriteria: () => cy.get(':nth-child(3) > .oxd-grid-4 > .orangehrm-report-criteria > .oxd-input-field-bottom-space > :nth-child(2) > .oxd-select-wrapper > .oxd-select-text'),
        selectionCriteriaList: () => cy.get('[role="listbox"]'),
        selectionCriteriaPlusIcon: () => cy.get(':nth-child(3) > .oxd-grid-4 > .orangehrm-report-criteria > :nth-child(2) > :nth-child(2) > .oxd-icon-button'),
        selectionCriteriaHeader: () => cy.get('.--offset-column-1 > .oxd-text'),
        selectDisplayfieldGroup: () => cy.get(':nth-child(5) > .oxd-grid-4 > :nth-child(1) > .oxd-input-group > :nth-child(2) > .oxd-select-wrapper > .oxd-select-text'),
        selectDisplayfieldGroupList: () => cy.get('[role="listbox"]'),
        seelctDisplayField: () => cy.get(':nth-child(5) > .oxd-grid-4 > .orangehrm-report-criteria > .oxd-input-field-bottom-space > :nth-child(2) > .oxd-select-wrapper > .oxd-select-text'),
        seelctDisplayFieldList: () => cy.get('[role="listbox"]'),
        displyFieldPlusIcon: () => cy.get(':nth-child(5) > .oxd-grid-4 > .orangehrm-report-criteria > :nth-child(2) > :nth-child(2) > .oxd-icon-button'),
        save: () => cy.get('.oxd-button--secondary')
    }

    static fillReport(reportFixture: string) {
        cy.fixture(reportFixture).then((report) => {
            this.typeReportName(report.name)
            this.addSelectionCriteria(report.selectionCriteria, report.selectionCriteriaData)
            this.addDisplayFields(report.displayFieldGroup, report.displayField)
            this.saveReport()
        })
    }

    static typeReportName(reportName: string) {
        this.elements.reportName().type(reportName)
    }
    static addSelectionCriteria(criterias: [string], data: [string]) {
        for (let c = 0; c < criterias.length; c++) {
            this.elements.selectionCriteria().click()
            this.elements.selectionCriteriaList().find("[role='option']").contains(criterias[c]).click()
            this.elements.selectionCriteriaPlusIcon().click()
            cy.get(`:nth-child(${4 + c * 2}) > .oxd-input-group > :nth-child(2) > .oxd-select-wrapper > .oxd-select-text`).click()
            cy.get('[role="listbox"]').find("[role='option']").contains(data[c]).click()
        }
    }
    static addDisplayFields(displayFieldGroup: [string], displayField: [string]) {
        for (let i = 0; i < displayFieldGroup.length; i++) {
            this.elements.selectDisplayfieldGroup().click()
            this.elements.selectDisplayfieldGroupList().find("[role='option']").contains(displayFieldGroup[i]).click()
            this.elements.seelctDisplayField().click()
            this.elements.seelctDisplayFieldList().find("[role='option']").contains(displayField[i]).click()
            this.elements.displyFieldPlusIcon().click()
        }

    }

    static saveReport() {
        this.elements.save().click()
    }

}