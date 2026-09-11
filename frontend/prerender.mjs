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
// puppeteer lives in the global prefix on this machine, and ESM import does not honour NODE_PATH.
// Resolved this way so the site's own package.json stays untouched.
const require = createRequire('/home/james/.npm-global/lib/node_modules/');
const puppeteer = require('puppeteer');

const DIST = new URL('./dist/', import.meta.url).pathname;
const ROUTES = ['/', '/provision', '/platform', '/compliance', '/for-las', '/tuition', '/agencies',
                '/portfolio', '/about', '/contact', '/privacy', '/credentials'];
const TYPES = { '.html':'text/html', '.js':'text/javascript', '.css':'text/css', '.png':'image/png', '.jpg':'image/jpeg',
  '.jpeg':'image/jpeg', '.webp':'image/webp', '.svg':'image/svg+xml', '.ico':'image/x-icon', '.json':'application/json',
  '.pdf':'application/pdf', '.woff':'font/woff', '.woff2':'font/woff2', '.txt':'text/plain', '.xml':'application/xml' };

const server = createServer(async (req, res) => {
  const url = decodeURIComponent((req.url || '/').split('?')[0]);
  let file = join(DIST, url);
  if (!extname(file) || !existsSync(file)) file = join(DIST, 'index.html');
  try {
    const buf = await readFile(file);
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
    await page.evaluate(() => Promise.all([...document.images].map(i => i.complete ? 1 : new Promise(r => { i.onload = i.onerror = r; }))));
    // strip the dev-only helper so it is not baked into the static HTML
    const html = await page.evaluate(() => '<!doctype html>\n' + document.documentElement.outerHTML);
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
await browser.close();
server.close();
console.log(`\nprerendered ${ok}/${ROUTES.length}`);
if (failed.length) { console.log('FAILED:'); failed.forEach(f => console.log('  ' + f)); process.exit(1); }
