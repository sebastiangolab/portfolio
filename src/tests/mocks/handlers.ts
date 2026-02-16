import { http, HttpResponse } from 'msw';

export const handlers = [
   // Mock DatoCMS GraphQL API
   http.post('https://graphql.datocms.com/', async ({ request }) => {
      const body = (await request.json()) as any;
      const query = body.query;

      // Mock allRealizations query
      if (query.includes('allRealizations')) {
         return HttpResponse.json({
            data: {
               allRealizations: [
                  {
                     image: { url: 'https://example.com/image1.jpg' },
                     link: 'https://project1.com',
                     title: 'Project 1',
                     technologies: ['React', 'TypeScript'],
                  },
                  {
                     image: { url: 'https://example.com/image2.jpg' },
                     link: 'https://project2.com',
                     title: 'Project 2',
                     technologies: ['Next.js', 'Sass'],
                  },
               ],
            },
         });
      }

      return HttpResponse.json({ data: {} });
   }),

   // Mock CMS API proxy route
   http.post('/api/cms', async ({ request }) => {
      const body = (await request.json()) as any;
      const query = body.query;

      if (query.includes('allRealizations')) {
         return HttpResponse.json({
            data: {
               allRealizations: [
                  {
                     image: { url: 'https://example.com/image1.jpg' },
                     link: 'https://project1.com',
                     title: 'Project 1',
                     technologies: ['React', 'TypeScript'],
                  },
               ],
            },
         });
      }

      return HttpResponse.json({ data: {} });
   }),

   // Mock contact API route
   http.post('/api/contact', async ({ request }) => {
      const body = (await request.json()) as any;
      const { name, email, message } = body;

      // Validate inputs
      if (!name || name.length < 2) {
         return HttpResponse.json(
            { error: 'Name must be at least 2 characters' },
            { status: 400 },
         );
      }

      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
         return HttpResponse.json(
            { error: 'Invalid email address' },
            { status: 400 },
         );
      }

      if (!message || message.length < 10) {
         return HttpResponse.json(
            { error: 'Message must be at least 10 characters' },
            { status: 400 },
         );
      }

      return HttpResponse.json({ success: true });
   }),
];
