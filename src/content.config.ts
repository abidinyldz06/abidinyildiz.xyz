import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const seeds = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/seeds" }),
  schema: z.object({
    title: z.string(),
    plantedAt: z.coerce.date(),
    icon: z.string().default('🌱'),
    description: z.string().default(''),
    tags: z.array(z.string()).default([]),
  }),
});

const leaves = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/leaves" }),
  schema: z.object({
    title: z.string(),
    seedRef: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = { seeds, leaves };
