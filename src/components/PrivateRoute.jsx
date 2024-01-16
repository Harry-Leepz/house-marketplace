import { Navigate, Outlet } from "react-router-dom";

import { Loading } from "./Loading";
import { useAuthStatus } from "../hooks/useAuthStatus";

export const PrivateRoute = () => {
  const { loading, loggedIn } = useAuthStatus();

  if (loading) {
    return <Loading />;
  }

  return loggedIn ? <Outlet /> : <Navigate to='/sign-in' />;
};
