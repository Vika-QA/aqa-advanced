import { Garage } from "../../../cypress/PageObjects/Garage";
import { visitSiteWithAuth } from "../lesson18/constants";

const garage = new Garage();

describe("[UI] Checking text and notification", () => {
  beforeEach(() => {
    visitSiteWithAuth();
    cy.login(Cypress.env("email"), Cypress.env("password"));
    const baseUrl = Cypress.config("baseUrl");
    cy.log(`Base URL: ${baseUrl}`);
    console.log(`Base URL: ${baseUrl}`);
  });

  context("Checking notification and info on the page", () => {
    it("Visible info on the page", () => {
      garage.isTextInfoH1Visible();
      garage.isSidebarVisible();
      garage.isAddCarBtnVisible();
    });
    it("[NEGATIVE] Checking notification", () => {
      garage.clickAddCar();
      garage.addMileage("-123");
      garage.clickModalForm();
      garage.showNotification("Mileage has to be from 0 to 999999");
    });
  });
});
