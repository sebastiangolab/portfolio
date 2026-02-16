import { setupServer } from 'msw/node';
import type { RequestHandler } from 'msw';
import { handlers } from './handlers';

export const server = setupServer(...(handlers as RequestHandler[]));
