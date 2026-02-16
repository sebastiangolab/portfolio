import { describe, it, expect, vi, beforeEach } from 'vitest';
import { performRequest } from './datocms';

describe('datocms', () => {
   beforeEach(() => {
      global.fetch = vi.fn();
   });

   describe('performRequest', () => {
      it('should successfully fetch data from CMS API', async () => {
         const mockData = {
            data: {
               allRealizations: [
                  {
                     title: 'Project 1',
                     technologies: ['React', 'TypeScript'],
                  },
               ],
            },
         };

         (global.fetch as any).mockResolvedValueOnce({
            ok: true,
            json: async () => mockData,
         });

         const query = 'query { allRealizations { title } }';
         const variables = {};
         const revalidate = 3600;

         const result = await performRequest({ query, variables, revalidate });

         expect(result).toEqual(mockData.data);
         expect(global.fetch).toHaveBeenCalledWith(
            '/api/cms',
            JSON.parse(
               JSON.stringify({
                  method: 'POST',
                  headers: {
                     'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({ query, variables, revalidate }),
                  next: { revalidate },
               }),
            ),
         );
      });

      it('should pass query and variables correctly', async () => {
         const mockQuery =
            'query ($first: Int) { allRealizations(first: $first) { title } }';
         const mockVariables = { first: 10 };
         const mockRevalidate = 7200;

         (global.fetch as any).mockResolvedValueOnce({
            ok: true,
            json: async () => ({ data: {} }),
         });

         await performRequest({
            query: mockQuery,
            variables: mockVariables,
            revalidate: mockRevalidate,
         });

         expect(global.fetch).toHaveBeenCalledWith(
            '/api/cms',
            expect.objectContaining({
               method: 'POST',
               body: JSON.stringify({
                  query: mockQuery,
                  variables: mockVariables,
                  revalidate: mockRevalidate,
               }),
            }),
         );
      });

      it('should use default variables when not provided', async () => {
         (global.fetch as any).mockResolvedValueOnce({
            ok: true,
            json: async () => ({ data: {} }),
         });

         const query = 'query { allRealizations { title } }';

         await performRequest({ query });

         expect(global.fetch).toHaveBeenCalledWith(
            '/api/cms',
            expect.objectContaining({
               body: JSON.stringify({
                  query,
                  variables: {},
                  revalidate: undefined,
               }),
            }),
         );
      });

      it('should throw error when response is not ok', async () => {
         const mockErrorResponse = {
            error: 'Invalid query',
         };

         (global.fetch as any).mockResolvedValueOnce({
            ok: false,
            status: 400,
            statusText: 'Bad Request',
            json: async () => mockErrorResponse,
         });

         const query = 'query { invalid }';

         await expect(
            performRequest({ query, variables: {}, revalidate: undefined }),
         ).rejects.toThrow('400 Bad Request: {"error":"Invalid query"}');
      });

      it('should throw error with correct status code', async () => {
         (global.fetch as any).mockResolvedValueOnce({
            ok: false,
            status: 401,
            statusText: 'Unauthorized',
            json: async () => ({ error: 'Unauthorized' }),
         });

         const query = 'query { test }';

         await expect(
            performRequest({ query, variables: {}, revalidate: undefined }),
         ).rejects.toThrow('401 Unauthorized');
      });

      it('should throw error with response body', async () => {
         const errorBody = { errors: [{ message: 'Field does not exist' }] };

         (global.fetch as any).mockResolvedValueOnce({
            ok: false,
            status: 400,
            statusText: 'Bad Request',
            json: async () => errorBody,
         });

         const query = 'query { invalid }';

         await expect(
            performRequest({ query, variables: {}, revalidate: undefined }),
         ).rejects.toThrow(JSON.stringify(errorBody));
      });

      it('should handle network errors', async () => {
         (global.fetch as any).mockRejectedValueOnce(
            new Error('Network error'),
         );

         const query = 'query { test }';

         await expect(
            performRequest({ query, variables: {}, revalidate: undefined }),
         ).rejects.toThrow('Network error');
      });

      it('should make fetch requests to CMS API', async () => {
         const mockData = { data: { allRealizations: [] } };
         let fetchCount = 0;

         (global.fetch as any).mockImplementation(async () => {
            fetchCount++;
            return {
               ok: true,
               json: async () => mockData,
            };
         });

         const query = 'query { allRealizations { title } }';
         const variables = { first: 10 };
         const revalidate = 3600;

         await performRequest({ query, variables, revalidate });

         // Should make at least one fetch request
         expect(fetchCount).toBeGreaterThanOrEqual(1);
      });

      it('should include revalidate in next config', async () => {
         (global.fetch as any).mockResolvedValueOnce({
            ok: true,
            json: async () => ({ data: {} }),
         });

         const query = 'query { test }';
         const revalidate = 1800;

         await performRequest({ query, revalidate });

         expect(global.fetch).toHaveBeenCalledWith(
            '/api/cms',
            expect.objectContaining({
               next: { revalidate: 1800 },
            }),
         );
      });

      it('should handle missing revalidate parameter', async () => {
         (global.fetch as any).mockResolvedValueOnce({
            ok: true,
            json: async () => ({ data: {} }),
         });

         const query = 'query { test }';

         await performRequest({ query, variables: {}, revalidate: undefined });

         expect(global.fetch).toHaveBeenCalledWith(
            '/api/cms',
            expect.objectContaining({
               next: { revalidate: undefined },
            }),
         );
      });

      it('should serialize fetch init correctly', async () => {
         (global.fetch as any).mockResolvedValueOnce({
            ok: true,
            json: async () => ({ data: { test: 'value' } }),
         });

         const query = 'query { test }';
         const variables = { id: 123 };
         const revalidate = 3600;

         await performRequest({ query, variables, revalidate });

         const expectedInit = {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query, variables, revalidate }),
            next: { revalidate },
         };

         expect(global.fetch).toHaveBeenCalledWith(
            '/api/cms',
            JSON.parse(JSON.stringify(expectedInit)),
         );
      });

      it('should return only data property from response', async () => {
         const mockResponse = {
            data: {
               allRealizations: [{ title: 'Test' }],
            },
            extensions: {
               complexity: 100,
            },
         };

         (global.fetch as any).mockResolvedValueOnce({
            ok: true,
            json: async () => mockResponse,
         });

         const result = await performRequest({
            query: 'query { test }',
            variables: {},
            revalidate: undefined,
         });

         expect(result).toEqual(mockResponse.data);
         expect(result).not.toHaveProperty('extensions');
      });

      it('should handle empty response data', async () => {
         (global.fetch as any).mockResolvedValueOnce({
            ok: true,
            json: async () => ({ data: null }),
         });

         const result = await performRequest({
            query: 'query { test }',
            variables: {},
            revalidate: undefined,
         });

         expect(result).toBeNull();
      });

      it('should handle complex nested data structures', async () => {
         const complexData = {
            data: {
               allRealizations: [
                  {
                     id: '1',
                     title: 'Project 1',
                     image: { url: 'https://example.com/image.jpg' },
                     technologies: ['React', 'TypeScript'],
                     nested: {
                        deep: {
                           value: 'test',
                        },
                     },
                  },
               ],
            },
         };

         (global.fetch as any).mockResolvedValueOnce({
            ok: true,
            json: async () => complexData,
         });

         const result = await performRequest({
            query: 'query { complex }',
            variables: {},
            revalidate: undefined,
         });

         expect(result).toEqual(complexData.data);
      });
   });
});
