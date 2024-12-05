import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  selectAuthIsLoggedIn,
  selectAuthIsRefreshing,
} from "../redux/auth/selectors";
import Loader from "./Loader/Loader";

export default function PrivateRoute({ children }) {
  const isLoggedIn = useSelector(selectAuthIsLoggedIn);
  const isRefreshing = useSelector(selectAuthIsRefreshing);

  console.log("isLoggedIn:", isLoggedIn);
  console.log("isRefreshing:", isRefreshing);

  if (isRefreshing) {
    return <Loader/>;
  }
  return isLoggedIn ? children : <Navigate to="/signin" />;
}
