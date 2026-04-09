export const API_BASE = 'https://api.vssapi.com/player/api/v1';
export const SYSTEM_API_BASE = 'https://api.vssapi.com/system/api/v1';

export const GAME_ASSETS_ENDPOINT = `${API_BASE}/game-assets`;
export const SIGNIN_ENDPOINT = `${API_BASE}/signin`;
export const COUNTRIES_ENDPOINT = `${SYSTEM_API_BASE}/countries`;

export const GAME_ASSETS_INTERCEPT_PATTERN = '**/player/api/v1/game-assets**';
export const GAME_LAUNCH_INTERCEPT_PATTERN = '**/player/api/v1/games/*/launch**';

export const VALID_SEARCH_TERM = 'Sweet Bonanza';
export const NO_RESULTS_SEARCH_TERM = 'xyznonexistentgame123';
export const EXPECTED_PER_PAGE = 21;

export const WRONG_PASSWORD = 'WrongP@ssword123!';
export const NON_EXISTENT_EMAIL = 'nonexistent_user_abc123@fakeemail.com';
export const NON_EXISTENT_PASSWORD = 'AnyP@ssword1';