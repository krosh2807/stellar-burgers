import reducer, { fetchIngredients } from '../ingredientsSlice';

describe('ingredientsSlice', () => {
  const initialState = {
    items: [],
    loading: false,
    error: null
  };

  it('возвращает начальное состояние по умолчанию', () => {
    expect(reducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('обрабатывает fetchIngredients.pending', () => {
    const action = { type: fetchIngredients.pending.type };
    const state = reducer(initialState, action);
    expect(state).toEqual({
      items: [],
      loading: true,
      error: null
    });
  });

  it('обрабатывает fetchIngredients.fulfilled', () => {
    const mockData = [
  {
    _id: 'abc123',
    name: 'Карамелизированный лук',
    type: 'main',
    proteins: 2,
    fat: 1,
    carbohydrates: 6,
    calories: 40,
    price: 25,
    image: 'https://example.com/onion.png',
    image_mobile: 'https://example.com/onion-mobile.png',
    image_large: 'https://example.com/onion-large.png',
    __v: 0
  }
];


    const action = {
      type: fetchIngredients.fulfilled.type,
      payload: mockData
    };

    const state = reducer(initialState, action);
    expect(state).toEqual({
      items: mockData,
      loading: false,
      error: null
    });
  });

  it('обрабатывает fetchIngredients.rejected', () => {
    const action = {
      type: fetchIngredients.rejected.type,
      payload: 'Ошибка загрузки ингредиентов'
    };

    const state = reducer(initialState, action);
    expect(state).toEqual({
      items: [],
      loading: false,
      error: 'Ошибка загрузки ингредиентов'
    });
  });
});
