import { When, Then } from '@badeball/cypress-cucumber-preprocessor';
import { CountriesApi, Country } from '@pages/dataUtils/CountriesApi';
import { CountriesAssertions } from '@pages/assertions/CountriesAssertions';

const countriesApi = new CountriesApi();
const countriesAssertions = new CountriesAssertions();
let countriesResponse: Cypress.Response<Country[]>;

When('The API client requests the countries list', () => {
  countriesApi.getCountries().then((response) => {
    countriesResponse = response;
  });
});

Then('The countries response status should be {int}', (expectedStatus: number) => {
  countriesAssertions.verifyStatusCode(countriesResponse, expectedStatus);
});

Then('The countries response should be a non-empty array', () => {
  countriesAssertions.verifyNonEmptyArray(countriesResponse);
});

Then('Each country should have {string}, {string}, {string}, and {string} fields', (
  id: string, name: string, iso2: string, currency: string,
) => {
  countriesAssertions.verifyCountryFields(countriesResponse, id, name, iso2, currency);
});

Then('The countries list should contain a country with iso2 {string}', (iso2: string) => {
  countriesAssertions.verifyCountryExists(countriesResponse, iso2);
});
