import { Navigate, Outlet } from "react-router-dom";

import { useAuthStatus } from "../hooks/useAuthStatus";

export const PrivateRoute = () => {
  const { loading, loggedIn } = useAuthStatus();

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return loggedIn ? <Outlet /> : <Navigate to='/sign-in' />;
};
