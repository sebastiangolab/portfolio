import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
   plugins: [react()],
   test: {
      // Environment
      environment: 'happy-dom',

      // Setup files
      setupFiles: ['./src/tests/setup.ts'],

      // Coverage configuration
      coverage: {
         provider: 'v8',
         reporter: ['text', 'json', 'html'],
         exclude: [
            'node_modules/',
            'src/test/',
            '**/*.d.ts',
            '**/*.config.*',
            '**/dist/**',
            '**/.next/**',
            '**/*.scss',
            'src/types/**',
         ],
         include: ['src/**/*.{ts,tsx}'],
         thresholds: {
            // Global fallback
            lines: 70,
            functions: 70,
            branches: 70,
            statements: 70,

            // Per-path thresholds (CLAUDE.md alignment)
            'src/lib/**': {
               lines: 90,
               functions: 90,
               branches: 90,
               statements: 90,
            },
            'src/hooks/**': {
               lines: 80,
               functions: 80,
               branches: 80,
               statements: 80,
            },
            'src/app/api/**': {
               lines: 90,
               functions: 90,
               branches: 90,
               statements: 90,
            },
            'src/components/**': {
               lines: 70,
               functions: 70,
               branches: 70,
               statements: 70,
            },
         },
      },

      // Test file patterns
      include: ['**/*.{test,spec}.{ts,tsx}'],
      exclude: ['node_modules', 'dist', '.next', 'coverage', '.git'],

      // Global test configuration
      globals: true,
      clearMocks: true,
      restoreMocks: true,
      mockReset: true,

      // Performance
      pool: 'threads',
      poolOptions: {
         threads: {
            singleThread: false,
            minThreads: 1,
            maxThreads: 4,
         },
      },

      // Test timeout
      testTimeout: 10000,
   },
   resolve: {
      alias: {
         '@': path.resolve(__dirname, './src'),
      },
   },
});
