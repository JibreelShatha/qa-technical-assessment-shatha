import { LoginPage } from '@pages/Locators/LoginPage';

const page = new LoginPage();

export class LoginAssertions {

  verifyUsernameErrorMessage(message: string): this {
    page.usernameErrorMessage.should('contain.text', message);
    return this;
  }

  verifyPasswordErrorMessage(message: string): this {
    page.passwordErrorMessage.should('contain.text', message);
    return this;
  }
}
