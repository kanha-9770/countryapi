// app/api/country/route.ts
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const countryCode = request.headers.get('x-country-code') || 'Unknown';
  const ipAddress = request.headers.get('x-ip-address') || 'Unknown';

  return NextResponse.json({ country: countryCode, ip: ipAddress });
}
