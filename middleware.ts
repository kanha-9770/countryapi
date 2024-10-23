import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// IP-to-country mapping
const mockGeoDatabase: Record<string, string> = {
  '203.0.113.42': 'US', 
  '198.51.100.24': 'FR',
  '103.21.244.0': 'IN',
  '203.0.113.0': 'AU',
  '92.40.248.0': 'GB',
  '41.77.232.0': 'ZA',
  '202.12.27.33': 'JP',
  '177.124.10.1': 'BR',
  '185.56.168.0': 'DE',
  '37.120.140.0': 'NL',
  '46.101.0.1': 'SG',
  '109.69.8.0': 'IT',
};

function getCountryFromIP(ip: string): string {
  return mockGeoDatabase[ip] || 'Unknown';
}

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
  matcher: '/api/country/req',
};
