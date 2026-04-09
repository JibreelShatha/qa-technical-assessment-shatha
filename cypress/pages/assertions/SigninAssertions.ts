import { SigninResponse, SigninValidationResponse } from '@pages/dataUtils/SigninApi';

export class SigninAssertions {

  verifyStatusCode(response: Cypress.Response<SigninResponse | SigninValidationResponse>, expectedStatus: number) {
    expect(response.status).to.eq(expectedStatus);
    return this;
  }

  verifyTokenPresent(response: Cypress.Response<SigninResponse | SigninValidationResponse>) {
    const body = response.body as SigninResponse;
    expect(body).to.have.property('token');
    expect(body.token).to.be.a('string').and.not.be.empty;
    return this;
  }

  verifyValidationErrors(
    response: Cypress.Response<SigninResponse | SigninValidationResponse>,
    ...fields: string[]
  ) {
    const body = response.body as SigninValidationResponse;
    expect(body).to.have.property('errors');
    for (const field of fields) {
      expect(body.errors).to.have.property(field);
    }
    return this;
  }

}
