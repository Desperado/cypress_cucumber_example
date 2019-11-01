@feature-tag
Feature: The Caspar

  I want to open a caspar login page

  @tag-to-include
  Scenario: Opening a social network page
    Given I open CasparHealth page
    Then I login with correct credentials
    Then I see 'Caspar' in the title
    Then URL should contain 'my-patients'
    Then I add new patient
    Then I fill the required fields for patient creation
    Then I save the created user credentials
    #Then I open CasparHealth page
    #Then I login with new credentials
    Then URL should contain 'terms_of_service'
    Then I click confirm t&c



