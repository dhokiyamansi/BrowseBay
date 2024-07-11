import { useDispatch, useSelector } from "react-redux";
import PlaceOrderForm from "../../components/Order/PlaceOrderForm";
import { useNavigate } from "react-router-dom";
import {
  fetchAllAddress,
  addAddress,
} from "../../features/address/addressSlice";
import { fetchPaymentMethods } from "../../features/payment-method/paymentMethodSlice";
import { useEffect } from "react";
import { createOrder } from "../../features/orders/orderSlice";
import { userGuard } from "../../services/authService";

const AddressPaymentSelection = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const addressState = useSelector((state) => state.address);

  const paymentMethodState = useSelector((state) => state.paymentMethod);

  useEffect(() => {
    if (!userGuard()) {
      navigate("/auth/login", { replace: true });
    }

    dispatch(
      fetchAllAddress({
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
    );
    dispatch(fetchPaymentMethods());
  }, []);

  // const saveAddress = (data) => {
  //   dispatch(
  //     addAddress({
  //       data,
  //       headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  //     })
  //   );
  //   dispatch(
  //     fetchAllAddress({
  //       headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  //     })
  //   );
  // };

  const placeOrder = async (values, action) => {
    console.log(values);
    const data = {
      addressId: values.shippingAddress,
      paymentMethodId: values.paymentMethod,
    };
    await dispatch(
      createOrder({
        data,
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
    );
    action.resetForm();
    navigate("/user/orders", { replace: true });
  };

  return (
    <>
      <div className="container">
        <PlaceOrderForm
          addresses={addressState.addresses}
          paymentMethods={paymentMethodState.paymentMethods}
          onSubmit={placeOrder}
        />
      </div>
    </>
  );
};

export default AddressPaymentSelection;
