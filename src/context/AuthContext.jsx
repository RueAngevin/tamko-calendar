import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../config/firebase";

// creating the context
const AuthContext = createContext();

// provider component
export const AuthProvider = ({ children }) => {
  // global user state
  const [user, setUser] = useState(null);
  // waiting for firebase
  const [loading, setLoading] = useState(true);

  // listening for state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  //   login function
  const login = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  // logout function
  const logout = () => signOut(auth);

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
