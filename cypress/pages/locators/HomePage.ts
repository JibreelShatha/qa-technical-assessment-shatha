export class HomePage {

  get accountDropdownButton() {
    return cy.get('button.account-button');
  }

  get accountDrawer() {
    return cy.get('[role="presentation"]');
  }

  get accountUsername() {
    return this.accountDrawer.find('span').first();
  }

}
