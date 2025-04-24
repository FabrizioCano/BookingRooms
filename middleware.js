//client and request mediator, can limit certain routes for security
import { NextResponse } from "next/server";
import checkAuth from "./app/actions/checkAuth"; // Import checkAuth function

export async function middleware(request) {
  const { isAuthenticated, user } = await checkAuth();

  if (!isAuthenticated) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  const pathname = request.nextUrl.pathname;

  const routeRoles = {
    '/bookings': ['admin', 'user'],
    '/rooms/add': ['admin'],
    '/rooms/my': ['admin', 'user'],
    '/rooms/edit': ['admin'],
    '/profile': ['admin', 'user'],
    '/users': ['admin'],
  };

  const authorizedRoles = routeRoles[pathname];

  if (authorizedRoles && !user.roles.some(role => authorizedRoles.includes(role))) {
    return NextResponse.redirect(new URL('/unauthorized', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/bookings',
    '/rooms/add',
    '/rooms/my',
    '/rooms/edit',
    '/profile',
    '/users',
  ],
};
