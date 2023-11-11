import { TableUtils } from "../../../Utils/table-utils";

export class MyReportPage {
  TABLE_UTILS: TableUtils;

  elements = {
    reportName: () => cy.get(".orangehrm-card-container > .oxd-text"),
    reportTable: () => cy.get(".inner-content-table"),
    tableHeader: () => cy.get(".header-rgRow"),
    tableRows: () => cy.get('[type="rgRow"]').find(".rgRow"),
  };

  constructor() {
    this.TABLE_UTILS = new TableUtils(
      this.elements.tableHeader,
      this.elements.tableRows,
      ["data", "rgcol"],
      ".rgCell",
      ".rgHeaderCell"
    );
  }

  verifyReportName(expectedReportName: string) {
    this.elements.reportName().should("contain", expectedReportName);
  }

  verifyReportTableHeaders(expectedHeaders) {
    this.TABLE_UTILS.verifyTableHeaders(expectedHeaders);
  }

  verifyReportTableRowsNumber(expectedNumber) {
    this.TABLE_UTILS.verifyRowsNumber(expectedNumber);
  }

  verifyTableData(headers, rows) {
    for (let c = 0; c < headers.length; c++) {
      for (let r = 0; r < rows.length; r++) {
        this.TABLE_UTILS.validateCellValue(headers[c], rows[c][r]);
      }
    }
  }
}
