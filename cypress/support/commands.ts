import { SIGNIN_ENDPOINT } from '@support/constants';

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

    cy.session(
      [resolvedEmail, resolvedPassword],
      () => {
        cy.request({
          method: 'POST',
          url: SIGNIN_ENDPOINT,
          body: {
            username: resolvedEmail,
            password: resolvedPassword,
            d_id: '',
          },
        }).then((response) => {
          expect(response.status).to.eq(200);
          const token = response.body.token;
          cy.setCookie('jwt_auth', token);
        });
      },
      {
        validate() {
          cy.getCookie('jwt_auth').should('exist');
        },
      }
    );
  }
);

Cypress.Commands.add('waitForAppLoader', () => {
  cy.get('#preloader', { timeout: 30000 }).should('not.exist');
});

Cypress.Commands.add('waitForGameLoader', () => {
  cy.get('[role="progressbar"]', { timeout: 30000 }).should('not.exist');
});