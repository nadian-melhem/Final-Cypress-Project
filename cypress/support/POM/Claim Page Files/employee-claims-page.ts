import { TableUtils } from "../../Utils/table-utils";

export class EmployeeClaimsPage {
  TABLE_UTILS: TableUtils;
  elements = {
    tableHeader: () => cy.get(".oxd-table-header"),
    tableRows: () => cy.get(".oxd-table-body"),
    viewDetailsButton: () => cy.get(".oxd-button").contains(" View Details "),
  };

  constructor() {
    this.TABLE_UTILS = new TableUtils(
      this.elements.tableHeader,
      this.elements.tableRows,
      ["index"],
      ".oxd-table-cell"
    );
  }
  viewClaimDetails(refrenceId, header) {
    this.TABLE_UTILS.getTableRecord(header, refrenceId).then((row) => {
      cy.wrap(row).find(".oxd-button").invoke("click");
    });
  }

  verifyClaimDetails(details, headers, key, keyHeader) {
    this.TABLE_UTILS.getTableRecord(keyHeader, key).then((row) => {
      console.log({ row: row });
      for (let i = 0; i < headers.length; i++) {
        this.TABLE_UTILS.validateRowValues(row, headers[i], details[i]);
      }
    });
  }
}
