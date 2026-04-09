import { COUNTRIES_ENDPOINT } from '@support/constants';

/**
 * CountriesApi — Service layer for the public countries endpoint.
 */
export class CountriesApi {

  /**
   * Fetch the full list of countries.
   */
  getCountries(): Cypress.Chainable<Cypress.Response<Country[]>> {
    return cy.request({
      method: 'GET',
      url: COUNTRIES_ENDPOINT,
    });
  }

}

export interface Country {
  id: number;
  name: string;
  iso2: string;
  currency: string;
}
