type Selector = () => Cypress.Chainable<JQuery<HTMLElement>>;
export class TableUtils {
  private HEADER_SELECTOR: Selector;
  private ROW_SELECTOR: Selector;
  private HEADER_CELL: string;
  private ROW_CELL: string;
  private INDEX_INVOKERS: string[];

  constructor(
    headerSelector: Selector,
    rowSelector: Selector,
    indexInvokers: string[],
    rowCell?: string,
    headerCell?: string
  ) {
    this.HEADER_SELECTOR = headerSelector;
    this.ROW_SELECTOR = rowSelector;
    this.HEADER_CELL = headerCell;
    this.ROW_CELL = rowCell;
    this.INDEX_INVOKERS = indexInvokers;
  }

  /**
   *
   * @param expectedHeaders array of string contains the expected headers values
   * ceheck if the existing table headers are equal to the expected ones
   */
  verifyTableHeaders(expectedHeaders: string[]) {
    this.getTableHeaders().then((headers) => {
      expect(headers.toString()).to.equal(expectedHeaders.toString());
    });
  }

  /**
   *
   * @param expectedNumber
   * check if the existing row number is equal to the expected one
   */
  verifyRowsNumber(expectedNumber: number) {
    this.getTableRows().then((rows) => {
      expect(rows.length).to.equal(expectedNumber);
    });
  }

  /**
   *
   * @returns return array of string for the existing table headers
   */
  getTableHeaders() {
    const headerCells = [];
    this.HEADER_SELECTOR()
      .find(this.HEADER_CELL)
      .each((header) => {
        const cell = header.text().trim();
        headerCells.push(cell);
      });
    return cy.then(() => headerCells);
  }

  /**
   *
   * @returns array of wraped table rows
   */
  getTableRows() {
    const rowCells = [];
    this.ROW_SELECTOR().each((row) => {
      rowCells.push(cy.wrap(row));
    });
    return cy.then(() => rowCells);
  }

  /**
   *
   * @param headerSelector
   * @param header
   * @returns the column index of the specified header
   */
  findColumnIndex(header) {
    return this.HEADER_SELECTOR()
      .contains(header)
      .parent()
      .invoke(this.INDEX_INVOKERS[0], ...this.INDEX_INVOKERS.slice(1));
  }

  /**
   *
   * @param headerSelector
   * @param rowSelector
   * @param header
   * @param value
   * go through row cells and verify the existing cell is equal to the expected value
   */
  validateCellValue(header, value) {
    let founded: boolean = false;
    this.findColumnIndex(header).then((columnIndex) => {
      this.ROW_SELECTOR().each((row) => {
        cy.wrap(row)
          .find(this.ROW_CELL)
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

  /**
   *
   * @param header
   * @param value
   * @returns the recod elemnt that contains the specific value
   */
  getTableRecord(header, value) {
    let ROW;
    this.findColumnIndex(header).then((columnIndex) => {
      this.ROW_SELECTOR().each((row) => {
        cy.wrap(row)
          .find(this.ROW_CELL)
          .eq(columnIndex)
          .then((record) => {
            cy.wrap(record)
              .invoke("text")
              .then((cell) => {
                console.log({ cell: cell, value: value });
                if (cell === value) {
                  ROW = record.parent().parent();
                }
              });
          });
      });
    });

    return cy.then(() => ROW);
  }

  /**
   *
   * @param row
   * @param header
   * @param value
   * verify the exciting value in specific cell is equal to the expected one
   */
  validateRowValues(row, header, value) {
    this.findColumnIndex(header).then((columnIndex) => {
      cy.wrap(row)
        .find(this.ROW_CELL)
        .eq(columnIndex)
        .invoke("text")
        .then((cell) => {
          console.log({ cell: cell, value: value });
          if (cell === value) {
            expect(cell.trim()).to.equal(value);
          }
        });
    });
  }
}
