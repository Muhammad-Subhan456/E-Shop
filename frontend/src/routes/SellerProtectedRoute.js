import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Layout/Loader"
const SellerProtectedRoute = ({ children }) => {
    const {isLoading, isSeller,seller } = useSelector((state)=>state.seller) 
  const navigate = useNavigate();

 if(isLoading === true){
  //return <Loader/>
}
  else{

    if (!isSeller) {
      navigate(`/`, { replace: true });
      return;
    }
    return children;
  }
};

export default SellerProtectedRoute;
