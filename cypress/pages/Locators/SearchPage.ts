export class SearchPage {

  get searchOverlayInput() {
    return cy.get('input[name="search"]').first();
  }

  get searchResults() {
    return cy.get('.grid-games a.game-item[href*="/casino-game/"]');
  }

  get noResultsMessage() {
    return cy.get('.grid-games').contains('span', 'No results found')
  }

}
