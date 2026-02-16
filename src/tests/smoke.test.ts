import { describe, it, expect, vi } from 'vitest';

describe('Vitest Setup', () => {
   it('should run basic tests', () => {
      expect(1 + 1).toBe(2);
   });

   it('should have access to globals', () => {
      expect(vi).toBeDefined();
      expect(expect).toBeDefined();
   });

   it('should have access to environment variables', () => {
      expect(process.env.NEXT_PUBLIC_DATOCMS_API_TOKEN).toBe('test-token');
      expect(process.env.NEXT_PUBLIC_EMAIL_JS_SERVICE_ID).toBe('test-service');
   });
});
