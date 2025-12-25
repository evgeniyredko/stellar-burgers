import { addIngredient, constructorReducer, moveIngredient, removeIngredient } from './constructorSlice';
import { TIngredient, TConstructorIngredient } from '@utils-types';

jest.mock('uuid', () => ({ v4: () => 'test-uuid' }));

describe('constructorSlice', () => {
  const bun: TIngredient = {
    _id: 'bun-1',
    name: 'Булка 1',
    type: 'bun',
    proteins: 10,
    fat: 5,
    carbohydrates: 20,
    calories: 200,
    price: 2,
    image: 'bun.png',
    image_large: 'bun-large.png',
    image_mobile: 'bun-mobile.png'
  };

  const main: TIngredient = {
    _id: 'main-1',
    name: 'Начинка 1',
    type: 'main',
    proteins: 20,
    fat: 10,
    carbohydrates: 30,
    calories: 300,
    price: 4,
    image: 'main.png',
    image_large: 'main-large.png',
    image_mobile: 'main-mobile.png'
  };

  it('добавляет булку в состояние конструктора', () => {
    const state = constructorReducer(undefined, addIngredient(bun));

    expect(state.bun).toEqual({ ...bun, id: 'test-uuid' });
    expect(state.ingredients).toHaveLength(0);
  });

  it('добавляет начинку в состояние конструктора', () => {
    const state = constructorReducer(undefined, addIngredient(main));

    expect(state.ingredients).toHaveLength(1);
    expect(state.ingredients[0]).toEqual({ ...main, id: 'test-uuid' });
    expect(state.bun).toBeNull();
  });

  it('удаляет ингредиент по идентификатору', () => {
    const startState = {
      bun: null,
      ingredients: [
        { ...main, id: 'first' },
        { ...main, id: 'second' }
      ] as TConstructorIngredient[]
    };

    const state = constructorReducer(startState, removeIngredient('first'));

    expect(state.ingredients).toHaveLength(1);
    expect(state.ingredients[0].id).toBe('second');
  });

  it('меняет порядок ингредиентов', () => {
    const startState = {
      bun: null,
      ingredients: [
        { ...main, id: 'first', name: 'Первый' },
        { ...main, id: 'second', name: 'Второй' },
        { ...main, id: 'third', name: 'Третий' }
      ]
    };

    const state = constructorReducer(
      startState,
      moveIngredient({ dragIndex: 0, hoverIndex: 2 })
    );

    expect(state.ingredients.map((item) => item.id)).toEqual([
      'second',
      'third',
      'first'
    ]);
  });
});
