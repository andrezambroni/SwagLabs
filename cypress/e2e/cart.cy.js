describe("Carrinho de Compras", () => {
  beforeEach(() => {
    cy.loginWithFixture("standard_user") // Executa o login antes de cada teste
  })

  it("Deve verificar se os itens adicionados estão no carrinho", () => {
    // Adiciona dois itens ao carrinho
    cy.get(".inventory_item").eq(0).find(".btn_primary.btn_inventory").click()
    cy.get(".inventory_item").eq(1).find(".btn_primary.btn_inventory").click()

    // Verifica se o carrinho mostra 2 itens
    cy.get(".shopping_cart_badge").should("contain", "2")

    // Clica no botão do carrinho
    cy.get("#shopping_cart_container").click()

    // Verifica se os itens estão listados no carrinho
    cy.get(".cart_item").should("have.length", 2)
  })

  it("Deve atualizar a quantidade de itens no carrinho", () => {
    // Adiciona um item ao carrinho
    cy.get(".inventory_item").first().find(".btn_primary.btn_inventory").click()

    // Clica no botão do carrinho
    cy.get("#shopping_cart_container").click()

    // Verifica se há 1 item no carrinho
    cy.get(".cart_item").should("have.length", 1)

    // Remove o item do carrinho
    cy.get(".cart_item").first().find(".cart_button").click()

    // Verifica se o carrinho está vazio
    cy.get(".cart_item").should("have.length", 0)
  })

  it("Deve finalizar a compra", () => {
    // Adiciona um item ao carrinho
    cy.get(".inventory_item").first().find(".btn_primary.btn_inventory").click()

    // Clica no botão do carrinho
    cy.get("#shopping_cart_container").click()

    // Clica no botão de checkout
    cy.get(".checkout_button").click()

    // Preenche as informações do cliente
    cy.get("#first-name").type("João")
    cy.get("#last-name").type("Silva")
    cy.get("#postal-code").type("12345")

    // Clica no botão de continuar
    cy.get('input[type="submit"][value="CONTINUE"]').click()

    // Finaliza a compra
    cy.get("a.btn_action.cart_button").click()

    // Verifica se a compra foi concluída com sucesso
    cy.get(".complete-header").should("have.text", "THANK YOU FOR YOUR ORDER")
  })

  it("Deve exibir mensagem de erro ao tentar finalizar sem preencher os campos obrigatórios", () => {
    // Adiciona um item ao carrinho
    cy.get(".inventory_item").first().find(".btn_primary.btn_inventory").click()

    // Clica no botão do carrinho
    cy.get("#shopping_cart_container").click()

    // Clica no botão de checkout
    cy.get(".checkout_button").click()

    // Tenta continuar sem preencher os campos
    cy.get('input[type="submit"][value="CONTINUE"]').click()

    // Verifica se a mensagem de erro é exibida
    cy.get(".error-button").should("exist")
  })

  it("Deve esvaziar o carrinho após finalizar a compra", () => {
    // Adiciona um item ao carrinho
    cy.get(".inventory_item").first().find(".btn_primary.btn_inventory").click()

    // Clica no botão do carrinho
    cy.get("#shopping_cart_container").click()

    // Clica no botão de checkout
    cy.get(".checkout_button").click()

    // Preenche as informações do cliente
    cy.get("#first-name").type("João")
    cy.get("#last-name").type("Silva")
    cy.get("#postal-code").type("12345")

    // Clica no botão de continuar
    cy.get('input[type="submit"][value="CONTINUE"]').click()

    // Finaliza a compra
    cy.get("a.btn_action.cart_button").click()

    // Verifica se o carrinho está vazio
    cy.get("#shopping_cart_container").click()
    cy.get(".cart_item").should("have.length", 0)
  })

  it("Deve redirecionar para a página de produtos ao clicar em 'Continue Shopping'", () => {
    // Adiciona um item ao carrinho
    cy.get(".inventory_item").first().find(".btn_primary.btn_inventory").click()

    // Clica no botão do carrinho
    cy.get("#shopping_cart_container").click()

    // Clica no botão "Continue Shopping"
    cy.get('a.btn_secondary[href="./inventory.html"]').click()

    // Verifica se está de volta à página de produtos
    cy.url().should("include", "/inventory.html")
  })

  it("Deve garantir que itens removidos não aparecem no checkout", () => {
    // Adiciona dois itens ao carrinho
    cy.get(".inventory_item").eq(0).find(".btn_primary.btn_inventory").click()
    cy.get(".inventory_item").eq(1).find(".btn_primary.btn_inventory").click()

    // Remove o primeiro item
    cy.get("#shopping_cart_container").click()
    cy.get(".cart_item").eq(0).find(".cart_button").click()

    // Clica no botão de checkout
    cy.get(".checkout_button").click()

    // Preenche as informações do cliente
    cy.get("#first-name").type("João")
    cy.get("#last-name").type("Silva")
    cy.get("#postal-code").type("12345")

    // Clica no botão de continuar
    cy.get('input[type="submit"][value="CONTINUE"]').click()

    // Verifica se apenas o item restante aparece no resumo
    cy.get(".cart_item").should("have.length", 1)
  })
})
