import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "@/app/lib/session";

const adminRoutes = ["/admin"];
const publicAdminRoutes = ["/admin/login"];

export default async function proxy(req: NextRequest) {
  const path = req.nextUrl.pathname;

  const isAdminRoute = path.startsWith("/admin");
  const isPublicAdminRoute = publicAdminRoutes.some((r) => path.startsWith(r));

  // Set x-pathname so layout.tsx can reliably detect the current route
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-pathname", path);
  const withPathname = { request: { headers: requestHeaders } };

  if (!isAdminRoute) return NextResponse.next(withPathname);

  const token = req.cookies.get("admin_session")?.value;
  const session = await decrypt(token);
  const isAuthenticated = !!session?.userId;

  if (isPublicAdminRoute) {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL("/admin", req.nextUrl));
    }
    return NextResponse.next(withPathname);
  }

  if (!isAuthenticated) {
    return NextResponse.redirect(new URL("/admin/login", req.nextUrl));
  }

  return NextResponse.next(withPathname);
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|svg|webp|ico|woff2?)$).*)"],
};
