import { LoginPage } from '@pages/Locators/LoginPage';

const page = new LoginPage();

export class LoginActions {

  visitLoginPage() {
    cy.visit('/?overlay=login');
    return this;
  }

  fillLoginForm(email: string, password: string) {
    page.usernameOrEmailInput.type(email);
    page.passwordInput.type(password);
    return this;
  }

  submitLogin() {
    page.signinButton.click();
    return this;
  }

  loginWith(email: string, password: string) {
    this.fillLoginForm(email, password);
    this.submitLogin();
    return this;
  }

  
}
