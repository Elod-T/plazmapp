import { Navigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import { useAuth } from "../protectedRoute";

const LoginPage = () => {
  const loggedIn = useAuth();

  if (loggedIn) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
