"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/sections/navbar/default";
import { getProfile } from "@/lib/auth";

export default function AuthProvider() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchProfile() {
      try {
        // Assume getProfile can access the token on its own without explicitly passing it
        const userData = await getProfile();
        setUser(userData);
        setIsAuthenticated(!!userData);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
        setIsAuthenticated(false);
      }
    }

    fetchProfile();
  }, []);

  return <Navbar isAuthenticated={isAuthenticated} />;
}
