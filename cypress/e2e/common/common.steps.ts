import { Given } from '@badeball/cypress-cucumber-preprocessor';

// Shared step definitions used across multiple feature files

Given('Common Step: User is logged in', () => {
  cy.login().visit('/').waitForAppLoader();
});
