describe("Products Tests", () => {
  beforeEach(() => {
    cy.loginWithFixture("standard_user") // Executa o login antes de cada teste
  })

  it("Deve exibir a lista de produtos", () => {
    cy.get(".inventory_item").should("have.length.greaterThan", 0) // Verifica se há produtos na página
  })

  it("Deve adicionar um produto ao carrinho", () => {
    cy.get(".inventory_item").first().find(".btn_primary.btn_inventory").click() // Adiciona o primeiro produto ao carrinho
    cy.get(".shopping_cart_badge").should("contain", "1") // Verifica se o carrinho tem 1 item
  })

  it("Deve adicionar um produto ao carrinho e verificar no carrinho", () => {
    // Adiciona o primeiro produto ao carrinho
    cy.get(".inventory_item").first().find(".btn_primary.btn_inventory").click()

    // Verifica se o carrinho mostra 1 item
    cy.get(".shopping_cart_badge").should("contain", "1")

    // Clica no botão do carrinho
    cy.get("#shopping_cart_container").click()

    // Verifica se o produto está listado na página do carrinho
    cy.get(".cart_item").should("have.length", 1) // Verifica se há 1 item no carrinho
  })

  it.only("Deve adicionar produtos ao carrinho e verificar no carrinho", () => {
    const quantidadeDeItens = 2 // Defina a quantidade de itens que deseja adicionar

    // Adiciona os primeiros `quantidadeDeItens` produtos ao carrinho
    cy.get(".inventory_item").each(($el, index) => {
      if (index < quantidadeDeItens) {
        cy.wrap($el).find(".btn_primary.btn_inventory").click()
      }
    })

    // Verifica se o carrinho mostra o número correto de itens
    cy.get(".shopping_cart_badge").should(
      "contain",
      quantidadeDeItens.toString()
    )

    // Clica no botão do carrinho
    cy.get("#shopping_cart_container").click()

    // Verifica se o número correto de itens está listado na página do carrinho
    cy.get(".cart_item").should("have.length", quantidadeDeItens)
  })
})
