import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useUserDataContext } from "@/context/UserDataContext";

interface ProtectedRouteProps {
  requireTeacher?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  requireTeacher
}) => {

  const { userData } = useUserDataContext();
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  if (requireTeacher && !userData.isTeacher) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
