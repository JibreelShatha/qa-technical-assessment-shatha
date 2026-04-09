import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import { GameActions } from '@pages/actions/GameActions';
import { LoginAssertions } from '@pages/assertions/LoginAssertions';

const gameActions = new GameActions();
const loginAssertions = new LoginAssertions();

Given('The user is not logged in', () => {
  cy.clearCookies();
});

Given('The user navigates to the {string} game page', (gameSlug: string) => {
  gameActions.navigateToGamePage(gameSlug);
});

When('The user clicks the Real Play button', () => {
    gameActions.clickRealPlay();
});

Then('The login overlay should be displayed', () => {
  loginAssertions.verifyLoginOverlayDisplayed();
});

Then('The login overlay should contain a Login button', () => {
  loginAssertions.verifyLoginOverlayHasLoginButton();
});
