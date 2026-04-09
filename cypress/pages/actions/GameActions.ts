import { GamePage } from '@pages/locators/GamePage';

const page = new GamePage();

export class GameActions {

  navigateToGamePage(gameSlug: string) {
    cy.visit(`/casino-game/${gameSlug}/`).waitForAppLoader();
    return this;
  }
  
  clickRealPlay() {
    page.realPlayButton.click();
    return this;
  }

  clickFunPlay() {
    page.funPlayButton.click();
    return this;
  }
}
