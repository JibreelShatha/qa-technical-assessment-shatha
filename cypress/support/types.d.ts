export {};

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Log in via API and cache the session using cy.session.
       * Sets the jwt_auth cookie without visiting any page.
       * Falls back to LOGIN_EMAIL / LOGIN_PASSWORD env variables
       * when no arguments are provided.
       *
       * @param email    - User email address
       * @param password - User password
       *
       * @example
       *   cy.login();
       *   // or with explicit credentials:
       *   cy.login('user@example.com', 'P@ssw0rd');
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
