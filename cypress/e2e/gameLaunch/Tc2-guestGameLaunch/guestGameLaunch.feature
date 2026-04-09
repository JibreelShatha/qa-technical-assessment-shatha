@gameLaunch @guest
Feature: Guest Game Launch

  Scenario: Guest user is prompted to login when clicking Real Play
    Given The user is not logged in
    And The user navigates to the "book-of-dead" game page
    When The user clicks the Real Play button
    Then The login overlay should be displayed
    And The login overlay should contain a Login button
