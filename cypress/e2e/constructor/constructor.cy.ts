describe('Constructor page test', function () {
  this.beforeEach(function () {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.viewport(1300, 800);
    cy.visit('http://localhost:4000/');
  });
  //тест добавления булки в конструктор при клике на кнопку
  it('Test add bun in constructor', function () {
    cy.get('[data-cy=bun-ingredients]').contains('Добавить').click();
    cy.get('[data-cy=bun_1_constructor]')
      .contains('Ингредиент 1')
      .should('exist');
    cy.get('[data-cy=bun_2_constructor]')
      .contains('Ингредиент 1')
      .should('exist');
  });

  //тест добавления ингредиентов в конструктор при клике на кнопку
  it('Test add ingredient in constructor', function () {
    cy.get('[data-cy=main-ingredients]').contains('Добавить').click();
    cy.get('[data-cy=ingredient_constructor]')
      .contains('Ингредиент 2')
      .should('exist');
    cy.get('[data-cy=sauces-ingredients]').contains('Добавить').click();
    cy.get('[data-cy=ingredient_constructor]')
      .contains('Ингридиент 4')
      .should('exist');
  });
});
