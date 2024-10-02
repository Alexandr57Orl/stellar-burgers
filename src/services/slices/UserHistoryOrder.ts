import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getOrdersApi } from '../../utils/burger-api';
import { TOrder } from '../../utils/types';

type TStateOrderHistory = {
  orders: TOrder[];
  isLoading: boolean;
  error: null | string;
};

const initialState: TStateOrderHistory = {
  orders: [],
  isLoading: false,
  error: null
};

export const getHIstoryOrderApi = createAsyncThunk(
  'history/getHistoryOrder',
  getOrdersApi
);

export const historyOrderStateSlice = createSlice({
  name: 'historyorderstate',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getHIstoryOrderApi.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getHIstoryOrderApi.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload;
        state.error = null;
      })
      .addCase(getHIstoryOrderApi.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Error get history order';
      });
  },
  selectors: {
    getHistoryOrder: (state) => state.orders,
    getHistoryOrderIsLoading: (state) => state.isLoading,
    getHistoryOrderError: (state) => state.error
  }
});

export default historyOrderStateSlice.reducer;

export const {
  getHistoryOrder,
  getHistoryOrderIsLoading,
  getHistoryOrderError
} = historyOrderStateSlice.selectors;
