import { Given } from '@badeball/cypress-cucumber-preprocessor';
import { SearchActions } from '@pages/actions/SearchActions';

// Shared step definitions used across multiple feature files

const searchActions = new SearchActions();
  
Given('Common Step: User is logged in', () => {
  cy.login().visit('/').waitForAppLoader();
});

Given('Common Step: Logged in user opens search dialog', () => {
  cy.login();
  searchActions.openSearchDialog();
  cy.waitForAppLoader();
});
