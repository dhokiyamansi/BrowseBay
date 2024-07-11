import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import categoryReducer from "../features/categories/categorySlice";
import productReducer from "../features/products/productSlice";
import searchReducer from "../features/search/searchSlice";
import cartReducer from "../features/cart/cartSlice";
import addressReducer from "../features/address/addressSlice";
import orderReducer from "../features/orders/orderSlice";
import paymentMethodReducer from "../features/payment-method/paymentMethodSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    categories: categoryReducer,
    products: productReducer,
    search: searchReducer,
    cart: cartReducer,
    address: addressReducer,
    order: orderReducer,
    paymentMethod: paymentMethodReducer,
  },
});

export default store;
