import jwtDecode from "jwt-decode";

export const isLoggedIn = () => {
  const token = localStorage.getItem("token");

  if (!token) return false;

  try {
    const decoded = jwtDecode(token);
    return true;
  } catch (error) {
    return false;
  }
};

export const isAdmin = () => {
  const token = localStorage.getItem("token");

  if (!token) return false;

  try {
    const decoded = jwtDecode(token);
    return decoded.is_admin;
  } catch (error) {
    return false;
  }
};

export const userGuard = () => {
  return isLoggedIn() && !isAdmin();
};
