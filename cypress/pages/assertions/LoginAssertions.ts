import { LoginPage } from '@pages/locators/LoginPage';

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

  verifyLoginOverlayDisplayed() {
    page.loginOverlayDialog.should('be.visible');
    cy.url().should('include', 'overlay=login');
    return this;
  }

  verifyLoginOverlayHasLoginButton() {
    page.signinButton.should('be.visible');
    return this;
  }
}
