import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

// }
const PublicRoute: React.FC<{ children: any }> = ({ children }) => {
  const { isLogged } = useSelector((state: any) => state.common);
  if (isLogged) return <Navigate to="/home" replace />;
  return children;
};

export default PublicRoute;
