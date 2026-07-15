// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import remarkWikiLink from 'remark-wiki-link';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()]
  },
  markdown: {
    remarkPlugins: [
      [remarkWikiLink, {
        aliasDivider: '|',
        hrefTemplate: (permalink) => `/leaves/${permalink}`
      }]
    ]
  },
  integrations: [mdx(), sitemap()]
});