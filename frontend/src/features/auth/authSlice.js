// hanldes login and register
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { requestHandler } from "../../services/requestHandler";
import jwt_decode from "jwt-decode";
import { isAdmin } from "../../services/authService";
import { toast } from "react-toastify";

export const login = createAsyncThunk("auth/login", async (credentials) => {
  const config = {
    method: "POST",
    url: "users/login",
    data: credentials,
  };
  const response = await requestHandler(config);
  return response;
});

export const logout = createAsyncThunk("auth/logout", async ({ headers }) => {
  const config = {
    method: "POST",
    url: "users/logout",
    headers,
  };

  const response = await requestHandler(config);
  return response;
});

export const register = createAsyncThunk("auth/register", async (data) => {
  const config = {
    method: "POST",
    url: "users/register",
    data,
  };

  const response = await requestHandler(config);

  return response;
});

const initialState = {
  token: localStorage.getItem("token") || null,
  isAuthenticated: false,
  loading: false,
  error: null,
  isAdmin: isAdmin(),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        try {
          const jwtPayload = jwt_decode(action.payload.token);
          state.token = action.payload.token;
          localStorage.setItem("token", state.token);
          state.isAdmin = jwtPayload.is_admin;
          state.isAuthenticated = true;
          console.log("1");
          toast.success("Logged In Successfully");
        } catch (error) {
          state.isAdmin = state.isAuthenticated = false;
          state.error = error.message;
        }
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        toast.error("Invalid Credentials");
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        try {
          const jwtPayload = jwt_decode(action.payload.token);
          state.token = action.payload.token;
          localStorage.setItem("token", state.token);
          state.isAdmin = jwtPayload.is_admin;
          state.isAuthenticated = true;
          state.error = null;
          toast.success("Registered Successfully");
        } catch (error) {
          state.isAdmin = state.isAuthenticated = false;
          state.error = error.message;
        }
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        console.log(action);
        toast.error(action.payload.error);
      })
      .addCase(logout.pending, (state) => {
        state.loading = true;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.token = null;
        localStorage.removeItem("token");
        toast.success(action.payload.message);
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default authSlice.reducer;
