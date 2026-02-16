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
process.env.DATOCMS_API_TOKEN = 'test-token';
process.env.DATOCMS_ENVIRONMENT = 'test-environment';

// Nodemailer SMTP configuration
process.env.SMTP_HOST = 'smtp.test.com';
process.env.SMTP_PORT = '587';
process.env.SMTP_SECURE = 'false';
process.env.SMTP_USER = 'test@example.com';
process.env.SMTP_PASS = 'test-password';
process.env.EMAIL_FROM = 'noreply@test.com';
process.env.EMAIL_TO = 'admin@test.com';

// Start MSW server before all tests
beforeAll(() => server.listen({ onUnhandledRequest: 'warn' }));

// Reset handlers after each test
afterEach(() => server.resetHandlers());

// Stop server after all tests
afterAll(() => server.close());
