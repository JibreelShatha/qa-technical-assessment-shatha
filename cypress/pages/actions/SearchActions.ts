import { SearchPage } from '@pages/locators/SearchPage';

const page = new SearchPage();

export class SearchActions {

  openSearchDialog() {
    cy.visit('/?overlay=search').waitForAppLoader();
    return this;
  }

  typeSearchQuery(query: string) {
    page.searchOverlayInput.type(query);
    return this;
  }

  waitForSearchResults() {
    page.searchResults.should('have.length.greaterThan', 0);
    return this;
  }

  selectGameByIndex(index: number) {
    page.searchResults.eq(index).click();
    return this;
  }

}
