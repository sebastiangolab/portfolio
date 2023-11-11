import { cache } from 'react';

const NEXT_DATOCMS_API_TOKEN = '08f9076720d0825680e558e9de0da8';
const NEXT_DATOCMS_ENVIRONMENT = 'main';

const dedupedFetch = cache(async serializedInit => {
   const response = await fetch(
      'https://graphql.datocms.com/',
      JSON.parse(serializedInit),
   );
   const responseBody = await response.json();
   if (!response.ok) {
      throw new Error(
         `${response.status} ${response.statusText}: ${JSON.stringify(
            responseBody,
         )}`,
      );
   }
   return responseBody;
});

export async function performRequest({
   query,
   variables = {},
   includeDrafts = false,
   excludeInvalid = false,
   visualEditingBaseUrl,
   revalidate,
}) {
   const { data } = await dedupedFetch(
      JSON.stringify({
         method: 'POST',
         headers: {
            Authorization: `Bearer ${NEXT_DATOCMS_API_TOKEN}`,
            ...(includeDrafts ? { 'X-Include-Drafts': 'true' } : {}),
            ...(excludeInvalid ? { 'X-Exclude-Invalid': 'true' } : {}),
            ...(visualEditingBaseUrl
               ? {
                    'X-Visual-Editing': 'vercel-v1',
                    'X-Base-Editing-Url': visualEditingBaseUrl,
                 }
               : {}),
            ...(NEXT_DATOCMS_ENVIRONMENT
               ? { 'X-Environment': NEXT_DATOCMS_ENVIRONMENT }
               : {}),
         },
         body: JSON.stringify({ query, variables, revalidate }),
         next: { revalidate },
      }),
   );
   return data;
}
