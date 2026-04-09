import { When, Then } from '@badeball/cypress-cucumber-preprocessor';
import { SearchActions } from '@pages/actions/SearchActions';
import { SearchAssertions } from '@pages/assertions/SearchAssertions';

const searchActions = new SearchActions();
const searchAssertions = new SearchAssertions();

When('The user opens the search dialog', () => {
  searchActions.openSearchDialog();
});

When('The user searches for {string}', (query: string) => {
  searchActions.typeSearchQuery(query);
});

Then('Search results should be visible', () => {
  searchAssertions.verifySearchResultsVisible();
});

Then('The no results message should be displayed', () => {
  searchAssertions.verifyNoResultsMessage();
});
