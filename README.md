# cypress-cucumber-example
Initial example of using Cypress with Cucumber for CasparHealth website

# Run example tests

```
npm install
npm test
```  

# Tags usage

### Tagging tests
You can use tags to select which test should run using [cucumber's tag expressions](https://github.com/cucumber/cucumber/tree/master/tag-expressions).
Keep in mind we are using newer syntax, eg. `'not @foo and (@bar or @zap)'`.
In order to initialize tests using tags you will have to run cypress and pass TAGS environment variable.

To make things faster and skip cypress opening a browser for every feature file (taking a couple seconds for each one), even the ones we want ignored, we use our own cypress-tags wrapper. It passes all the arguments to cypress, so use it the same way you would use cypress CLI. The only difference is it will first filter out the files we don't care about, based on the tags provided. 

### Examples:

There is just one tagged test in these files, if there would be more, it is possible to use different tags for scenarios and features:

[Caspar.feature]
```
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
    Then URL should contain 'terms_of_service'
    Then I click confirm t&c
```



###### Simple Example
  Run ```./node_modules/.bin/cypress-tags run -e TAGS='@feature-tag'``` in this repo. As `Caspar.feature` 
  have `@feature-tag` above the feature name, the result should be: 
  
  ```
            Spec                                              Tests  Passing  Failing  Pending  Skipped  
       ┌────────────────────────────────────────────────────────────────────────────────────────────────┐
       │ ✔  common/Caspar.feature                    00:13        1        1        -        -        - │
       └────────────────────────────────────────────────────────────────────────────────────────────────┘
         ✔  All specs passed!                        00:13        1        1        -        -        -  
     

```

###### usage of `and` 

Run ```./node_modules/.bin/cypress-tags run -e TAGS='@another-tag-to-include and @some-other-tag'``` in this repo. There is only one scenario that has both the tags, in `Caspar.feature`. The result should be:  

```
        Spec                                              Tests  Passing  Failing  Pending  Skipped  
           ┌────────────────────────────────────────────────────────────────────────────────────────────────┐
           │ ✔  common/Caspar.feature                    00:13        1        1        -        -        - │
           └────────────────────────────────────────────────────────────────────────────────────────────────┘
             ✔  All specs passed!                        00:13        1        1        -        -        -  
         
```


# Scoped hooks:

[cypress-io/cypress#3323](https://github.com/cypress-io/cypress/issues/3323)

The advice is to not use the "run all" in the GUI - which would be slow once you have enough .feature files anyway. Running through cypress run (for CI use) works as described. 
