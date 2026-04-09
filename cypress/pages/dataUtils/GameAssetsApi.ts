import { EXPECTED_PER_PAGE, GAME_ASSETS_ENDPOINT, VALID_SEARCH_TERM } from "@support/constants";
import { SearchDataUtils } from '@pages/dataUtils/SearchDataUtils';

/**
 * GameAssetsApi — Service layer for game-assets API requests via cy.request.
 */
export class GameAssetsApi {

  /**
   * Search game assets by query term.
   * Reuses the jwt_auth cookie set by cy.login().
   */
  searchGameAssets(query: string): Cypress.Chainable<Cypress.Response<GameAssetsResponse>> {
    return this.withToken((token) =>
      cy.request({
        method: 'GET',
        url: GAME_ASSETS_ENDPOINT,
        qs: new SearchDataUtils().searchQueryParams(query),
        headers: { Authorization: `Bearer ${token}` },
      }),
    );
  }

  /**
   * Search game assets with a custom per_page value (for edge-case / negative tests).
   * Uses failOnStatusCode: false so callers can assert non-200 statuses.
   */
  searchWithCustomPerPage(perPage: string): Cypress.Chainable<Cypress.Response<GameAssetsResponse>> {
    return this.withToken((token) =>
      cy.request({
        method: 'GET',
        url: GAME_ASSETS_ENDPOINT,
        qs: {
          query: VALID_SEARCH_TERM,
          sort_by: 'category',
          per_page: perPage,
          exclude_game_tables: '1',
        },
        headers: { Authorization: `Bearer ${token}` },
        failOnStatusCode: false,
      }),
    );
  }

  /**
   * Fetch game assets with default (recommended) params (no search query).
   */
  getRecommendedAssets(): Cypress.Chainable<Cypress.Response<GameAssetsResponse>> {
    return this.withToken((token) =>
      cy.request({
        method: 'GET',
        url: GAME_ASSETS_ENDPOINT,
        qs: {
          'display_area[]': 'search_recommended',
          sort_by: 'category',
          per_page: String(EXPECTED_PER_PAGE),
          exclude_game_tables: '1',
        },
        headers: { Authorization: `Bearer ${token}` },
      }),
    );
  }

  /**
   * Read the jwt_auth cookie set by cy.login() and pass the token to the callback.
   */
  private withToken<T>(fn: (token: string) => Cypress.Chainable<T>): Cypress.Chainable<T> {
    return cy.getCookie('jwt_auth').then((cookie) => {
      expect(cookie, 'jwt_auth cookie should exist — is cy.login() called?').to.not.be.null;
      return fn(cookie!.value);
    });
  }

}

export interface GameAsset {
  id: number;
  name: string;
  code: string;
  slug: string;
  status: number;
  game_type: string;
  game_provider: string;
  has_trial: boolean;
  [key: string]: unknown;
}

export interface GameAssetsResponse {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  data: GameAsset[];
}
