import React from 'react';
import { renderToString } from 'react-dom/server';
import Root from './Root';

// Used at build time by scripts/prerender.js to turn the page into static HTML
export function render() {
  return renderToString(<Root />);
}
