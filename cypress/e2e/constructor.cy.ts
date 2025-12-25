describe('Конструктор бургера', () => {
  const visitConstructor = ({ withAuth = false } = {}) => {
    cy.intercept('GET', '**/ingredients', { fixture: 'ingredients.json' }).as(
      'getIngredients'
    );
    cy.intercept('GET', '**/auth/user', { fixture: 'user.json' }).as('getUser');
    cy.visit('/', {
      onBeforeLoad(win) {
        if (withAuth) {
          win.localStorage.setItem('refreshToken', 'test-refresh');
          win.document.cookie = 'accessToken=test-access;';
        }
      }
    });

    cy.wait('@getIngredients');
  };

  it('добавляет булку и начинку в конструктор', () => {
    visitConstructor();
    cy.contains('li', 'Булка 1').within(() => {
      cy.contains('button', 'Добавить').click();
    });
    cy.contains('li', 'Котлета флюоресцентная').within(() => {
      cy.contains('button', 'Добавить').click();
    });
    cy.contains('Булка 1 (верх)').should('exist');
    cy.contains('Булка 1 (низ)').should('exist');
    cy.get('[class*="constructor-element__text"]')
      .contains('Котлета флюоресцентная')
      .should('have.length', 1);
  });

  it('открывает и закрывает модальное окно ингредиента', () => {
    visitConstructor();
    cy.contains('a', 'Булка 1').click();
    cy.contains('Детали ингредиента').should('exist');
    cy.contains('Булка 1').should('exist');
    cy.get('#modals button').click();
    cy.contains('Детали ингредиента').should('not.exist');
    cy.contains('a', 'Соус фирменный').click();
    cy.contains('Детали ингредиента').should('exist');
    cy.get('#modals button').click();
    cy.contains('Детали ингредиента').should('not.exist');
  });

  describe('Оформление заказа', () => {
    afterEach(() => {
      cy.clearLocalStorage();
      cy.clearCookie('accessToken');
    });

    it('оформляет заказ и очищает конструктор', () => {
      visitConstructor({ withAuth: true });
      cy.intercept('POST', '**/orders', { fixture: 'order.json' }).as(
        'createOrder'
      );
      cy.contains('li', 'Булка 1').within(() => {
        cy.contains('button', 'Добавить').click();
      });
      cy.contains('li', 'Котлета флюоресцентная').within(() => {
        cy.contains('button', 'Добавить').click();
      });
      cy.contains('button', 'Оформить заказ').click();
      cy.wait('@createOrder');
      cy.contains('9999').should('exist');
      cy.get('#modals button').click();
      cy.contains('9999').should('not.exist');
      cy.get('[class*="constructor-element"]').should('not.exist');
    });
  });
});
