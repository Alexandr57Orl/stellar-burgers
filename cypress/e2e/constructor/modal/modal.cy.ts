import { selectors } from '../constructor.cy';

describe('Modal window test', function () {
  this.beforeEach(function () {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.viewport(1300, 800);
    cy.visit('/');
  });

  //открытие модального окна при клике на ингредиент
  it('Test open modal window', function () {
    cy.get(selectors.modalOverlay).should('not.exist');
    cy.get(selectors.bunIngredientsSelector).contains('Ингредиент 1').click();
    cy.get(selectors.modal).contains('Ингредиент 1').should('exist');
  });

  //закрытие модального окна при клике на крестик

  it('Test close modal window', function () {
    cy.get(selectors.bunIngredientsSelector).contains('Ингредиент 1').click();
    cy.get('[data-cy=close_icon]').click();
    cy.get(selectors.modal).should('not.exist');
  });

  //закрытие модального окна при клике на overlay

  it('Test close modal window', function () {
    cy.get(selectors.bunIngredientsSelector).contains('Ингредиент 1').click();
    cy.get(selectors.modal).click().should(`exist`);
    cy.get(selectors.modalOverlay)
      .should('exist')
      .click('topRight', { force: true });
    cy.get(selectors.modal).should('not.exist');
  });
});
