interface ImportMetaEnv {
  /** ID-ul Google Analytics 4, ex. G-XXXXXXXXXX. Fără el, GA și bannerul de cookie-uri sunt dezactivate. */
  readonly PUBLIC_GA_ID?: string;
  /** Cheia publică Cloudflare Turnstile (anti-spam pentru formulare). */
  readonly PUBLIC_TURNSTILE_SITE_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
