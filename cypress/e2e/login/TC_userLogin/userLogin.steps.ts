import { When, Then, Given } from '@badeball/cypress-cucumber-preprocessor';
import { HomeActions } from '@pages/actions/HomeActions';
import { LoginActions } from '@pages/actions/LoginActions';
import { HomeAssertions } from '@pages/assertions/HomeAssertions';
import { LoginAssertions } from '@pages/assertions/LoginAssertions';

const homeActions = new HomeActions();
const homeAssertions = new HomeAssertions();
const loginActions = new LoginActions();
const loginAssertions = new LoginAssertions();

var username_in: string;
var password_in: string;

Given('User log in to the system with valid credentials', () => {
  loginActions.visitLoginPage().loginWith();
});

Then('The main home page should be reachable', () => {
  homeAssertions.verifyHomeIsReachable();
});

When('User click on the account dropdown', () => {
  homeActions.openAccountDropdown();
});

Then('The account drawer should be open', () => {
  homeAssertions.verifyAccountDrawerIsOpen();
});

Then('The displayed username should match the logged in user', () => {
  homeAssertions.verifyUsernameMatches(Cypress.env('LOGIN_USERNAME'));
});

Given('User open log in page', () => {
  loginActions.visitLoginPage();
});

When('User enters username {string} and password {string}', (username: string, password: string) => {
  username_in = username === 'correct_user' ? Cypress.env('LOGIN_USERNAME') : username;
  password_in = password === 'correct_pass' ? Cypress.env('LOGIN_PASSWORD') : password;
  loginActions.fillLoginForm(username_in, password_in);
});

When('Clicks the login button', () => {
  loginActions.submitLogin();
});

Then('An error message {string} should be displayed', (message: string) => {
  if (username_in === '') {
    loginAssertions.verifyUsernameErrorMessage(message);
  } else if (password_in === '' || password_in !== Cypress.env('LOGIN_PASSWORD')) {
    loginAssertions.verifyPasswordErrorMessage(message);
  } else {
    loginAssertions.verifyUsernameErrorMessage(message);
  }
});