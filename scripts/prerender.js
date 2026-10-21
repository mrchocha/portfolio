// Puts the rendered page into dist/index.html, so search engines and link previews
// see the full content without running JavaScript. Runs after both Vite builds (see "build" in package.json).
import { readFile, rm, writeFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';

const dist = resolve('dist/index.html');
const { render } = await import(pathToFileURL(resolve('dist-ssr/entry-server.js')).href);

const html = await readFile(dist, 'utf8');
const placeholder = '<div id="root"></div>';
if (!html.includes(placeholder)) throw new Error('dist/index.html has no empty #root to fill');

await writeFile(dist, html.replace(placeholder, `<div id="root">${render()}</div>`));
await rm('dist-ssr', { recursive: true, force: true });
console.log('Pre-rendered dist/index.html');
