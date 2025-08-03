import { useNavigate } from "react-router-dom";

const SellerProtectedRoute = ({ isSeller, children }) => {
  const navigate = useNavigate();

  if (!isSeller) {
    navigate(`/`, { replace: true });
    return;
  }
  return children;
};

export default SellerProtectedRoute;
