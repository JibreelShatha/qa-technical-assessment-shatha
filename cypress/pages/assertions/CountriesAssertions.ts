import { Country } from '@pages/dataUtils/CountriesApi';

export class CountriesAssertions {

  verifyStatusCode(response: Cypress.Response<Country[]>, expectedStatus: number) {
    expect(response.status).to.eq(expectedStatus);
    return this;
  }

  verifyNonEmptyArray(response: Cypress.Response<Country[]>) {
    expect(response.body).to.be.an('array').and.not.be.empty;
    return this;
  }

  verifyCountryFields(
    response: Cypress.Response<Country[]>,
    ...fields: string[]
  ) {
    const sample = response.body[0];
    for (const field of fields) {
      expect(sample).to.have.property(field);
    }

    expect(sample.id).to.be.a('number');
    expect(sample.name).to.be.a('string');
    expect(sample.iso2).to.be.a('string');
    expect(sample.currency).to.be.a('string');
    return this;
  }

  verifyCountryExists(response: Cypress.Response<Country[]>, iso2: string) {
    const match = response.body.find((c) => c.iso2 === iso2);
    expect(match, `Country with iso2 "${iso2}" should exist`).to.not.be.undefined;
    return this;
  }

}
