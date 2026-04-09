export class LoginPage {

  get usernameOrEmailInput() {
    return cy.get('input[name="username"]');
  }

  get passwordInput() {
    return cy.get('input[name="password"]');
  }

  get signinButton() {
    return cy.get('button[type="submit"]').contains('Login');
  }

  get usernameErrorMessage() {
    return cy.get('input[name="username"]').parents('.input-container').find('p.MuiFormHelperText-root.Mui-error');
  }

  get passwordErrorMessage() {
    return cy.get('input[name="password"]').parents('.input-container').find('p.MuiFormHelperText-root.Mui-error');
  }

  get loginOverlayDialog() {
    return cy.get('[role="dialog"]');
  }
  
}
