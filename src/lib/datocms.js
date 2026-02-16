import { cache } from 'react';

const dedupedFetch = cache(async serializedInit => {
   const response = await fetch('/api/cms', JSON.parse(serializedInit));
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

export async function performRequest({ query, variables = {}, revalidate }) {
   const { data } = await dedupedFetch(
      JSON.stringify({
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify({ query, variables, revalidate }),
         next: { revalidate },
      }),
   );
   return data;
}
