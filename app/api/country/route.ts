// app/api/country/route.ts
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  // Access the country code from the request headers (set by middleware)
  const countryCode = request.headers.get('x-country-code') || 'Unknown';

  // Return the country code as a JSON response
  return NextResponse.json({ countryCode });
}
