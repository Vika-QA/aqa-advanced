import { Fields } from "../../../cypress/PageObjects/Fields";
import "../../../cypress/support/commands";
import { visitSiteWithAuth } from "./constants";

const fields = new Fields();
describe("Login tests", () => {
  before(() => {
    visitSiteWithAuth();
  });

  it("User can log in with valid credentials", () => {
    cy.login(Cypress.env("email"), Cypress.env("password"));
    fields.checkUserPagePanel();
    fields.showSuccessfullyLoginUser();
  });
});
