import { useEffect } from "react";
import LoginForm from "../../components/Auth/LoginForm";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../features/auth/authSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { isLoggedIn } from "../../services/authService";

const LoginPage = () => {
  const authState = useSelector((state) => state.auth);

  const navigate = useNavigate();

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) {
      navigate("/", { replace: true });
    }
  }, []);

  const dispatch = useDispatch();

  const signin = async (data) => {
    await dispatch(login(data));
    isLoggedIn() && navigate("/", { replace: true });
  };

  return (
    <>
      {authState.loading && (
        <div className="d-flex justify-content-center align-items-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}

      {/* {authState.error && (
        <div className="d-flex justify-content-center align-items-center">
          <div className="alert alert-danger" role="alert">
            {"Invalid credentials!"}
          </div>
        </div>
      )} */}
      <LoginForm signin={signin} />
    </>
  );
};

export default LoginPage;
