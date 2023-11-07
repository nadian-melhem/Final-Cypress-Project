export class TableUtils {
  /**
   *
   * @param headerSelector
   * @param expectedHeaders
   * verify the table headers are the same as expected headers
   */
  static verifyTableHeaders(headerSelector, expectedHeaders) {
    this.getTableHeaders(headerSelector.find(".rgHeaderCell")).then(
      (headers) => {
        expect(headers.toString()).to.equal(expectedHeaders.toString());
      }
    );
  }

  /**
   *
   * @param rowSelector
   * @param expectedNumber
   * verify the rows number is equal to the expected rows number
   */
  static verifyRowsNumber(rowSelector, expectedNumber) {
    this.getTableRows(rowSelector).then((rows) => {
      expect(rows.length).to.equal(expectedNumber);
    });
  }

  /**
   *
   * @param headerSelector
   * @returns return table header as array of string
   */
  static getTableHeaders(headerSelector) {
    const headerCells = [];
    headerSelector.each((header) => {
      const cell = header.text().trim();
      headerCells.push(cell);
    });
    return cy.then(() => headerCells);
  }

  /**
   *
   * @param rowSelector
   * @returns table rows as array of string
   */
  static getTableRows(rowSelector) {
    const rowCells = [];
    rowSelector.each((row) => {
      const cell = row.text().trim();
      rowCells.push(cell);
    });
    return cy.then(() => rowCells);
  }

  /**
   * 
   * @param headerSelector 
   * @param header 
   * @returns the column index of the specified header
   */
  static findColumnIndex(headerSelector, header) {
    return headerSelector.contains(header).parent().invoke("data", "rgcol");
  }

  /**
   *
   * @param headerSelector
   * @param rowSelector
   * @param header
   * @param value
   * go through row cells and verify the existing cell is equal to the expected value
   */

  static validateTableCell(headerSelector, rowSelector, header, value) {
    this.findColumnIndex(headerSelector, header).then((columnIndex) => {
      rowSelector.each((row) => {
        cy.wrap(row)
          .find(".rgCell")
          .eq(columnIndex)
          .invoke("text")
          .then((cell) => {
            if (cell.trim() == value) {
              expect(cell.trim()).to.equal(value);
            }
          });
      });
    });
  }
}
