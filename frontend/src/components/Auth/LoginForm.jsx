import { useFormik } from "formik";
import * as yup from "yup";
import Input from "../common/Input";
import { NavLink } from "react-router-dom";

const validationSchema = yup.object().shape({
  email: yup.string().email("Please enter a valid email").required("Required"),
  password: yup
    .string()
    .min(8, "Password should be at least 8 characters long")
    .required("Required"),
});

const LoginForm = ({ signin }) => {
  const onSubmit = (values, action) => {
    signin(values);
    action.resetForm();
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit,
  });

  return (
    <div className="container mt-5 authForm">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h3>Login</h3>
            </div>

            <div className="card-body d-flex flex-column">
              <form onSubmit={formik.handleSubmit}>
                <div className="form-group">
                  <label>Email*</label>
                  <Input type="email" name="email" formik={formik} />
                </div>

                <div className="form-group">
                  <label>Password*</label>
                  <Input type="password" name="password" formik={formik} />
                </div>

                <div>
                  <button
                    disabled={formik.isSubmitting}
                    type="submit"
                    className="my-btn mt-5"
                  >
                    LOGIN
                  </button>

                  <div className="mb-3 form-check">
                    <h5 style={{ fontSize: "16px" }}>
                      If not already a user,
                      <NavLink to="../register">Register Here.</NavLink>
                    </h5>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
