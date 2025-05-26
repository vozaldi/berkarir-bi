import { MiddlewareChain } from "@/middleware";
import { httpServer } from "@/server/httpServer";
import { NextResponse } from "next/server";

export const authMiddleware: MiddlewareChain = async (request, response) => {
  const { pathname } = request.nextUrl;
  const user = request.cookies.get('user')?.value;
  const check = request.cookies.get('authenticated')?.value;

  if (!check && !!user) {
    const userValid = await httpServer('/profile').then((data) => !!data.data).catch(() => false);

    if (!userValid) {
      return () => {
        const redirect = NextResponse.redirect(new URL('/auth/login', request.url));

        redirect.cookies.delete('user');
        redirect.cookies.delete('authenticated');

        return redirect;
      };
    }

    response.cookies.set('authenticated', 'true', {
      expires: undefined,
      path: '/',
    });
  }

  // Redirect if already logged in
  if (pathname === '/' && user) {
    return () => NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Redirect to login if not logged in
  const shouldAuth = ['/dashboard', '/paket', '/account'].find((item) => pathname.startsWith(item));

  if (shouldAuth && !user) {
    return () => NextResponse.redirect(new URL('/auth/login', request.url));
  }

  return response;
};
