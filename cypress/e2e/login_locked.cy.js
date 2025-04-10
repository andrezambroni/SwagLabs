describe("Login com usuário bloqueado", () => {
  beforeEach(() => {
    cy.loginWithFixture("locked_out_user") 
  })

  it("Deve exibir mensagem de erro e botão de erro ao tentar logar com o usuário bloqueado", () => {

    cy.get('h3[data-test="error"]').should(
      "have.text",
      "Epic sadface: Sorry, this user has been locked out."
    )
    cy.get('h3[data-test="error"] .error-button').should("exist")
  })
})
