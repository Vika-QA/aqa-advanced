describe("template spec", () => {
  it("passes", () => {
    cy.visit("https://example.cypress.io");
    cy.get("a[href='/commands/querying']")
      .first()
      .should("contain", "Querying");
    cy.contains("h2", "Commands").should("exist");
  });
});
