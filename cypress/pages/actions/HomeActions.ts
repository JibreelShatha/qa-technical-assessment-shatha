import { HomePage } from '@pages/locators/HomePage';

const page = new HomePage();

export class HomeActions {

  openAccountDropdown() {
    page.accountDropdownButton.click();
    return this;
  }

}
