import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const AddAddressForm = ({ onAddAddressSubmit }) => {
  const formik = useFormik({
    initialValues: {
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
    },
    validationSchema: Yup.object({
      addressLine1: Yup.string().required("Address Line 1 is required"),
      city: Yup.string().required("City is required"),
      state: Yup.string().required("State is required"),
      zipCode: Yup.string().required("Zip Code is required"),
      country: Yup.string().required("Country is required"),
    }),
    onSubmit: (values, { resetForm }) => {
      onAddAddressSubmit(values);
      resetForm();
    },
  });

  return (
    <>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card">
              <div className="card-header">
                <h3>Add New Address</h3>
              </div>
              <div className="card-body">
                <form onSubmit={formik.handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="address">Address Line 1*</label>
                    <input
                      type="text"
                      name="addressLine1"
                      value={formik.values.addressLine1}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="form-control"
                    />
                    {formik.touched.addressLine1 &&
                      formik.errors.addressLine1 && (
                        <div className="text-danger">
                          {formik.errors.addressLine1}
                        </div>
                      )}
                  </div>
                  <div className="form-group">
                    <label htmlFor="address">Address Line 2</label>
                    <input
                      type="text"
                      name="addressLine2"
                      value={formik.values.addressLine2}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="form-control"
                    />
                    {formik.touched.addressLine2 &&
                      formik.errors.addressLine2 && (
                        <div className="text-danger">
                          {formik.errors.addressLine2}
                        </div>
                      )}
                  </div>
                  <div className="form-group">
                    <label htmlFor="city">City*</label>
                    <input
                      type="text"
                      name="city"
                      value={formik.values.city}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="form-control"
                    />
                    {formik.touched.city && formik.errors.city && (
                      <div className="text-danger">{formik.errors.city}</div>
                    )}
                  </div>
                  <div className="form-group">
                    <label htmlFor="state">State*</label>
                    <input
                      type="text"
                      name="state"
                      value={formik.values.state}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="form-control"
                    />
                    {formik.touched.state && formik.errors.state && (
                      <div className="text-danger">{formik.errors.state}</div>
                    )}
                  </div>
                  <div className="form-group">
                    <label htmlFor="zipCode">Zip Code*</label>
                    <input
                      type="text"
                      name="zipCode"
                      value={formik.values.zipCode}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="form-control"
                    />
                    {formik.touched.zipCode && formik.errors.zipCode && (
                      <div className="text-danger">{formik.errors.zipCode}</div>
                    )}
                  </div>
                  <div className="form-group">
                    <label htmlFor="country">Country*</label>
                    <input
                      type="text"
                      name="country"
                      value={formik.values.country}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="form-control"
                    />
                    {formik.touched.country && formik.errors.country && (
                      <div className="text-danger">{formik.errors.country}</div>
                    )}
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Add Address
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddAddressForm;
