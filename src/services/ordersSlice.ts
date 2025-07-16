import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { TOrder } from '../utils/types';
import {
  getFeedsApi,
  getOrdersApi,
  getOrderByNumberApi
} from '../utils/burger-api';

interface OrdersState {
  feedOrders: TOrder[];
  userOrders: TOrder[];
  isLoading: boolean;
  error: string | null;
  total: number;
  totalToday: number;
}

const initialState: OrdersState = {
  feedOrders: [],
  userOrders: [],
  isLoading: false,
  error: null,
  total: 0,
  totalToday: 0
};

export const fetchFeedOrders = createAsyncThunk(
  'orders/fetchFeedOrders',
  async (_, thunkAPI) => {
    try {
      const res = await getFeedsApi();
      if (res.orders) return res;
      return thunkAPI.rejectWithValue('Не удалось получить ленту заказов');
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.message || 'Ошибка загрузки ленты заказов'
      );
    }
  }
);

export const fetchUserOrders = createAsyncThunk(
  'orders/fetchUserOrders',
  async (_, thunkAPI) => {
    try {
      const res = await getOrdersApi();
      if (res) return res;
      return thunkAPI.rejectWithValue(
        'Не удалось получить заказы пользователя'
      );
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.message || 'Ошибка загрузки заказов пользователя'
      );
    }
  }
);

export const fetchOrderById = createAsyncThunk(
  'orders/fetchOrderById',
  async (number: string, thunkAPI) => {
    try {
      const res = await getOrderByNumberApi(Number(number));
      if (res.orders && res.orders.length > 0) {
        return res.orders[0];
      }
      return thunkAPI.rejectWithValue('Заказ не найден');
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message || 'Ошибка загрузки заказа');
    }
  }
);

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    clearOrders(state) {
      state.feedOrders = [];
      state.userOrders = [];
      state.isLoading = false;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeedOrders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchFeedOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.feedOrders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      })
      .addCase(fetchFeedOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          (action.payload as string) || 'Ошибка загрузки ленты заказов';
      })
      .addCase(fetchUserOrders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userOrders = action.payload;
      })
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          (action.payload as string) || 'Ошибка загрузки заказов пользователя';
      })
      .addCase(fetchOrderById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchOrderById.fulfilled, (state, action) => {
        state.isLoading = false;
        const existsFeed = state.feedOrders.some(
          (o) => o._id === action.payload._id
        );
        if (!existsFeed) state.feedOrders.push(action.payload);
        const existsUser = state.userOrders.some(
          (o) => o._id === action.payload._id
        );
        if (!existsUser) state.userOrders.push(action.payload);
      })
      .addCase(fetchOrderById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = (action.payload as string) || 'Ошибка загрузки заказа';
      });
  }
});

export const { clearOrders } = ordersSlice.actions;
export default ordersSlice.reducer;
