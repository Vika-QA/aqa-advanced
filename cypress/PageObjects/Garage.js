import {
  carData,
  randomDataCar,
  randomNumberFrom10to100,
} from "../../lesson17/e2e/lesson20/constants";

export class Garage {
  selectors = {
    addCarBtn: () => cy.get('[class="btn btn-primary"]').contains("Add car"),
    brand: () => cy.get('[id="addCarBrand"]'),
    model: () => cy.get('[id="addCarModel"]'),
    mileage: () => cy.get('[id="addCarMileage"]'),
    addCarPopup: () =>
      cy.get('[class="modal-content"]').find('[class="btn btn-primary"]'),
    infoAboutCar: () => cy.get('[class="car jumbotron"]'),
    notification: () => cy.get('[class="invalid-feedback"]'),
    modalForm: () => cy.get('[class="modal-content"]'),
    alertDangerNotification: () => cy.get(".alert.alert-danger"),
    textInfoH1: () =>
      cy.get('[class*="panel-page_heading"]').contains("Garage"),
    sidebar: () => cy.get('[class*="sidebar-wrapper"]'),
    iconDelete: () => cy.get('[class="icon icon-edit"]'),
    carList: () => cy.get('[class="car-list"]'),
    removeCar: () => cy.get('[class="btn btn-outline-danger"]'),
    finishRemove: () => cy.get('[class="btn btn-danger"]'),
  };

  clickAddCar() {
    return this.selectors.addCarBtn().click({ force: true });
  }

  isAddCarBtnVisible() {
    return this.selectors.addCarBtn().should("to.be.visible");
  }

  chooseBrand(optionValue) {
    return this.selectors.brand().select(optionValue);
  }

  chooseModel(optionValue) {
    return this.selectors.model().select(optionValue);
  }

  addMileage(value) {
    return this.selectors.mileage().type(value);
  }

  clickAddCarPopup() {
    return this.selectors.addCarPopup().click({ force: true });
  }

  showInfoAboutCar() {
    return this.selectors.infoAboutCar();
  }

  showNotification(text) {
    return this.selectors.notification(text);
  }

  clickModalForm() {
    return this.selectors.modalForm().click();
  }

  isTextInfoH1Visible() {
    return this.selectors.textInfoH1().should("to.be.visible");
  }

  isSidebarVisible() {
    return this.selectors.sidebar().should("to.be.visible");
  }

  addRandomCarToGarage() {
    const { randomBrand, randomModel } = randomDataCar(carData);
    this.clickAddCar();
    // Without it Brand's IDs overlap (2 ones IDs) and the test does not select the correct selector
    cy.wait(500);
    this.chooseBrand(randomBrand);
    this.chooseModel(randomModel);
    this.addMileage(randomNumberFrom10to100());
    this.clickAddCarPopup();
  }

  deleteAllCars() {
    this.selectors.infoAboutCar().should("have.length.greaterThan", 0);

    this.selectors.infoAboutCar().each(($el) => {
      cy.wrap($el)
        .find('[class="icon icon-edit"]')
        .first()
        .click({ force: true });

      this.selectors.removeCar().click({ force: true });
      this.selectors.finishRemove().click({ force: true });
      cy.wait(500);
    });
  }
}
