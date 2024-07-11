// css imports
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import "bootstrap/dist/js/bootstrap.min.js";

// library imports
import { Route, Routes, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

// pages imports
import HomePage from "./pages/PublicPages/HomePage";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import RegisterPage from "./pages/AuthPages/RegisterPage";
import LoginPage from "./pages/AuthPages/LoginPage";
import ProductsPage from "./pages/PublicPages/ProductsPage";
import ProductDetail from "./pages/PublicPages/ProductDetail";
import SearchPage from "./pages/PublicPages/SearchPage";
import AdminDashboard from "./pages/AdminPages/AdminDashboard";
import ManageCategories from "./pages/AdminPages/ManageCategories";
import ManageProducts from "./pages/AdminPages/ManageProducts";
import AddProduct from "./pages/AdminPages/AddProduct";
import CartPage from "./pages/UserPages/CartPage";
import OrderPage from "./pages/UserPages/OrderPage";
import OrderDetailPage from "./pages/UserPages/OrderDetailPage";
import PlaceOrder from "./pages/UserPages/PlaceOrder";
import Address from "./pages/UserPages/Address";

function App() {
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="dark"
      />
      <Navbar />
      <Routes>
        <Route exact path="/" element={<HomePage />}></Route>

        <Route exact path="/auth">
          <Route path="*" element={<Navigate to="login" replace />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="login" element={<LoginPage />} />
        </Route>

        <Route
          exact
          path="/categories/:category_id/products/"
          element={<ProductsPage />}
        ></Route>

        <Route exact path="/products/:product_id" element={<ProductDetail />} />

        <Route exact path="/admin">
          <Route path="" element={<AdminDashboard />}></Route>
          <Route path="dashboard" element={<AdminDashboard />}></Route>
          <Route path="manage-categories" element={<ManageCategories />} />
          <Route path="manage-products" element={<ManageProducts />} />
          <Route path="add-product" element={<AddProduct />} />
          <Route path="*" element={<AdminDashboard />}></Route>
        </Route>

        <Route exact path="/user">
          <Route path="cart" element={<CartPage />}></Route>
          <Route path="orders">
            <Route path="" element={<OrderPage />}></Route>
            <Route path=":order_id" element={<OrderDetailPage />}></Route>
          </Route>
          <Route path="place-order" element={<PlaceOrder />}></Route>
          <Route path="addresses" element={<Address />}></Route>
        </Route>

        <Route exact path="/products/search" element={<SearchPage />}></Route>
        <Route exact path="/*" element={<Navigate to="/" replace />}></Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
