import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  fetchProductById,
  deleteProduct,
} from "../../features/products/productSlice";
import {
  createCart,
  fetchCart,
  setQuantity,
  updateCart,
  updateQuantity,
  addToCart,
} from "../../features/cart/cartSlice";
import { isAdmin } from "../../services/authService";

const ProductDetail = () => {
  const { product_id } = useParams();

  const [quantity, setQuantity] = useState(1);

  const productsState = useSelector((state) => state.products);
  console.log(productsState);

  const cartState = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchProductById({ product_id }));

    dispatch(
      fetchCart({
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
    );
  }, []);

  const changeQuantity = (flag) => {
    if (flag) {
      if (productsState.currentProduct.stock < quantity + 1) {
        setQuantity(quantity);
        console.log(productsState.currentProduct.stock);
      } else setQuantity(quantity + 1);
    } else {
      if (quantity > 1) setQuantity(quantity - 1);
    }
  };

  const addProductToCart = async () => {
    await dispatch(
      addToCart({
        data: { product_id, quantity },
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
    );

    navigate("/user/cart");
  };

  const removeProduct = async () => {
    console.log("removing product");
    await dispatch(
      deleteProduct({
        product_id,
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
    );

    navigate("/admin/manage-products");
  };

  return (
    <>
      {productsState.loading && (
        <div className="d-flex justify-content-center align-items-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}

      {productsState.error && (
        <div className="d-flex justify-content-center align-items-center">
          <div className="alert alert-danger" role="alert">
            {productsState.error}
          </div>
        </div>
      )}

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
            {"Not Enough Quantity available in stock"}
          </div>
        </div>
      )} */}

      {!productsState.loading &&
        !productsState.error &&
        productsState.currentProduct && (
          <div className="product-detail container my-5">
            <div className="row">
              <div className="col-md-6">
                <img
                  src={`${import.meta.env.VITE_SERVER_ADDRESS}/api/products/photo/${product_id}`}
                  alt="Product Image"
                  className="img-fluid mb-3"
                />
              </div>
              <div className="col-md-6">
                <h1 className="mb-3">{productsState.currentProduct.name}</h1>
                <p className="lead mb-4">
                  {productsState.currentProduct.description}
                </p>
                <p className="h4 mb-4">
                  Rs.{productsState.currentProduct.price}
                </p>

                {!isAdmin() && (
                  <>
                    {" "}
                    <div className="row">
                      <label htmlFor="quantity">Quantity:</label>
                    </div>
                    <div className="row">
                      <div className="d-flex align-items-center">
                        <div>
                          <button
                            className="quantity-btn btn"
                            disabled={productsState.currentProduct.stock === 0}
                            onClick={(e) => {
                              e.preventDefault();
                              changeQuantity(true);
                            }}
                          >
                            <i className="fa-solid fa-plus"></i>
                          </button>
                        </div>

                        <div className="mx-2">{quantity}</div>

                        <div>
                          <button
                            className="quantity-btn btn"
                            disabled={productsState.currentProduct.stock === 0}
                            onClick={(e) => {
                              e.preventDefault();
                              changeQuantity(false);
                            }}
                          >
                            <i className="fa-solid fa-minus"></i>
                          </button>
                        </div>
                      </div>

                      {productsState.currentProduct.stock < 5 ? (
                        productsState.currentProduct.stock <= 0 ? (
                          <div className="text-danger">
                            Item out of the stock
                          </div>
                        ) : (
                          <div className="text-danger">
                            Only {productsState.currentProduct.stock} items
                            left!
                          </div>
                        )
                      ) : (
                        <div></div>
                      )}
                    </div>
                  </>
                )}

                {isAdmin() && (
                  <div className="row">
                    <h4>Stock: </h4>{" "}
                    <h5>{productsState.currentProduct.stock}</h5>
                  </div>
                )}

                <div className="col-md-8">
                  {!isAdmin() && (
                    <button
                      className="btn my-btn mt-4"
                      onClick={addProductToCart}
                      disabled={productsState.currentProduct.stock === 0}
                    >
                      <i className="fa-solid fa-cart-plus me-2"></i>Add to Cart
                    </button>
                  )}

                  {/* Delete product */}
                  {isAdmin() && (
                    <button className="btn my-btn mt-4" onClick={removeProduct}>
                      <i className="fa-solid fa-trash-can"></i>Delete
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
    </>
  );
};

export default ProductDetail;
