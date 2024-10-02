import { TOrder } from '@utils-types';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getFeedsApi } from '../../utils/burger-api';
import { getOrderByNumberApi } from '../../utils/burger-api';

export type TStateFeed = {
  orders: TOrder[];
  total: number;
  totalToday: number;
  isLoading: boolean;
  error: null | string;
  modalOrder: TOrder | null;
};

const initialState: TStateFeed = {
  orders: [],
  total: 0,
  totalToday: 0,
  isLoading: false,
  error: null,
  modalOrder: null
};

export const getOrderByNum = createAsyncThunk(
  'feed/getOrder',
  async (number: number, { rejectWithValue }) => {
    try {
      const response = await getOrderByNumberApi(number);
      return response;
    } catch (error) {
      return rejectWithValue('Ошибка при получении истории заказов');
    }
  }
);

export const getFeed = createAsyncThunk('feed/getFeed', getFeedsApi);

export const feedStateSlice = createSlice({
  name: 'feeddata',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFeed.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getFeed.fulfilled, (state, action) => {
        state.isLoading = false;
        state.modalOrder = null;
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      })
      .addCase(getFeed.rejected, (state, action) => {
        state.error = action.error.message || 'Feed error';
        state.isLoading = false;
        state.modalOrder = null;
      })
      .addCase(getOrderByNum.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getOrderByNum.fulfilled, (state, action) => {
        state.isLoading = false;
        state.modalOrder = action.payload.orders[0];
      })
      .addCase(getOrderByNum.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Feed error';
      });
  },
  selectors: {
    getFeedOrders: (state) => state.orders,
    getFeedTotal: (state) => state.total,
    getFeedTotalToday: (state) => state.totalToday,
    getFeedIsLoading: (state) => state.isLoading,
    getFeedError: (state) => state.error,
    selectModalOrder: (state) => state.modalOrder
  }
});

export default feedStateSlice.reducer;

export const {
  getFeedOrders,
  getFeedTotal,
  getFeedTotalToday,
  getFeedIsLoading,
  getFeedError,
  selectModalOrder
} = feedStateSlice.selectors;
