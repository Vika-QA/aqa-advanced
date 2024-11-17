import { visitSiteWithAuth } from "./lesson18/constants";

describe("Checking btns from the header and footer", () => {
  beforeEach(() => {
    visitSiteWithAuth();
  });
  context("HEADER", () => {
    it("Checking menu items", () => {
      cy.get('[class*="header_nav"]').should("exist");
      cy.contains('[class*="btn header-link"]', "Home")
        .and("have.prop", "tagName")
        .should("eq", "A")
        .and("not.be.empty");
      cy.get('[class="btn header-link"]')
        .eq(0)
        .should("have.text", "About")
        .and("have.prop", "tagName")
        .should("eq", "BUTTON")
        .and("not.be.empty");
      cy.get('[class="btn header-link"]')
        .eq(1)
        .should("have.text", "Contacts")
        .and("have.prop", "tagName")
        .should("eq", "BUTTON")
        .and("not.be.empty");
      cy.window().then((window) => {
        const firstPosition = window.scrollY;
        cy.get('[class="btn header-link"]').contains("About").click();
        cy.window()
          .should("have.prop", "scrollY")
          .and("be.greaterThan", firstPosition);
        // eslint-disable-next-line cypress/no-unnecessary-waiting
        cy.wait(500);
        cy.get('[class="btn header-link"]').contains("Contacts").click();
        cy.window()
          .should("have.prop", "scrollY")
          .and("be.greaterThan", firstPosition);
      });
    });
    it("Checking btns Sign In / Sign Up / Log In", () => {
      cy.get('[class*="header_signin"]')
        .should("have.text", "Sign In")
        .and("have.prop", "tagName")
        .should("eq", "BUTTON");
      cy.contains('[class="hero-descriptor_btn btn btn-primary"]', "Sign up")
        .and("have.prop", "tagName")
        .should("eq", "BUTTON");
      cy.get('[class="header-link -guest"]').click();
      cy.url().should("eq", `${Cypress.config("baseUrl")}panel/garage`);
      cy.get('[id="userNavDropdown"]').click();
      cy.get('[class="dropdown-item btn btn-link user-nav_link"]')
        .last()
        .click();
      cy.url().should("eq", Cypress.config("baseUrl"));
    });
  });
  context("FOOTER", () => {
    it("Checking links and btns", () => {
      cy.get('[id="contactsSection"]').find('[class="row"]').should("exist");
    });
    it("Checking social networks", () => {
      cy.contains("h2", "Contacts").should("be.visible");
      cy.get('[class="contacts_socials socials"]')
        .find('[class="socials_link"]')
        .should("have.length", 5);
      cy.get('[class="contacts_socials socials"]')
        .find("a")
        .each(($link) => {
          cy.wrap($link)
            .should("have.attr", "href")
            .and("not.be.empty")
            .and("not.include", "#");
          cy.wrap($link).should("have.attr", "target").and("equal", "_blank");

          const socialNetworks = [
            {
              iconClass: "icon-facebook",
              url: "https://www.facebook.com/Hillel.IT.School",
            },
            { iconClass: "icon-telegram", url: "t.me/ithillel_kyiv" },
            {
              iconClass: "icon-youtube",
              url: "https://www.youtube.com/user/HillelITSchool?sub_confirmation=1",
            },
            {
              iconClass: "icon-instagram",
              url: "https://www.instagram.com/hillel_itschool/",
            },
            {
              iconClass: "icon-linkedin",
              url: "https://www.linkedin.com/school/ithillel/",
            },
          ];

          socialNetworks.forEach((network) => {
            cy.get(`[class*="${network.iconClass}"]`)
              .parent("a")
              .should("have.attr", "href")
              .and("include", network.url);
          });
        });
    });

    it("Checking URLs support", () => {
      cy.contains("a", "ithillel.ua").should("be.visible");
      cy.get('[class="contacts_link display-4"]')
        .should("have.attr", "href")
        .and("not.be.empty")
        .and("not.include", "#");
      cy.contains("a", "support@ithillel.ua").should("be.visible");
      cy.get('[class="contacts_link h4"]')
        .should("have.attr", "href")
        .and("not.be.empty")
        .and("not.include", "#");
    });
  });
});
