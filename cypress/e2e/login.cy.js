describe("Login Tests", () => {
  it("Login com standard user", () => {
    cy.loginWithFixture("standard_user")
  })

  it("Erro de login com locked out user", () => {
    cy.loginWithFixture("locked_out_user")
    cy.get(".error-button").should("be.visible")
  })

  it("Login com credenciais invalidas", () => {
    cy.visit("https://www.saucedemo.com/v1/index.html")
    cy.get('[data-test="username"]').type("invalid_user")
    cy.get('[data-test="password"]').type("wrong_password")
    cy.get("#login-button").click()
    cy.get(".error-button").should("be.visible")
  })

  it("Login sem preencher campos", () => {
    cy.visit("https://www.saucedemo.com/v1/index.html")
    cy.get("#login-button").click()
    cy.get(".error-button").should("be.visible")
  })

  it("Login com apenas o nome de usuário preenchido", () => {
    cy.visit("https://www.saucedemo.com/v1/index.html")
    cy.get('[data-test="username"]').type("standard_user")
    cy.get("#login-button").click()
    cy.get(".error-button").should("be.visible")
  })

  it("Login com apenas a senha preenchida", () => {
    cy.visit("https://www.saucedemo.com/v1/index.html")
    cy.get('[data-test="password"]').type("secret_sauce")
    cy.get("#login-button").click()
    cy.get(".error-button").should("be.visible")
  })

  it.only("Logout após login bem-sucedido", () => {
    cy.loginWithFixture("standard_user")
    cy.get(".bm-burger-button").click()
    cy.get("#logout_sidebar_link").click()
    cy.url().should("include", "index.html")
  })
})
