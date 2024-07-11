import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { requestHandler } from "../../services/requestHandler";
import { toast } from "react-toastify";

const initialState = {
  addresses: [],
  loading: false,
  error: null,
};

export const fetchAllAddress = createAsyncThunk(
  "address/fetchAllAddress",
  async ({ headers }) => {
    const config = {
      url: "addresses",
      headers,
    };
    const response = await requestHandler(config);
    return response;
  }
);

export const addAddress = createAsyncThunk(
  "address/addAddress",
  async ({ data, headers }) => {
    const config = {
      method: "POST",
      url: "addresses",
      data,
      headers,
    };
    const response = await requestHandler(config);
    return response;
  }
);

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.addresses = action.payload;
      })
      .addCase(fetchAllAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.addresses.push(action.payload);
        toast.success("Addresses added successfully");
      })
      .addCase(addAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default addressSlice.reducer;
