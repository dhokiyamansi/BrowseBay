import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { userGuard } from "../../services/authService";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import {
  createCart,
  fetchCart,
  setQuantity,
  updateCart,
  updateQuantity,
  deleteProduct,
} from "../../features/cart/cartSlice";

function CartPage() {
  const [totalAmount, setTotalAmount] = useState(0);

  const navigate = useNavigate();

  const cartState = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  const fetch = async () => {
    await dispatch(
      fetchCart({
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
    );
  };

  // fetch cart state on component mount
  useEffect(() => {
    if (!userGuard()) {
      navigate("/auth/login", { replace: true });
    }

    fetch();
  }, []);

  // set total amount
  useEffect(() => {
    setTotalAmount(
      cartState.cart.Products.reduce((acc, curr) => {
        return (
          acc + parseFloat(curr.price) * parseFloat(curr.Cart_detail.quantity)
        );
      }, 0)
    );
  }, [cartState]);

  console.log(cartState);

  const plusQuantity = async (product_id) => {
    // increment product quantity
    for (const product of cartState.cart.Products) {
      if (product.product_id === product_id) {
        let quantity = product.Cart_detail.quantity + 1;
        setTotalAmount(totalAmount + parseFloat(product.price));
        await dispatch(
          updateQuantity({
            data: {
              cart_id: cartState.cart.cart_id,
              product_id: product.product_id,
              quantity,
            },
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          })
        );
      }
    }
    fetch();
  };

  const minusQuantity = async (product_id) => {
    // decrement product quantity
    for (const product of cartState.cart.Products) {
      if (product.product_id === product_id) {
        let quantity = product.Cart_detail.quantity - 1;

        setTotalAmount(totalAmount + parseFloat(product.price));

        console.log(product.Cart_detail.quantity - 1);

        if (product.Cart_detail.quantity - 1 === 0) {
          await dispatch(
            deleteProduct({
              data: {
                cart_id: cartState.cart.cart_id,
                product_id: product.product_id,
                quantity,
              },
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
            })
          );
          fetch();
          return;
        }

        await dispatch(
          updateQuantity({
            data: {
              cart_id: cartState.cart.cart_id,
              product_id: product.product_id,
              quantity,
            },
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          })
        );
      }
    }
    fetch();
  };

  const checkOut = () => {
    // checkout functionality
    navigate("../place-order");
  };

  return (
    <div className="container my-5">
      <h2>Cart</h2>

      <div className="table-responsive mt-4">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col">Item</th>
              <th scope="col">Price</th>
              <th scope="col">Quantity</th>
              <th scope="col">Total</th>
            </tr>
          </thead>
          <tbody>
            {cartState.cart.Products.map((product) => (
              <tr key={product.product_id}>
                <td>
                  <h3>{product.name}</h3>
                  <span className="warning"></span>
                </td>
                <td>
                  <h4>Rs.{product.price}</h4>
                </td>
                <td>
                  <div className="d-flex justify-content-center align-items-center">
                    <button
                      className=" quantity-btn me-2"
                      onClick={() => plusQuantity(product.product_id)}
                    >
                      <i className="fa-solid fa-plus"></i>
                    </button>
                    <h4>{product.Cart_detail.quantity}</h4>
                    <button
                      className=" quantity-btn ms-2"
                      onClick={() => minusQuantity(product.product_id)}
                    >
                      <i className="fa-solid fa-minus"></i>
                    </button>
                  </div>
                </td>
                <td>
                  <h4>
                    Rs.{" "}
                    {parseFloat(product.price) * product.Cart_detail.quantity}
                  </h4>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {cartState.loading && (
          <div className="d-flex justify-content-center align-items-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}

        {/* {cartState.error && (
          <div className="d-flex justify-content-center align-items-center">
            <div className="alert alert-danger" role="alert">
              {cartState.error}
            </div>
          </div>
        )} */}
      </div>

      <div className="row justify-content-end mt-4">
        <div className="col-lg-4 col-md-6">
          <div className="card">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <span className="fw-bold">Total Amount:</span>
                <span id="grand-total">Rs. {totalAmount}</span>
              </div>
              <div className="d-grid mt-4">
                <button
                  className="btn my-btn btn-primary"
                  disabled={cartState.cart.Products.length === 0}
                  id="checkout-btn"
                  onClick={checkOut}
                >
                  Check out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
