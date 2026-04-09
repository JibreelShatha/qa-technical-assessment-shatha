import { When, Then, Given } from '@badeball/cypress-cucumber-preprocessor';
import { SearchAssertions } from '@pages/assertions/SearchAssertions';
import { GameAssetsApi, GameAssetsResponse } from '@pages/dataUtils/GameAssetsApi';

const searchAssertions = new SearchAssertions();
const gameAssetsApi = new GameAssetsApi();
let apiResponse: GameAssetsResponse;
let rawResponse: Cypress.Response<GameAssetsResponse>;

Given('User is authenticated', () => {
  cy.login();
});

When('The API client searches for {string}', (query: string) => {
  gameAssetsApi.searchGameAssets(query).then((response) => {
    searchAssertions.verifyApiStatusCode(response, 200);
    apiResponse = response.body;
  });
});

When('The API client searches with per_page {string}', (perPage: string) => {
  gameAssetsApi.searchWithCustomPerPage(perPage).then((response) => {
    rawResponse = response;
  });
});

Then('The API response should contain required schema fields', () => {
  searchAssertions.verifyApiResponseSchema(apiResponse);
});

Then('The API response per_page should equal {int}', (expectedPerPage: number) => {
  searchAssertions.verifyApiPerPage(apiResponse, expectedPerPage);
});

Then('The API response data should be an array', () => {
  searchAssertions.verifyApiDataIsArray(apiResponse);
});

Then('The API response data should be an empty array', () => {
  searchAssertions.verifyApiDataIsEmpty(apiResponse);
});

Then('The API response total should equal {int}', (expectedTotal: number) => {
  searchAssertions.verifyApiTotal(apiResponse, expectedTotal);
});

Then('Each game asset should have {string}, {string}, {string}, and {string} fields', (
  id: string, name: string, type: string, platform: string,
) => {
  searchAssertions.verifyGameAssetFields(apiResponse, id, name, type, platform);
});

Then('The game-assets response status should be {int}', (expectedStatus: number) => {
  searchAssertions.verifyApiStatusCode(rawResponse, expectedStatus);
});
