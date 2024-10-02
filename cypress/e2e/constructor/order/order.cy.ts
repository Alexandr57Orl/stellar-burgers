describe('Order page test', function () {
  this.beforeEach(function () {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.intercept(`GET`, `api/auth/user`, { fixture: `userAnswer.json` });
    cy.intercept(`POST`, `api/orders`, { fixture: `succesOrder.json` });
    cy.viewport(1300, 800);
    cy.visit('http://localhost:4000/');
    //токены для успешной авторизации
    window.localStorage.setItem(
      'refreshToken',
      JSON.stringify('test-refreshToken')
    );

    cy.setCookie('accessToken', 'test-accessToken');
  });
  afterEach(function () {
    cy.clearCookies();
    cy.clearLocalStorage();
  });
  //тест создания заказа
  it(`test create order and get succes answer`, function () {
    cy.get('[data-cy=bun-ingredients]').contains('Добавить').click();
    cy.get('[data-cy=main-ingredients]').contains('Добавить').click();
    cy.get('[data-cy=sauces-ingredients]').contains('Добавить').click();

    // обработка клика на кнопку "оформить заказ"
    cy.get('[data-cy=order_button]')
      .contains('Оформить заказ')
      .should(`exist`)
      .click();
    //Проверка открытия модального окна и номера заказа после успешного создания заказа
    cy.get(`[data-cy=order_number]`).contains('123456').should('exist');

    //закрытие модального окна на крестик
    cy.get('[data-cy=close_icon]').click();
    cy.get(`[data-cy=modal]`).should('not.exist');
    // очищение конструктора
    cy.get('[data-cy=main-constructor]').should('not.contain', 'Ингридиент 1');
    cy.get('[data-cy=ingredient_constructor]').should(
      'not.contain',
      'Ингридиент 4'
    );
    cy.get('[data-cy=ingredient_constructor]').should(
      'not.contain',
      'Ингридиент 2'
    );
  });
});
