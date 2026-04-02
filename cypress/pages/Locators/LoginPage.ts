export class LoginPage {

  get usernameOrEmailInput() {
    return cy.get('input#username');
  }

  get passwordInput() {
    return cy.get('input#password');
  }

  get signinButton() {
    return cy.get('[id="signin-button"]');
  }
  
}
