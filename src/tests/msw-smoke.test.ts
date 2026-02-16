import { describe, it, expect } from 'vitest';

describe('MSW Setup', () => {
   it('should mock API requests', async () => {
      const response = await fetch('/api/cms', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({ query: 'query { allRealizations { title } }' }),
      });

      const data = await response.json();
      expect(data.data.allRealizations).toBeDefined();
      expect(Array.isArray(data.data.allRealizations)).toBe(true);
   });

   it('should mock contact API validation', async () => {
      const response = await fetch('/api/contact', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({
            name: 'J',
            email: 'test@example.com',
            message: 'This is a test message',
         }),
      });

      const data = await response.json();
      expect(response.status).toBe(400);
      expect(data.error).toBe('Name must be at least 2 characters');
   });
});
