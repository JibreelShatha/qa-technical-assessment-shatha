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

    cy.request({
      method: 'POST',
      url: 'https://api.vssapi.com/player/api/v1/signin',
      body: {
        username: resolvedEmail,
        password: resolvedPassword,
        d_id: '',
      },
    }).then((response) => {
      expect(response.status).to.eq(200);

      const token = response.body.token;

      cy.setCookie('jwt_auth', token);

      cy.visit('/');
      cy.waitForAppLoader();
    });
  }
);

Cypress.Commands.add('waitForAppLoader', () => {
  cy.get('#preloader', { timeout: 30000 }).should('not.exist');
});
