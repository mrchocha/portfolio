// Adds DOM matchers such as toBeInTheDocument() to Vitest
import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

// Vitest runs without globals, so unmount rendered trees between tests
afterEach(cleanup);

// jsdom has no IntersectionObserver; the scroll reveals and the navbar need one
globalThis.IntersectionObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
};
