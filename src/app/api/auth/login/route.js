import { login } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { email, password } = await req.json();
  try {
    const user = await login(email, password);
    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json(
      { message: error.response?.data?.message || "Login failed" },
      { status: 401 }
    );
  }
}
