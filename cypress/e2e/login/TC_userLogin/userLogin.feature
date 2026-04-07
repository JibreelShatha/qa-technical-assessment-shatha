@auth
Feature: User Login

  @smoke @positive
  Scenario: Validate successful login and home page reachability
    Given User log in to the system with valid credentials
    Then The main home page should be reachable

  @smoke @positive
  Scenario: Validate successful login and username displayed Correctly
    Given Common Step: User is logged in
    When User click on the account dropdown
    Then The account drawer should be open
    And The displayed username should match the logged in user

  @negative
  Scenario Outline: Validate failed login error messages
    Given User open log in page
    When User enters username "<username>" and password "<password>"
    And Clicks the login button
    Then An error message "<message>" should be displayed

    Examples:
      | username      | password      | message                                  |
      | invalid_user  | correct_pass  | Please provide a valid username or email |
      | correct_user  | wrong_pass    | Invalid email or password                |
      |               | correct_pass  | Username or Email is required            |
      | correct_user  |               | Password is required                     |