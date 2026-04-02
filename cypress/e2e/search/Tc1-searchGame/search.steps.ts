import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

Given('I am logged in', () => {
  cy.login();
});
