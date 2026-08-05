import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifySession } from "./lib/auth";

export async function middleware(request: NextRequest) {
  const sessionToken = request.cookies.get("session")?.value;
  const path = request.nextUrl.pathname;

  const isAdminDashboard = path.startsWith("/admin/dashboard");
  const isAdminApi = path.startsWith("/api/admin");

  if (isAdminDashboard || isAdminApi) {
    if (!sessionToken) {
      if (isAdminApi) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
      return NextResponse.redirect(new URL("/admin", request.url));
    }

    const sessionPayload = await verifySession(sessionToken);
    if (!sessionPayload || sessionPayload.role !== "admin") {
      if (isAdminApi) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
      return NextResponse.redirect(new URL("/admin", request.url));
    }
  }

  // Redirect to dashboard if already logged in
  if (path === "/admin") {
    if (sessionToken) {
      const sessionPayload = await verifySession(sessionToken);
      if (sessionPayload && sessionPayload.role === "admin") {
        return NextResponse.redirect(new URL("/admin/dashboard", request.url));
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
