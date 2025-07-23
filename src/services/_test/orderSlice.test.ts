import reducer, {
  createOrder,
  clearOrder
} from '../orderSlice'; // путь можно изменить при необходимости
import { TOrder } from '../../utils/types';
import { UnknownAction } from 'redux';

const initialState = {
  order: null,
  isLoading: false,
  error: null
};

describe('orderSlice', () => {
  it('возвращает состояние по умолчанию при неизвестном действии', () => {
    expect(reducer(undefined, {} as UnknownAction)).toEqual(initialState);
  });

  it('обрабатывает createOrder.pending — установка isLoading', () => {
    const action = { type: createOrder.pending.type };
    const result = reducer(initialState, action);
    expect(result).toEqual({
      order: null,
      isLoading: true,
      error: null
    });
  });

  it('обрабатывает createOrder.fulfilled — заказ успешно получен', () => {
    const testOrder: TOrder = {
      number: 5678,
      name: 'Demo Order',
      _id: 'order123',
      status: 'created',
      createdAt: '2025-07-23T12:00:00Z',
      updatedAt: '2025-07-23T12:30:00Z',
      ingredients: ['ingr1', 'ingr2']
    };

    const action = {
      type: createOrder.fulfilled.type,
      payload: testOrder
    };

    const result = reducer(initialState, action);
    expect(result).toEqual({
      order: testOrder,
      isLoading: false,
      error: null
    });
  });

  it('обрабатывает createOrder.rejected — ошибка при создании заказа', () => {
    const action = {
      type: createOrder.rejected.type,
      payload: 'Не удалось оформить заказ'
    };
    const result = reducer(initialState, action);
    expect(result).toEqual({
      order: null,
      isLoading: false,
      error: 'Не удалось оформить заказ'
    });
  });

  it('обрабатывает clearOrder — сбрасывает состояние заказа', () => {
    const currentState = {
      order: {
        number: 42,
        name: 'Old Order',
        _id: 'xyz789',
        status: 'done',
        createdAt: '2025-01-10',
        updatedAt: '2025-01-11',
        ingredients: ['111', '222']
      },
      isLoading: true,
      error: 'Произошла ошибка'
    };

    const result = reducer(currentState, clearOrder());
    expect(result).toEqual(initialState);
  });
});
