import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getOrdersApi } from '@api';
import { TOrder } from '@utils-types';

type TProfileOrdersState = {
  orders: TOrder[];
  isLoading: boolean;
};

const initialState: TProfileOrdersState = {
  orders: [],
  isLoading: false
};

export const fetchProfileOrders = createAsyncThunk(
  'profileOrders/fetch',
  async () => await getOrdersApi()
);

const profileOrdersSlice = createSlice({
  name: 'profileOrders',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchProfileOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProfileOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload;
      })
      .addCase(fetchProfileOrders.rejected, (state) => {
        state.isLoading = false;
      });
  }
});

export const profileOrdersReducer = profileOrdersSlice.reducer;
