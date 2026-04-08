import { HomePage } from '@pages/Locators/HomePage';

const page = new HomePage();

export class HomeAssertions {

  verifyHomeIsReachable() {
    cy.url().should('eq', Cypress.config('baseUrl'));
    return this;
  }

  verifyAccountDropdownIsVisible() {
    page.accountDropdownButton.should('be.visible');
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
