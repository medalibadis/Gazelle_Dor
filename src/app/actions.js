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

export async function getParticipantInfo(id) {
  const GOOGLE_SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL || process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL;
  
  const response = await fetch(`${GOOGLE_SCRIPT_URL}?id=${id}`, {
    method: 'GET',
    cache: 'no-store'
  });

  if (!response.ok) {
    throw new Error('Failed to fetch participant info');
  }

  const data = await response.text();
  if (data === "Not Found") return null;
  
  return JSON.parse(data);
}

export async function markAsPresent(id) {
  const GOOGLE_SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL || process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL;
  
  const response = await fetch(`${GOOGLE_SCRIPT_URL}?id=${id}&action=update`, {
    method: 'GET',
    cache: 'no-store'
  });

  if (!response.ok) {
    throw new Error('Failed to update status');
  }

  return { success: true };
}
