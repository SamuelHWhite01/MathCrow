// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
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
export const googleProvider = new GoogleAuthProvider();