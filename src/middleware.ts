import { NextRequest, NextResponse } from "next/server";
export function middleware(req: NextRequest) {
  const h = new Headers(req.headers);
  const m = req.nextUrl.pathname.match(/^\/(fr|en)(\/.*)?$/);
  h.set("x-path", m ? m[2] || "/" : req.nextUrl.pathname);
  h.set("x-locale", m ? m[1] : "ar"); // always overwritten: never trust a client-sent value
  if (m) { const url = req.nextUrl.clone(); url.pathname = m[2] || "/"; return NextResponse.rewrite(url, { request: { headers: h } }); }
  return NextResponse.next({ request: { headers: h } });
}
export const config = { matcher: ["/((?!_next|assets|.*\\..*).*)"] };
