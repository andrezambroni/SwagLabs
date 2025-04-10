# Testes Automatizados - Swag Labs

Este projeto contém uma suíte de testes automatizados desenvolvida com Cypress para o site Swag Labs. O objetivo é validar funcionalidades críticas, como login, carrinho de compras, checkout e desempenho, garantindo a qualidade da aplicação.

## 📋 Estrutura do Projeto
A estrutura do projeto segue as convenções padrão do Cypress:

### 🚀 Tecnologias Utilizadas   
Cypress: Framework de testes end-to-end.   
JavaScript: Linguagem principal para os testes.   
Node.js: Ambiente de execução para o Cypress.   
Faker.js: Biblioteca para geração de dados dinâmicos (opcional).   


### 🧪 Testes Implementados

1. Login   
Arquivo: login.cy.js   
Cenários Testados:   
Login com credenciais válidas.   
Login com credenciais inválidas.   
Verificação de mensagens de erro.   

2. Login com Usuário Bloqueado   
Arquivo: login_locked.cy.js   
Cenários Testados:   
Verificar mensagem de erro ao tentar logar com o usuário       locked_out_user.   
Verificar se o botão de erro é exibido.   

3. Carrinho de Compras   
Arquivo: cart.cy.js   
Cenários Testados:   
Adicionar itens ao carrinho.   
Atualizar a quantidade de itens no carrinho.   
Verificar se os itens adicionados aparecem no carrinho.   
Finalizar a compra.   

4. Checkout   
Arquivo: checkout.cy.js   
Cenários Testados:   
Preencher informações de envio.   
Verificar o resumo do pedido.   
Finalizar a compra com sucesso.   
Verificar mensagens de erro ao inserir dados incorretos.   

5. Testes de Desempenho   
Arquivo: performace.cy.js   
Cenários Testados:   
Medir o tempo de carregamento da página /inventory.   
Verificar se os produtos são exibidos corretamente.   
Adicionar itens ao carrinho com atraso.   
Garantir que o botão de checkout está presente.   

6. Produtos
Arquivo: products.cy.js   
Cenários Testados:   
Exibir a lista de produtos.   
Adicionar um produto ao carrinho.   
Adicionar um produto ao carrinho e verificar no carrinho.   
Adicionar múltiplos produtos ao carrinho e verificar no carrinho.   
Adicionar uma quantidade aleatória de produtos ao carrinho e verificar.   


### 📂 Dados de Teste (Fixtures)   
O arquivo users.json contém os dados de login para diferentes tipos de usuários:   


🔧 Comandos Customizados   
Os comandos customizados estão definidos no arquivo commands.js.       


📊 Relatórios de Testes   
Uso do Mochawesome para gerar relatórios detalhados


🌐 Testes Cross-Browser   
O Cypress suporta testes em diferentes navegadores, como Chrome, Firefox e Edge. Para executar os testes em um navegador específico:


📄 Licença
Este projeto está licenciado sob a MIT License.
