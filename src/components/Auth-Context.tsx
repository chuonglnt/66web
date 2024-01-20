"use client";
// ************ Start Import ************

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { getAuth, onAuthStateChanged, signOut, User } from "firebase/auth";
import { auth } from "@/lib/firebase/firebase.config";
import { notifySuccess } from "./Notification-Messages";
import { redirectWithDelay } from "@/Core/Utils";
// ************ End Import ************

interface AuthContextType {
  currentUser: User | null;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  if (!useContext) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return useContext(AuthContext);
};

interface AuthProviderProps {
  children: ReactNode;
}
// ************ Auth Context Provider ************

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);
  // ************ Log Out Provider ************
  const logout = async () => {
    try {
      await signOut(auth);
      setCurrentUser(null); // Cập nhật currentUser thành null khi đăng xuất\
      if (!currentUser) {
        localStorage.removeItem("token");
        localStorage.removeItem("dataInfo");
        notifySuccess("Đăng xuất thành công");
        redirectWithDelay("/", 1000);
      }
    } catch (error) {
      console.error("Lỗi khi đăng xuất:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ currentUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
