import { useFormik } from "formik";
import * as yup from "yup";
import Input from "../common/Input";

const validationSchema = yup.object().shape({
  name: yup.string().required("Required"),
  email: yup.string().email("Please enter a valid email").required("Required"),
  phoneNumber: yup
    .string()
    .matches(/^\d+$/, "Enter digits only")
    .min(10, "Phone Number should be 10 digits long")
    .max(10, "Phone Number should be 10 digits long")
    .required("Required"),
  password: yup
    .string()
    .min(8, "Password should be at least 8 characters long")
    .required("Required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match ")
    .required("Required"),
});

function RegisterForm({ signup }) {
  const onSubmit = (values, action) => {
    console.log(values);
    signup(values);
    action.resetForm();
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit,
  });

  return (
    <>
      <div className="container mt-5 authForm">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-header">
                <h3>Register</h3>
              </div>

              <div className="card-body d-flex flex-column">
                <form onSubmit={formik.handleSubmit}>
                  <div className="form-group">
                    <label>Name*</label>
                    <Input type="text" name="name" formik={formik} />
                  </div>

                  <div className="form-group">
                    <label>Email*</label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />

                    {formik.touched.email && formik.errors.email && (
                      <span className="text-danger error">
                        {formik.errors.email}
                      </span>
                    )}
                  </div>

                  <div className="form-group">
                    <label>Phone Number*</label>
                    <input
                      type="text"
                      className="form-control"
                      name="phoneNumber"
                      value={formik.values.phoneNumber}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />

                    {(formik.touched.phoneNumber || formik.dirty) &&
                      formik.errors.phoneNumber && (
                        <span className="text-danger error">
                          {formik.errors.phoneNumber}
                        </span>
                      )}
                  </div>

                  <div className="form-group">
                    <label>Password*</label>
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />

                    {formik.touched.password && formik.errors.password && (
                      <span className="text-danger error">
                        {formik.errors.password}
                      </span>
                    )}
                  </div>

                  <div className="form-group">
                    <label>Confirm Password*</label>
                    <input
                      type="password"
                      className="form-control"
                      name="confirmPassword"
                      value={formik.values.confirmPassword}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />

                    {(formik.touched.confirmPassword || formik.dirty) &&
                      formik.errors.confirmPassword && (
                        <span className="text-danger error">
                          {formik.errors.confirmPassword}
                        </span>
                      )}
                  </div>

                  <div>
                    <button
                      disabled={formik.isSubmitting}
                      type="submit"
                      className="my-btn mt-5"
                    >
                      REGISTER
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default RegisterForm;
