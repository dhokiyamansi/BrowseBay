import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { logout } from "../../features/auth/authSlice";
import { toast } from "react-toastify";

function Navbar() {
  const [token, setToken] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const authState = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    try {
      const decoded = jwtDecode(localStorage.getItem("token"));
      setToken(localStorage.getItem("token"));
      setIsAdmin(decoded.is_admin);
      console.log("state variables: ", isAdmin, token);
    } catch (error) {
      setToken(null);
      setIsAdmin(false);
    }
  }, [authState]);

  useEffect(() => {
    try {
      const decoded = jwtDecode(localStorage.getItem("token"));
      setToken(localStorage.getItem("token"));
      setIsAdmin(decoded.is_admin);
    } catch (error) {
      setToken(null);
      setIsAdmin(false);
    }
  }, []);

  const logOut = async () => {
    await dispatch(
      logout({
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
    );
    setToken(null);
    navigate("/", { replace: true });
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-transparent border-bottom">
      <div className="container-md container-fluid">
        <Link className="navbar-brand" to="/">
          Browse<span>Bay</span>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-md-5">
            {isAdmin ? (
              <li className="nav-item d-flex align-items-center">
                <NavLink
                  className="nav-link"
                  aria-current="page"
                  to="/admin/dashboard"
                >
                  <i className="fa-solid fa-house me-1"></i>
                  DASHBOARD
                </NavLink>
              </li>
            ) : (
              <li className="nav-item d-flex align-items-center">
                <NavLink className="nav-link" aria-current="page" to="/">
                  <i className="fa-solid fa-house me-1"></i>
                  HOME
                </NavLink>
              </li>
            )}

            {!isAdmin && (
              <li className="nav-item d-flex align-items-center">
                <NavLink
                  className="nav-link"
                  aria-current="page"
                  to="/user/cart"
                >
                  <i className="fa-solid fa-cart-shopping me-1"></i>
                  CART
                </NavLink>
              </li>
            )}

            {isAdmin && (
              <li className="nav-item d-flex align-items-center">
                <NavLink
                  className="nav-link"
                  aria-current="page"
                  to="/admin/manage-categories"
                >
                  <i className="fa-solid fa-shapes me-1"></i>
                  MANAGE-CATEGORIES
                </NavLink>
              </li>
            )}

            {!isAdmin && (
              <li className="nav-item d-flex align-items-center">
                <NavLink
                  className="nav-link"
                  aria-current="page"
                  to="/user/orders"
                >
                  <i className="fa-solid fa-bag-shopping me-1"></i>
                  ORDERS
                </NavLink>
              </li>
            )}

            {isAdmin && (
              <li className="nav-item d-flex align-items-center">
                <NavLink
                  className="nav-link"
                  aria-current="page"
                  to="/admin/manage-products"
                >
                  <i className="fa-brands fa-product-hunt me-1"></i>
                  MANAGE-PRODUCTS
                </NavLink>
              </li>
            )}

            <li className="nav-item d-flex align-items-center">
              <NavLink
                className="nav-link"
                aria-current="page"
                to="/products/search"
              >
                <i className="fa-solid fa-magnifying-glass me-2"></i>
                SEARCH
              </NavLink>
            </li>
          </ul>

          <ul className="navbar-nav">
            {token ? (
              <li className="nav-item d-flex align-items-center">
                <Link className="nav-link" aria-current="page" onClick={logOut}>
                  <i className="fa-solid fa-right-to-bracket me-1"></i>
                  LOGOUT
                </Link>
              </li>
            ) : (
              <li className="nav-item d-flex align-items-center">
                <NavLink
                  className="nav-link"
                  aria-current="page"
                  to="/auth/login"
                >
                  <i className="fa-solid fa-right-to-bracket me-1"></i>
                  LOGIN
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
