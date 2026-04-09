@api
Feature: Countries API

  @smoke
  Scenario: Countries endpoint returns 200 with a populated list
    When The API client requests the countries list
    Then The countries response status should be 200
    And The countries response should be a non-empty array
    And Each country should have "id", "name", "iso2", and "currency" fields

  @edge-case
  Scenario: Countries list contains Australia
    When The API client requests the countries list
    Then The countries response status should be 200
    And The countries list should contain a country with iso2 "AU"
