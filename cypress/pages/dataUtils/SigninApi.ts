import { SIGNIN_ENDPOINT, WRONG_PASSWORD, NON_EXISTENT_EMAIL, NON_EXISTENT_PASSWORD } from '@support/constants';

/**
 * SigninApi — Service layer for sign-in API requests via cy.request.
 */
export class SigninApi {

  /**
   * Sign in with valid credentials from env variables.
   */
  signinWithValidCredentials(): Cypress.Chainable<Cypress.Response<SigninResponse>> {
    return cy.request({
      method: 'POST',
      url: SIGNIN_ENDPOINT,
      body: {
        username: Cypress.env('LOGIN_EMAIL'),
        password: Cypress.env('LOGIN_PASSWORD'),
        d_id: '',
      },
    });
  }

  /**
   * Sign in with a correct username but wrong password.
   */
  signinWithWrongPassword(): Cypress.Chainable<Cypress.Response<SigninResponse>> {
    return cy.request({
      method: 'POST',
      url: SIGNIN_ENDPOINT,
      body: {
        username: Cypress.env('LOGIN_EMAIL'),
        password: WRONG_PASSWORD,
        d_id: '',
      },
      failOnStatusCode: false,
    });
  }

  /**
   * Sign in with a non-existent user.
   */
  signinWithNonExistentUser(): Cypress.Chainable<Cypress.Response<SigninResponse>> {
    return cy.request({
      method: 'POST',
      url: SIGNIN_ENDPOINT,
      body: {
        username: NON_EXISTENT_EMAIL,
        password: NON_EXISTENT_PASSWORD,
        d_id: '',
      },
      failOnStatusCode: false,
    });
  }

  /**
   * Sign in with an empty request body (no username/password).
   */
  signinWithEmptyBody(): Cypress.Chainable<Cypress.Response<SigninValidationResponse>> {
    return cy.request({
      method: 'POST',
      url: SIGNIN_ENDPOINT,
      body: {},
      failOnStatusCode: false,
    });
  }

}

export interface SigninResponse {
  token?: string;
  [key: string]: unknown;
}

export interface SigninValidationResponse {
  message: string;
  errors: Record<string, string[]>;
}
