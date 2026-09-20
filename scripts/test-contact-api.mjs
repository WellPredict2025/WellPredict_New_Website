/**
 * Local smoke test for /api/contact (requires vercel dev + .env.local).
 * Usage: node scripts/test-contact-api.mjs [baseUrl]
 */
import { readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const envPath = join(root, '.env.local');

function loadEnvLocal() {
  if (!existsSync(envPath)) {
    console.warn('[test-contact] No .env.local found. Create it with RESEND_API_KEY=...');
    return;
  }
  for (const line of readFileSync(envPath, 'utf8').split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq < 1) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (!process.env[key]) process.env[key] = value;
  }
}

loadEnvLocal();

const base = (process.argv[2] || 'http://localhost:3000').replace(/\/$/, '');
const payload = {
  name: 'TEST - ignore local',
  organisation: 'WellPredict',
  email: 'wellpredict-audit@example.com',
  message: 'TEST - ignore local contact API check',
  type: 'contact',
  company_website: '',
};

console.log(`[test-contact] POST ${base}/api/contact`);
console.log(`[test-contact] RESEND_API_KEY ${process.env.RESEND_API_KEY ? 'present' : 'MISSING'}`);
console.log(
  `[test-contact] CONTACT_FROM_EMAIL ${process.env.CONTACT_FROM_EMAIL || '(default hello@wellpredict.co.uk)'}`,
);

const res = await fetch(`${base}/api/contact`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(payload),
});

const text = await res.text();
console.log(`[test-contact] status=${res.status}`);
console.log(text);

if (!res.ok) process.exit(1);
const json = JSON.parse(text);
if (json.ok !== true && json.success !== true) {
  console.error('[test-contact] success contract failed');
  process.exit(1);
}
console.log('[test-contact] OK');
