'use server';

const SCRIPT_URLS = {
  visitor: process.env.GOOGLE_SCRIPT_URL_VISITOR,
  qamis: process.env.GOOGLE_SCRIPT_URL_VISITOR,      // Map 'qamis' to visitor sheet
  conference: process.env.GOOGLE_SCRIPT_URL_CONFERENCE,
  'e-com': process.env.GOOGLE_SCRIPT_URL_CONFERENCE, // Map 'e-com' to conference sheet
  revision: process.env.GOOGLE_SCRIPT_URL_REVISION,
  forum: process.env.GOOGLE_SCRIPT_URL_REVISION,    // Map Entrepreneurs Forum to the revision sheet
};

function getUrl(type) {
  // Fallback to generic URL if type is not provided or specific URL is missing
  const url = SCRIPT_URLS[type] || process.env.GOOGLE_SCRIPT_URL || process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL;
  return url;
}

export async function registerParticipant(formData, type) {
  try {
    const GOOGLE_SCRIPT_URL = getUrl(type);

    if (!GOOGLE_SCRIPT_URL || !GOOGLE_SCRIPT_URL.startsWith('http')) {
      return { success: false, error: `Google Script URL for ${type || 'this type'} is missing or invalid.` };
    }

    // Add type to the form data so it's recorded if needed
    const dataToSend = { ...formData, type: type || 'generic' };

    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams(dataToSend).toString(),
    });

    const result = await response.text();

    if (!response.ok || result.startsWith("ERROR") || result.startsWith("DATABASE ERROR")) {
      return { success: false, error: result || 'Google Script returned an error.' };
    }

    return { success: true, message: 'Registration successful! Thank you.' };
  } catch (error) {
    return { success: false, error: error.message || 'Network error occurred.' };
  }
}

export async function getParticipantInfo(id, type) {
  try {
    const GOOGLE_SCRIPT_URL = getUrl(type);

    if (!GOOGLE_SCRIPT_URL) return { success: false, error: 'URL not found' };

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

export async function markAsPresent(id, type) {
  try {
    const GOOGLE_SCRIPT_URL = getUrl(type);

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

