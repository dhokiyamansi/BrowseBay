import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { requestHandler } from "../../services/requestHandler";

const initialState = {
  totalProducts: 0,
  products: [],
  loading: false,
  error: null,
  currentPage: 0,
  totalPages: 0,
};

export const searchProducts = createAsyncThunk(
  "search/searchProducts",
  async ({ query, page, size, sortBy }) => {
    const params = { q: query, page, size, sortBy };
    const config = {
      url: `products/search`,
      params,
    };

    const response = await requestHandler(config);
    return response;
  }
);

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(searchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.totalProducts = action.payload.totalProducts;
        state.currentPage = action.payload.currentPage;
        state.totalPages = action.payload.totalPages;
        state.products = action.payload.products;
        state.error = null;
      })
      .addCase(searchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default searchSlice.reducer;
