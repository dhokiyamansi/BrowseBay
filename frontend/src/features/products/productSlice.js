import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { requestHandler } from "../../services/requestHandler";
import { toast } from "react-toastify";

const initialState = {
  currentProduct: null,
  category: null,
  products: [],
  loading: false,
  error: null,
  currentPage: 0,
  totalPages: 0,
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async ({ categoryId, page, size, sortBy }) => {
    const params = { page, size, sortBy };
    const config = {
      url: `categories/${categoryId}/products`,
      params,
    };

    const response = await requestHandler(config);
    return response;
  }
);

export const fetchAllProducts = createAsyncThunk(
  "products/fetchAllProducts",
  async ({ headers }) => {
    const config = {
      url: "products",
      headers,
    };

    const response = await requestHandler(config);
    return response;
  }
);

export const fetchProductById = createAsyncThunk(
  "products/fetchProductById",
  async ({ product_id }) => {
    const config = {
      url: `products/${product_id}`,
    };

    const response = await requestHandler(config);
    return response;
  }
);

export const addProduct = createAsyncThunk(
  "products/addProduct",
  async ({ data, headers }) => {
    const config = {
      method: "POST",
      url: "products",
      data,
      headers,
    };
    const response = await requestHandler(config);
    return response;
  }
);

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async ({ product_id, headers }) => {
    console.log("DELETE PRODUCT ", product_id, headers);
    const config = {
      method: "DELETE",
      url: `products/${product_id}`,
      headers,
    };

    console.log(config);
    const response = await requestHandler(config);
    console.log("RESPONSE: ", response);
    return response;
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    reset: (state) => {
      state.currentProduct = null;
      state.products = [];
      state.currentPage = 0;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        // if (!action.payload.length === 0) state.currentPage++;

        state.currentPage = action.payload.currentPage;
        state.totalPages = action.payload.totalPages;
        state.products = action.payload.Products;
        state.category = action.payload.name;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        toast.error(action.error.message);
      })
      .addCase(addProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addProduct.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
        toast.success("Product added successfully");
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        toast.error(action.error.message);
      })
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
        toast.success("Product deleted successfully");
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        toast.error(action.error.message);
      })
      .addCase(fetchAllProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        console.log(action.payload);
        state.products = action.payload;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        toast.error(action.error.message);
      })
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentProduct = action.payload;
        state.error = null;
        state.currentPage = 0;
        state.totalPages = 0;
        state.products = [];
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.currentProduct = null;
        toast.error(action.error.message);
      });
  },
});

export default productsSlice.reducer;
export const { reset } = productsSlice.actions;
