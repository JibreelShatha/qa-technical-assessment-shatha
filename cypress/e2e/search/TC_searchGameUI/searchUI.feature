@search @ui
Feature: Search Game UI

  Background:
    Given Common Step: User is logged in

  @smoke
  Scenario: Search for a game and verify results appear
    When The user opens the search dialog
    And The user searches for "Sweet Bonanza"
    Then Search results should be visible

  @edge-case
  Scenario: Search for a non-existent game shows no results
    When The user opens the search dialog
    And The user searches for "xyznonexistentgame123"
    Then The no results message should be displayed
