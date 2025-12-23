import { rootReducer } from './reducers';

describe('rootReducer', () => {
  it('должен инициализироваться с корректным состоянием', () => {
    const initialState = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });

    expect(initialState).toEqual({
      ingredients: {
        data: [],
        isLoading: false,
        error: null
      },
      burgerConstructor: {
        bun: null,
        ingredients: []
      },
      order: {
        data: null,
        orderRequest: false,
        currentOrder: null
      },
      feed: {
        data: { orders: [], total: 0, totalToday: 0 },
        isLoading: false,
        error: null
      },
      profileOrders: {
        orders: [],
        isLoading: false
      },
      user: {
        data: null,
        isAuthChecked: false,
        error: null
      }
    });
  });
});
