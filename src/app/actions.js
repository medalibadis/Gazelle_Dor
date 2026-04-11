'use server';

export async function registerParticipant(formData) {
  // We use the server-side environment variable
  // Supports both public and private env variable names
  const GOOGLE_SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL || process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL;

  if (!GOOGLE_SCRIPT_URL) {
    throw new Error('Google Script URL not configured on server');
  }

  const response = await fetch(GOOGLE_SCRIPT_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams(formData).toString(),
  });

  if (!response.ok) {
    throw new Error('Failed to submit to Google Sheets');
  }

  return { success: true };
}
