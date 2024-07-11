import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { requestHandler } from "../../services/requestHandler";
import { createOrder } from "../orders/orderSlice";
import { toast } from "react-toastify";

const initialState = {
  cart: {
    cart_id: "",
    Products: [],
  },
  loading: false,
  error: null,
};

// fetch cart
export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async ({ headers }) => {
    const config = {
      url: "carts",
      headers,
    };
    const response = await requestHandler(config);
    return response;
  }
);

// create a cart and add a product to it
export const createCart = createAsyncThunk(
  "cart/createCart",
  async ({ data, headers }) => {
    const config = {
      method: "POST",
      url: "carts",
      data,
      headers,
    };

    const response = await requestHandler(config);
    return response;
  }
);

// update quantity of a product in cart
export const updateQuantity = createAsyncThunk(
  "cart/updateQuantity",
  async ({ data, headers }) => {
    console.log(data, headers);
    const { cart_id, product_id, quantity } = data;

    data = { quantity };

    const config = {
      method: "PUT",
      url: `carts/${cart_id}/products/${product_id}`,
      data,
      headers,
    };

    console.log("UPDATED QUANTITY: INSIDE THUNK");

    const response = await requestHandler(config);
    return response;
  }
);

// delete a product from cart
export const deleteProduct = createAsyncThunk(
  "cart/deleteProduct",
  async ({ data, headers }) => {
    console.log(data, headers);
    const { cart_id, product_id, quantity } = data;

    data = { quantity };

    const config = {
      method: "DELETE",
      url: `carts/${cart_id}/products/${product_id}`,
      data,
      headers,
    };

    const response = await requestHandler(config);
    return response;
  }
);

// add product to cart
export const updateCart = createAsyncThunk(
  "cart/updateCart",
  async ({ data, headers }) => {
    const { cart_id, product_id, quantity } = data;
    data = { productId: product_id, quantity };
    const config = {
      method: "POST",
      url: `carts/${cart_id}/products/`,
      data,
      headers,
    };
    const response = await requestHandler(config);
    return response;
  }
);

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ data, headers }) => {
    const { product_id, quantity } = data;

    // check if cart exist
    const res = await requestHandler({ url: "carts", headers });

    if (res.length === 0) {
      // means that user has no carts, so create one
      await requestHandler({
        method: "POST",
        url: "carts",
        data: {
          products: [
            {
              productId: product_id,
              quantity,
            },
          ],
        },
        headers,
      });
    } else {
      console.log(res[0]);
      const cart_id = res[0].cart_id;
      // means user has cart
      // check if product already exist in cart
      let p = res[0].Products.find((pr) => pr.product_id === product_id);
      console.log(p);

      // if it does just update its quantity
      if (p) {
        console.log("updated quantity");
        await requestHandler({
          method: "PUT",
          url: `carts/${cart_id}/products/${product_id}`,
          data: { quantity: quantity + p.Cart_detail.quantity },
          headers,
        });
        // else add that product to cart
      } else {
        console.log("adding product to cart");
        await requestHandler({
          method: "POST",
          url: `carts/${cart_id}/products/`,
          data: { productId: product_id, quantity },
          headers,
        });
      }
    }
  }
);

const cartSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        if (action.payload.length !== 0) state.cart = action.payload[0];
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCart.fulfilled, (state, action) => {
        state.cart = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(createCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateQuantity.pending, (state) => {
        console.log("UPDATE QUANTITY: PENDING");
        state.loading = true;
        state.error = null;
      })
      .addCase(updateQuantity.fulfilled, (state, action) => {
        // state.cart = action.payload;
        console.log("UPDATE QUANTITY: FULLFILLED");
        state.loading = false;
        state.error = null;

        const product_id = action.payload.cartDetail.product_id;
        const quantity = action.payload.cartDetail.quantity;

        state.cart.Products.forEach((product) => {
          if (product.product_id === product_id) {
            product.Cart_detail.quantity = quantity;
          }
        });

        toast.success(action.payload.success);
      })
      .addCase(updateQuantity.rejected, (state, action) => {
        console.log("UPDATE QUANTITY: REJECTED");
        state.loading = false;
        state.error = action.error.message;
        console.log(action.payload);
        toast.error("Not enough stock");
      })
      .addCase(updateCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCart.fulfilled, (state, action) => {
        state.cart = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(updateCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        toast.success("Product deleted from cart successfully");
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        toast.success("Product added to cart successfully");
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        console.log("create order in cart");
        // state.cart = initialState.cart;
        state.cart.Products = [];
        state.cart.cart_id = "";
        state.loading = false;
        state.error = null;
        toast.success(action.payload.success);
        console.log(state.cart);
      });
  },
});

export default cartSlice.reducer;
export const { setQuantity } = cartSlice.actions;

// const cartSlice = createSlice({
//   name: "products",
//   initialState,
//   reducers: {
//     reset: (state) => {
//       state.products = [];
//       state.currentPage = 0;
//       state.error = null;
//       state.loading = false;
//     },
//   },
//   extraReducers: (builder) => {},
// });

// export default cartSlice.reducer;
