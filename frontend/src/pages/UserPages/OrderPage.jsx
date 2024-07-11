import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { userGuard } from "../../services/authService";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllOrders } from "../../features/orders/orderSlice";

const OrderPage = () => {
  const navigate = useNavigate();

  const orderState = useSelector((state) => state.order);

  const dispatch = useDispatch();

  const fetch = async () => {
    await dispatch(
      fetchAllOrders({
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
    );
  };

  useEffect(() => {
    if (!userGuard()) {
      navigate("/auth/login", { replace: true });
    }
    fetch();
  }, []);

  console.log(orderState);

  return (
    <>
      <div className="d-flex justify-content-center align-items-center">
        <div className="container m-5">
          {orderState.loading && (
            <div className="d-flex justify-content-center align-items-center">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )}

          {orderState.error && (
            <div className="d-flex justify-content-center align-items-center">
              <div className="alert alert-danger" role="alert">
                {orderState.error}
              </div>
            </div>
          )}
          <h3>Your Orders</h3>

          {!orderState.error && !orderState.loading && (
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th scope="col">Date</th>
                  <th scope="col">Total</th>
                  <th scope="col">#</th>
                </tr>
              </thead>
              <tbody>
                {orderState.orders.map((order) => {
                  return (
                    <tr key={order.order_id}>
                      <td>
                        {new Date(order.created_at).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </td>
                      <td>Rs. {order.total_amount}</td>
                      <td>
                        <button
                          className="btn btn-primary"
                          onClick={() => {
                            navigate(order.order_id);
                          }}
                        >
                          Details
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default OrderPage;
