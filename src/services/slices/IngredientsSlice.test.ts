import ingredientsSlice, {
  getIngredients,
  initialState
} from './IngredientsSlice';

// вынесем  testIngredient в глобальную область видимости для более удобного применения в it

const testIngredient = [
  {
    _id: '1',
    name: 'Краторная булка N-200i',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
  }
];

describe('Ingredients slice tests', () => {
  it(`test must return set loading and error to null await pending`, () => {
    const currentState = ingredientsSlice(
      {
        ...initialState,
        // намеренно добавляем тестовую ошибку в начальное состояние, чтобы проверить её сброс редьюсером
        error: 'Test err'
      },
      //эмулируем вызов action pending, который моделирует начало асинхронной операции, ожидаемой редьюсером
      getIngredients.pending('')
    );
    expect(currentState.ingredients).toEqual([]);
    expect(currentState.loading).toBe(true);
    expect(currentState.error).toBe(null);
  });
  //проверяем, как редьюсер обрабатывает успешное завершение асинхронного запроса на получение ингредиентов
  it('Test should set loading to false and upd ingredients', () => {
    const currentState = ingredientsSlice(
      {
        ...initialState,
        loading: true
      },
      getIngredients.fulfilled(testIngredient, '')
    );
    expect(currentState.ingredients).toEqual(testIngredient);
    expect(currentState.loading).toBe(false);
    expect(currentState.error).toBe(null);
  });
  //проверяем, как редьюсер обрабатывает ошибку асинхронного запроса на получение ингредиентов
  it('Test should set loading to false and upd error', () => {
    //эмулируем неуспешное завершение запроса с созданной  тестовой ошибкой
    const testErr = new Error('Test err');
    const currentState = ingredientsSlice(
      {
        ...initialState,
        loading: true
      },

      getIngredients.rejected(testErr, '')
    );
    expect(currentState.error).toBe('Test err');
    expect(currentState.ingredients).toEqual([]);
    expect(currentState.loading).toBe(false);
  });
});
