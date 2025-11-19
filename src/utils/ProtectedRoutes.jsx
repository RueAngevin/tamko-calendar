import { useAuth } from "../context/AuthContext";
import { Outlet, Navigate } from "react-router-dom";

function ProtectedRoutes() {
  const { user } = useAuth();

  return user ? <Outlet/> : <Navigate to="/"/>
}

export default ProtectedRoutes;
