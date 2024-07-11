// creates, deletes and fetched categories
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { requestHandler } from "../../services/requestHandler";
import { toast } from "react-toastify";

export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async (params) => {
    const response = await requestHandler({ url: "categories", params });
    return response;
  }
);

export const fetchAllCategories = createAsyncThunk(
  "categories/fetchAllCategories",
  async () => {
    const response = await requestHandler({ url: "categories/all" });
    return response;
  }
);

export const createCategory = createAsyncThunk(
  "categories/createCategory",
  async ({ data, headers }) => {
    const config = {
      method: "POST",
      url: "categories",
      data,
      headers,
    };
    const response = await requestHandler(config);
    return response;
  }
);

export const deleteCategory = createAsyncThunk(
  "categories/deleteCategory",
  async ({ category_id, headers }) => {
    const config = {
      method: "DELETE",
      url: `categories/${category_id}`,
      headers,
    };

    const response = await requestHandler(config);
    return response;
  }
);

const initialState = {
  loading: false,
  categories: [],
  error: null,
  currentPage: 0,
};

const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    reset: (state) => {
      console.log("reset category");
      state.categories = [];
      state.currentPage = 0;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.currentPage++;
        state.error = null;

        if (action.payload.length === 0) state.currentPage--;
        // console.log("STATE CAT ", state.categories);
        state.categories = state.categories.concat(action.payload);
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        toast.error(action.error.message);
      })
      .addCase(createCategory.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(createCategory.fulfilled, (state) => {
        state.error = null;
        state.loading = false;
        toast.success("Category created successfully");
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        toast.error(action.error.message);
      })
      .addCase(deleteCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCategory.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
        toast.success("Category deleted successfully");
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        toast.error(action.error.message);
      })
      .addCase(fetchAllCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.categories = state.categories.concat(action.payload);
      })
      .addCase(fetchAllCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        toast.error(action.error.message);
      });
  },
});

export default categorySlice.reducer;
export const { reset } = categorySlice.actions;
