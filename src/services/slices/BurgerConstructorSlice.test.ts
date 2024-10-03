import {
  addIngredient,
  removeIngredient,
  moveUpIngredient,
  moveDownIngredient,
  clearOrder,
  initialState
} from './BurgerConstructorSlice';
import burgerConstructorSlice from './BurgerConstructorSlice';
import { TConstructorIngredient } from '@utils-types';

describe('Constructor slice tests', () => {
  const bun: TConstructorIngredient = {
    _id: '1',
    id: '1',
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
  };

  const ingredient2: TConstructorIngredient = {
    _id: '1',
    id: '1',
    name: 'Биокотлета из марсианской Магнолии',
    type: 'main',
    proteins: 420,
    fat: 142,
    carbohydrates: 242,
    calories: 4242,
    price: 424,
    image: 'https://code.s3.yandex.net/react/code/meat-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
  };

  const sauce: TConstructorIngredient = {
    _id: '2',
    id: '2',
    name: 'Соус Spicy-X',
    type: 'sauce',
    proteins: 30,
    fat: 20,
    carbohydrates: 40,
    calories: 30,
    price: 90,
    image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png'
  };

  // тест на добавление булки в конструктор
  it('should add bun', () => {
    const newState = burgerConstructorSlice(initialState, addIngredient(bun));
    expect(newState.constructorItems.bun).toEqual({
      ...bun,
      id: expect.any(String)
    });
  });

  //тест добавления булки в конструктор
  it('should add bun', () => {
    const newState = burgerConstructorSlice(initialState, addIngredient(bun));

    expect(newState.constructorItems.bun).toEqual({
      ...bun,
      id: expect.any(String)
    });
  });
  // тест на добавление ингредиента в конструктор
  it('should add ingredient', () => {
    const newState = burgerConstructorSlice(initialState, addIngredient(sauce));

    expect(newState.constructorItems.ingredients).toHaveLength(1);
    expect(newState.constructorItems.ingredients[0]).toEqual({
      ...sauce,
      id: expect.any(String)
    });
  });
  //тест удаления ингредиента
  it('should remove ingredient', () => {
    const initialState = {
      constructorItems: {
        bun: bun,
        ingredients: [sauce, ingredient2]
      },
      orderRequest: false,
      orderModalData: null,
      loading: false,
      error: null
    };

    const newState = burgerConstructorSlice(
      initialState,
      removeIngredient(sauce)
    );

    expect(newState.constructorItems.ingredients).toHaveLength(1);
    expect(newState.constructorItems.ingredients[0]).toEqual({
      ...ingredient2,
      id: expect.any(String)
    });
  });

  // Тест перемещения ингредиента вверх
  it('should move ingredient up', () => {
    const initialState = {
      constructorItems: {
        bun: bun,
        ingredients: [sauce, ingredient2]
      },
      orderRequest: false,
      orderModalData: null,
      loading: false,
      error: null
    };

    const newState = burgerConstructorSlice(
      initialState,
      moveUpIngredient(1) //передаем индекс элемента в массиве
    );
    // проверяем что ингредиенты поменялись местами
    expect(newState.constructorItems.ingredients[0]).toEqual({
      ...ingredient2,
      id: expect.any(String)
    });
    // еще одна проверка - реверсивная
    expect(newState.constructorItems.ingredients[1]).toEqual({
      ...sauce,
      id: expect.any(String)
    });
  });

  //тест на перемещение ингредиента вниз
  it('should move ingredient down', () => {
    const initialState = {
      constructorItems: {
        bun: bun,
        ingredients: [sauce, ingredient2]
      },
      orderRequest: false,
      orderModalData: null,
      loading: false,
      error: null
    };

    const newState = burgerConstructorSlice(
      initialState,
      moveDownIngredient(0) //передаем индекс элемента в массиве, который нужно переместить вниз.
    );

    expect(newState.constructorItems.ingredients[1]).toEqual({
      ...sauce,
      id: expect.any(String)
    });

    expect(newState.constructorItems.ingredients[0]).toEqual({
      ...ingredient2,
      id: expect.any(String)
    });
  });

  //тест очищения конструктора
  it('should clear constructor', () => {
    const initialState = {
      constructorItems: {
        bun: bun,
        ingredients: [sauce, ingredient2]
      },
      orderRequest: false,
      orderModalData: null,
      loading: false,
      error: null
    };

    const newState = burgerConstructorSlice(initialState, clearOrder());

    expect(newState.constructorItems).toEqual({
      bun: null,
      ingredients: []
    });
  });
});
