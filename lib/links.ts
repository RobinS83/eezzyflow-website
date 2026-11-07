// Every link to the app lives here, so they change in one place.

export const APP_URL = "https://app.eezzyflow.com";

export const links = {
  app: APP_URL,
  login: `${APP_URL}/aanmelden`,
  register: `${APP_URL}/registreren`,
  privacy: `${APP_URL}/privacy`,
  terms: `${APP_URL}/voorwaarden`,
  support: `${APP_URL}/support`,
  forgotPassword: `${APP_URL}/wachtwoord-vergeten`,
  // The app is not in the stores yet. Fill these in once it is; until then
  // the store badges point to the web app.
  appStore: null as string | null,
  googlePlay: null as string | null,
} as const;

export const SITE_URL = "https://eezzyflow.com";

// Contact address until eezzyflow has its own mailbox.
export const CONTACT_EMAIL = "robin@surocad3d.com";
