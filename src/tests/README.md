# Testing Guidelines

## Overview

This project uses **Vitest** + **React Testing Library** + **MSW** for testing.

## When to use which mocking strategy?

### Use MSW (Mock Service Worker) when:
- Testing components that fetch data
- Testing custom hooks making API calls
- You want realistic network behavior
- Testing integration scenarios

**Example:** Tests for `useRealizations`, `Form` component

### Use `global.fetch = vi.fn()` when:
- Testing API route handlers directly
- You need precise control over response timing
- Testing error scenarios difficult to simulate with MSW

**Example:** Tests for `/api/cms`, `/api/contact`

---

## Shared Test Utilities

### `createMockRequest(body)`
**Location:** `@/tests/utils`

Creates a mock NextRequest for testing API routes.

```typescript
import { createMockRequest } from '@/tests/utils';

const request = createMockRequest({ name: 'John' });
const response = await POST(request);
```

---

## Coverage Thresholds

- **Utilities (lib/)**: 90%
- **Hooks**: 80%
- **Components**: 70%
- **API Routes**: 90%

Check coverage: `npm run test:coverage`

---

## Komendy

```bash
npm test              # Uruchom wszystkie testy (CI mode)
npm run test:watch   # Watch mode z auto-reload
npm run test:ui      # Interaktywny UI dashboard
npm run test:coverage # Raport coverage (HTML)
```
