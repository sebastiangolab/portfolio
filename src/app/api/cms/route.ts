import { NextRequest, NextResponse } from 'next/server';

const DATOCMS_API_TOKEN = process.env.DATOCMS_API_TOKEN;
const DATOCMS_ENVIRONMENT = process.env.DATOCMS_ENVIRONMENT;

export async function POST(request: NextRequest) {
   try {
      const { query, variables, revalidate } = await request.json();

      // Input validation
      if (!query || typeof query !== 'string') {
         return NextResponse.json({ error: 'Invalid query' }, { status: 400 });
      }

      if (!DATOCMS_API_TOKEN) {
         console.error('DATOCMS_API_TOKEN is not configured');
         return NextResponse.json(
            { error: 'Server configuration error' },
            { status: 500 },
         );
      }

      // Call DatoCMS GraphQL API
      const response = await fetch('https://graphql.datocms.com/', {
         method: 'POST',
         headers: {
            Authorization: `Bearer ${DATOCMS_API_TOKEN}`,
            'Content-Type': 'application/json',
            ...(DATOCMS_ENVIRONMENT
               ? { 'X-Environment': DATOCMS_ENVIRONMENT }
               : {}),
         },
         body: JSON.stringify({ query, variables }),
      });

      const data = await response.json();

      if (!response.ok) {
         console.error('DatoCMS request failed:', response.status, data);
         return NextResponse.json(
            { error: 'Failed to fetch data from CMS' },
            { status: response.status },
         );
      }

      // Return with cache headers
      return NextResponse.json(data, {
         headers: {
            'Cache-Control': `public, s-maxage=${revalidate || 3600}, stale-while-revalidate=86400`,
         },
      });
   } catch (error) {
      console.error('CMS API Error:', error);
      return NextResponse.json(
         { error: 'Internal server error' },
         { status: 500 },
      );
   }
}
