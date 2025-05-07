import { NextResponse, type NextRequest } from "next/server";
import { authMiddleware } from "./middlewares";

type MiddlewareChainResponse = NextResponse | Promise<NextResponse>
  | (() => (NextResponse | Promise<NextResponse>));

export type MiddlewareChain = (request: NextRequest, response: NextResponse) => 
  Promise<MiddlewareChainResponse>;

const PUBLIC_FILE = /\.(.*)$/;

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Ignore public files
  if (pathname.startsWith('/_next') || PUBLIC_FILE.test(pathname)) {
    return NextResponse.next();
  }

  // Chain middleware
  const response = NextResponse.next();
  const chains: MiddlewareChainResponse[] = await Promise.all([
    authMiddleware(request, response),
  ]);

  const redirected = chains.find((chain) => 'function' === typeof chain);

  if ('function' === typeof redirected) {
    return redirected();
  }

  return response;
};

export const config = {
  matcher: ['/', '/:path*'],
};
