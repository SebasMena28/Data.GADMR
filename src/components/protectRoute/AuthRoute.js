import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../context/supaContex";

export const AuthRoute = ({children}) => {
  const { user } = useAuth();
  const location = useLocation();


  if (!user) return <Navigate to="/login" />;

  return <>{children}</>;


}