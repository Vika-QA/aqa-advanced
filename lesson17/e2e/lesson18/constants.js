export const visitSiteWithAuth = () => {
  cy.visit("/", {
    auth: {
      username: "guest",
      password: "welcome2qauto",
    },
  });
};

// user already logged with this email, so if you want to create new one, pls change the email
export const email = "t1aaaefg6ddd0ss44725554565hjkestsupertestwoooow@qwe.qwe";
export const password = "Test123!";
