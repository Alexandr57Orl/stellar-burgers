import {
  TStateOrderHistory,
  getHIstoryOrderApi,
  historyOrderStateSlice
} from './UserHistoryOrder';

//Тестовый начальный стэйт для глобального использования
const initialState: TStateOrderHistory = {
  orders: [],
  isLoading: false,
  error: null
};

//Тестовые данные заказов для глобального использования

const testOrders = {
  success: true,
  orders: [
    {
      _id: '1',
      ingredients: ['1', '2', '3'],
      status: 'done',
      name: 'Краторный люминесцентный бургер',
      createdAt: 'test',
      updatedAt: 'test',
      number: 1
    },
    {
      _id: '2',
      ingredients: ['1', '2', '3', '4'],
      status: 'done',
      name: 'Антарианский краторный бессмертный минеральный экзо-плантаго био-марсианский бургер',
      createdAt: 'test',
      updatedAt: 'test',
      number: 2
    },
    {
      _id: '3',
      ingredients: ['1', '2', '3'],
      status: 'done',
      name: 'Краторный space бургер',
      createdAt: 'test',
      updatedAt: 'test',
      number: 3
    }
  ],
  total: 3,
  totalToday: 3
};

describe('History order data slice tests', () => {
  it('test should set load to true and err to null during pending status', () => {
    const currentState = historyOrderStateSlice.reducer(
      {
        ...initialState,
        error: 'Test error'
      },
      getHIstoryOrderApi.pending('')
    );
    expect(currentState.isLoading).toBe(true);
    expect(currentState.error).toBe(null);
    expect(currentState.orders).toEqual([]);
  });
  it('test should set load to false and upd feed data', () => {
    const currentState = historyOrderStateSlice.reducer(
      {
        ...initialState,
        isLoading: true
      },
      getHIstoryOrderApi.fulfilled(testOrders.orders, '')
    );
    expect(currentState.isLoading).toBe(false);
    expect(currentState.orders).toEqual(testOrders.orders);
    expect(currentState.error).toBe(null);
  });
  it('test should set err to err message and loading to false', () => {
    const currentState = historyOrderStateSlice.reducer(
      {
        ...initialState,
        isLoading: true
      },
      getHIstoryOrderApi.rejected(new Error('Test err'), '')
    );
    expect(currentState.isLoading).toBe(false);
    expect(currentState.error).toBe('Test err');
    expect(currentState.orders).toEqual([]);
  });
});
