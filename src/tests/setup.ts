import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { afterEach, vi, beforeAll, afterAll } from 'vitest';
import { server } from './mocks/server';
import React from 'react';

// Cleanup after each test
afterEach(() => {
   cleanup();
   vi.clearAllMocks();
});

// Mock Next.js modules
vi.mock('next/navigation', () => ({
   useRouter: () => ({
      push: vi.fn(),
      replace: vi.fn(),
      prefetch: vi.fn(),
      back: vi.fn(),
      pathname: '/',
      query: {},
      asPath: '/',
   }),
   usePathname: () => '/',
   useSearchParams: () => new URLSearchParams(),
   useParams: () => ({}),
}));

// Mock Next.js Image component
vi.mock('next/image', () => ({
   default: ({
      src,
      alt,
      width,
      height,
      ...props
   }: {
      src: string;
      alt: string;
      width?: number;
      height?: number;
   }) => {
      return React.createElement('img', {
         src,
         alt,
         width,
         height,
         ...props,
      });
   },
}));

// Mock Next.js Link component
vi.mock('next/link', () => ({
   default: ({
      children,
      href,
      ...props
   }: {
      children: React.ReactNode;
      href: string;
   }) => {
      return React.createElement('a', { href, ...props }, children);
   },
}));

// Mock SCSS imports
vi.mock('*.scss', () => ({}));
vi.mock('*.sass', () => ({}));
vi.mock('*.css', () => ({}));

// Mock environment variables
process.env.NEXT_PUBLIC_DATOCMS_API_TOKEN = 'test-token';
process.env.NEXT_PUBLIC_EMAIL_JS_SERVICE_ID = 'test-service';
process.env.NEXT_PUBLIC_EMAIL_JS_TEMPLATE_ID = 'test-template';
process.env.NEXT_PUBLIC_EMAIL_JS_USER_ID = 'test-user';
process.env.DATOCMS_API_TOKEN = 'test-token';
process.env.DATOCMS_ENVIRONMENT = 'test-environment';
process.env.EMAIL_JS_SERVICE_ID = 'test-service';
process.env.EMAIL_JS_TEMPLATE_ID = 'test-template';
process.env.EMAIL_JS_USER_ID = 'test-user';

// Start MSW server before all tests
beforeAll(() => server.listen({ onUnhandledRequest: 'warn' }));

// Reset handlers after each test
afterEach(() => server.resetHandlers());

// Stop server after all tests
afterAll(() => server.close());
