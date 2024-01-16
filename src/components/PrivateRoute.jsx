import { Navigate, Outlet } from "react-router-dom";

export const PrivateRoute = () => {
  const loggedIn = false;

  return loggedIn ? <Outlet /> : <Navigate to='/sign-in' />;
};
