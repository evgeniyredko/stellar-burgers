import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getFeedsApi } from '@api';
import { TOrdersData } from '@utils-types';

type TFeedState = {
  data: TOrdersData;
  isLoading: boolean;
  error: string | null;
};

const initialState: TFeedState = {
  data: { orders: [], total: 0, totalToday: 0 },
  isLoading: false,
  error: null
};

export const fetchFeed = createAsyncThunk(
  'feed/fetch',
  async () => await getFeedsApi()
);

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchFeed.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchFeed.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchFeed.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Не удалось получить ленту';
      });
  }
});

export const feedReducer = feedSlice.reducer;
