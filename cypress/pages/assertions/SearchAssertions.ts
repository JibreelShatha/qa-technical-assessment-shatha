import { GameAssetsResponse } from '@pages/dataUtils/GameAssetsApi';
import { SearchPage } from '@pages/locators/SearchPage';

const page = new SearchPage();

export class SearchAssertions {

  verifySearchResultsVisible() {
    page.searchResults.should('have.length.greaterThan', 0);
    return this;
  }

  verifyNoResultsMessage() {
    page.noResultsMessage.should('be.visible');
    return this;
  }

  verifyApiResponseSchema(response: GameAssetsResponse) {
    expect(response).to.have.property('data');
    expect(response).to.have.property('current_page');
    expect(response).to.have.property('last_page');
    expect(response).to.have.property('per_page');
    expect(response).to.have.property('total');
    return this;
  }

  verifyApiPerPage(response: GameAssetsResponse, expectedPerPage: number) {
    expect(response).to.have.property('per_page', expectedPerPage);
    return this;
  }

  verifyApiDataIsArray(response: GameAssetsResponse) {
    expect(response.data).to.be.an('array');
    return this;
  }

  verifyApiDataIsEmpty(response: GameAssetsResponse) {
    expect(response.data).to.be.an('array').that.is.empty;
    return this;
  }

  verifyApiTotal(response: GameAssetsResponse, expectedTotal: number) {
    expect(response).to.have.property('total', expectedTotal);
    return this;
  }

  verifyApiStatusCode(response: Cypress.Response<GameAssetsResponse>, expectedStatus: number) {
    expect(response.status).to.eq(expectedStatus);
    return this;
  }

  verifyGameAssetFields(
    response: GameAssetsResponse,
    ...fields: string[]
  ) {
    expect(response.data).to.be.an('array').and.not.be.empty;
    const item = response.data[0];
    for (const field of fields) {
      expect(item).to.have.property(field);
    }
    return this;
  }

}
