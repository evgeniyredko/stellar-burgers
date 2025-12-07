import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { orderBurgerApi, getOrderByNumberApi } from '@api';
import { TOrder } from '@utils-types';
import { RootState } from '../reducers';
import { resetConstructor } from './constructorSlice';

type TOrderState = {
  data: TOrder | null;
  orderRequest: boolean;
  currentOrder: TOrder | null;
};

const initialState: TOrderState = {
  data: null,
  orderRequest: false,
  currentOrder: null
};

export const createOrder = createAsyncThunk<
  TOrder,
  void,
  { state: RootState; rejectValue: string }
>('order/create', async (_, { getState, dispatch, rejectWithValue }) => {
  const { burgerConstructor } = getState();
  const bun = burgerConstructor.bun?._id;
  const fillings = burgerConstructor.ingredients.map((item) => item._id);
  if (!bun) return rejectWithValue('Булка не выбрана');

  const orderData = [bun, ...fillings, bun];
  const response = await orderBurgerApi(orderData);
  dispatch(resetConstructor());
  return response.order;
});

export const getOrderByNumber = createAsyncThunk(
  'order/getByNumber',
  async (number: number) => {
    const response = await getOrderByNumberApi(number);
    return response.orders[0];
  }
);

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    closeOrderModal(state) {
      state.data = null;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(createOrder.pending, (state) => {
        state.orderRequest = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.data = action.payload;
      })
      .addCase(createOrder.rejected, (state) => {
        state.orderRequest = false;
      })
      .addCase(
        getOrderByNumber.fulfilled,
        (state, action: PayloadAction<TOrder>) => {
          state.currentOrder = action.payload;
        }
      );
  }
});

export const { closeOrderModal } = orderSlice.actions;
export const orderReducer = orderSlice.reducer;
