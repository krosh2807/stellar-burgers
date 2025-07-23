/// <reference types="cypress" />

const BASE_URL = 'http://localhost:4000';

const BUN = `[data-cy='60d3b41abdacab0026a733c6']`;
const INGREDIENT = `[data-cy='643d69a5c3f7b9001cfa0949']`;

const removeOverlay = () => {
  cy.window().then((win) => {
    const overlay = win.document.getElementById('webpack-dev-server-client-overlay');
    if (overlay) overlay.remove();
  });
};

describe('Проверка конструктора', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/api/ingredients', {
      fixture: 'ingredients.json'
    }).as('getIngredients');

    cy.visit(BASE_URL);
    removeOverlay();
    cy.wait('@getIngredients');
  });

  it('Ингредиенты отображаются', () => {
    cy.get(BUN).should('exist');
    cy.get(INGREDIENT).should('exist');
  });

it('Открывается и закрывается модалка по крестику', () => {
  cy.get(BUN).scrollIntoView().within(() => {
    cy.get('a').click({ force: true });
  });

  cy.get('[data-testid="ingredient-details-modal"]')
    .should('be.visible')
    .contains('Краторная булка N-200i');

  cy.get('[data-testid="modal-close"]').click({ force: true });  // <-- исправлено
  cy.get('[data-testid="ingredient-details-modal"]').should('not.exist');
});

  it('Можно добавить булку и начинку', () => {
    cy.get(BUN).find('button').click({ force: true });
    cy.get(INGREDIENT).find('button').click({ force: true });

    cy.get('[data-testid="constructor-bun-top"]').should('exist');
    cy.get('[data-testid="constructor-bun-bottom"]').should('exist');
    cy.get('[data-testid="constructor-ingredients-list"]').should('exist');
  });
});

describe('Оформление заказа', () => {
  beforeEach(() => {
    cy.setCookie('accessToken', 'test-accessToken');
    localStorage.setItem('refreshToken', 'test-refreshToken');

    cy.intercept('GET', '**/api/ingredients', {
      fixture: 'ingredients.json'
    }).as('getIngredients');

    cy.intercept('GET', '**/api/auth/user', {
      fixture: 'user.json'
    }).as('getUser');

    cy.intercept('POST', '**/api/orders', {
      fixture: 'order.json',
      delay: 500
    }).as('createOrder');

    cy.visit(BASE_URL);
    removeOverlay();

    cy.wait(['@getIngredients', '@getUser']);
  });

  it('Оформляется заказ и очищается конструктор', () => {
    cy.get(BUN).find('button').click({ force: true });
    cy.get(INGREDIENT).find('button').click({ force: true });

    cy.get('[data-testid="order-button"]')
      .should('be.visible')
      .and('not.be.disabled')
      .click({ force: true });

    cy.wait('@createOrder');

    cy.fixture('order.json').then(({ order }) => {
      removeOverlay(); // обязательно перед проверкой модалки
      cy.get('[data-cy="modal-open"]')
        .should('be.visible')
        .contains(order.number);
    });

    cy.get('[data-testid="modal-close"]').click({ force: true });

    cy.get('[data-testid="constructor-bun-top"]').should('not.exist');
    cy.get('[data-testid="constructor-bun-bottom"]').should('not.exist');
    cy.get('[data-testid^="constructor-ingredient-"]').should('not.exist');
    cy.get('[data-testid="no-filling"]').should('be.visible');

  });
});
