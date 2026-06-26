import AuthContext from "./AuthContext";
import { useContext } from "react";
import { Navigate } from "react-router-dom";

function ProtectedWrapper(props) {
  const auth = useContext(AuthContext);
  const allowedRoles = props.roles || [];

  if (!auth.user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(auth.currentUser?.role)) {
    const fallbackPath = auth.isAdmin ? "/admin" : "/client";
    return <Navigate to={fallbackPath} replace />;
  }

  return props.children;
}
export default ProtectedWrapper;
