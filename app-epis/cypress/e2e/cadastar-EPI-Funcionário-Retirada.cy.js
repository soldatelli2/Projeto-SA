describe('Cadastro de EPI', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/');  
    cy.contains('Cadastrar').click();
    cy.contains('Cadastrar EPIs').click();
  });

  it('deve preencher o formulário e cadastrar o EPI com sucesso', () => {
    cy.get('#nome').type('Luva');
    cy.get('#data_entrada').type('2024-12-05');
    cy.get('#num_registro').type('765432');
    cy.get('#quantidade').type('00'); 

    cy.get('.botao').click();

    cy.on('window:alert', (alertText) => {
      expect(alertText).to.contains('EPI cadastrado com sucesso!');
    });
  });

  it('deve exibir um erro se os campos obrigatórios não forem preenchidos', () => {
    cy.get('.botao').click();

    cy.on('window:alert', (alertText) => {
      expect(alertText).to.contains('Todos os campos são obrigatórios');
    });
  });
});

describe('Cadastro de Funcionário', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/');

    cy.contains('Cadastrar').click();
    cy.contains('Cadastrar Funcionário').click();
  });

  it('deve preencher o formulário e cadastrar o Funcionário com sucesso', () => {
    cy.get('#nome').type('Silvio Percicotte');
    cy.get('#data_nascimento').type('1990-05-15');
    cy.get('#cpf').type('12345678901');
    cy.get('#cargo').type('Programador Senior');
    cy.get('#cracha').type('764321');

    cy.get('.botaof').click();

    cy.on('window:alert', (alertText) => {
      expect(alertText).to.contains('Funcionário cadastrado com sucesso!');
    });
  });

  it('deve exibir um erro se os campos obrigatórios não forem preenchidos', () => {
    cy.get('.botaof').click();

    cy.on('window:alert', (alertText) => {
      expect(alertText).to.contains('Todos os campos são obrigatórios');
    });
  });
});

describe('Cadastro de Retirada', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/');  

    cy.contains('Cadastrar').click();
    cy.contains('Cadastrar Retirada').click();
  });

  it('deve preencher o formulário e cadastrar a retirada com sucesso', () => {
    cy.get('#data_retirada').type('2024-12-05');
    cy.get('#quantidade_retirada');
    cy.get('#num_registro').type('765432');
    cy.get('#cracha').type('764321');

    cy.get('.botao').click();

    cy.on('window:alert', (alertText) => {
      expect(alertText).to.contains('Retirada cadastrada com sucesso!');
    });
  });

  it('deve exibir um erro se os campos obrigatórios não forem preenchidos', () => {
    cy.get('.botao').click();

    cy.on('window:alert', (alertText) => {
      expect(alertText).to.contains('Todos os campos são obrigatórios');
    });
  });
});

