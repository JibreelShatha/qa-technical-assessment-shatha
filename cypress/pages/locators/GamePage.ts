export class GamePage {

  get realPlayButton() {
    return cy.get('button').contains('Real Play');
  }

  get funPlayButton() {
    return cy.get('button').contains('Fun Play');
  }

  get gameIframe() {
    return cy.get('iframe[title]', { timeout: 30000 });
  }

}
