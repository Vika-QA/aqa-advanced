import { faker } from "@faker-js/faker";

export const visitSiteWithAuth = () => {
  cy.visit("/", {
    auth: {
      username: "guest",
      password: "welcome2qauto",
    },
  });
};

// user already logged with this email, so if you want to create new one, pls change the email
export const email = faker.internet.email();
export const password = "Test123!";
