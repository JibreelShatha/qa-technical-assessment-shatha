import { HomePage } from '@pages/Locators/HomePage';

const page = new HomePage();

export class HomeActions {

  openAccountDropdown() {
    page.accountDropdownButton.click();
    return this;
  }

}
