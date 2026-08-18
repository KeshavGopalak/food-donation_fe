import { NextResponse } from "next/server";

// NOTE:
// This frontend is hosted on Netlify, while auth is issued by a separate backend on Render.
// The browser does not expose Render-set HttpOnly cookies to the Netlify frontend domain,
// so server-side middleware cannot reliably enforce auth here.
// Client-side route guards in the dashboard/layout components handle the real check after login.
export function middleware() {
  return NextResponse.next();
}

export const config = {
  matcher: [],
};
