import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { isAdmin } from "../../services/authService";
import {
  fetchAllProducts,
  deleteProduct,
  reset,
} from "../../features/products/productSlice";

const ManageProducts = () => {
  const location = useLocation();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const productState = useSelector((state) => state.products);

  const fetch = async () => {};

  useEffect(() => {
    if (!isAdmin()) navigate("/", { replace: true });

    dispatch(
      fetchAllProducts({
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
    );
  }, []);

  const removeProduct = async (product) => {
    await dispatch(
      deleteProduct({
        product_id: product.product_id,
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
    );

    dispatch(reset());

    dispatch(
      fetchAllProducts({
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
    );
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h3 className="mt-4 mb-4">Manage Products</h3>
            <div className="table-responsive">
              <table className="table table-striped table-hover">
                <thead>
                  <tr>
                    <th>Product Name</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {productState.products.map((product) => (
                    <tr key={product.product_id}>
                      <td>{product.name}</td>
                      <td>{product.price}</td>
                      <td>{product.stock}</td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-sm btn-danger"
                          onClick={() => {
                            removeProduct(product);
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}

                  <tr>
                    <td colSpan="4">
                      <button
                        className="btn btn-primary"
                        onClick={() => {
                          navigate("/admin/add-product");
                        }}
                      >
                        ADD PRODUCT
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
              {productState.loading && (
                <div className="d-flex justify-content-center align-items-center">
                  <div
                    className="spinner-border"
                    role="status"
                    style={{ position: "absolute", zIndex: 1 }}
                  >
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageProducts;
