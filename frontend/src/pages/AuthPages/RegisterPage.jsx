import RegisterForm from "../../components/Auth/RegisterForm";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { register } from "../../features/auth/authSlice";
import { isLoggedIn } from "../../services/authService";

const RegisterPage = () => {
  const authState = useSelector((state) => state.auth);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) {
      navigate("/", { replace: true });
    }
  }, []);

  const signup = async (data) => {
    await dispatch(register(data));
    isLoggedIn() && navigate("/", { replace: true });
  };

  return (
    <>
      <RegisterForm signup={signup} />
    </>
  );
};

export default RegisterPage;
