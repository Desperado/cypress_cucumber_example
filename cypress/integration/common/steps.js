import { Given, Then, When } from "cypress-cucumber-preprocessor/steps";


const url = "https://beta.caspar-health.com/en/#/user/sign_in";

Given(`I open CasparHealth page`, () => {
  cy.visit(url);
});

Then('I login with correct credentials', () => {
  login('IXE0865', '78350619');
});

Then('URL should contain {string}', (url) => {
  cy.url().should('contain', url);
});

Then('I add new patient', () => {
  cy.get('[uisref="core.new-patient"]').click({ multiple: true });
});

When('I fill the required fields for patient creation', () => {
  cy.get('[formcontrolname="first_name"]')
      .type('John')
      .get('[formcontrolname="last_name"]')
      .type('Lastnamed')
      .get('[placeholder="Day"]')
      .click({ multiple: true, force:true })
      .get('.ng-star-inserted')
      .contains('5')
      .click()
      .get('[formcontrolname="month"]')
      .click({ multiple: true, force:true })
      .get('.ng-star-inserted')
      .contains('January')
      .click()
      .get('[formcontrolname="year"]')
      .click({ multiple: true, force:true })
      .get('.ng-star-inserted')
      .contains('2000')
      .click()
      .get('[formcontrolname="country_id"]')
      .click({ multiple: true, force:true })
      .get('.ng-star-inserted')
      .contains('Germany')
      .click()
      .get('[type="submit"]')
      .click()
});

Then('I save the created user credentials',() => {

  cy.contains('Patient was successfully created.');
  cy.get('.section-title').contains('Caspar ID').next().then(elem => {
    // elem is the underlying Javascript object targeted by the .get() command.
    cy.get(elem).as('new_user');
  }).get('.section-title').contains('Temporary Password').next().then(elem => {
    cy.get(elem).as('new_pass');
  }).then(function(script) {

    cy.log("I change");
    //cy.log(this.new_user.text());
    cy.get('[aria-label="Close dialog"]')
        .click()
        .visit(url);
    login(this.new_user.text(), this.new_pass.text());
  })
  });

Then('I login with new credentials', () => {
  login(cy.get('@new_user').invoke('text'), cy.get('@new_pass').invoke('text'));
});

Then('I click confirm t&c', () => {
  cy.get('.mat-checkbox-label')
      .click();
  cy.get('.tos-accept')
      .click()
});

function login(email, password) {
  cy.get('[placeholder="Email/Caspar ID"]')
      .type(email)
      .get('[placeholder="Password"]')
      .type(password)
      .get('.login')
      .click();
}
