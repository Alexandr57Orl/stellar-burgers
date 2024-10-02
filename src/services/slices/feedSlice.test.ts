import { create } from 'domain';
import {
  getFeed,
  getOrderByNum,
  TStateFeed,
  feedStateSlice
} from './FeedSlice';

// Начальное состояние для тестов, вынесенное в глобальную переменную для общего доступа

const initialState: TStateFeed = {
  orders: [],
  total: 0,
  totalToday: 0,
  error: null,
  isLoading: false,
  modalOrder: null
};

//Тестовые данные заказов для использования в тестах, в глобальной переменной для общего доступа
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
      name: 'Краторный фалленианский бургер',
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

describe('Feed data slice tests', () => {
  // Проверка на установку loading в true и сброс ошибки (error) при состоянии pending
  it('test should set load to true and err to null during pending status', () => {
    const currentState = feedStateSlice.reducer(
      {
        ...initialState,
        error: 'Test error'
      },
      getFeed.pending('')
    );
    expect(currentState.isLoading).toBe(true);
    expect(currentState.error).toBe(null);
    expect(currentState.orders).toEqual([]);
    expect(currentState.modalOrder).toBe(null);
    expect(currentState.total).toBe(0);
    expect(currentState.totalToday).toBe(0);
  });

  // Проверка на установку данных после успешной загрузки
  it('checking for data installation after successful download', () => {
    const currentState = feedStateSlice.reducer(
      {
        ...initialState,
        isLoading: true
      },
      getFeed.fulfilled(testOrders, '')
    );

    //проверяем, что  данные корректно сохраняются в состояние, а флаг загрузки (loading) сбрасывается.

    expect(currentState.orders).toEqual(testOrders.orders);
    expect(currentState.total).toBe(testOrders.total);
    expect(currentState.totalToday).toBe(testOrders.totalToday);
    expect(currentState.error).toBe(null);
    expect(currentState.isLoading).toBe(false);
    expect(currentState.modalOrder).toBe(null);
  });

  // проверка установки ошибки, когда запрос завершается с ошибкой
  it('test should set err to err message and loading to false', () => {
    const testErr = new Error('Test err');
    const currentState = feedStateSlice.reducer(
      {
        ...initialState,
        isLoading: true
      },
      getFeed.rejected(testErr, '')
    );

    // Проверяем, что ошибка корректно сохраняется в состояние, а флаг загрузки (loading) сбрасывается.

    expect(currentState.isLoading).toBe(false);
    expect(currentState.error).toBe('Test err');
    expect(currentState.orders).toEqual([]);
    expect(currentState.total).toBe(0);
    expect(currentState.totalToday).toBe(0);
    expect(currentState.modalOrder).toBe(null);
  });

  // Проверка на установку loading в true при запросе заказа по номеру (pending)
  it('test get order by number should set loading to true', () => {
    const currentState = feedStateSlice.reducer(
      {
        ...initialState,
        error: 'Test err'
      },
      getOrderByNum.pending('1', 1) //аргументы (номер заказа и идентификатор запроса) не используются непосредственно в тесте, но необходимы для соответствия сигнатуре запроса
    );

    expect(currentState.isLoading).toBe(true);
    expect(currentState.error).toBe(null);
    expect(currentState.orders).toEqual([]);
    expect(currentState.modalOrder).toEqual(null);
    expect(currentState.total).toBe(0);
    expect(currentState.totalToday).toBe(0);
  });

  // Проверка на установку заказа в modalOrder и завершение загрузки (fulfilled)
  it('test get order by number should set loading to false', () => {
    const currentState = feedStateSlice.reducer(
      {
        ...initialState,
        isLoading: true
      },
      getOrderByNum.fulfilled(testOrders, '1', 1)
    );

    //проверяем, что modalOrder обновился, а loading завершена
    expect(currentState.modalOrder).toEqual(testOrders.orders[0]);
    expect(currentState.isLoading).toBe(false);
    expect(currentState.error).toBe(null);
    expect(currentState.orders).toEqual([]);
    expect(currentState.total).toBe(0);
    expect(currentState.totalToday).toBe(0);
  });

  // Проверка на установку ошибки и завершение загрузки при отказе в получении заказа (rejected)
  it('test get order by number should set loading to false and set err', () => {
    const testErr = new Error('Test err');
    const currentState = feedStateSlice.reducer(
      {
        ...initialState,
        isLoading: true
      },
      getOrderByNum.rejected(testErr, '1', 1)
    );
    // Проверяем, что ошибка сохраняется, а флаг загрузки (loading) сбрасывается.

    expect(currentState.isLoading).toBe(false);
    expect(currentState.modalOrder).toBe(null);
    expect(currentState.error).toBe('Test err');
    expect(currentState.orders).toEqual([]);
    expect(currentState.total).toBe(0);
    expect(currentState.totalToday).toBe(0);
  });
});
