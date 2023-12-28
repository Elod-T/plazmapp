import { Navigate, Outlet } from "react-router-dom";

export const useAuth = () => {
  try {
    const state = localStorage.getItem("state");

    const user = { loggedIn: JSON.parse(state!).access_token };

    return user?.loggedIn;
  } catch {
    return false;
  }
};

const ProtectedRoute = () => {
  const loggedIn = useAuth();

  return loggedIn ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;
