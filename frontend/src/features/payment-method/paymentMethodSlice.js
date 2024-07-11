import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { requestHandler } from "../../services/requestHandler";

const initialState = {
  paymentMethods: [],
  loading: false,
  error: null,
};

export const fetchPaymentMethods = createAsyncThunk(
  "paymentMethod/fetchPaymentMethods",
  async () => {
    const config = {
      url: "payment_methods",
    };
    const response = await requestHandler(config);
    return response;
  }
);

const paymentMethodSlice = createSlice({
  name: "paymentMethod",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPaymentMethods.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPaymentMethods.fulfilled, (state, action) => {
        state.loading = false;
        state.paymentMethods = action.payload;
      })
      .addCase(fetchPaymentMethods.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default paymentMethodSlice.reducer;
