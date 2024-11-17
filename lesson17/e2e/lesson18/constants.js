export const visitSiteWithAuth = () => {
  cy.visit("https://qauto.forstudy.space/", {
    auth: {
      username: "guest",
      password: "welcome2qauto",
    },
  });
};

// user already logged with this email, so if you want to create new one, pls change the email
export const email = "testsupertestwoooow@qwe.qwe";
export const password = "Test123!";
