import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const SellerProtectedRoute = ({ children }) => {
    const {isLoading, isSeller,seller } = useSelector((state)=>state.seller) 
  const navigate = useNavigate();

 if(isLoading === false){
   if (!isSeller) {
    navigate(`/`, { replace: true });
    return;
  }
  return children;
 }
};

export default SellerProtectedRoute;
