@search @api
Feature: Search Game API

  @smoke
  Scenario: Validate game-assets API response schema and data integrity
    Given User is authenticated
    When The API client searches for "Sweet Bonanza"
    Then The API response should contain required schema fields
    And The API response per_page should equal 21
    And The API response data should be an array

  @edge-case
  Scenario: Validate game-assets API returns empty data for non-existent game
    Given User is authenticated
    When The API client searches for "xyznonexistentgame123"
    Then The API response should contain required schema fields
    And The API response data should be an empty array
    And The API response total should equal 0

  @edge-case
  Scenario: Validate game-assets data items contain required fields
    Given User is authenticated
    When The API client searches for "Sweet Bonanza"
    Then Each game asset should have "id", "name", "slug", and "game_type" fields

  @negative
  Scenario: Validate game-assets API returns 500 for negative per_page
    Given User is authenticated
    When The API client searches with per_page "-1"
    Then The game-assets response status should be 500
