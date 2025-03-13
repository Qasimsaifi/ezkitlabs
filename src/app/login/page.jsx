// app/login/page.js
import { redirect } from "next/navigation";
import { getProfile } from "@/lib/auth";
import LoginPage from "@/components/Login";
import { cookies } from "next/headers";

export default async function Login() {
  return <LoginPage />;
}
