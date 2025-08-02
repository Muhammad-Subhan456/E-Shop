import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ isAuthenticated, children }) => {
  const navigate = useNavigate();

  if (!isAuthenticated) {
    navigate("/login", { replace: true });
    return;
  }
  return children;
};

export default ProtectedRoute;
