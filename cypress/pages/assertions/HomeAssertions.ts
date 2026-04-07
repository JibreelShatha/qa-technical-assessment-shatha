import { HomePage } from '@pages/Locators/HomePage';

const page = new HomePage();

export class HomeAssertions {

  verifyHomeIsReachable(): this {
    cy.url().should('eq', Cypress.config('baseUrl'));
    return this;
  }

  verifyAccountDropdownIsVisible(): this {
    page.accountDropdownButton.should('be.visible');
    return this;
  }

  verifyAccountDrawerIsOpen(): this {
    page.accountDrawer.should('be.visible');
    return this;
  }

  verifyUsernameMatches(expectedUsername: string): this {
    page.accountUsername.should('be.visible').and('have.text', expectedUsername);
    return this;
  }

}
