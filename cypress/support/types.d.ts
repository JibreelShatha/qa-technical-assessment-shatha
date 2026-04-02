export {};

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Log in via the UI login overlay modal.
       * Opens /?overlay=login, fills credentials, and clicks Sign In.
       * Falls back to LOGIN_EMAIL / LOGIN_PASSWORD env variables when
       * no arguments are provided.
       *
       * @param email    - User email address
       * @param password - User password
       *
       * @example
       *   cy.login('user@example.com', 'P@ssw0rd');
       *   // or rely on .env defaults:
       *   cy.login();
       */
      login(email?: string, password?: string): Chainable<void>;

      /**
       * Wait for the app loader spinner to disappear from the DOM.
       *
       * @example
       *   cy.waitForAppLoader();
       */
      waitForAppLoader(): Chainable<void>;
    }
  }
}
