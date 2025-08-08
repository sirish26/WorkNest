import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/jwt";

export function middleware(req: NextRequest) {
  const token = req.headers.get("authorization")?.replace("Bearer ", "");

  const protectedRoutes = ["/api/user", "/api/org", "/api/project", "/api/team", "/api/vault", "/dashboard"];

  const isProtected = protectedRoutes.some((route) => req.nextUrl.pathname.startsWith(route));

  if (isProtected) {
    if (!token) {
      return new NextResponse(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    try {
      verifyToken(token);
    } catch (err) {
      return new NextResponse(JSON.stringify({ error: "Invalid Token" }), { status: 403 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/:path*", "/dashboard/:path*"],
};
