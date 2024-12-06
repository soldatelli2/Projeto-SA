describe('Histórico de Retiradas e Devoluções de EPIs', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/');

    cy.contains('Histórico').click();
    cy.contains('Histórico de Retirada/Devo').click();
  });

  it('deve exibir a lista de retiradas', () => {
    cy.get('.tabela-equipamentos').should('be.visible');
    cy.get('table tbody tr').should('have.length.greaterThan', 0);
  });

  it('deve permitir realizar uma devolução', () => {
    cy.get('button.botao-devolucao').first().click();
    cy.on('window:alert', (alertText) => {
      expect(alertText).to.contains('Devolução realizada com sucesso!');
    });
    cy.reload();
    cy.get('table tbody tr').should('have.length.lessThan', 1);
  });
});

describe('Visualizar, Editar e Remover EPIs', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/');

    cy.contains('Visualizar').click();
    cy.contains('Visualizar EPIs').click();
  });

  it('deve permitir editar um EPI', () => {
    cy.get('button.btn-editar').first().click();
    cy.get('.form-editar').should('be.visible');
    cy.get('#nome').clear().type('Luva');
    cy.get('#quantidade').clear().type('100');
    cy.get('button.btn-salvar').click();
    cy.get('table tbody tr')
      .first()
      .contains('Luva');
    cy.get('table tbody tr')
      .first()
      .contains('10');
  });

  it('deve permitir remover um EPI', () => {
    cy.get('table tbody tr').should('have.length.greaterThan', 0);
    cy.get('button.btn-remover').first().click();
    cy.reload();
    cy.get('table tbody tr').should('have.length.lessThan', 1);
  });
});

describe('Testar funcionalidades de Editar e Remover Funcionário', () => {

  beforeEach(() => {
    cy.visit('http://localhost:5173/');

    cy.contains('Visualizar').click();
    cy.contains('Visualizar Funcionários').click();
  });

  it('Deve editar um funcionário', () => {
    cy.get('button.btn-editar')
      .first()
      .click();

    cy.get('#nome').clear().type('Paulo Cesar');
    cy.get('#cargo').clear().type('Programador junior');
    cy.get('#cpf').clear().type('12345678901');
    cy.get('#data_nascimento').clear().type('1985-10-15');

    cy.get('button.btn-salvar').click();
  });

  it('Deve remover um funcionário', () => {
    cy.get('table tbody tr').should('have.length.greaterThan', 0);
    cy.get('button.btn-remover').first().click();
    cy.reload();
    cy.get('table tbody tr').should('have.length.lessThan', 1);
  });

});