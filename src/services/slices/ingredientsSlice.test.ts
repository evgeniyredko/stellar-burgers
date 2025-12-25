import { ingredientsReducer, fetchIngredients } from './ingredientsSlice';
import { TIngredient } from '@utils-types';

describe('ingredientsSlice', () => {
  const initialState = {
    data: [],
    isLoading: false,
    error: null as string | null
  };

  const ingredients: TIngredient[] = [
    {
      _id: '1',
      name: 'Булка',
      type: 'bun',
      proteins: 1,
      fat: 1,
      carbohydrates: 1,
      calories: 1,
      price: 1,
      image: 'img',
      image_large: 'img-large',
      image_mobile: 'img-mobile'
    }
  ];

  it('переводит состояние в загрузку при fetchIngredients.pending', () => {
    const state = ingredientsReducer(initialState, { type: fetchIngredients.pending.type });

    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('сохраняет данные при fetchIngredients.fulfilled', () => {
    const state = ingredientsReducer(initialState, {
      type: fetchIngredients.fulfilled.type,
      payload: ingredients
    });

    expect(state.isLoading).toBe(false);
    expect(state.data).toEqual(ingredients);
  });

  it('сохраняет ошибку при fetchIngredients.rejected', () => {
    const state = ingredientsReducer(initialState, {
      type: fetchIngredients.rejected.type,
      error: { message: 'Ошибка' }
    });

    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Ошибка');
  });
});
