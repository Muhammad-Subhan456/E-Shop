import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const ProtectedAdminRoute = ({ children }) => {
    const navigate = useNavigate();
  const { loading, isAuthenticated,user } = useSelector((state) => state.user);
  if (loading === false) {
    if (!isAuthenticated) {
       navigate("/login", { replace: true });
       return;
    } else if(user.role !== "Admin"){
         navigate("/", { replace: true });
         return;
    }
    return children;
  }
};

export default ProtectedAdminRoute;