import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import './index.css';
import Root from './Root';

const container = document.getElementById('root');

// The built site ships with the page already rendered (see scripts/prerender.js), so React attaches to that HTML.
// The dev server starts with an empty root, so it renders from scratch.
if (container.hasChildNodes()) {
  hydrateRoot(container, <Root />);
} else {
  createRoot(container).render(<Root />);
}
