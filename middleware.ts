import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // If there's no geo object, return an error message
  const { geo } = request;

  if (!geo || !geo.country) {
    return NextResponse.json(
      { error: 'Geo-location data not available from Vercel' },
      { status: 400 }
    );
  }

  // Pass the request along with geo-location data
  return NextResponse.next();
}

// Apply middleware to specific API paths if needed
export const config = {
  matcher: '/api/country/req',
};
