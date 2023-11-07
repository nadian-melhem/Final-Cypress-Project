import { TableUtils } from "../../../Utils/table-utils";

export class MyReportPage {
  
  static elements = {
    reportName: () => cy.get(".orangehrm-card-container > .oxd-text"),
    reportTable: () => cy.get(".inner-content-table"),
    tableHeader: () => cy.get(".header-rgRow"),
    tableRows: () => cy.get('[type="rgRow"]'),
  };

  static verifyReportName(expectedReportName: string) {
    this.elements.reportName().should("contain", expectedReportName);
  }

  static verifyReportTableHeaders(expectedHeaders) {
    TableUtils.verifyTableHeaders(this.elements.tableHeader(), expectedHeaders);
  }

  static verifyReportTableRowsNumber(expectedNumber) {
    TableUtils.verifyRowsNumber(
      this.elements.tableRows().find(".rgRow"),
      expectedNumber
    );
  }

  static verifyTableData(headers, rows) {
    for (let c = 0; c < headers.length; c++) {
      for (let r = 0; r < rows.length; r++) {
        TableUtils.validateTableCell(
          this.elements.tableHeader(),
          this.elements.tableRows().find(".rgRow"),
          headers[c],
          rows[c][r]
        );
      }
    }
  }
}
