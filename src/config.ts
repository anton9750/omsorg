// Samlet sted for alle links og kontaktoplysninger.
// Ret dem her, så opdateres hele hjemmesiden.

// Adressen på helpdesk-hjemmesiden (det andet GitHub Pages-projekt).
// Ved deploy sættes den af workflowet (VITE_HELPDESK_URL). Lokalt peger den på helpdesk-siden på port 5174.
export const HELPDESK_URL = import.meta.env.VITE_HELPDESK_URL || 'http://localhost:5174/'
export const HELPDESK_PHONE_DISPLAY = '33 48 15 00'
export const HELPDESK_PHONE_HREF = 'tel:+4533481500'
export const HELPDESK_HOURS = 'mandag til fredag kl. 9–15'

export const NETFLIX_URL = 'https://www.netflix.com/dk/'
export const EBOKS_URL = 'https://www.e-boks.dk'
export const MITID_URL = 'https://www.mitid.dk'
