import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectAuthIsLoggedIn } from "../redux/selectors";

const PrivateRoute = ({ component }) => {
  const isLoggedIn = useSelector(selectAuthIsLoggedIn);

  return isLoggedIn ? component : <Navigate to="/signin" replace />;
};

export default PrivateRoute;