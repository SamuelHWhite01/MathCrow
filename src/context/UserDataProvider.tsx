import { useEffect, useState } from 'react';
import { doc, getDoc} from 'firebase/firestore';
import { db, saveData } from 'utils/firebase';
import { useAuth } from 'context/AuthContext';
import { UserDataContext } from './UserDataContext';
import UserData from 'types/UserData';
import FireStoreUserData from 'types/FireStoreUserData';
import Role from 'types/Role';

export const UserDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth(); // 🔑 use AuthContext instead of onAuthStateChanged again
  const [userData, setUserData] = useState<UserData>(new UserData()); // default to blank slate
  const fetchUserData = async () => { // updates the user data context to match the firestore
    const freshUserData = new UserData(user?.displayName ?? "");
    setUserData(freshUserData);
    let userDataExist = false;
    if (!user) {
      //console.log("no user ...")
      return; // dont even check the database if the user is not logged in
    }

    const docRef = doc(db, 'users', user.uid); // this is where the user's data should be stored
    try {
      //console.log("checking data for", user)
      const docSnap = await getDoc(docRef); // check to see if there is information here
      if (docSnap.exists()) {
        userDataExist = true
        //console.log("user exist in database...")
        const fireStoreData : FireStoreUserData = docSnap.data() as FireStoreUserData // load the information first as a flattened version of itself (for storage)
        setUserData(UserData.fromFireStore(fireStoreData)); // convert flat data into regular shape adn then set context data to that
        //console.log("successfully fetched data",UserData.fromFireStore(fireStoreData) )
      }
    } catch (error) { // in the case that there wasnt infomation for the user
      console.error("Failed to fetch user data:", error);
    }
    if(!userDataExist){ // if the data couldnt be fetched, make a new default
      // LoginSelector stashes the role the user picked before redirecting to Google sign-in,
      // since the account (and its Firestore doc) doesn't exist until right now.
      const pendingRole = sessionStorage.getItem('pendingRole') as Role | null;
      if (pendingRole) {
        freshUserData.setRole(pendingRole);
        setUserData(freshUserData);
      }
      sessionStorage.removeItem('pendingRole');
      saveData(user, freshUserData)
    }
  };
  useEffect(() => {
    fetchUserData(); 
  }, [user?.uid]); 

  return (
    <UserDataContext.Provider value={{userData, setUserData}}>
      {children}
    </UserDataContext.Provider>
  );
};
