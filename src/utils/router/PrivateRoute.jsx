import { Navigate, Outlet } from "react-router-dom";

function PrivateRoute(props) {
  const auth = props.auth;

  return auth  ? <Outlet /> : <Navigate to="login" />;

}

export default PrivateRoute;
