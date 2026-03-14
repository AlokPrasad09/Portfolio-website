import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const { name, email, message } = req.body as { name?: string; email?: string; message?: string };
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required' });
  }
  // TODO: Send email via Resend, SendGrid, or another provider using env vars
  // e.g. RESEND_API_KEY, SENDGRID_API_KEY
  console.log('Contact form:', { name, email, message });
  return res.status(200).json({ success: true });
}
