import { Navigate } from "react-router-dom";
import { useUrl } from "../Context/urlContext";

function Protected({ children }) {
  const { isAuth } = useUrl();
  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
}

export default Protected;
