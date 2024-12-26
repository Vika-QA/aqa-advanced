import { Expenses } from "../../../cypress/PageObjects/Expenses";
import { visitSiteWithAuth } from "../lesson18/constants";

const expenses = new Expenses();

describe("[UI] Checking Fuel Expenses tab", () => {
  beforeEach(() => {
    visitSiteWithAuth();
    cy.login(Cypress.env("email"), Cypress.env("password"));
  });

  it("Checking info on the tab", () => {
    expenses.clickSidebar("Fuel expenses");
    expenses.isFuelExpensesTextVisible();
    // expenses.showEmptyMessage(); it is not relevant compare precondition with api tests
    expenses.visibleAddAnExpense("to.be.visible");
  });
});
