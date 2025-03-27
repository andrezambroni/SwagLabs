describe("Login Tests", () => {
  it("should login as standard user", () => {
    cy.loginWithFixture("standard_user")
  })

  it("should fail to login as locked out user", () => {
    cy.loginWithFixture("locked_out_user")
    cy.get(".error-message-container").should("be.visible")
  })
})
