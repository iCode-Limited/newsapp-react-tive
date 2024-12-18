import React, { createContext, useState, useEffect, useContext } from "react";
import { Appearance } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut as firebaseSignOut, 
} from "firebase/auth";
import { FIREBASE_AUTH } from "@/FirebaseConfig";

const authContext = createContext(null);

export const useAuthContext = () => useContext(authContext);

const AuthContextProvider = ({ children }) => {
  const [themeMode, setThemeMode] = useState(null);
  const [user, setUser] = useState(null);
  const auth = FIREBASE_AUTH;

  useEffect(() => {
    (async () => {
      const storedUser = await AsyncStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser)); 
      }

      const storedTheme = await AsyncStorage.getItem("themeMode");
      if (storedTheme) {
        setThemeMode(storedTheme);
      } else {
        const systemTheme = Appearance.getColorScheme();
        if (systemTheme) {
          setThemeMode(systemTheme);
        } else {
          setThemeMode("light");
        }
      }
    })();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem("themeMode", themeMode);
  }, [themeMode]);

  useEffect(() => {
    if (user) {
      AsyncStorage.setItem("user", JSON.stringify(user)); 
    } else {
      AsyncStorage.removeItem("user"); 
    }
  }, [user]);

  const toggleThemeMode = () => {
    const newThemeMode = themeMode === "dark" ? "light" : "dark";
    setThemeMode(newThemeMode);
  };

  const signUp = async (email, password) => {
    if (!email || !password) throw new Error("Please fill in all fields.");
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    setUser(userCredential.user);
    return userCredential.user;
  };

  const signIn = async (email, password) => {
    if (!email || !password) throw new Error("Please fill in all fields.");
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    setUser(userCredential.user);
    return userCredential.user;
  };

  const resetPassword = async (email) => {
    if (!email) throw new Error("Please enter your email to reset the password.");
    await sendPasswordResetEmail(auth, email);
    return true;
  };

  const signOut = async () => {
    try {
      await firebaseSignOut(auth); 
      setUser(null); 
    } catch (error) {
      throw new Error("Sign out failed: " + error.message);
    }
  };

  const value = {
    themeMode,
    toggleThemeMode,
    user,
    signUp,
    signIn,
    resetPassword,
    signOut, 
  };

  return <authContext.Provider value={value}>{children}</authContext.Provider>;
};

export default AuthContextProvider;
