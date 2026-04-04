import { Given } from '@badeball/cypress-cucumber-preprocessor';

// Shared step definitions used across multiple feature files

Given('Common Step: I am logged in', () => {
  cy.login();
});
