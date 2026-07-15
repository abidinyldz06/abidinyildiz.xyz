// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import remarkWikiLink from 'remark-wiki-link';
import { unified } from '@astrojs/markdown-remark';

// https://astro.build/config
export default defineConfig({
  site: 'https://abidinyildiz.xyz',
  vite: {
    plugins: [tailwindcss()]
  },
  markdown: {
    processor: unified({
      remarkPlugins: [
        [remarkWikiLink, {
          aliasDivider: '|',
          /** @param {string} permalink */
          hrefTemplate: (permalink) => `/leaves/${permalink}`
        }]
      ]
    })
  },
  integrations: [mdx(), sitemap()]
});
