import { useSelector } from "react-redux";
import { useLocation, Navigate } from "react-router-dom";
import { loginRoute } from "../constants/routeConstants";
import { AppState } from "../redux/store";

 function RequireAuth({ children }: { children: JSX.Element }) {
  const auth = useSelector((state: AppState) => state.auth);
  const location = useLocation();
 
  if (!auth.isAuthenticated ) {
    return <Navigate to={loginRoute} state={{ from: location }} replace />;
  }

  return children;
}

export default RequireAuth
