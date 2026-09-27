// @ts-check
import { readFileSync } from 'node:fs';
import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';
import sitemap from '@astrojs/sitemap';

// Adresa publică a site-ului. Se folosește pentru canonical, Open Graph și sitemap.
const SITE = 'https://basarabenitm.ro';

/**
 * Versiunea rusă a unei pagini intră în sitemap doar după ce CBT marchează
 * traducerea ca gata (CMS → Versiunea rusă → Stare traducere). Până atunci /ru/ are noindex.
 * @param {string} pagina
 */
function ruTradus(pagina) {
  try {
    const f = readFileSync(new URL('./src/content/setari/traduceri.yaml', import.meta.url), 'utf8');
    return new RegExp(`^${pagina}:\\s*true\\s*$`, 'm').test(f);
  } catch {
    return false;
  }
}
/** @type {Record<string, boolean>} */
const ruGata = {
  '/ru/': ruTradus('acasa'),
  '/ru/despre/': ruTradus('despre'),
};

// Pagini care nu au ce căuta în Google.
const exclus = ['/multumim/', '/acord-imagine/multumim/', '/admin/'];

export default defineConfig({
  site: SITE,
  trailingSlash: 'always',
  integrations: [
    svelte(),
    sitemap({
      filter: (page) => {
        const path = new URL(page).pathname;
        if (exclus.some((p) => path.startsWith(p))) return false;
        if (path.startsWith('/ru/')) return ruGata[path] === true;
        return true;
      },
    }),
  ],
  i18n: {
    defaultLocale: 'ro',
    locales: ['ro', 'ru'],
    routing: { prefixDefaultLocale: false },
  },
  image: {
    // Pozele urcate din CMS sunt redimensionate automat; nu mărim niciodată.
    responsiveStyles: true,
  },
  build: {
    inlineStylesheets: 'auto',
  },
});
