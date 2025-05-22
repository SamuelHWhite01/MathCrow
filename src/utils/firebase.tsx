// Import the functions you need from the SDKs you need
import debounce from 'lodash.debounce';
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, User } from "firebase/auth";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import UserData from "../types/UserData";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDdys6xkXRUIkb_Q4jYzOfutDgrqc-6H28",
  authDomain: "math-crow.firebaseapp.com",
  projectId: "math-crow",
  storageBucket: "math-crow.firebasestorage.app",
  messagingSenderId: "372664559387",
  appId: "1:372664559387:web:4f9b9b09342fc9392555be",
  measurementId: "G-MZBJMBBLPS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

export const saveData = async (user:User|null, userData:UserData) => {
   if (!user) return; // safety check
    const docRef = doc(db, 'users', user.uid);

    try {
      await setDoc(docRef, userData?.toFireStore(), { merge: true });
      //console.log("saved data...")
    } catch (error) {
      console.error("Error saving user data:", error);
      alert("Failed to save data.");
    }
}
export const debouncedSaveData = debounce((user:User|null, userData:UserData) => {
  saveData(user, userData)
},5000)