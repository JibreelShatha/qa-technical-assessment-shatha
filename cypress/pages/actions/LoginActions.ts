import { LoginPage } from '@pages/Locators/LoginPage';

const page = new LoginPage();

export class LoginActions {

  visitLoginPage() {
    cy.visit('/?overlay=login').waitForAppLoader();
    return this;
  }

  fillLoginForm(email?: string, password?: string) {
    if (email) page.usernameOrEmailInput.type(email);
    if (password) page.passwordInput.type(password);
    return this;
  }

  submitLogin() {
    page.signinButton.click();
    return this;
  }

  loginWith(email?: string, password?: string) {
    this.fillLoginForm(email ?? Cypress.env('LOGIN_USERNAME'), password ?? Cypress.env('LOGIN_PASSWORD'));
    this.submitLogin();
    return this;
  }

  
}
