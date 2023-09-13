import { Navigate, Outlet } from "react-router-dom";

function PrivateRoute(props) {
  const auth = props.auth;
  const token = props.token;
  return auth && token ? <Outlet /> : <Navigate to="login" />;
}

export default PrivateRoute;
