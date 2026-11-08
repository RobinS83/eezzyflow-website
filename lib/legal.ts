// Copied from the app (robins83/eezzyflow, lib/legal.ts). Keep these the same
// as in the app: the privacy policy and terms on the site are the app's own.
// The texts themselves come from docs/bron-teksten (legal.privacy / legal.terms).

export const CONTROLLER = {
  naam: "eezzyflow",
  email: "robin@surocad3d.com",
} as const;

/** Processors of the app, in the order the app shows them. */
export const PROCESSORS = ["Supabase", "Vercel", "Brevo", "Anthropic"] as const;

export const PRIVACY_LAST_UPDATED = "2026-11-07";
export const TERMS_LAST_UPDATED = "2026-11-05";
