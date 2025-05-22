import { useMemo } from "react";
import { useAuth } from "../context/AuthContext";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../utils/firebase";
import { useUserDataContext } from "../context/UserDataContext";

const SaveButton = () => {
    const { user } = useAuth();
    const isLoggedIn = useMemo(() => user != null, [user]);
    const {userData} = useUserDataContext();
    const handleSave = async () => {
        if (!user) return; // safety check
        const docRef = doc(db, 'users', user.uid);

        try {
          await setDoc(docRef, userData?.toFireStore(), { merge: true });
          console.log("saved data...")
        } catch (error) {
          console.error("Error saving user data:", error);
          alert("Failed to save data.");
        }
    };
  return (
    <button onClick={handleSave} className={`p-2 bg-blue-600 text-white rounded ${isLoggedIn ? '' : 'hidden'}`}>
        Save
    </button>
  );
};

export default SaveButton;
