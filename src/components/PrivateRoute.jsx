import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAuthIsLoggedIn, selectAuthIsRefreshing } from '../redux/selectors';

export default function PrivateRoute({ children }) {
  const isLoggedIn = useSelector(selectAuthIsLoggedIn);
  const isRefreshing = useSelector(selectAuthIsRefreshing);
  if (isRefreshing) {
    return <div>Loading...</div>;
  }
  return isLoggedIn ? children : <Navigate to="/signin" />;
}