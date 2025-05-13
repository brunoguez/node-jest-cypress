describe("Página inicial", () => {
  it("deve carregar a página inicial do encurtador", () => {
    cy.visit("http://localhost:3000");
    cy.contains("Encurtador de Links Superior").should("be.visible");
  });
});

describe("Componente Lookup", () => {
  it("Deve exibir o componente de usuário", () => {
    cy.visit("http://localhost:3000");
    cy.get("#lookup_usuario", { timeout: 2000 }).should("be.visible");
  });
});

describe("Tabela de usuários", () => {
  it("Deve exibir mensagem de tabela vazia", () => {
    cy.visit("http://localhost:3000");
    cy.get("#grid_usuario", { timeout: 2000 }).should("exist");
    cy.contains("Sem dados").should("be.visible");
  });
});

describe("Selecionar usuário no lookup", () => {
  it("Deve abrir o lookup e selecionar o primeiro usuário", () => {
    cy.visit("http://localhost:3000");

    cy.get("#grid_usuario", { timeout: 2000 }).should("exist");
    cy.get("#lookup_usuario .dx-lookup-field").click();
    cy.get(".dx-list-item-content").first().click();
    cy.get("#lookup_usuario .dx-lookup-field").should(
      "not.contain",
      "Selecione ..."
    );
  });
});

describe("Carregamento da grid após seleção de usuário", () => {
  it("Deve preencher a grid após selecionar um usuário", () => {
    cy.visit("http://localhost:3000");

    cy.get("#lookup_usuario .dx-lookup-field").click();
    cy.get(".dx-list-item-content").first().click();

    cy.wait(1000);

    cy.get("#grid_usuario .dx-data-row").should("have.length.greaterThan", 0);
  });
});

describe("Inclusão de item no grid após seleção de usuário", () => {
  it("Deve incluir um item no grid após selecionar um usuário e verificar a quantidade de items no grid", () => {
    cy.visit("http://localhost:3000");

    cy.get("#lookup_usuario .dx-lookup-field").click();
    cy.get(".dx-list-item-content").first().click();

    cy.wait(1000);

    let quantidadeAntes = 0;

    cy.get("#grid_usuario .dx-data-row").then(($rows) => {
      quantidadeAntes = $rows.length;
    });

    cy.get(
      "#grid_usuario .dx-item-content > .dx-widget > .dx-button-content > .dx-icon"
    ).click();
    cy.get("#grid_usuario .dx-texteditor-input").type(
      `https://teste-${new Date().toLocaleString().replace(" ", "")}.com.br`
    );
    cy.get("#grid_usuario .dx-link-save").click();
    cy.wait(1000);
    cy.get("#grid_usuario .dx-data-row").should(
      "have.length.greaterThan",
      quantidadeAntes
    );
  });
});

describe("Alteração de item no grid após seleção de usuário", () => {
  it("Deve alterar um item no grid após selecionar um usuário", () => {
    cy.visit("http://localhost:3000");

    cy.get("#lookup_usuario .dx-lookup-field").click();
    cy.get(".dx-list-item-content").first().click();

    cy.wait(1000);

    let quantidadeAntes = 0;

    cy.get("#grid_usuario .dx-data-row").then(($rows) => {
      quantidadeAntes = $rows.length;
    });

    cy.get(
      "#grid_usuario [aria-rowindex='1'] > .dx-command-edit > .dx-link-edit"
    ).click();

    cy.get("#grid_usuario .dx-texteditor-input")
      .clear()
      .type(
        `https://teste-alteracao-${new Date()
          .toLocaleString()
          .replace(" ", "")}.com.br`
      );
    cy.get("#grid_usuario .dx-link-save").click();
  });
});

describe("Exclusão de item no grid após seleção de usuário", () => {
  it("Deve excluir um item no grid após selecionar um usuário", () => {
    cy.visit("http://localhost:3000");

    cy.get("#lookup_usuario .dx-lookup-field").click();
    cy.get(".dx-list-item-content").first().click();

    cy.wait(1000);

    let quantidadeAntes = 0;

    cy.get("#grid_usuario .dx-data-row").then(($rows) => {
      quantidadeAntes = $rows.length;
    });

    cy.get(
      "#grid_usuario [aria-rowindex='1'] > .dx-command-edit > .dx-link-delete"
    ).click();
    cy.wait(1000);
    cy.get(
      ".dx-toolbar-center > :nth-child(1) > .dx-item-content > .dx-widget > .dx-button-content"
    ).click();
    cy.wait(1000);
    cy.get("#grid_usuario .dx-data-row").should(
      "have.length.greaterThan",
      quantidadeAntes - 1
    );
  });
});
