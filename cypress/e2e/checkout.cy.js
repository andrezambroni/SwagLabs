describe("Checkout", () => {
  beforeEach(() => {
    cy.loginWithFixture("standard_user") // Realiza o login antes de cada teste
  })

  it("Deve preencher informações de envio", () => {
    // Adiciona um item ao carrinho
    cy.get(".inventory_item").first().find(".btn_primary.btn_inventory").click()

    // Clica no botão do carrinho
    cy.get("#shopping_cart_container").click()

    // Clica no botão de checkout
    cy.get(".checkout_button").click()

    // Preenche as informações de envio
    cy.get("#first-name").type("João")
    cy.get("#last-name").type("Silva")
    cy.get("#postal-code").type("12345")

    // Clica no botão de continuar
    cy.get('input[type="submit"][value="CONTINUE"]').click()

    // Verifica se foi redirecionado para a página de resumo
    cy.url().should("include", "/checkout-step-two.html")
  })

  it("Deve verificar o resumo do pedido", () => {
    // Adiciona dois itens ao carrinho
    cy.get(".inventory_item").eq(0).find(".btn_primary.btn_inventory").click()
    cy.get(".inventory_item").eq(1).find(".btn_primary.btn_inventory").click()

    // Clica no botão do carrinho
    cy.get("#shopping_cart_container").click()

    // Clica no botão de checkout
    cy.get(".checkout_button").click()

    // Preenche as informações de envio
    cy.get("#first-name").type("João")
    cy.get("#last-name").type("Silva")
    cy.get("#postal-code").type("12345")

    // Clica no botão de continuar
    cy.get('input[type="submit"][value="CONTINUE"]').click()

    // Verifica se os itens estão listados no resumo
    cy.get(".cart_item").should("have.length", 2)

    // Verifica o total do pedido
    cy.get(".summary_total_label").should("contain", "Total: $")
  })

  it("Deve finalizar a compra com sucesso", () => {
    // Adiciona um item ao carrinho
    cy.get(".inventory_item").first().find(".btn_primary.btn_inventory").click()

    // Clica no botão do carrinho
    cy.get("#shopping_cart_container").click()

    // Clica no botão de checkout
    cy.get(".checkout_button").click()

    // Preenche as informações de envio
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

  it("Deve exibir mensagens de erro ao inserir dados de checkout de forma incorreta", () => {
    // Adiciona um item ao carrinho
    cy.get(".inventory_item").first().find(".btn_primary.btn_inventory").click()

    // Clica no botão do carrinho
    cy.get("#shopping_cart_container").click()

    // Clica no botão de checkout
    cy.get(".checkout_button").click()

    // Tenta continuar sem preencher os campos obrigatórios
    cy.get('input[type="submit"][value="CONTINUE"]').click()

    // Verifica se a mensagem de erro é exibida
    cy.get(".error-message-container").should(
      "contain",
      "Error: First Name is required"
    )

    // Preenche apenas o primeiro nome
    cy.get("#first-name").type("João")
    cy.get('input[type="submit"][value="CONTINUE"]').click()

    // Verifica se a mensagem de erro é exibida
    cy.get(".error-message-container").should(
      "contain",
      "Error: Last Name is required"
    )

    // Preenche o último nome, mas não o código postal
    cy.get("#last-name").type("Silva")
    cy.get('input[type="submit"][value="CONTINUE"]').click()

    // Verifica se a mensagem de erro é exibida
    cy.get(".error-message-container").should(
      "contain",
      "Error: Postal Code is required"
    )
  })
})
