import { LoginActions } from '@pages/actions/LoginActions';

const loginActions = new LoginActions();

Cypress.Commands.add(
  'login',
  (
    email?: string,
    password?: string
  ) => {
    const resolvedEmail =
      email ?? Cypress.env('LOGIN_EMAIL');
    const resolvedPassword =
      password ?? Cypress.env('LOGIN_PASSWORD');

    loginActions.visitLoginPage();
    loginActions.loginWith(resolvedEmail, resolvedPassword);
  }
);

Cypress.Commands.add('waitForAppLoader', () => {
  cy.get('img[alt="app loader"]', { timeout: 30000 }).should('not.exist');
});
