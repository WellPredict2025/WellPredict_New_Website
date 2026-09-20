/**
 * Invoke api/contact.ts locally without `vercel dev`.
 * Loads .env.local, then exercises the handler with a TEST payload.
 *
 *   npx tsx scripts/invoke-contact-handler.ts
 */
import { readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import type { VercelRequest, VercelResponse } from '@vercel/node';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const envPath = join(root, '.env.local');

function loadEnvLocal() {
  if (!existsSync(envPath)) {
    console.warn('[invoke-contact] No .env.local — handler will return 503 without RESEND_API_KEY');
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
    process.env[key] = value;
  }
}

loadEnvLocal();

const { default: handler } = await import('../api/contact.ts');

type MockRes = VercelResponse & {
  statusCode: number;
  body: unknown;
};

function createMockRes(): MockRes {
  const res = {
    statusCode: 200,
    body: null as unknown,
    setHeader() {
      return res;
    },
    status(code: number) {
      res.statusCode = code;
      return res;
    },
    json(payload: unknown) {
      res.body = payload;
      return res;
    },
    end() {
      return res;
    },
  };
  return res as MockRes;
}

const req = {
  method: 'POST',
  headers: { origin: 'http://localhost:5173' },
  body: {
    name: 'TEST - ignore local',
    organisation: 'WellPredict',
    email: 'wellpredict-audit@example.com',
    message: 'TEST - ignore local handler invoke',
    type: 'contact',
    company_website: '',
  },
} as unknown as VercelRequest;

const res = createMockRes();

console.log(`[invoke-contact] RESEND_API_KEY ${process.env.RESEND_API_KEY ? 'present' : 'MISSING'}`);
console.log(
  `[invoke-contact] CONTACT_FROM_EMAIL ${process.env.CONTACT_FROM_EMAIL || '(default)'}`,
);

await handler(req, res);

console.log(`[invoke-contact] status=${res.statusCode}`);
console.log(JSON.stringify(res.body, null, 2));

const ok =
  res.statusCode === 200 &&
  typeof res.body === 'object' &&
  res.body !== null &&
  ((res.body as { ok?: boolean }).ok === true ||
    (res.body as { success?: boolean }).success === true);

if (!ok) {
  process.exit(1);
}

console.log('[invoke-contact] OK');
