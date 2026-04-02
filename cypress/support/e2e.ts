import './commands';

beforeEach(() => {
  // Wait for the app loader to disappear before interacting with the page.
  cy.waitForAppLoader();
});
