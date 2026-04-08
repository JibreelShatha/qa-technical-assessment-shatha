import { LoginPage } from '@pages/Locators/LoginPage';

const page = new LoginPage();

export class LoginAssertions {

  verifyUsernameErrorMessage(message: string) {
    page.usernameErrorMessage.should('contain.text', message);
    return this;
  }

  verifyPasswordErrorMessage(message: string) {
    page.passwordErrorMessage.should('contain.text', message);
    return this;
  }
}
