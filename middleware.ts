// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Access the geo.country property provided by Vercel (or return 'Unknown' if not available)
  const country = request.geo?.country || 'Unknown';
  
  // Create a response and attach the country code to the headers
  const response = NextResponse.next();
  response.headers.set('x-country-code', country);

  return response;
}

// Ensure the middleware runs on all API routes
export const config = {
  matcher: '/api/:path*',
};
