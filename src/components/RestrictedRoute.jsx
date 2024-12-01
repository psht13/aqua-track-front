import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectAuthIsLoggedIn } from "../redux/selectors";

const RestrictedRoute = ({ component }) => {
  const isLoggedIn = useSelector(selectAuthIsLoggedIn);

  return !isLoggedIn ? component : <Navigate to="/tracker" replace />;
};

export default RestrictedRoute;