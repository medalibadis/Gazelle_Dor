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
    const primaryUrl = getUrl(type);
    const urlsToTry = primaryUrl ? [primaryUrl] : [];
    
    const allUrls = [
      process.env.GOOGLE_SCRIPT_URL_VISITOR,
      process.env.GOOGLE_SCRIPT_URL_CONFERENCE,
      process.env.GOOGLE_SCRIPT_URL_REVISION
    ].filter(Boolean);

    for (const url of allUrls) {
      if (!urlsToTry.includes(url)) urlsToTry.push(url);
    }

    if (urlsToTry.length === 0) return { success: false, error: 'URL not found' };

    for (const url of urlsToTry) {
      try {
        const response = await fetch(`${url}?id=${id}`, {
          method: 'GET',
          cache: 'no-store'
        });
        const result = await response.text();

        if (response.ok && result !== "Not Found" && !result.startsWith("ERROR")) {
          return { success: true, data: JSON.parse(result) };
        }
      } catch (err) {
        console.error(err); // Try next URL on error
      }
    }

    return { success: false, error: 'Participant not found in sheet.' };
  } catch (error) {
    return { success: false, error: error.message || 'Network error fetching data.' };
  }
}

export async function markAsPresent(id, type) {
  try {
    const primaryUrl = getUrl(type);
    const urlsToTry = primaryUrl ? [primaryUrl] : [];
    
    const allUrls = [
      process.env.GOOGLE_SCRIPT_URL_VISITOR,
      process.env.GOOGLE_SCRIPT_URL_CONFERENCE,
      process.env.GOOGLE_SCRIPT_URL_REVISION
    ].filter(Boolean);

    for (const url of allUrls) {
      if (!urlsToTry.includes(url)) urlsToTry.push(url);
    }

    if (urlsToTry.length === 0) return { success: false, error: 'URL not found' };

    let lastError = "Participant not found in sheet.";

    for (const url of urlsToTry) {
      try {
        const response = await fetch(`${url}?id=${id}&action=update`, {
          method: 'GET',
          cache: 'no-store'
        });
        const result = await response.text();

        if (response.ok && result === "Updated") {
          return { success: true };
        } else if (response.ok && result === "Not Found") {
          continue; // Try next URL
        } else {
          lastError = result; // Keep track of latest Google script error
        }
      } catch (err) {
        lastError = err.message;
      }
    }

    return { success: false, error: lastError || 'Failed to update status' };
  } catch (error) {
    return { success: false, error: error.message || 'Network error updating status.' };
  }
}

