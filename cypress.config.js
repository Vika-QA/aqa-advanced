import { defineConfig } from "cypress";

export default defineConfig({
  retries: { runMode: 3, openMode: 3 },
  screenshotsFolder: 'lesson17/screenshots',
  videosFolder: 'lesson17/video',
  screenshotOnRunFailure: true,
  video: true,
  viewportWidth: 1440,
  viewportHeight: 700,
  defaultCommandTimeout: 10000,
  pageLoadTimeout: 60000,
  e2e: {
    // baseUrl: '',
    specPattern: 'lesson17/e2e/**/*.spec.{js,jsx,ts,tsx}',
    setupNodeEvents(on, config) {  // eslint-disable-line
      // implement node event listeners here
    },
  },
});
