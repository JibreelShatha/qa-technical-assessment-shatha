import { HomePage } from '@pages/locators/HomePage';

const page = new HomePage();

export class HomeAssertions {

  verifyHomeIsReachable() {
    cy.url().should('eq', Cypress.config('baseUrl'));
    return this;
  }

  verifyAccountDrawerIsOpen() {
    page.accountDrawer.should('be.visible');
    return this;
  }

  verifyUsernameMatches(expectedUsername: string) {
    page.accountUsername.should('be.visible').and('have.text', expectedUsername);
    return this;
  }

}
