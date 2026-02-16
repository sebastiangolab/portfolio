import { NextRequest } from 'next/server';

/**
 * Creates a mock NextRequest for testing API routes
 * @param body - The request body to mock
 * @returns A mock NextRequest object
 */
export const createMockRequest = (body: any): NextRequest => {
  return {
    json: async () => body,
  } as NextRequest;
};
