@auth @api
Feature: Sign-in API

  @smoke
  Scenario: Successful sign-in returns 200 with a token
    When The API client sends valid credentials
    Then The sign-in response status should be 200
    And The sign-in response should contain a token

  @negative
  Scenario: Sign-in with wrong password returns 404
    When The API client sends wrong password
    Then The sign-in response status should be 404

  @negative
  Scenario: Sign-in with non-existent user returns 404
    When The API client sends non-existent user credentials
    Then The sign-in response status should be 404

  @negative @edge-case
  Scenario: Sign-in with empty body returns 422 with validation errors
    When The API client sends an empty sign-in body
    Then The sign-in response status should be 422
    And The sign-in response should contain validation errors for "username" and "password"
