// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // Canonical home. tombre.fr serves the same build for now; canonical links
  // point here so search engines index one copy.
  site: 'https://edward.tombre.fr',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'fr'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/404'),
      i18n: {
        defaultLocale: 'en',
        locales: { en: 'en-GB', fr: 'fr-FR' },
      },
    }),
  ],
});
