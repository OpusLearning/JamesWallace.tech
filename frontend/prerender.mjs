// Post-build prerender.
//
// The site is a Vite SPA, so every route shipped the same 10-word shell: crawlers, AI search, link previews and
// automated due-diligence saw none of the credentials, provision detail or compliance text, and every page reported the
// identical <title>. usePageMeta already sets a proper title, description and canonical per route — it just did it
// client-side, where nothing indexing the site could see it.
//
// This renders each route in a real browser after the build and writes the resulting HTML to dist/<route>/index.html.
// React still hydrates on top of it for real visitors; the difference is that the HTML now arrives populated.
import { createServer } from 'node:http';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, extname } from 'node:path';
import { createRequire } from 'node:module';
// puppeteer is a devDependency, so normal resolution works in CI, on the deploy target, and here.
// It used to be resolved only out of one machine's global npm prefix, which meant every deploy since
// this file was added failed on the GitHub runner ("Cannot find module 'puppeteer'") and would have
// failed on the server too — the live prerendered HTML had to be pushed by hand. The global prefix is
// kept as a fallback so a working copy that has not reinstalled still builds.
let puppeteer;
try {
  puppeteer = (await import('puppeteer')).default;
} catch {
  const require = createRequire('/home/james/.npm-global/lib/node_modules/');
  puppeteer = require('puppeteer');
}

const DIST = new URL('./dist/', import.meta.url).pathname;
// '/404' is not a real route: it matches the router's catch-all and renders the not-found page,
// so the same HTML can serve both as dist/404/index.html and, copied below, as dist/404.html for
// the server's error page.
const ROUTES = ['/', '/provision', '/platform', '/compliance', '/for-las', '/tuition',
                '/send-tuition-derbyshire', '/send-tuition-nottinghamshire', '/agencies', '/students', '/allergy-policy',
                '/portfolio', '/about', '/contact', '/privacy', '/cookies', '/accessibility', '/terms',
                '/complaints', '/credentials', '/sample-report', '/404'];
const TYPES = { '.html':'text/html', '.js':'text/javascript', '.css':'text/css', '.png':'image/png', '.jpg':'image/jpeg',
  '.jpeg':'image/jpeg', '.webp':'image/webp', '.svg':'image/svg+xml', '.ico':'image/x-icon', '.json':'application/json',
  '.pdf':'application/pdf', '.woff':'font/woff', '.woff2':'font/woff2', '.txt':'text/plain', '.xml':'application/xml' };

// The empty shell, read once before '/' overwrites dist/index.html. Every route renders from it: main.jsx
// hydrates whenever #root already has content, so serving the prerendered home page as the shell for the
// other routes would make React hydrate the wrong page.
const SHELL = await readFile(join(DIST, 'index.html'));

const server = createServer(async (req, res) => {
  const url = decodeURIComponent((req.url || '/').split('?')[0]);
  let file = join(DIST, url);
  if (!extname(file) || !existsSync(file)) file = null;
  try {
    const buf = file ? await readFile(file) : SHELL;
    if (!file) file = 'index.html';
    res.writeHead(200, { 'Content-Type': TYPES[extname(file)] || 'application/octet-stream' });
    res.end(buf);
  } catch { res.writeHead(404); res.end('nope'); }
});

await new Promise((r) => server.listen(0, r));
const port = server.address().port;
const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
let ok = 0, failed = [];
for (const route of ROUTES) {
  const page = await browser.newPage();
  try {
    await page.goto(`http://127.0.0.1:${port}${route}`, { waitUntil: 'networkidle0', timeout: 45000 });
    // Closed training disclosures contain lazy images that are not requested
    // until opened. Their URLs remain in the HTML; they must not block a build.
    await page.evaluate(() => Promise.all([...document.images].map(i =>
      i.complete || i.loading === 'lazy' || !i.getClientRects().length
        ? 1
        : new Promise(r => { i.onload = i.onerror = r; })
    )));
    // The head (title, description, canonical, JSON-LD) comes from the live render above; the body inside
    // #root is replaced with React's server markup so main.jsx can hydrate it in place (site audit G1).
    // React's server render also emits an image preload for every eager <img>; the old snapshot had none, and on
    // /portfolio ten of them would compete with the main image, so they are dropped (red team, 18 Oct 2026).
    const markup = (await page.evaluate(() => window.__jwPrerender())).replace(/<link rel="preload" as="image"[^>]*>/g, '');
    const html = await page.evaluate((m) => {
      const doc = document.documentElement.cloneNode(true);
      doc.querySelector('#root').innerHTML = m;
      return '<!doctype html>\n' + doc.outerHTML;
    }, markup);
    const words = await page.evaluate(() => document.body.innerText.trim().split(/\s+/).length);
    const title = await page.title();
    const dir = route === '/' ? DIST : join(DIST, route);
    await mkdir(dir, { recursive: true });
    await writeFile(join(dir, 'index.html'), html, 'utf8');
    console.log(`  ${String(words).padStart(5)} words  ${route.padEnd(14)} ${title.slice(0, 54)}`);
    ok++;
  } catch (e) {
    failed.push(`${route}: ${e.message.slice(0, 60)}`);
  }
  await page.close();
}
// The same not-found HTML, at /404.html, so a server error-page directive can point at it.
try {
  const notFound = await readFile(join(DIST, '404', 'index.html'));
  await writeFile(join(DIST, '404.html'), notFound);
} catch (e) {
  failed.push(`404.html: ${e.message.slice(0, 60)}`);
}
await browser.close();
server.close();
console.log(`\nprerendered ${ok}/${ROUTES.length}`);
if (failed.length) { console.log('FAILED:'); failed.forEach(f => console.log('  ' + f)); process.exit(1); }
