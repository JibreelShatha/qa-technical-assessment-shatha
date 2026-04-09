import { EXPECTED_PER_PAGE } from "@support/constants";

export class SearchDataUtils {

  searchQueryParams(query: string) {
    return {
      query,
      sort_by: 'category',
      per_page: String(EXPECTED_PER_PAGE),
      exclude_game_tables: '1',
    };
  }

}
