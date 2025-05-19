import { useMemo } from "react";
import { useAuth } from "../context/AuthContext";

const LoginButton = () => {
    const { loginWithGoogle,user } = useAuth();
    const isLoggedIn = useMemo(() => user != null, [user]);
  return (
    <button  disabled ={isLoggedIn} onClick={loginWithGoogle} className="p-2 bg-blue-600 text-white rounded">
        {isLoggedIn ? `Welcome ${user?.displayName}`  : "Login With Google"}
    </button>
  );
};

export default LoginButton;
