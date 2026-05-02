// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getSession } from '@/lib/session';

// Define protected routes and their required roles
const routePermissions: Record<string, string[]> = {
  '/dashboard': ['admin', 'super_admin'],
  '/dashboard/properties': ['admin', 'super_admin'],
  '/dashboard/settings': ['admin', 'super_admin'],
  '/dashboard/analytics': ['admin', 'super_admin'],
};

// Public routes that don't require authentication
const publicRoutes = ['/login', '/register', '/forgot-password'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow public routes
  if (publicRoutes.some(route => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  // Get session from cookies
  const session = await getSession();

  // Check if user is authenticated
  if (!session) {
    // Redirect to login if not authenticated
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Check role-based permissions
  const userRole = session.role?.toLowerCase();
  
  // Find which route pattern matches
  const matchingRoute = Object.keys(routePermissions).find(route => 
    pathname === route || pathname.startsWith(`${route}/`)
  );

  if (matchingRoute) {
    const allowedRoles = routePermissions[matchingRoute];
    
    if (!allowedRoles.includes(userRole)) {
      // Redirect to unauthorized page or dashboard home
      const unauthorizedUrl = new URL('/unauthorized', request.url);
      return NextResponse.redirect(unauthorizedUrl);
    }
  }

  // For dashboard routes not explicitly defined, check if user is admin or super_admin
  if (pathname.startsWith('/dashboard') && !matchingRoute) {
    if (!['admin', 'super_admin'].includes(userRole)) {
      const unauthorizedUrl = new URL('/unauthorized', request.url);
      return NextResponse.redirect(unauthorizedUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder (public files)
     */
    '/((?!_next/static|_next/image|favicon.ico|public|logo.svg|user.svg).*)',
  ],
};