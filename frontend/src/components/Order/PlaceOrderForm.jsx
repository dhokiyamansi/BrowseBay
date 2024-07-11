import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

const validationSchema = Yup.object().shape({
  shippingAddress: Yup.string().required("Please select a shipping address"),
  paymentMethod: Yup.string().required("Please select a payment method"),
});

const PlaceOrderForm = ({ addresses, paymentMethods, onSubmit }) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card">
              <div className="card-header">
                <h3>Place Order</h3>
              </div>
              <div className="card-body">
                <Formik
                  initialValues={{
                    shippingAddress: "",
                    paymentMethod: "",
                  }}
                  validationSchema={validationSchema}
                  onSubmit={onSubmit}
                >
                  {({ errors, touched }) => (
                    <Form>
                      <div className="form-group">
                        <label htmlFor="shippingAddress">
                          Shipping Address
                        </label>
                        <Field
                          name="shippingAddress"
                          as="select"
                          className={`form-control mb-1 ${
                            errors.shippingAddress && touched.shippingAddress
                              ? "is-invalid"
                              : ""
                          }`}
                        >
                          <option value="" disabled>
                            Select Address
                          </option>
                          {addresses.map((address) => (
                            <option
                              key={address.address_id}
                              value={address.address_id}
                            >
                              {address.address_line1} - {address.address_line2}{" "}
                              {address.city}, {address.state} {address.zip_code}
                              , {address.country}
                            </option>
                          ))}
                        </Field>
                        {errors.shippingAddress && touched.shippingAddress && (
                          <div className="invalid-feedback">
                            {errors.shippingAddress}
                          </div>
                        )}
                        <button
                          type="button"
                          className="btn btn-primary mt-2"
                          onClick={() => {
                            navigate("../addresses");
                          }}
                        >
                          Add New Address
                        </button>
                      </div>
                      <div className="form-group">
                        <label htmlFor="paymentMethod">Payment Method</label>
                        <Field
                          name="paymentMethod"
                          as="select"
                          className={`form-control ${
                            errors.paymentMethod && touched.paymentMethod
                              ? "is-invalid"
                              : ""
                          }`}
                        >
                          <option value="" disabled>
                            Select Payment method
                          </option>
                          {paymentMethods.map((method) => (
                            <option
                              key={method.payment_method_id}
                              value={method.payment_method_id}
                            >
                              {method.name}
                            </option>
                          ))}
                        </Field>
                        {errors.paymentMethod && touched.paymentMethod && (
                          <div className="invalid-feedback">
                            {errors.paymentMethod}
                          </div>
                        )}
                      </div>
                      <button type="submit" className="btn btn-primary mt-2">
                        Place Order
                      </button>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PlaceOrderForm;
