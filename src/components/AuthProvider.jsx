// src/components/AuthProvider.jsx
import { getProfile } from "@/lib/auth";
import Navbar from "@/components/sections/navbar/default";
import { cookies } from "next/headers";

export default async function AuthProvider() {
  let isAuthenticated = false;
  let user = null;

  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("token");
    // console.log(sessionCookie);
    if (sessionCookie) {
      user = await getProfile(sessionCookie.value);
      isAuthenticated = !!user;
    }
  } catch (error) {
    console.error("Failed to fetch profile:", error);
  }

  return <Navbar isAuthenticated={isAuthenticated} />;
}
