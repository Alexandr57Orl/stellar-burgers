describe('Modal window test', function () {
  this.beforeEach(function () {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.viewport(1300, 800);
    cy.visit('http://localhost:4000/');
  });

  //открытие модального окна при клике на ингредиент
  it('Test open modal window', function () {
    cy.get(`[data-cy=modal-overlay]`).should('not.exist');
    cy.get('[data-cy=bun-ingredients]').contains('Ингредиент 1').click();
    cy.get('[data-cy=modal]').contains('Ингредиент 1').should('exist');
  });

  //закрытие модального окна при клике на крестик

  it('Test close modal window', function () {
    cy.get('[data-cy=bun-ingredients]').contains('Ингредиент 1').click();
    cy.get('[data-cy=close_icon]').click();
    cy.get(`[data-cy=modal]`).should('not.exist');
  });

  //закрытие модального окна при клике на overlay

  it('Test close modal window', function () {
    cy.get('[data-cy=bun-ingredients]').contains('Ингредиент 1').click();
    cy.get(`[data-cy=modal]`).click().should(`exist`);
    cy.get('[data-cy=modal-overlay]')
      .should('exist')
      .click('topRight', { force: true });
    cy.get('[data-cy=modal]').should('not.exist');
  });
});
