'use server';

export async function registerParticipant(formData) {
  try {
    const GOOGLE_SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL || process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL;

    if (!GOOGLE_SCRIPT_URL || !GOOGLE_SCRIPT_URL.startsWith('http')) {
      return { success: false, error: 'Google Script URL is missing or invalid in Vercel settings.' };
    }

    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams(formData).toString(),
    });

    const result = await response.text();
    
    if (!response.ok || result.startsWith("ERROR") || result.startsWith("DATABASE ERROR")) {
      return { success: false, error: result || 'Google Script returned an error.' };
    }

    return { success: true, message: `SUCCESS! Sent to: ${GOOGLE_SCRIPT_URL}` };
  } catch (error) {
    return { success: false, error: error.message || 'Network error occurred.' };
  }
}

export async function getParticipantInfo(id) {
  try {
    const GOOGLE_SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL || process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL;
    
    const response = await fetch(`${GOOGLE_SCRIPT_URL}?id=${id}`, {
      method: 'GET',
      cache: 'no-store'
    });

    const result = await response.text();

    if (!response.ok) {
      return { success: false, error: result || 'Failed to fetch participant info' };
    }

    if (result === "Not Found") return { success: false, error: 'Participant not found in sheet.' };
    
    return { success: true, data: JSON.parse(result) };
  } catch (error) {
    return { success: false, error: error.message || 'Network error fetching data.' };
  }
}

export async function markAsPresent(id) {
  try {
    const GOOGLE_SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL || process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL;
    
    const response = await fetch(`${GOOGLE_SCRIPT_URL}?id=${id}&action=update`, {
      method: 'GET',
      cache: 'no-store'
    });

    const result = await response.text();

    if (!response.ok || result !== "Updated") {
      return { success: false, error: result || 'Failed to update status' };
    }

    return { success: true };
  } catch (error) {
    return { success: false, error: error.message || 'Network error updating status.' };
  }
}
