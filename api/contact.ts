import type { VercelRequest, VercelResponse } from '@vercel/node';

const ALLOWED_ORIGINS = [
  'https://www.wellpredict.co.uk',
  'https://wellpredict.co.uk',
];

const ALLOWED_TYPES = new Set(['contact', 'pilot', 'careers', 'newsletter']);
const CONTACT_TO = 'hello@wellpredict.co.uk';

function cleanText(value: unknown, maxLength = 2000): string {
  return String(value ?? '')
    .trim()
    .replace(/[\r\n]/g, ' ')
    .replace(/<[^>]*>/g, '')
    .slice(0, maxLength);
}

function cleanMultiline(value: unknown, maxLength = 5000): string {
  return String(value ?? '')
    .trim()
    .replace(/<[^>]*>/g, '')
    .slice(0, maxLength);
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function setCors(req: VercelRequest, res: VercelResponse) {
  const origin = req.headers.origin;
  if (typeof origin === 'string' && ALLOWED_ORIGINS.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Content-Type', 'application/json; charset=UTF-8');
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  setCors(req, res);

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const data = typeof req.body === 'object' && req.body !== null ? req.body : null;
  if (!data) {
    return res.status(400).json({ error: 'Invalid request' });
  }

  const honeypot = cleanText(data.company_website, 200);
  if (honeypot !== '') {
    return res.status(200).json({ ok: true, success: true });
  }

  let type = cleanText(data.type ?? data.enquiryType ?? 'contact', 80);
  if (!ALLOWED_TYPES.has(type)) {
    type = 'contact';
  }

  const name = cleanText(data.name, 120);
  const organisation = cleanText(data.organisation, 180);
  const email = String(data.email ?? '').trim();
  const phone = cleanText(data.phone, 80);
  const sector = cleanText(data.sector, 120);
  const enquiryType = cleanText(data.enquiryType, 120);
  const date = cleanText(data.date, 80);
  const sourcePage = cleanText(data.sourcePage, 180);
  const role = cleanText(data.role, 120);
  const teamSize = cleanText(data.teamSize, 80);
  const interest = cleanMultiline(data.interest, 5000);
  let message = cleanMultiline(data.message, 5000);

  if (message === '' && interest !== '') {
    message = interest;
  }

  if (email === '' || !isValidEmail(email)) {
    return res.status(400).json({ error: 'Please enter a valid email address.' });
  }

  let subject: string;
  let body: string;

  if (type === 'newsletter') {
    subject = `Newsletter signup: ${email}`;
    body = [
      'New newsletter signup from the WellPredict website.',
      '',
      `Email: ${email}`,
      `Submitted: ${new Date().toISOString()}`,
    ].join('\n');
  } else {
    if (name === '' || organisation === '' || message === '') {
      return res.status(400).json({ error: 'Missing required fields.' });
    }

    if (type === 'pilot') {
      subject = 'New WellPredict pilot request';
    } else if (type === 'careers') {
      subject = 'New WellPredict careers interest';
    } else {
      subject = 'New WellPredict enquiry';
    }

    const lines = [
      'New website submission from WellPredict.',
      '',
      `Type: ${type}`,
      `Name: ${name}`,
      `Organisation: ${organisation}`,
      `Email: ${email}`,
    ];

    if (phone) lines.push(`Phone: ${phone}`);
    if (sector) lines.push(`Sector: ${sector}`);
    if (role) lines.push(`Role: ${role}`);
    if (teamSize) lines.push(`Team size: ${teamSize}`);
    if (enquiryType) lines.push(`Enquiry type: ${enquiryType}`);
    if (date) lines.push(`Preferred contact date: ${date}`);
    if (sourcePage) lines.push(`Source page: ${sourcePage}`);
    lines.push(`Submitted: ${new Date().toISOString()}`, '', 'Message:', message);
    body = lines.join('\n');
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return res.status(503).json({
      error:
        'Contact form is temporarily unavailable. Please email hello@wellpredict.co.uk directly.',
    });
  }

  const fromEmail =
    process.env.CONTACT_FROM_EMAIL?.trim() ||
    'WellPredict Website <hello@wellpredict.co.uk>';

  try {
    const mailRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [CONTACT_TO],
        reply_to: email.replace(/[\r\n]/g, ''),
        subject,
        text: body,
      }),
    });

    if (!mailRes.ok) {
      return res.status(500).json({
        error: 'Failed to send message. Please email hello@wellpredict.co.uk directly.',
      });
    }

    return res.status(200).json({ ok: true, success: true });
  } catch {
    return res.status(500).json({
      error: 'Failed to send message. Please email hello@wellpredict.co.uk directly.',
    });
  }
}
