import { NextResponse } from "next/server";
import { signSession } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const { password } = await request.json();

    const expectedPassword = process.env.ADMIN_PASSWORD || "Charlotte#1";

    if (password === expectedPassword) {
      const sessionToken = await signSession({ role: "admin" });

      const response = NextResponse.json({ success: true });
      
      // Set secure HTTP-only cookie
      response.cookies.set({
        name: "session",
        value: sessionToken,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 7200, // 2 hours in seconds
      });

      return response;
    }

    return NextResponse.json(
      { error: "Incorrect password. Please try again." },
      { status: 401 }
    );
  } catch (error) {
    console.error("Login API error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred during login." },
      { status: 500 }
    );
  }
}
