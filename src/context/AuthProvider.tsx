// src/providers/AuthProvider.tsx
import React, { useState, useEffect } from "react";
import { onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, User } from "firebase/auth";
import { auth, googleProvider, usernameToStudentEmail } from "utils/firebase";
import { AuthContext } from "context/AuthContext";
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      return result.user;
    } catch (error) {
      console.error("Login failed:", error);
      return null;
    }
  };
  const loginAsStudent = async (username: string, pin: string) => {
    const email = usernameToStudentEmail(username);
    const result = await signInWithEmailAndPassword(auth, email, pin);
    return result.user;
  };
  const logout = async () => {
    await signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, loading, loginWithGoogle, loginAsStudent, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
