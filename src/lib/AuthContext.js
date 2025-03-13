// auth-context.js
"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { getProfile, logout } from "@/lib/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(undefined); // undefined means loading
  const [isLoading, setIsLoading] = useState(true);

  // Check authentication status only once on initial load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        await getProfile();
        setIsAuthenticated(true);
        localStorage.setItem("isAuthenticated", "true"); // Cache in local storage
      } catch {
        setIsAuthenticated(false);
        localStorage.setItem("isAuthenticated", "false"); // Cache in local storage
      } finally {
        setIsLoading(false);
      }
    };

    // Check local storage first to avoid unnecessary API calls
    const cachedAuth = localStorage.getItem("isAuthenticated");
    if (cachedAuth !== null) {
      setIsAuthenticated(cachedAuth === "true");
      setIsLoading(false);
    } else {
      checkAuth();
    }
  }, []);

  const handleLogout = async () => {
    await logout();
    setIsAuthenticated(false);
    localStorage.setItem("isAuthenticated", "false"); // Update local storage
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
