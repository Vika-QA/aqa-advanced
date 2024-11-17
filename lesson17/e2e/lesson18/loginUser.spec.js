import { Fields } from "../../../cypress/PageObjects/Fields";
import "../../../cypress/support/commands";
import { email, password, visitSiteWithAuth } from "./constants";

const fields = new Fields();
describe("Login tests", () => {
  before(() => {
    visitSiteWithAuth();
  });

  it("User can log in with valid credentials", () => {
    cy.login(email, password);
    fields.checkUserPagePanel();
    fields.showSuccessfullyLoginUser();
  });
});
