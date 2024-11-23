import { defineConfig } from "cypress";
import fs from "fs-extra";
import path from "path";

function getConfigurationByFile(file) {
  const pathToConfigFile = path.resolve("cypress", "config", `${file}.json`);

  return fs.readJsonSync(pathToConfigFile);
}

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
  reporter: "mochawesome",
  reporterOptions: {
    reportDir: "cypress/reports",
    overwrite: false,
    html: false,
    json: true,
  },
  e2e: {
    baseUrl: "https://qauto.forstudy.space/",
    specPattern: "lesson17/e2e/**/*.spec.{js,jsx,ts,tsx}",
    setupNodeEvents(on, config) {
      on("task", {
        log(message) {
          console.log(message);
          return null;
        },
      });

      const configFile = config.env.configFile || "dev";
      const configJson = getConfigurationByFile(configFile);
      console.log(configJson);
      console.log(config);

      config = { ...config, ...configJson };
      config.env = {
        ...config.env,
        ...configJson,
      };

      return config;
    },
  },
});
