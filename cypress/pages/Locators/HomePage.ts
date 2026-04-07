export class HomePage {

  get accountDropdownButton() {
    return cy.get('button.account-button');
  }

  get accountDrawer() {
    return cy.get('.account-dropdown-header-popover');
  }

  get accountUsername() {
    return this.accountDrawer.find('div').first().find('span').first();
  }

}
