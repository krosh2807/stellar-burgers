import reducer, {
  setBun,
  addIngredient,
  removeIngredient,
  moveIngredient,
  clearConstructor
} from '../burgerConstructorSlice';

describe('burgerConstructorSlice', () => {
  const initialState = {
    bun: null,
    ingredients: []
  };

  const testIngredient = {
  _id: 'sauce456',
  name: 'Spicy Mayo',
  type: 'sauce' as const,
  proteins: 3,
  fat: 8,
  carbohydrates: 6,
  calories: 90,
  price: 60,
  image: 'https://example.com/spicy-mayo.png',
  image_mobile: 'https://example.com/spicy-mayo-mobile.png',
  image_large: 'https://example.com/spicy-mayo-large.png',
  __v: 0,
  id: 'ingredient-id-42'
};

const bun = {
  _id: 'bun789',
  name: 'Black Sesame Bun',
  type: 'bun' as const,
  proteins: 7,
  fat: 4,
  carbohydrates: 22,
  calories: 180,
  price: 100,
  image: 'https://example.com/sesame-bun.png',
  image_mobile: 'https://example.com/sesame-bun-mobile.png',
  image_large: 'https://example.com/sesame-bun-large.png',
  __v: 0,
  id: 'bun-id-99'
};


  it('возвращает начальное состояние по умолчанию', () => {
    expect(reducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('устанавливает булку', () => {
    const nextState = reducer(initialState, setBun(bun));
    expect(nextState.bun).toEqual(bun);
  });

  it('добавляет ингредиент', () => {
    const nextState = reducer(initialState, addIngredient(testIngredient));
    expect(nextState.ingredients).toHaveLength(1);
    expect(nextState.ingredients[0]).toEqual(testIngredient);
  });

  it('удаляет ингредиент по id', () => {
    const stateWithIngredient = {
      bun: null,
      ingredients: [testIngredient]
    };
    const nextState = reducer(stateWithIngredient, removeIngredient(testIngredient.id));
    expect(nextState.ingredients).toHaveLength(0);
  });

  it('перемещает ингредиенты', () => {
    const ingredient1 = { ...testIngredient, id: '1' };
    const ingredient2 = { ...testIngredient, id: '2' };
    const ingredient3 = { ...testIngredient, id: '3' };

    const state = {
      bun: null,
      ingredients: [ingredient1, ingredient2, ingredient3]
    };

    // Перемещаем элемент с индекса 2 (id: '3') на позицию 1
    const nextState = reducer(state, moveIngredient({ from: 2, to: 1 }));
    expect(nextState.ingredients.map(i => i.id)).toEqual(['1', '3', '2']);
  });

  it('очищает конструктор', () => {
    const state = {
      bun,
      ingredients: [testIngredient]
    };
    const nextState = reducer(state, clearConstructor());
    expect(nextState.bun).toBeNull();
    expect(nextState.ingredients).toHaveLength(0);
  });
});
