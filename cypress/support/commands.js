Cypress.Commands.add("loginWithFixture", (userType) => {
  cy.fixture("users").then((users) => {
    const user = users[userType]
    cy.visit("https://www.saucedemo.com/v1/index.html")
    cy.get('[data-test="username"]').type(user.username)
    cy.get('[data-test="password"]').type(user.password)
    cy.get("#login-button").click()
  })
})
