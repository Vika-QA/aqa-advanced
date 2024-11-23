export class Expenses {
  selectors = {
    addFuelExpense: () =>
      cy.get('[class*="car_add-expense"]').contains("Add fuel expense"),
    fuelExpensesText: () => cy.get('[class*="panel-page_heading"]'),
    vehicle: () => cy.get('[id="addExpenseCar"]'),
    reportDate: () => cy.get('[id="addExpenseDate"]'),
    numberOfLiters: () => cy.get('[id="addExpenseLiters"]'),
    totalCost: () => cy.get('[id="addExpenseTotalCost"]'),
    tableAboutCar: () => cy.get('[class="panel-page_content"]'),
    sidebarTab: () => cy.get('[class*="sidebar"]'),
    addAnExpenseBtn: () => cy.get('[class="btn btn-primary"]'),
    mileageFuel: () => cy.get('[id="addExpenseMileage"]'),
    addFuelBtn: () =>
      cy.get('[class="modal-content"]').find("[class='btn btn-primary']"),
    alertNotification: () => cy.get("[class='alert alert-success']"),
    alertDangerNotification: () => cy.get('[class="alert alert-danger"]'),
    emptyMessage: () => cy.get("[class*=panel-empty_message]"),
    carSelect: () => cy.get('[id="carSelectDropdown"]'),
    btnCloseModalWindow: () => cy.get('[class="close"]'),
  };

  clickBtnClose() {
    return this.selectors.btnCloseModalWindow().click();
  }

  visibleCarSelect(assertion) {
    return this.selectors.carSelect().should(assertion);
  }

  visibleAddAnExpense(assertion) {
    return this.selectors.addAnExpenseBtn().should(assertion);
  }

  addTotalCost(option) {
    return this.selectors.totalCost().type(option);
  }

  clickSidebar(text) {
    return this.selectors.sidebarTab().contains(text).click();
  }

  isFuelExpensesTextVisible() {
    return this.selectors.fuelExpensesText().should("to.be.visible");
  }

  clickAddAnExpense() {
    return this.selectors.addAnExpenseBtn().click();
  }

  showReportDate() {
    return this.selectors.reportDate().should("to.be.visible");
  }

  typeReportDate(date) {
    return this.selectors.reportDate().clear().type(date);
  }

  addMileageFuel() {
    return this.selectors.mileageFuel();
  }

  addNumberOfLiters(value) {
    return this.selectors.numberOfLiters().type(value);
  }

  clickAddFuel() {
    return this.selectors.addFuelBtn().click();
  }

  showAlertNotification(text) {
    return this.selectors.alertNotification(text);
  }

  showAlertDangerNotification(text) {
    return this.selectors.alertDangerNotification(text);
  }

  showEmptyMessage() {
    return this.selectors.emptyMessage().should("exist");
  }
}
