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
  const ip = request.headers.get('x-forwarded-for') || 'Unknown';
  const country = getCountryFromIP(ip);

  const response = NextResponse.next();
  response.headers.set('x-country-code', country);
  response.headers.set('x-ip-address', ip);

  return response;
}

// Apply middleware to all API routes
export const config = {
  matcher: '/api/:path*',
};
