@gameLaunch
Feature: Game Launch

  @smoke
  Scenario: Verify Game Launch for logged in user
    Given Common Step: Logged in user opens search dialog
    And the game-assets API is intercepted for game launch
    When the user searches and selects the first game
    Then the user should be on a game page
    And the game iframe should be loaded
