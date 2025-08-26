// Import the functions you need from the SDKs you need
import debounce from 'lodash.debounce';
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, User } from "firebase/auth"; //connectAuthEmulator
import { collection, doc, getDoc, getDocs, getFirestore, query, setDoc, where  } from "firebase/firestore"; //connectFirestoreEmulator
import UserData from "../types/UserData";
import FireStoreUserData from '@/types/FireStoreUserData';
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
// if (
//   window.location.hostname === "localhost" ||
//   window.location.hostname === "127.0.0.1"
// ) {
//   connectFirestoreEmulator(db, "127.0.0.1", 8080);
//   connectAuthEmulator(auth, "http://127.0.0.1:9099");
// }
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
export const createClassroom = async (className:string) =>{ // will generate a unique 5 digit code, add it to the classroom database, and return the code
  let code = UserData.generateCode()
  const docRef = doc(db, 'classrooms', code);
  let docSnap = await getDoc(docRef); // check to see if there is information here
  while (docSnap.exists()) { // if there is a collision, generate a new code
    let code = UserData.generateCode()
    const docRef = doc(db, 'classrooms', code);
    docSnap = await getDoc(docRef); // check to see if there is information here
  }
  try {
      await setDoc(docRef, { className:className });
      //console.log("saved data...")
    } catch (error) {
      console.error("Error saving user data:", error);
      alert("Failed to save data.");
    }
  return code;
}
export const checkId = async (code:string) =>{
  const docRef = doc(db, 'classrooms', code);
  let docSnap = await getDoc(docRef); // check to see if there is information here
  if(docSnap.exists())
  {
    return true;
  }
  return false;
}
export const getStudentData = async(user:User|null) => {
  if (!user) return; // make sure the user is authorized

  const teacherDocRef = doc(db, "users", user.uid);
  const teacherDoc = await getDoc(teacherDocRef);
  if (!teacherDoc.exists()) throw new Error("Teacher doc not found"); // make sure that there is information for the teacher

  const classroomId = teacherDoc.data().classroomId;
  const q = query(
    collection(db, "users"),
    where("classroomId", "==", classroomId),
    where("isTeacher", "==", false)
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => (UserData.fromFireStore(doc.data() as FireStoreUserData)));
}