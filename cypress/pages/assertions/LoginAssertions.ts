import { LoginPage } from '@pages/Locators/LoginPage';

const page = new LoginPage();

export class LoginAssertions {

  verifyLoginPageVisible(): this {
    cy.url().should('include', '/?overlay=login');
    page.usernameOrEmailInput.should('be.visible');
    page.passwordInput.should('be.visible');
    page.signinButton.should('be.visible');
    return this;
  }

  verifyRedirectedFromLogin(): this {
    cy.url().should('not.include', '/?overlay=login');
    return this;
  }
}
