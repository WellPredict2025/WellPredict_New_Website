import { mkdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const distDir = join(root, 'dist');
const templatePath = join(distDir, 'index.html');
const metaPath = join(root, 'src', 'config', 'seo-meta.json');
const SITE_URL = 'https://www.wellpredict.co.uk';

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function upsertMetaByName(html, name, content) {
  const re = new RegExp(`<meta\\s+name="${name}"[^>]*>`, 'i');
  const tag = `<meta name="${name}" content="${escapeHtml(content)}" />`;
  if (re.test(html)) return html.replace(re, tag);
  return html.replace('</head>', `    ${tag}\n  </head>`);
}

function upsertMetaByProperty(html, property, content) {
  const re = new RegExp(`<meta\\s+property="${property}"[^>]*>`, 'i');
  const tag = `<meta property="${property}" content="${escapeHtml(content)}" />`;
  if (re.test(html)) return html.replace(re, tag);
  return html.replace('</head>', `    ${tag}\n  </head>`);
}

function upsertCanonical(html, href) {
  const re = /<link\s+rel="canonical"[^>]*>/i;
  const tag = `<link rel="canonical" href="${escapeHtml(href)}" />`;
  if (re.test(html)) return html.replace(re, tag);
  return html.replace('</head>', `    ${tag}\n  </head>`);
}

function upsertTitle(html, title) {
  if (/<title>[\s\S]*?<\/title>/i.test(html)) {
    return html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(title)}</title>`);
  }
  return html.replace('</head>', `    <title>${escapeHtml(title)}</title>\n  </head>`);
}

function upsertNoscript(html, title, description) {
  const block = `<noscript>
      <div style="margin:24px;font-family:system-ui,sans-serif;color:#0F172A;max-width:40rem">
        <h1 style="font-size:1.5rem;margin:0 0 8px">${escapeHtml(title)}</h1>
        <p style="margin:0 0 12px;line-height:1.5">${escapeHtml(description)}</p>
        <p style="margin:0">WellPredict requires JavaScript for the full site. Email
          <a href="mailto:hello@wellpredict.co.uk">hello@wellpredict.co.uk</a>
          for help.
        </p>
      </div>
    </noscript>`;
  if (/<noscript>[\s\S]*?<\/noscript>/i.test(html)) {
    return html.replace(/<noscript>[\s\S]*?<\/noscript>/i, block);
  }
  return html.replace('<div id="root"></div>', `${block}\n    <div id="root"></div>`);
}

function applyRouteMeta(template, path, meta) {
  const canonicalUrl = path === '/' ? `${SITE_URL}/` : `${SITE_URL}${path}`;
  let html = template;
  html = upsertTitle(html, meta.title);
  html = upsertMetaByName(html, 'description', meta.description);
  html = upsertCanonical(html, canonicalUrl);
  html = upsertMetaByProperty(html, 'og:title', meta.title);
  html = upsertMetaByProperty(html, 'og:description', meta.description);
  html = upsertMetaByProperty(html, 'og:url', canonicalUrl);
  html = upsertMetaByName(html, 'twitter:title', meta.title);
  html = upsertMetaByName(html, 'twitter:description', meta.description);
  html = upsertNoscript(html, meta.title, meta.description);
  return html;
}

function main() {
  if (!existsSync(templatePath)) {
    console.error('[prerender-seo] dist/index.html not found. Run vite build first.');
    process.exit(1);
  }
  if (!existsSync(metaPath)) {
    console.error('[prerender-seo] seo-meta.json not found.');
    process.exit(1);
  }

  const template = readFileSync(templatePath, 'utf8');
  const routes = JSON.parse(readFileSync(metaPath, 'utf8'));

  let count = 0;
  for (const [path, meta] of Object.entries(routes)) {
    const html = applyRouteMeta(template, path, meta);
    if (path === '/') {
      writeFileSync(templatePath, html);
    } else {
      const outDir = join(distDir, path.replace(/^\//, ''));
      mkdirSync(outDir, { recursive: true });
      writeFileSync(join(outDir, 'index.html'), html);
    }
    count += 1;
  }

  console.log(`[prerender-seo] Wrote route HTML for ${count} paths`);
}

main();
