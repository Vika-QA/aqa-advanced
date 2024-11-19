import { defineConfig } from "cypress";

export default defineConfig({
  retries: { runMode: 3, openMode: 3 },
  screenshotsFolder: "lesson17/screenshots",
  videosFolder: "lesson17/video",
  screenshotOnRunFailure: true,
  video: true,
  viewportWidth: 1440,
  viewportHeight: 900,
  defaultCommandTimeout: 10000,
  pageLoadTimeout: 60000,
  fixturesFolder: "aqa-advanced/cypress/fixtures",
  supportFolder: "aqa-advanced/cypress/support",
  e2e: {
    baseUrl: "https://qauto.forstudy.space/",
    specPattern: "lesson17/e2e/**/*.spec.{js,jsx,ts,tsx}",
    // eslint-disable-next-line no-unused-vars
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
