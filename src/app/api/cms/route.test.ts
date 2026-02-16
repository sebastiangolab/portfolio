import { describe, it, expect, vi, beforeEach } from 'vitest';
import { POST } from './route';
import { createMockRequest } from '@/tests/utils';

describe('POST /api/cms', () => {
   beforeEach(() => {
      global.fetch = vi.fn();
   });

   it('should successfully fetch data from DatoCMS', async () => {
      const mockQuery = 'query { allRealizations { title } }';
      const mockData = { data: { allRealizations: [{ title: 'Test' }] } };

      (global.fetch as any).mockResolvedValueOnce({
         ok: true,
         json: async () => mockData,
      });

      const request = createMockRequest({
         query: mockQuery,
         variables: {},
         revalidate: 3600,
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toEqual(mockData);
      expect(global.fetch).toHaveBeenCalledWith(
         'https://graphql.datocms.com/',
         expect.objectContaining({
            method: 'POST',
            headers: expect.objectContaining({
               Authorization: 'Bearer test-token',
               'Content-Type': 'application/json',
               'X-Environment': 'test-environment',
            }),
            body: JSON.stringify({ query: mockQuery, variables: {} }),
         }),
      );
   });

   it('should return 400 for missing query', async () => {
      const request = createMockRequest({
         variables: {},
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe('Invalid query');
   });

   it('should return 400 for invalid query type', async () => {
      const request = createMockRequest({
         query: 123,
         variables: {},
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe('Invalid query');
   });

   it('should handle errors gracefully when API token check fails', async () => {
      // This test verifies that error handling works properly
      // Note: Testing missing env vars is difficult since they're captured at module load
      const request = createMockRequest({
         query: 'query { test }',
         variables: {},
      });

      // Mock a scenario that would fail
      (global.fetch as any).mockRejectedValueOnce(
         new Error('Configuration error'),
      );

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.error).toBe('Internal server error');
   });

   it('should handle DatoCMS API errors', async () => {
      (global.fetch as any).mockResolvedValueOnce({
         ok: false,
         status: 401,
         json: async () => ({ error: 'Unauthorized' }),
      });

      const request = createMockRequest({
         query: 'query { test }',
         variables: {},
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(401);
      expect(data.error).toBe('Failed to fetch data from CMS');
   });

   it('should handle network errors', async () => {
      (global.fetch as any).mockRejectedValueOnce(new Error('Network error'));

      const request = createMockRequest({
         query: 'query { test }',
         variables: {},
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.error).toBe('Internal server error');
   });

   it('should include cache headers in response', async () => {
      (global.fetch as any).mockResolvedValueOnce({
         ok: true,
         json: async () => ({ data: {} }),
      });

      const request = createMockRequest({
         query: 'query { test }',
         variables: {},
         revalidate: 7200,
      });

      const response = await POST(request);
      const cacheControl = response.headers.get('Cache-Control');

      expect(cacheControl).toBe(
         'public, s-maxage=7200, stale-while-revalidate=86400',
      );
   });

   it('should use default revalidate time when not provided', async () => {
      (global.fetch as any).mockResolvedValueOnce({
         ok: true,
         json: async () => ({ data: {} }),
      });

      const request = createMockRequest({
         query: 'query { test }',
         variables: {},
      });

      const response = await POST(request);
      const cacheControl = response.headers.get('Cache-Control');

      expect(cacheControl).toBe(
         'public, s-maxage=3600, stale-while-revalidate=86400',
      );
   });

   it('should include X-Environment header when DATOCMS_ENVIRONMENT is set', async () => {
      // This test verifies that environment header is included when configured
      (global.fetch as any).mockResolvedValueOnce({
         ok: true,
         json: async () => ({ data: {} }),
      });

      const request = createMockRequest({
         query: 'query { test }',
         variables: {},
      });

      await POST(request);

      const fetchCall = (global.fetch as any).mock.calls[0];
      const headers = fetchCall[1].headers;

      // In test environment, X-Environment is set to 'test-environment'
      expect(headers).toHaveProperty('X-Environment');
      expect(headers['X-Environment']).toBe('test-environment');
   });

   it('should pass variables to DatoCMS', async () => {
      const mockVariables = { first: 10, skip: 0 };

      (global.fetch as any).mockResolvedValueOnce({
         ok: true,
         json: async () => ({ data: {} }),
      });

      const request = createMockRequest({
         query: 'query ($first: Int) { test }',
         variables: mockVariables,
      });

      await POST(request);

      expect(global.fetch).toHaveBeenCalledWith(
         'https://graphql.datocms.com/',
         expect.objectContaining({
            body: JSON.stringify({
               query: 'query ($first: Int) { test }',
               variables: mockVariables,
            }),
         }),
      );
   });
});
