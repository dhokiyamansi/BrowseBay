import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { requestHandler } from "../../services/requestHandler";

const initialState = {
  orders: [],
  loading: false,
  error: null,
  currentOrder: null,
};

export const createOrder = createAsyncThunk(
  "orders/createOrder",
  async ({ data, headers }) => {
    const config = {
      url: "orders",
      method: "POST",
      headers,
      data,
    };
    const response = await requestHandler(config);
    return response;
  }
);

export const fetchAllOrders = createAsyncThunk(
  "orders/fetchAllOrders",
  async ({ headers }) => {
    const config = {
      url: "orders",
      headers,
    };
    const response = await requestHandler(config);
    return response;
  }
);

export const fetchOrderById = createAsyncThunk(
  "orders/fetchOrderById",
  async ({ order_id, headers }) => {
    const config = {
      url: `orders/${order_id}`,
      headers,
    };
    const response = await requestHandler(config);
    return response;
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchAllOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchOrderById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrderById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentOrder = action.payload;
      })
      .addCase(fetchOrderById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default orderSlice.reducer;
