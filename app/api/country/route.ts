import { NextRequest, NextResponse } from 'next/server';

// TypeScript types
interface Geo {
  country?: string;
  region?: string;
  city?: string;
}

export async function GET(request: NextRequest) {
  try {
    // Extract geo data from the request (provided by Vercel)
    const geo: Geo = request.geo || {};

    // If no geo data is available, return an error response
    if (!geo || !geo.country) {
      return NextResponse.json(
        { error: 'Could not retrieve geo-location information' },
        { status: 400 }
      );
    }

    // Return the geo-country data back to the client
    return NextResponse.json({
      country: geo.country,
      region: geo.region || 'Unknown region',
      city: geo.city || 'Unknown city',
    });
  } catch (error) {
    console.error('Error fetching geo data:', error);
    return NextResponse.json(
      { error: 'Something went wrong while fetching geo data' },
      { status: 500 }
    );
  }
}
