import React, { useEffect } from "react";
import AddAddressForm from "../../components/Order/AddAddressForm";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userGuard } from "../../services/authService";
import { addAddress } from "../../features/address/addressSlice";

const Address = () => {
  const addressState = useSelector((state) => state.address);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    if (!userGuard()) {
      navigate("/auth/login", { replace: true });
    }
  }, []);

  const onAddAddressSubmit = (data) => {
    dispatch(
      addAddress({
        data,
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
    );

    navigate("../place-order");
  };
  return (
    <>
      {addressState.loading && (
        <div className="d-flex justify-content-center align-items-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      <AddAddressForm onAddAddressSubmit={onAddAddressSubmit} />
    </>
  );
};

export default Address;
