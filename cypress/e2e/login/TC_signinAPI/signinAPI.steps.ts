import { When, Then } from '@badeball/cypress-cucumber-preprocessor';
import { SigninApi } from '@pages/dataUtils/SigninApi';
import { SigninAssertions } from '@pages/assertions/SigninAssertions';
import { SigninResponse, SigninValidationResponse } from '@pages/dataUtils/SigninApi';

const signinApi = new SigninApi();
const signinAssertions = new SigninAssertions();
let signinResponse: Cypress.Response<SigninResponse | SigninValidationResponse>;

When('The API client sends valid credentials', () => {
  signinApi.signinWithValidCredentials().then((response) => {
    signinResponse = response;
  });
});

When('The API client sends wrong password', () => {
  signinApi.signinWithWrongPassword().then((response) => {
    signinResponse = response;
  });
});

When('The API client sends non-existent user credentials', () => {
  signinApi.signinWithNonExistentUser().then((response) => {
    signinResponse = response;
  });
});

When('The API client sends an empty sign-in body', () => {
  signinApi.signinWithEmptyBody().then((response) => {
    signinResponse = response;
  });
});

Then('The sign-in response status should be {int}', (expectedStatus: number) => {
  signinAssertions.verifyStatusCode(signinResponse, expectedStatus);
});

Then('The sign-in response should contain a token', () => {
  signinAssertions.verifyTokenPresent(signinResponse);
});

Then(
  'The sign-in response should contain validation errors for {string} and {string}',
  (username: string, password: string) => {
    signinAssertions.verifyValidationErrors(signinResponse, username, password);
  },
);
