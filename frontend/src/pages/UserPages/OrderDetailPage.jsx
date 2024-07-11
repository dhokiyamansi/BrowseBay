import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { userGuard } from "../../services/authService";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrderById } from "../../features/orders/orderSlice";

const OrderDetailPage = () => {
  const navigate = useNavigate();

  const orderState = useSelector((state) => state.order);

  const dispatch = useDispatch();

  const { order_id } = useParams();

  useEffect(() => {
    if (!userGuard()) {
      navigate("/auth/login", { replace: true });
    }

    dispatch(
      fetchOrderById({
        order_id,
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
    );
  }, []);

  console.log(orderState);

  // return <></>;
  return (
    <>
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

      {!orderState.loading && !orderState.error && orderState.currentOrder && (
        <div className="container mt-5 ">
          <div className="card">
            <div className="card-header">
              <h3>Order Details</h3>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-6">
                  <h5>Order Date:</h5>
                  <p>
                    {new Date(
                      orderState.currentOrder.created_at
                    ).toLocaleTimeString() +
                      " " +
                      new Date(
                        orderState.currentOrder.created_at
                      ).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                  </p>
                </div>
                <div className="col-md-6">
                  <h5>Payment Method:</h5>
                  <p>{orderState.currentOrder.payment_method.name}</p>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-md-6">
                  <h5>Total Amount:</h5>
                  <p>Rs. {orderState.currentOrder.total_amount}</p>
                </div>
                <div className="col-md-6">
                  <h5>Shipping Address:</h5>
                  <p>
                    {orderState.currentOrder.Address.address_line1},{" "}
                    {orderState.currentOrder.Address.address_line2}
                  </p>
                  <p>
                    {orderState.currentOrder.Address.city},{" "}
                    {orderState.currentOrder.Address.state}{" "}
                    {orderState.currentOrder.Address.zip_code}
                  </p>
                  <p>{orderState.currentOrder.Address.country}</p>
                </div>
              </div>
              <hr />
              <h5>Order Items:</h5>
              <table className="table">
                <thead>
                  <tr>
                    <th>Product Name</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {orderState.currentOrder.Products.map((item) => (
                    <tr key={item.product_id}>
                      <td>{item.name}</td>
                      <td>{item.Order_detail.quantity}</td>
                      <td>Rs. {item.price}</td>
                      <td>Rs. {item.Order_detail.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderDetailPage;
