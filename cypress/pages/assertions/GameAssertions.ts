import { GamePage } from '@pages/locators/GamePage';

const page = new GamePage();

export class GameAssertions {

  verifyGameIframeLoaded() {
    page.gameIframe.should('be.visible');
    return this;
  }

  verifyOnGamePage() {
    cy.url().should('include', '/casino-game/');
    return this;
  }

}
