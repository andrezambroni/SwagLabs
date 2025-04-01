describe("Performance Tests", () => {
  beforeEach(() => {
    cy.loginWithFixture("performance_glitch_user") // Realiza o login antes de cada teste
  })

  it("Deve exibir os produtos corretamente", () => {
    // Verifica se os produtos aparecem em até 5 segundos
    cy.get(".inventory_item", { timeout: 5000 }).should(
      "have.length.greaterThan",
      0
    )
  })

  it("Deve adicionar itens ao carrinho com atraso", () => {
    // Adiciona o primeiro item ao carrinho
    cy.get(".inventory_item").first().find(".btn_primary.btn_inventory").click()

    // Verifica se o carrinho é atualizado
    cy.get(".shopping_cart_badge", { timeout: 5000 }).should("contain", "1")
  })

  it("Deve garantir que o botão de checkout está presente", () => {
    // Verifica se o botão de checkout está presente
    cy.get("#shopping_cart_container").click()
    cy.get(".checkout_button", { timeout: 5000 }).should("exist")
  })

  it("Deve completar o checkout mesmo com atrasos", () => {
    // Adiciona um item ao carrinho
    cy.get(".inventory_item").first().find(".btn_primary.btn_inventory").click()
    cy.get("#shopping_cart_container").click()

    // Inicia o checkout
    cy.get(".checkout_button").click()
    cy.get("#first-name").type("João")
    cy.get("#last-name").type("Silva")
    cy.get("#postal-code").type("12345")
    cy.get('input[type="submit"][value="CONTINUE"]').click()

    // Finaliza a compra
    cy.get("a.btn_action.cart_button").click()

    // Verifica se a compra foi concluída
    cy.get(".complete-header", { timeout: 10000 }).should(
      "contain",
      "THANK YOU FOR YOUR ORDER"
    )
  })

  it("Deve lidar com atrasos nas requisições", () => {
    cy.intercept("GET", "/inventory.html", (req) => {
      req.on("response", (res) => {
        res.setDelay(3000) // Adiciona um atraso de 3 segundos
      })
    }).as("delayedInventory")

    // Verifica se os produtos aparecem mesmo com atraso
    cy.get(".inventory_item").should("have.length.greaterThan", 0)
  })

  it.only("Deve medir o tempo de carregamento da página /inventory", () => {
    // Intercepta a requisição para a página de inventário
    cy.intercept("GET", "**/inventory.html").as("loadInventory")

    // Realiza o login
    cy.loginWithFixture("performance_glitch_user")

    // Aguarda a requisição e mede o tempo de carregamento
    const startTime = Date.now() // Marca o início do tempo
    cy.wait("@loadInventory").then(() => {
      const endTime = Date.now() // Marca o fim do tempo
      const loadTime = endTime - startTime // Calcula o tempo de carregamento
      cy.log(`Tempo de carregamento da página /inventory: ${loadTime}ms`)

      // Verifica se o tempo de carregamento está dentro de um limite aceitável (ex.: 5000ms)
      expect(loadTime).to.be.lessThan(6000)
    })
  })
})
