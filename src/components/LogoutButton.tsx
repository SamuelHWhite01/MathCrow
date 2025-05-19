import { useMemo } from "react";
import { useAuth } from "../context/AuthContext";

const LogoutButton = () => {
    const { logout,user } = useAuth();
    const isLoggedIn = useMemo(() => user != null, [user]);
  return (
    <button onClick={logout} className={`p-2 bg-blue-600 text-white rounded ${isLoggedIn ? '' : 'hidden'}`}>
        Log out
    </button>
  );
};

export default LogoutButton;
