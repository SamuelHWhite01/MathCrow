import { useMemo } from "react";
import { useAuth } from "../context/AuthContext";
import {saveData } from "../utils/firebase";
import { useUserDataContext } from "../context/UserDataContext";

function SaveButton(){
    const { user } = useAuth();
    const isLoggedIn = useMemo(() => user != null, [user]);
    const {userData} = useUserDataContext();
    const handleSave = async () => {
      saveData(user, userData)
    };
  return (
    <button onClick={handleSave} className={`p-2 bg-blue-600 text-white rounded ${isLoggedIn ? '' : 'hidden'}`}>
        Save
    </button>
  );
};

export default SaveButton;
