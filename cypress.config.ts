import { defineConfig } from 'cypress';
import createBundler from '@bahmutov/cypress-esbuild-preprocessor';
import { addCucumberPreprocessorPlugin } from '@badeball/cypress-cucumber-preprocessor';
import { createEsbuildPlugin } from '@badeball/cypress-cucumber-preprocessor/esbuild';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  e2e: {
    baseUrl: 'https://stage.spinbet.com/en-nz',
    specPattern: ["**/*.feature"],
    supportFile: 'cypress/support/e2e.ts',

    // Viewport default setting/fallback
    viewportWidth: 1280,
    viewportHeight: 720,

    // Timeouts
    defaultCommandTimeout: 10000,
    requestTimeout: 15000,
    responseTimeout: 15000,
    pageLoadTimeout: 30000,

    // Retries for flake resilience
    retries: {
      runMode: 2,
      openMode: 0,
    },

    // Screenshots & Videos
    screenshotOnRunFailure: false,
    video: false,
    videosFolder: 'cypress/reports/videos',
    screenshotsFolder: 'cypress/reports/screenshots',

    // Environment variables
    env: {
      TAGS: '',
    },

    async setupNodeEvents(
      on: Cypress.PluginEvents,
      config: Cypress.PluginConfigOptions
    ): Promise<Cypress.PluginConfigOptions> {
      // Merge CYPRESS_* variables from .env into Cypress env
      for (const [key, value] of Object.entries(process.env)) {
        if (key.startsWith('CYPRESS_') && value !== undefined) {
          config.env[key.replace('CYPRESS_', '')] = value;
        }
      }

      await addCucumberPreprocessorPlugin(on, config);

      on(
        'file:preprocessor',
        createBundler({
          plugins: [createEsbuildPlugin(config)],
        })
      );

      return config;
    },
  },
});
