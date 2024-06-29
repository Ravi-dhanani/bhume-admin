import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

// }
const PrivateRoute: React.FC<{ children?: any }> = ({ children }) => {
  const { isLogged } = useSelector((state: any) => state.common);
  if (!isLogged) return <Navigate to="/" replace />;
  return children;
};

export default PrivateRoute;
