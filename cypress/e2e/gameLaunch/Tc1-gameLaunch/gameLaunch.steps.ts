import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import { SearchActions } from '@pages/actions/SearchActions';
import { GameActions } from '@pages/actions/GameActions';
import { GameAssertions } from '@pages/assertions/GameAssertions';
import { GAME_ASSETS_INTERCEPT_PATTERN, GAME_LAUNCH_INTERCEPT_PATTERN, VALID_SEARCH_TERM } from '@support/constants';

const searchActions = new SearchActions();
const gameActions = new GameActions();
const gameAssertions = new GameAssertions();

Given('the game-assets API is intercepted for game launch', () => {
  cy.intercept('GET', GAME_ASSETS_INTERCEPT_PATTERN).as('gameAssets');
  cy.intercept('GET', GAME_LAUNCH_INTERCEPT_PATTERN).as('gameLaunch');
});

When('the user searches and selects the first game', () => {
  searchActions.typeSearchQuery(VALID_SEARCH_TERM);
  cy.wait('@gameAssets');
  searchActions.waitForSearchResults().selectGameByIndex(0);
  cy.wait('@gameLaunch');
  cy.waitForGameLoader();
});

Then('the user should be on a game page', () => {
  gameAssertions.verifyOnGamePage();
});

Then('the game iframe should be loaded', () => {
  gameAssertions.verifyGameIframeLoaded();
});
