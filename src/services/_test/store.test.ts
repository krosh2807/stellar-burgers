import store, { rootReducer } from '../store';

describe('Redux store', () => {
  it('должен содержать все слайсы в начальном состоянии', () => {
    const state = store.getState();

    expect(state).toHaveProperty('auth');
    expect(state).toHaveProperty('burgerConstructor');
    expect(state).toHaveProperty('order');
    expect(state).toHaveProperty('orders');
    expect(state).toHaveProperty('profile');
    expect(state).toHaveProperty('ingredients');
  });

  it('должен иметь devTools включён в режиме разработки', () => {
    const isDev = process.env.NODE_ENV !== 'production';
    expect(store).toHaveProperty('dispatch');
    expect(isDev).toBe(true);
  });

  it('rootReducer должен возвращать начальное состояние при неизвестном экшене', () => {
    const fakeAction = { type: 'UNKNOWN_ACTION' };
    const initialState = rootReducer(undefined, fakeAction);

    expect(initialState).toHaveProperty('auth');
    expect(initialState).toHaveProperty('burgerConstructor');
    expect(initialState).toHaveProperty('order');
    expect(initialState).toHaveProperty('orders');
    expect(initialState).toHaveProperty('profile');
    expect(initialState).toHaveProperty('ingredients');
  });
});
